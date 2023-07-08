<template>
   <div class="wrap">
        <!-- <router-view/> -->
        <div class="lnb_container on">
            <div class="tab_contents">
                <div class="inner type2">
                    <h2 class="sub_title">
                        자료실(ITP) 등록
                        <div class="fr">
                            <button type="button" class="btn btn_md btn_darkgray btn_outline" @click="fn_write">등록</button>
                            <button type="button" class="btn btn_md btn_darkgray btn_outline" @click="fn_back">취소</button>
                        </div>
                    </h2>
                    <div class="table_normal_list table_write mt0">
                    <table>
                        <caption class="sr_only">제목</caption>
                        <colgroup>
                            <col width="120">
                            <col width="*">
                            <col width="120">
                            <col width="*">
                            <col width="120">
                            <col width="*">
                        </colgroup>
                        <tbody>
                            <tr>
                                <th>등록자</th>
                                <td class="">{{ userNm }}</td>
                                <th>등록일</th>
                                <td class="">{{ $moment().format('YYYY-MM-DD') }}</td>
                                <th><span class="emp_red">자료구분</span></th>
                                <td>
                                    <select name="" id="" v-model="input.csfcData" class="form_control form_sm">
                                        <option value="">
                                            전체
                                        </option>
                                        <option v-for="( list, index ) in csfcDataList" :key="index" :value="list.codeVal">
                                            {{ list.codeNameKr }}
                                        </option>
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <th><span class="emp_red">제목</span></th>
                                <td colspan="5">
                                <input type="text" v-model="input.title" class="form_control" maxlength="100" placeholder="제목을 입력해주세요.">
                                </td>
                            </tr>
                            <tr>
                                <th><span class="emp_red">내용</span></th>
                                <td colspan="5" rowspan="2">
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
                    />
                </div>
            </div>
        </div>
   </div>
</template>

<script>
    import API from '@/apis/'
    import { sendPostApi , sendFileApi, requestOptions, requestFileOptions} from '../../../apis/common';
    import { commonFn } from '@/script/commonFn.js';
    import MsgBoxMixins from '@plugin/mixin/MsgBox.mixins.js'
    import DatePickerRange from '@component/common/DatePickerRange.vue'
    import LstFile from '@/pages/common/popup/LstFile.vue'
    import { mapGetters } from 'vuex'
    import authCheckMixns  from '@plugin/mixin/AuthCheck.js'

    export default {
        name: 'ItpArchiveWrite',
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
            this.input.archiveType = 'ITP';
            this.fn_masterCodeList();
        },
        data() {
            return {
                input: {
                    title:"",
                    contents:"",
                    archiveType:"",
                    csfcData:"",
                },
                inputDate: [null, null],
                files : [],
                csfcDataList : [],
            }
        },
        methods: {
            //마스터 코드 조회
            async fn_masterCodeList() {
                    
                //점검유형 코드
                let url = '/sendApi/api/common/masterCode/list';
                requestOptions.headers['Accept-Language'] = "ko";
                requestOptions.headers['Authorization'] = this.$cookies.get("Authorization")

                const payload = {
                    groupCode : 'CONFINAL'
                }

                const response = await sendPostApi(url, payload)

                if(response.status == '200'){
                    this.csfcDataList = response.data.data;
                }
            },
            
            fn_fileChanged (files) {
                this.files = files
            },
            //등록
            fn_write(){

                if(commonFn.methods.isEmpty(this.input.csfcData)){
                    this.alert('자료구분을 선택해주세요.');
                    return
                }

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

                        const response = await API.community.writeDataArchive(payload);  
                        
                        if(response.status == '200' && response.data.data.rCode == "0000"){
                            //파일 추가
                            if(response.data.data.dataArchiveId != ''){

                                if(this.files && this.files.length > 0){
                                    requestFileOptions.headers['Authorization'] = this.$cookies.get("Authorization")
                                    const subResponse = await sendFileApi(response.data.data.dataArchiveId, "DataArchive", this.files)

                                    if(subResponse.status == '200'){
                                        this.alert('등록되었습니다.', async() => {
                                            this.$store.dispatch('tabInfo/setSavePage',this.$route.name);
                                            this.$router.push({name: 'ItpArchiveSheet', })
                                        });
                                    }
                                    else{
                                        this.alert('파일등록을 실패했습니다.');            
                                    }
                                }
                                else{
                                    this.alert('등록되었습니다.', async() => {
                                        this.$store.dispatch('tabInfo/setSavePage',this.$route.name);
                                        this.$router.push({name: 'ItpArchiveSheet', })
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
                this.$store.dispatch('tabInfo/setSavePage',this.$route.name);
                this.$router.push({name: 'ItpArchiveSheet', })
            },
            fn_contentsCheck(evt){
                if(2000 >= evt.target.value.length){
                    this.input.contents = evt.target.value;
                }
            },
        }
    }
</script>