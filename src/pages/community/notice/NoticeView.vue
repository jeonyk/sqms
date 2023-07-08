<template>
   <div class="wrap" >
        <div class="lnb_container on">
            <div class="tab_contents" v-show="show">
                <div class="inner type2">
                    <h2 class="sub_title" v-if="viewModifiState">공지사항 수정
                        <div class="fr">
                            <button type="button" class="btn btn_md btn_outline btn_darkgray" @click="fn_change" >저장</button>
                            <button type="button" class="btn btn_md btn_outline btn_darkgray" @click="fn_viewChange(false)">이전</button>
                        </div>
                    </h2>
                    <h2 class="sub_title" v-else>공지사항 상세
                        <div class="fr">
                            <button type="button" class="btn btn_md btn_outline btn_darkgray" @click="fn_viewChange(true)" v-if="adminYn === '1' || checkUser(input.inUser,'change')">수정</button>
                            <button type="button" class="btn btn_md btn_outline btn_darkgray" @click="fn_delete" v-if="adminYn === '1' || checkUser(input.inUser,'unuse')">삭제</button>
                            <button type="button" class="btn btn_md btn_outline btn_darkgray" @click="fn_back">목록</button>
                        </div>
                    </h2>
                    <div class="table_normal_list mt0">
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
                                    <td class="">{{ input.inUserName }}</td>
                                    <th>등록일</th>
                                    <td class="">{{ $moment(input.inDttm).format('YYYY-MM-DD') }}</td>
                                </tr>
                                <tr>
                                    <th>
                                        공지 구분
                                    </th>
                                    <td v-if="viewModifiState">
                                        <select name="" id="" v-model="input.noticeType" class="form_control form_sm">
                                            <option v-for="( list, index ) in codeList" :key="index" :value="list.codeVal">
                                                {{ list.codeNameKr }}
                                            </option>
                                        </select>
                                    </td>
                                    <td v-else>
                                        {{ input.noticeTypeNm }}
                                    </td>
                                    <th>게시</th>
                                    <td>
                                    <label class="input_check form_lg pop_notext">
                                        <input type="checkbox" id="" name="" :checked="input.showYn == 'Y' ? true : false" :disabled="!viewModifiState" @click="input.showYn = input.showYn == 'Y' ? 'N' : 'Y'">
                                        <span class="label_text"></span>
                                    </label>
                                    </td>
                                </tr>
<!--                                 <tr>
                                    <th>모바일 알림</th>
                                    <td>
                                    <label class="input_check form_lg pop_notext">
                                        <input type="checkbox" id="" name="" :checked="input.mobAlarmYn == 'Y' ? true : false" :disabled="!viewModifiState">
                                        <span class="label_text"></span>
                                    </label>
                                    </td>
                                </tr> -->
                                <tr>
                                    <th>팝업 공지</th>
                                    <td>
                                    <label class="input_check form_lg pop_notext">
                                        <input type="checkbox" id="" name="" :checked="input.popupYn == 'Y' ? true : false" :disabled="!viewModifiState" @click="input.popupYn = input.popupYn == 'Y' ? 'N' : 'Y'">
                                        <span class="label_text"></span>
                                    </label>
                                    </td>
                                    <th>팝업 공지 기간</th>
                                    <td v-if="viewModifiState && input.popupYn == 'Y'">
                                        <!-- <DatePickerRange /> -->
                                        <DatePickerRange 
                                            v-model="inputDate"
                                            :input-style="{'max-width': '100%'}"
                                        />
                                    </td>
                                    <td v-if="!viewModifiState && input.popupYn == 'Y'">
                                        {{ input.popupStartDate }} ~ {{ input.popupEndDate }}
                                    </td>
                                    <td v-if="input.popupYn == 'N'">
                                    </td>
                                </tr>
                                <tr>
                                    <th><span :class="viewModifiState ? 'emp_red':''">제목</span></th>
                                    <td colspan="3" v-if="viewModifiState">
                                        <input type="text" v-model="input.title" class="form_control" maxlength="100" placeholder="제목을 입력해주세요.">
                                    </td>
                                    <td colspan="3" v-else>
                                        {{ input.title }}
                                    </td>
                                </tr>
                                <tr>
                                    <th><span :class="viewModifiState ? 'emp_red':''">내용</span></th>
                                    <td colspan="3" rowspan="2" v-if="viewModifiState">
                                        <textarea name="" id="" @keyup="fn_contentsCheck($event)" :maxLength="2000" :value="input.contents" class="form_control lg" placeholder="내용을 입력해주세요."></textarea>
                                        <p class="table_message ar mt0">{{ input.contents.length }} / {{ 2000 }}</p>
                                    </td>
                                    <td colspan="3" rowspan="2" v-else>
                                        <pre class="form_control">{{ input.contents }}</pre>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <!-- 
                        fileList 기존
                        files 현재 파일
                     -->

                    <LstFile
                        :lst-file-rst="fileList" 
                        :files="files"
                        :second-remove-file-id="deleteFiles"
                        @file-changed="fn_fileChange"
                        @file-removed="fn_fileDelete"
                        :uploadable="viewModifiState"
                        downloadable
                        v-if="viewModifiState || fileList.length > 0"
                    />
                </div>
            </div>
        </div>
   </div>
