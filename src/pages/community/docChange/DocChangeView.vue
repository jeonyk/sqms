<template>
   <div class="wrap" v-show="show">
        <div class="lnb_container on">
            <div class="tab_contents">
                <div class="inner type2">
                    <h2 class="sub_title" v-if="viewModifiState">문서양식 변경요청 수정
                        <div class="fr">
                            <button type="button" class="btn btn_md btn_outline btn_darkgray" @click="fn_change">저장</button>
                            <button type="button" class="btn btn_md btn_outline btn_darkgray" @click="fn_viewChange(false)">이전</button>
                        </div>
                    </h2>
                    <h2 class="sub_title" v-else>문서양식 변경요청 상세
                        <div class="fr">
                            <button type="button" class="btn btn_md btn_outline btn_darkgray" @click="fn_viewChange(true)" v-if="adminYn === '1' || (checkUser(userId,'change') && userId == input.inUser)">수정</button>
                            <button type="button" class="btn btn_md btn_outline btn_darkgray" @click="fn_delete" v-if="adminYn === '1' || (checkUser(userId,'unuse') && userId == input.inUser)">삭제</button>
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
                        v-if="viewModifiState || fileList.length > 0"
                        :lst-file-rst="fileList" 
                        :files="files"
                        :second-remove-file-id="deleteFiles"
                        @file-changed="fn_fileChange"
                        @file-removed="fn_fileDelete"
                        :uploadable="viewModifiState"
                        downloadable
                    />
                    <div class="write_reply" v-if="!viewModifiState">
                        <h3>댓글 <span class="count">{{ input.commentCnt }}</span></h3>
                        <div class="form_write">
                            <p class="name">{{ userNm }}</p>
                            <textarea name="" id="" @keyup="fn_inputCheck($event)" :maxLength="300" :value="commentObj.input" class="form_control" placeholder="댓글을 입력해주세요."></textarea>
                            <!-- <textarea name="" id="" v-model="commentObj.input" class="form_control" :maxLength="300" placeholder="댓글을 입력해주세요."></textarea> -->
                            <div class="submit">
                                <div class="count_write">
                                    <span class="index_count"> {{ commentObj.input.length }}</span>
                                    /
                                    <span class="total_count">300</span>
                                </div>
                                <div class="submit_area">
                                    <button class="btn btn_md btn_outline btn_darkgray" @click="fn_commentWrite">등록</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <ul class="lst_reply" v-if="input.commentCnt > 0 && !viewModifiState">
                        <li v-for="(list, idx) in commentObj.list" :key="idx">
                            <div>
                                <div class="info">
                                    <span class="name">{{ list.inUserName }}</span>
                                    <span class="datetime">{{ $moment(list.inDttm).format('YYYY-MM-DD HH:mm:ss') }}</span>
                                    <span class="func" v-if="list.editYn">
                                        <button class="btn btn_xs btn_darkgray" v-if="!list.editState" @click="list.editState = !list.editState">수정</button>
                                        <button class="btn btn_xs btn_darkgray" v-if="list.editState" @click="fn_changeComment(list)">수정</button>
                                        <button class="btn btn_xs btn_gray" v-if="!list.editState" @click="fn_deleteComment(list)">삭제</button>
                                        <button class="btn btn_xs btn_gray" v-if="list.editState" @click="fn_cancelComment(list);">취소</button>
                                    </span>
                                </div>
                                <div class="contents">
                                    <template v-if="!list.editState">
                                        <pre class="contents">{{ list.contents }}</pre>
                                    </template>
                                    <template v-else>
                                        <textarea name="" id="" @keyup="fn_commentInputChange($event, list)" :maxLength="300" :value="list.contentsChange" class="form_control" placeholder="댓글을 입력해주세요."></textarea>
                                        <div class="count_write">
                                            <span class="index_count">{{ list.contentsChange.length }}</span>
                                            /
                                            <span class="total_count">300</span>
                                        </div>
                                    </template>
                                </div>
                            </div>
                        </li>
                    </ul>
                    <div class="more_reply" v-if="input.commentCnt > commentObj.commentRowNum && !viewModifiState">
                        <button class="btn btn_lg btn_outline btn_darkgray" @click="fn_addCommentRowNum">더보기</button>
                    </div>
                </div>
            </div>
        </div>
   </div>
</template>

