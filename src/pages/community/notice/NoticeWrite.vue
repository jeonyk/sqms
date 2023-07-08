<template>
   <div class="wrap">
        <!-- <router-view/> -->
        <div class="lnb_container on">
            <div class="tab_contents">
                <div class="inner type2">
                    <h2 class="sub_title">
                        공지사항 등록
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
                                <th>
                                    공지 구분
                                </th>
                                <td>
                                    <select name="" id="" v-model="input.noticeType" class="form_control form_sm">
                                        <option v-for="( list, index ) in codeList" :key="index" :value="list.codeVal">
                                            {{ list.codeNameKr }}
                                        </option>
                                    </select>
                                </td>
                                <th>게시</th>
                                <td>
                                <label class="input_check pop_notext">
                                    <input type="checkbox" id="" name="" :checked="input.showYn == 'Y' ? true : false" @click="input.showYn = input.showYn == 'Y' ? 'N' : 'Y'">
                                    <span class="label_text"></span>
                                </label>
                                </td>
                            </tr>
<!--                             <tr>
                                <th>모바일 알림</th>
                                <td>
                                <label class="input_check form_lg pop_notext">
                                    <input type="checkbox" id="" name="" :checked="input.mobAlarmYn == 'Y' ? true : false" @click="input.mobAlarmYn = input.mobAlarmYn == 'Y' ? 'N' : 'Y'">
                                    <span class="label_text"></span>
                                </label>
                                </td>
                            </tr> -->
                            <tr>
                                <th>팝업 공지</th>
                                <td>
                                <label class="input_check pop_notext">
                                    <input type="checkbox" id="" name="" :checked="input.popupYn == 'Y' ? true : false" @click="input.popupYn = input.popupYn == 'Y' ? 'N' : 'Y'">
                                    <span class="label_text"></span>
                                </label>
                                </td>
                                <th>팝업 공지 기간</th>
                                <td v-if="input.popupYn == 'Y'">
                                    <DatePickerRange 
                                        v-model="inputDate"
                                        :input-style="{'max-width': '100%'}"
                                    />
                                </td>
                                <td v-if="input.popupYn != 'Y'">
                                </td>
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
        name: 'NoticeWrite',
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
            this.fn_selectCodeList();
        },
        data() {
            return {
                input: {
                    title:"",
                    contents:"",
                    noticeType:"",
                    showYn:"Y",
                    mobAlarmYn:"",
                    popupYn:"",
                },
                inputDate: [null, null],
                codeList: [],
                files : [],
            }
        },
        methods: {
            //마스터 코드 조회
            async fn_selectCodeList(){
                try {
                    const payload = {
                        groupCode : 'NOTICE_TYPE'
                    }

                    const url = '/sendApi/api/common/masterCode/list';
                    requestOptions.headers['Accept-Language'] = "ko";
                    requestOptions.headers['Authorization'] = this.$cookies.get("Authorization")

                    const response = await sendPostApi(url, payload)
                    if(response.status == '200'){
                        let codeList = [];
                        let defaultCode = {
                            'codeVal':'',
                            'codeNameKr':'전체',
                        }
                        codeList.push(defaultCode);

                        response.data.data.forEach(item => {
                            codeList.push(item);
                        });
                        
                        this.codeList = codeList;
                    }
                } catch (error) {
                    
                }
            },
            fn_fileChanged (files) {
                this.files = files
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
                if(this.input.popupYn == "Y"){
                    if(commonFn.methods.isEmpty(this.inputDate[0]) || commonFn.methods.isEmpty(this.inputDate[1])){
                        this.alert('팝업 공지 기간을 선택해주세요.');
                        return
                    }
                }
                
                this.confirm('등록하시겠습니까?', async() => {
                    try {
                        this.input.showYn = this.input.showYn == 'Y' ? this.input.showYn : 'N'
                        this.input.mobAlarmYn = this.input.mobAlarmYn == 'Y' ? this.input.mobAlarmYn : 'N'
                        this.input.popupYn = this.input.popupYn == 'Y' ? this.input.popupYn : 'N'
    
                        let payload = {
                            ...this.input
                        }

                        if(this.input.popupYn == "Y"){
                            payload['popupStartDate'] = this.inputDate[0];
                            payload['popupEndDate'] = this.inputDate[1];
                        }

                        const response = await API.community.writeNotice(payload);  
                        
                        if(response.status == '200' && response.data.data.rCode == "0000"){
                            //파일 추가
                            if(response.data.data.noticeId != ''){

                                if(this.files && this.files.length > 0){
                                    requestFileOptions.headers['Authorization'] = this.$cookies.get("Authorization")
                                    const subResponse = await sendFileApi(response.data.data.noticeId, "Notice", this.files)

                                    if(subResponse.status == '200'){
                                        this.alert('등록되었습니다.', async() => {
                                            this.$store.dispatch('tabInfo/setSavePage',this.$route.name);
                                            this.$router.push({name: 'NoticeSheet', });
                                        });
                                    }
                                    else{
                                        this.alert('파일등록을 실패했습니다.');            
                                    }
                                }
                                else{
                                    this.alert('등록되었습니다.', async() => {
                                        this.$store.dispatch('tabInfo/setSavePage',this.$route.name);
                                        this.$router.push({name: 'NoticeSheet', });
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
                this.$router.push({name: 'NoticeSheet', })
            },

            fn_contentsCheck(evt){
                if(2000 >= evt.target.value.length){
                    this.input.contents = evt.target.value;
                }
            },
        }
    }
</script>