</template>

<script>
   import API from '@/apis/'
   import { commonFn } from '@/script/commonFn.js';
   import { sendPostApi , sendFileApi, requestOptions, requestFileOptions} from '../../../apis/common';
   import DatePickerRange from '@component/common/DatePickerRange.vue'
   import MsgBoxMixins from '@plugin/mixin/MsgBox.mixins.js'
   import LstFile from '@/pages/common/popup/LstFile.vue'
   import { mapGetters } from 'vuex'
   import authCheckMixns  from '@plugin/mixin/AuthCheck.js'

   export default {
        name: 'NoticeView',
        mixins: [MsgBoxMixins,authCheckMixns],
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
        data() {
            return {
                show: false,
                viewModifiState: false, // 수정여부 false = 상세, true 수정
                input: {},
                fileList : [],
                files : [],
                deleteFiles : [],
                totalCnt:0,
                totalSize:0,
                codeList: [],
                inputDate: [null, null],
                adminYn : '0',
                noticeId : '',
            }
        },
        mounted() {
            this.adminYn = this.$store.getters['auth/getGroupAuthInfoId'] == "GRAT_0000000009" ? '1' : '0';
            if(this.$route.params && this.$route.params.noticeId){
                this.noticeId = this.$route.params.noticeId;
                this.fn_selectCodeList();
            }
            else{
                this.$store.dispatch('tabInfo/setSavePage',this.$route.name);
                this.$router.push({ name: 'NoticeSheet' });
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

                        this.fn_view(false, '1');
                    }
                } catch (error) {
                    this.alert('조회를 실패했습니다.');
                }
            },

            //상세 조회
            async fn_view(viewModifiState, viewCheck) {
                //viewCheck 있을경우 조회수 증가
                try {
                    if(this.noticeId){
                        let payload = {
                            'noticeId' : this.noticeId,
                            'viewCheck' : (viewCheck && viewCheck == '1') ? viewCheck : '0'
                        }
                        const response = await API.community.selectNoticeView(payload);
                        if(response.status == '200'){
                            //첨부파일 가져오기
                            let url = '/sendApi/api/file/upFileList';
                            let param = {
                                fileType : "Notice",
                                fileConnectId : payload.noticeId,
                            };
                            requestOptions.headers['Accept-Language'] = "ko";
                            requestOptions.headers['Authorization'] = this.$cookies.get("Authorization")

                            const fileResponse = await sendPostApi(url, param).then((result) => {
                                return result.data;
                            }).catch((e) => {
                                return e.response.data;
                            });

                            let resultData = response.data.data;

                            this.codeList.forEach(item => {
                                if(resultData.noticeType == item.codeVal){
                                    resultData['noticeTypeNm'] = item.codeNameKr
                                }
                            })
                            this.input = {
                                ...resultData
                            }

                            if(this.input.popupYn == 'Y'){
                                this.inputDate = [this.input.popupStartDate, this.input.popupEndDate]
                            }

                            //파일 data 갱신
                            this.files = [];
                            this.deleteFiles = [],
                            this.fileList = fileResponse.data;
                            this.show = true;
                            this.viewModifiState = viewModifiState;
                        }
                    }
                    else{
                        this.alert('조회를 실패했습니다.');
                    }

                } catch (error) {
                    this.alert('조회를 실패했습니다.');
                }
            },

            //수정 화면 전환
            fn_viewChange(viewModifiState){
                if(!viewModifiState){
                    this.confirm('수정 중인 내용이 있습니다. 취소하시겠습니까?', () => {
                        this.fn_view(viewModifiState);
                    });
                }
                else{
                    this.fn_view(viewModifiState);
                }
            },
            //파일 추가
            fn_fileChange (files) {
                this.files = files
            },
            //파일 삭제
            fn_fileDelete (files) {
                this.deleteFiles = files
            },
            // 수정 
            fn_change(){
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
                        this.alert('팝업 기간을 선택해주세요.');
                        return
                    }
                }

                this.confirm('수정하시겠습니까?', async() => {
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
                        else{
                            payload['popupStartDate'] = '';
                            payload['popupEndDate'] = '';
                        }

                        const response = await API.community.changeNotice(payload);  

                        if(response.status == '200' && response.data.data.rCode == "0000"){
                            //파일 수정 여부 체크
                            if((this.files && this.files.length > 0) || (this.deleteFiles && this.deleteFiles.length > 0)){
                                let resultData = true;
                                //파일 추가
                                if(this.files && this.files.length > 0){
                                    requestFileOptions.headers['Authorization'] = this.$cookies.get("Authorization")
                                    const subResponse = await sendFileApi(this.input.noticeId, "Notice", this.files)
                                    if(subResponse.status == '200'){
                                    }
                                    else{
                                        resultData = false;
                                    }
                                }
                                //파일 삭제
                                if(this.deleteFiles && this.deleteFiles.length > 0){
                                    let url = '/sendApi/api/file/fileUnUse';
                                    let payload = {
                                        fileType : "Notice",
                                        fileComArcvIds : this.deleteFiles,
                                    };
                                    requestOptions.headers['Accept-Language'] = "ko";
                                    requestOptions.headers['Authorization'] = this.$cookies.get("Authorization")

                                    const subResponse = await sendPostApi(url, payload)
                                    if(subResponse.status == '200'){
                                    }
                                    else{
                                        resultData = false;
                                    }
                                }

                                if(resultData){
                                    this.alert('수정되었습니다.');
                                    //상세화면 노출
                                    this.fn_view(false);
                                }
                                else{
                                    this.alert('파일등록 및 삭제를 실패했습니다.');            
                                }
                            }
                            else{
                                this.alert('수정되었습니다.');
                                //상세화면 노출
                                this.fn_view(false);
                            }
                        }
                        else{
                            console.error('non key');
                        }
    
                    } catch (error) {
                        console.error(error);
                        /* this.alert('수정을 실패했습니다.'); */
                    }
                })
            },
            //삭제
            fn_delete() {

                this.confirm('삭제하시겠습니까?', async() => {
                    try {
                        let payload = {
                            ...this.input
                        };

                        const response = await API.community.deleteNotice(payload);
                        if(response.status == '200' && response.data.data.rCode == "0000"){
                            this.alert('삭제되었습니다.', async () => {
                                this.$store.dispatch('tabInfo/setSavePage',this.$route.name);
                                this.$router.push({name: 'NoticeSheet', })
                            });
                        }
                        else{
                            /* this.alert('삭제를 실패했습니다.'); */
                            console.error('non key');
                        }
                    } catch (error) {
                        console.error(error);
                    }
                })
            },
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