<script>
   import _ from 'lodash'
   import API from '@/apis/'
   import { commonFn } from '@/script/commonFn.js';
   import { sendPostApi , sendFileApi, requestOptions, requestFileOptions} from '../../../apis/common';
   import DatePickerRange from '@component/common/DatePickerRange.vue'
   import MsgBoxMixins from '@plugin/mixin/MsgBox.mixins.js'
   import LstFile from '@/pages/common/popup/LstFile.vue'
   import { mapGetters } from 'vuex'
   import authCheckMixns  from '@plugin/mixin/AuthCheck.js'

   export default {
        name: 'DocChangeView',
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
                commentObj : {
                    commentRowNum : 0,             //comment max Index
                    list:[],            //comment list
                    input: ''           //write model
                },
                totalCnt:0,             //file 개수
                totalSize:0,            //flle size
                adminYn : '0',
                docChangeId : '',
            }
        },
        mounted() {
            this.adminYn = this.$store.getters['auth/getGroupAuthInfoId'] == "GRAT_0000000009" ? '1' : '0';
            if(this.$route.params && this.$route.params.docChangeId){
                this.docChangeId = this.$route.params.docChangeId;
                this.fn_view(false, '1', '1');
            }
            else{
                this.$store.dispatch('tabInfo/setSavePage',this.$route.name);
                this.$router.push({ name: 'DocChangeSheet' })
            }
        },
        methods: {

            //상세 조회
            async fn_view(viewModifiState, addComment , viewCheck) {
                //viewCheck 있을경우 조회수 증가
                try {
                    if(this.docChangeId){
                        let payload = {
                            'docChangeId' : this.docChangeId,
                            'viewCheck' : (viewCheck && viewCheck == '1') ? viewCheck : '0'
                        }
                        const response = await API.community.selectDocChangeView(payload);
                        if(response.status == '200'){
                            //첨부파일 가져오기
                            let url = '/sendApi/api/file/upFileList';
                            let param = {
                                fileType : "DocChange",
                                fileConnectId : payload.docChangeId,
                            };
                            requestOptions.headers['Accept-Language'] = "ko";
                            requestOptions.headers['Authorization'] = this.$cookies.get("Authorization")

                            const fileResponse = await sendPostApi(url, param).then((result) => {
                                return result.data;
                            }).catch((e) => {
                                return e.response.data;
                            });

                            let resultData = response.data.data;

                            //댓글 개수 체크
                            if(resultData.commentCnt > 0 && !viewModifiState){
                                let commentRowNum = _.clone(this.commentObj.commentRowNum);
                                if(0 >= commentRowNum||(addComment && addComment == '1')){
                                    commentRowNum = commentRowNum + 10
                                }
                                payload['commentRowNum'] = commentRowNum;
                                await API.community.selectDocCommentList(payload)
                                    .then((commendResponse) => {
                                        if(commendResponse.status == '200'){
                                            let resultCommentData = commendResponse.data.data
                                            
                                            resultCommentData.forEach(item => {
                                                item['contentsChange'] = _.clone(item.contents);
                                                item['editState'] = false;
                                                if(item.inUser == this.userId){
                                                    item['editYn'] = true;
                                                }
                                                else{
                                                    item['editYn'] = false;
                                                }
                                            });

                                            //파일 data 갱신
                                            this.commentObj.input= ''
                                            this.commentObj.list = resultCommentData;
                                            this.files = [];
                                            this.deleteFiles = [],
                                            this.fileList = fileResponse.data;
                                            this.show = true;
                                            this.viewModifiState = viewModifiState;
                                            
                                            this.input = {
                                                ...resultData
                                            }
                                            this.commentObj.commentRowNum = commentRowNum
                                        }
                                        else{
                                            this.alert('댓글 조회를 실패했습니다.');
                                        }
                                    });  
                            }
                            else{   
                                //파일 data 갱신
                                this.commentObj.list = [];
                                this.commentObj.input= ''
                                this.files = [];
                                this.deleteFiles = [],
                                this.fileList = fileResponse.data;
                                this.show = true;
                                this.viewModifiState = viewModifiState;
                                
                                this.input = {
                                    ...resultData
                                }
                            }
                        }
                    }
                    else{
                        this.$store.dispatch('tabInfo/setSavePage',this.$route.name);
                        this.$router.push({name: 'DocChangeSheet', })
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

                this.confirm('수정하시겠습니까?', async () => {
                    try {
    
                        let payload = {
                            ...this.input
                        }

                        const response = await API.community.changeDocChange(payload);  

                        if(response.status == '200' && response.data.data.rCode == "0000"){
                            //파일 수정 여부 체크
                            if((this.files && this.files.length > 0) || (this.deleteFiles && this.deleteFiles.length > 0)){
                                let resultData = true;
                                //파일 추가
                                if(this.files && this.files.length > 0){
                                    requestFileOptions.headers['Authorization'] = this.$cookies.get("Authorization")
                                    const subResponse = await sendFileApi(this.input.docChangeId, "DocChange", this.files)
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
                                        fileType : "DocChange",
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
                            this.alert('수정을 실패했습니다.');
                        }
    
                    } catch (error) {
                        this.alert('수정을 실패했습니다.');
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

                        const response = await API.community.deleteDocChange(payload);
                        if(response.status == '200' && response.data.data.rCode == "0000"){
                            this.alert('삭제되었습니다.', async () => {
                                this.$store.dispatch('tabInfo/setSavePage',this.$route.name);
                                this.$router.push({name: 'DocChangeSheet', })
                            });
                        }
                        else{
                            this.alert('삭제를 실패했습니다.');
                        }
                    } catch (error) {
                        this.alert('삭제를 실패했습니다.');
                    }
                })
            },
            //댓글등록
            fn_commentWrite(){
                if(this.commentObj.input == '' || this.commentObj.input.trim() == ''){
                    this.alert('댓글 내용을 입력해주세요.');
                    return;
                }
                this.confirm('등록하시겠습니까?', async() => {
                    try {
                        let payload = {
                            'docChangeId' : this.input.docChangeId,
                            'contents' : this.commentObj.input
                        };

                        const response = await API.community.writeDocComment(payload);
                        if(response.status == '200' && response.data.data.rCode == "0000"){
                            this.alert('등록되었습니다.');
                            this.fn_view(this.viewModifiState);
                        }
                        else{
                            this.alert('등록을 실패했습니다.');
                        }
                    } catch (error) {
                        this.alert('등록을 실패했습니다.');
                    }
                })
            },
             
            //댓글수정
            fn_changeComment(obj){

                if(obj.contentsChange == '' || obj.contentsChange.trim() == ''){
                    this.alert('댓글 내용을 입력해주세요.');
                    return;
                }
                this.confirm('수정하시겠습니까?', async() => {
                    try {
                        let payload = {
                            'docCommentId' : obj.docCommentId,
                            'contents' : obj.contentsChange,
                        };

                        const response = await API.community.changeDocComment(payload);
                        if(response.status == '200' && response.data.data.rCode == "0000"){
                            this.alert('수정되었습니다.');
                            this.fn_view(this.viewModifiState);
                        }
                        else{
                            this.alert('수정을 실패했습니다.');
                        }
                    } catch (error) {
                        this.alert('수정을 실패했습니다.');
                    }
                })
            },
            //댓글삭제
            fn_deleteComment(obj){
                this.confirm('삭제하시겠습니까?', async() => {
                    try {
                        let payload = {
                            'docCommentId' : obj.docCommentId,
                        };

                        const response = await API.community.deleteDocComment(payload);
                        if(response.status == '200' && response.data.data.rCode == "0000"){
                            this.alert('삭제되었습니다.');
                            this.fn_view(this.viewModifiState);
                        }
                        else{
                            this.alert('삭제를 실패했습니다.');
                        }
                    } catch (error) {
                        this.alert('삭제를 실패했습니다.');
                    }
                })
            },

            fn_back(){
                this.$store.dispatch('tabInfo/setSavePage',this.$route.name);
                this.$router.push({name: 'DocChangeSheet', })
            },

            //댓글 입력 체크
            fn_inputCheck(evt){
                if(300 >= evt.target.value.length){
                    this.commentObj.input = evt.target.value
                }
            },

            //comment 취소
            fn_cancelComment(obj){
                obj.editState = !obj.editState
                obj.contentsChange = _.clone(obj.contents)
            },

            //contents 수정 입력
            fn_commentInputChange(evt, obj){
                if(300 >= evt.target.value.length){
                    obj.contentsChange = evt.target.value
                }
            },

            //댓글 더보기
            fn_addCommentRowNum(){
                this.fn_view(this.viewModifiState, '1');
            },

            fn_contentsCheck(evt){
                if(2000 >= evt.target.value.length){
                    this.input.contents = evt.target.value;
                }
            },
        }
   }
</script>