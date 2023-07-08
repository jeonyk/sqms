<template>
   <div class="wrap">
        <!-- <router-view/> -->
        <div class="lnb_container on">
            <div class="tab_contents">
                <div class="inner type2">
                    <h2 class="sub_title">
                        문서양식 변경요청 등록
                        <div class="fr">
                            <button type="button" class="btn btn_md btn_darkgray btn_outline" @click="fn_write">등록</button>
                            <button type="button" class="btn btn_md btn_darkgray btn_outline" @click="fn_back">취소</button>
                        </div>
                    </h2>
                    <div class="table_normal_list table_write mt0">
                    <table>
                        <caption class="sr_only">제목</caption>
                        <colgroup>
                            <col width="160">
                            <col width="*">
                            <col width="160">
                            <col width="*">
                        </colgroup>
                        <tbody>
                            <tr>
                                <th>등록자</th>
                                <td class="">{{ userNm }}</td>
                                <th>등록일</th>
                                <td class="">{{ $moment().format('YYYY-MM-DD') }}</td>
                            </tr>
                            <tr>
                                <th><span class="emp_red">제목</span></th>
                                <td colspan="3">
                                <input type="text" v-model="input.title" class="form_control" maxlength="100" placeholder="제목을 입력해주세요.">
                                </td>
                            </tr>
                            <tr>
                                <th><span class="emp_red">내용</span></th>
                                <td colspan="3" rowspan="2">
                                    <textarea name="" id="" @keyup="fn_contentsCheck($event)" :maxLength="2000" :value="input.contents" class="form_control lg" placeholder="내용을 입력해주세요."></textarea>
                                        <p class="table_message ar mt0">{{ input.contents.length }} / {{ 2000 }}</p>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    </div>
                    <LstFile 
                        v-bind:files="files"
                        v-on:file-changed="fn_fileChanged"
                        v-on:file-removed="fn_fileRemoved"
                    />
                </div>
            </div>
        </div>
   </div>
</template>

<script>
    import API from '@/apis/'
    import { sendFileApi, requestFileOptions} from '../../../apis/common';
    import { commonFn } from '@/script/commonFn.js';
    import MsgBoxMixins from '@plugin/mixin/MsgBox.mixins.js'
    import DatePickerRange from '@component/common/DatePickerRange.vue'
    import LstFile from '@/pages/common/popup/LstFile.vue'
    import { mapGetters } from 'vuex'
    import authCheckMixns  from '@plugin/mixin/AuthCheck.js'

    export default {
        name: 'DocChangeWrite',
        mixins: [MsgBoxMixins, authCheckMixns],
        computed: {
            //유저정보
            ...mapGetters({
                userId: 'auth/getUserId',
                userNm: 'auth/getUserNm',
                userType: 'auth/getUserType',
            }),
        },
        components: {
            DatePickerRange,
            LstFile,
        },
        mounted() {

        },
        data() {
            return {
                input: {
                    title:"",
                    contents:"",
                },
                inputDate: [null, null],
                files : [],
            }
        },
        methods: {
            fn_fileChanged (files) {
                this.files = files
            },
            fn_fileRemoved (files) {
            },
            //등록
            fn_write(){

                if(commonFn.methods.isEmpty(this.input.title)){
                    this.alert('제목을 입력해주세요.');
                    return
                }
                if(commonFn.methods.isEmpty(this.input.contents)){
                    this.alert('내용을 입력해주세요.');
                    return
                }
                
                this.confirm('등록하시겠습니까?', async() => {
                    try {
    
                        let payload = {
                            ...this.input
                        }

                        const response = await API.community.writeDocChange(payload);  
                        
                        if(response.status == '200' && response.data.data.rCode == "0000"){
                            //파일 추가
                            if(response.data.data.docChangeId != ''){

                                if(this.files && this.files.length > 0){
                                    requestFileOptions.headers['Authorization'] = this.$cookies.get("Authorization")
                                    const subResponse = await sendFileApi(response.data.data.docChangeId, "DocChange", this.files)

                                    if(subResponse.status == '200'){
                                        this.alert('등록되었습니다.', async() => {
                                            this.$store.dispatch('tabInfo/setSavePage',this.$route.name);
                                            this.$router.push({name: 'DocChangeSheet', })
                                        });
                                    }
                                    else{
                                        this.alert('파일등록을 실패했습니다.');            
                                    }
                                }
                                else{
                                    this.alert('등록되었습니다.', async() => {
                                        this.$store.dispatch('tabInfo/setSavePage',this.$route.name);
                                        this.$router.push({name: 'DocChangeSheet', })
                                    });
                                }
                            }
                            else{
                                this.alert('등록을 실패했습니다.');
                            }
                        }
                        else{
                            this.alert('등록을 실패했습니다.');
                        }
    
                    } catch (error) {
                        this.alert('등록을 실패했습니다.');
                    }
                })
            },
            //취소
            fn_back(){
/*                 if(this.input.title != '' || this.input.contents != ''){
                    this.confirm('등록 중인 내용이 있습니다. 취소하시겠습니까?', () => {
                        this.$store.dispatch('tabInfo/setSavePage',this.$route.name);
                        this.$router.push({name: 'DocChangeSheet', })
                    });
                }
                else{
                    this.$store.dispatch('tabInfo/setSavePage',this.$route.name);
                    this.$router.push({name: 'DocChangeSheet', })
                } */
                this.$store.dispatch('tabInfo/setSavePage',this.$route.name);
                this.$router.push({name: 'DocChangeSheet', })
            },
            fn_contentsCheck(evt){
                if(2000 >= evt.target.value.length){
                    this.input.contents = evt.target.value;
                }
            },
        }
    }
</script>