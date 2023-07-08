<template>
    <div class="tab_contents">
        <Breadcrumb :currentPath="$route.fullPath" />
        <h2 class="sub_title">나의 할 일</h2>

        <div class="tab_area">
            <div class="inner">
                <div class="button_box">
                    <div class="fl">
                        <div class="btn_wrap">
                            <input type="text" class="form_control" placeholder="입력해주세요" v-model="searchValue" @keyup.enter="fn_getMyjobList"/>
                            <button type="button" class="btn btn_sm btn_darkblue btn_radius" @click="fn_getMyjobList">검색</button>
                        </div>
                    </div>
                    <div class="fr">
                        <div class="count_mywork">미완료 <b class="num primary">{{cmplCount}}</b> / 전체 <b class="num">{{myJobList.length}}</b></div>
                        <button type="button" class="btn btn_md btn_outline btn_darkgray" @click="fn_clickRegister()">할 일 쓰기</button>
                    </div>
                </div>

                <div class="wrap_mywork">
                    <div class="group_list">
                        <div class="button_box">
                            <div class="fl">
                                <select class="form_control" v-model="searchType" @change="fn_getMyjobList()">
                                    <option value="">등록 순</option>
                                    <option value="endDt">기간 순</option>
                                    <option value="impt">중요 순</option>
                                </select>
                            </div>
                            <div class="fr">
                                <label class="input_check">
                                    <input type="checkbox" @change="fn_searchCmplYn">
                                    <span class="label_text">미완료된 할 일 보기</span>
                                </label>
                            </div>
                        </div>

                        <div class="mywork_area">
                            <ul class="lst_mywork" v-if="myJobList.length == 0" v-show="show">
                                <li>
                                    <a class="title">
                                        <span class="txt_ellipsis">조회된 일정이 없습니다.</span>
                                    </a>
                                </li>
                            </ul>
                            <ul class="lst_mywork" v-for="(item, index) in myJobList" :key="index"  v-else v-show="show">
                                <li :class="{on : item.cmplYn=='Y' , selected : item == selectList}"> 
                                    <label class="input_check pop_notext">
                                        <input type="checkbox">
                                        <span class="label_text"></span>
                                    </label>
                                    <a href="javascript:void(0);" class="title" @click="fn_selectTitle(item)">
                                        <span class="txt_ellipsis">{{item.title}}</span>
                                        <span class="ico_file ir" v-if="item.fileCount > 0">file</span>
                                    </a>
                                    <span class="date">{{ item.endDt ? $moment(item.endDt).format('MM.DD (ddd)') : '기간 없음'}}</span>  
                                    <button type="checkbox" class="btn btn_favorite" :class="{on : item.impt=='1'}" @click="fn_YnChange('impt',item)">즐겨찾기</button>
                                </li>
                            </ul>   <!-- // lst_mywork -->
                        </div>
                    </div>  <!-- // group_list -->
                    <div class="group_detail">
                        <div class="button_box" v-show="selectList.title">
                            <h4 class="fl">{{selectList.cmplYn == 'Y' ? '' : '미'}}완료된 할 일</h4>
                            <div class="fr">
                                <button type="button" class="btn btn_modify" @click="fn_modifyShow">수정</button>
                                <button type="button" class="btn btn_remove" @click="fn_delYn('delYn',selectList)">삭제</button>
                            </div>
                        </div>

                        <!-- 리스트  -->
                        <div class="detail_area" v-show="selectList.title && !editYn">
                            <div>
                                {{selectList.title}}
                            </div>
                            <div>
                                <b class="title">기간</b>
                                <span>{{selectList.endDt ? $moment(selectList.endDt).format('YYYY.MM.DD dddd') : '기간 없음'}}</span>
                            </div>
                            <div>
                                <b class="title">내용</b>
                                <span>
                                    {{selectList.contents}}
                                </span>
                            </div>
                            <LstFile
                                v-bind:lst-file-rst="lstFileRst"
                                v-bind:files="files"
                                v-bind:second-remove-file-id="secondRemoveFileId"
                                v-on:file-changed="fileChanged"
                                v-on:file-removed="fileRemoved"
                                :uploadable="false"
                                :downloadable="!editYn"
                                ref="LstFile"
                            /> 
                            <div class="btn_area"> 
                                <button type="button" class="btn btn_lg btn_darkgray w100" v-if="selectList.cmplYn == 'N'" @click="fn_YnChange('cmplYn',selectList)">완료하기</button>
                                <button type="button" class="btn btn_lg btn_gray w100" v-else @click="fn_YnChange('cmplYn',selectList)">완료해제</button>
                            </div>
                            
                        </div>


                        <!-- 수정  -->
                        <div class="detail_area" v-show="selectList.title && editYn">
                            <div>
                                <b class="title">제목</b>
                                <textarea name="" id="" class="form_control" v-model="update.title"></textarea>
                            </div>
                            <div>
                                <b class="title">기간</b>
                                <span>
                                    <label class="input_radio" for="updateDt1">
                                        <input type="radio" id="updateDt1" name="updateEndDt" value='' v-model="update.date" @click="fn_date('none',update)">
                                        <span class="label_text">없음</span>
                                    </label>
                                    <label class="input_radio" for="updateDt2">
                                        <input type="radio" id="updateDt2" name="updateEndDt" value='today' v-model="update.date" @click="fn_date(0,update)" >
                                        <span class="label_text">오늘</span>
                                    </label>
                                    <label class="input_radio" for="updateDt3">
                                        <input type="radio" id="updateDt3" name="updateEndDt" value='day' v-model="update.date" @click="fn_date(1,update)">
                                        <span class="label_text">내일</span>
                                    </label>
                                    <label class="input_radio" for="updateDt4">
                                        <input type="radio" id="updateDt4" name="updateEndDt" value='week' v-model="update.date" @click="fn_date(7,update)">
                                        <span class="label_text">다음 주</span>
                                    </label>
                                    <label class="input_radio" for="updateDt5">
                                        <input type="radio" id="updateDt5" name="updateEndDt" value='date' v-model="update.date">
                                        <span class="label_text">기간 선택</span>
                                    </label>
                                    <Datepicker class="ml15" :disabled="update.date!='date'" v-model="update.endDt"/>
                                        </span>
                                    </div>
                                    <div>
                                <b class="title">내용</b>
                                <span>
                                    <textarea name="" id="" class="form_control" v-model="update.contents"></textarea>
                                </span>
                            </div>
                            <LstFile    
                                v-bind:lst-file-rst="updateFileRst"
                                v-bind:files="updatefiles"
                                v-bind:second-remove-file-id="updateRemoveFileId"
                                v-on:file-changed="fileChanged($event,'update')"
                                v-on:file-removed="fileRemoved($event,'update')"
                                :uploadable="true"
                                :downloadable="!editYn"
                            /> 
                            <div class="btn_area">
                                <button type="button" class="btn btn_lg btn_darkgray w50" @click="fn_updateSave">저장</button>
                                <button type="button" class="btn btn_lg btn_gray w50" @click="fn_modifyShow">이전</button>
                            </div>
                            
                        </div>
                    </div>  <!-- // group_detail -->

                </div>
            </div>
        </div>
        <b-modal id="MyWorkWrite" title="할 일 쓰기" hide-backdrop size="lg" footer-bg-variant="transparent" v-show="modalShow" >
            <template #default>
                <div class="pop_container">
                    <div class="table_normal_list table_write">
                    <table>
                        <caption class="sr_only">제목</caption>
                        <colgroup>
                            <col width="100">
                            <col width="*">
                        </colgroup>
                        <tbody>
                            <tr>
                                <th><span class="emp_red">제목</span></th>
                                <td>
                                    <input type="text" class="form_control" v-model="register.title"/>
                                </td>
                            </tr>
                            <tr>
                                <th>기간</th>
                                <td>
                                    <label class="input_radio" for="registerDt1">
                                        <input type="radio" id="registerDt1" name="registerEndDt" value='' v-model="register.date" @click="fn_date('none',register)">
                                        <span class="label_text">없음</span>
                                    </label>
                                    <label class="input_radio" for="registerDt2">
                                        <input type="radio" id="registerDt2" name="registerEndDt" value='today' v-model="register.date" @click="fn_date(0,register)" >
                                        <span class="label_text">오늘</span>
                                    </label>
                                    <label class="input_radio" for="registerDt3">
                                        <input type="radio" id="registerDt3" name="registerEndDt" value='day' v-model="register.date" @click="fn_date(1,register)">
                                        <span class="label_text">내일</span>
                                    </label>
                                    <label class="input_radio" for="registerDt4">
                                        <input type="radio" id="registerDt4" name="registerEndDt" value='week' v-model="register.date" @click="fn_date(7,register)">
                                        <span class="label_text">다음 주</span>
                                    </label>
                                    <label class="input_radio" for="registerDt5">
                                        <input type="radio" id="registerDt5" name="registerEndDt" value='date' v-model="register.date">
                                        <span class="label_text">기간 선택</span>
                                    </label>
                                    <Datepicker class="ml15" :disabled="register.date!='date'" v-model="register.endDt" :noValue="true"/>
                                </td>
                            </tr>
                            <tr>
                                <th><span class="">내용</span></th>
                                <td>
                                <div>
                                    <textarea name="" id="" class="form_control" v-model="register.contents" ></textarea>
                                </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    </div>            
                    <LstFile    
                        v-bind:files="registerfiles"
                        v-bind:second-remove-file-id="registerRemoveFileId"
                        v-on:file-changed="fileChanged($event,'register')"
                        v-on:file-removed="fileRemoved($event,'register')"
                    /> 
                </div>
            </template>
            <template #modal-footer="{ hide }">
                <b-button class="btn btn_md btn_outline btn_darkgray" @click="fn_RegisterSave()">저장</b-button>
                <b-button class="btn btn_md btn_outline btn_gray" @click="hide('forget')">닫기</b-button>
            </template>
        </b-modal>
    </div>
</template>

<script>
    import LstFile from '@/pages/common/popup/LstFile'
    import Datepicker from '@component/common/DatePicker.vue'
    import { commonFn } from '@/script/commonFn.js'
    import MsgBoxMixins  from '@plugin/mixin/MsgBox.mixins.js'
    import { sendPostApi, sendFileApi, requestFileOptions, requestOptions} from '@/apis/common'
    import Breadcrumb from '@/pages/common/frame/Breadcrumb.vue'

    export default {
        name: 'MyJobSheet',
        mixins: [MsgBoxMixins],
        components: {
            LstFile,
            Datepicker,
            Breadcrumb
        },
        data() {
            return {
                searchType : '',    // 정렬순서 (기본 등록순)
                searchCmplYn : 'N', // 완료 항목 조회(미선택)
                searchValue : '',   // 검색어
                myJobList: [],      // 나의 할일 목록
                selectList: {},     // 선택된 일정
                cmplCount : 0 ,     // 미완료 개수
                show : false ,      // 나의 할일 일정 화면 여부

                tmpParam : {        // 기본값
                    title : '',     // 제목
                    contents : '',  // 내용
                    date  : '',     // 기간 구분
                    endDt : '',     // 기간 날짜
                },
                register:{          // 신규 등록 param
                    title : '',     // 제목
                    contents : '',  // 내용
                    date  : '',     // 기간 구분
                    endDt : '',     // 기간 날짜
                },
                update:{            // 일정 수정 param
                    title : '',     // 제목
                    contents : '',  // 내용
                    date  : '',     // 기간 구분
                    endDt : '',     // 기간 날짜
                },
                modalShow : false,  // 신규 등록 모달창 여부
                editYn : false,     // 수정 여부

                // 신규 일정 등록 파일
                registerFileRst : [],          // 파일 리스트   
                registerfiles : [],               // 파일 변경 리스트(등록)
                registerRemoveFileId : [],  // 파일 아이디 (삭제)
                
                // 선택된 일정 파일 
                lstFileRst : [],          // 파일 리스트   
                files : [],               // 파일 변경 리스트(등록)
                secondRemoveFileId : [],  // 파일 아이디 (삭제)
                editYn : false,     // 수정 여부

                // 일정 수정 파일
                updateFileRst : [],       // 파일 리스트   
                updatefiles : [],         // 파일 변경 리스트(등록)
                updateRemoveFileId : [],  // 파일 아이디 (삭제)

                
            }
        },
        mounted(){
            this.fn_getMyjobList()
        },
        methods: {
            fn_modifyShow(){    // 선택한 일정 - 수정 버튼 클릭시
                // param 가져오기

                this.update = {
                    ...this.selectList,
                    'date' : this.selectList.endDt ? 'date' : '',
                }

                // 파일 가져오기
                this.updateFileRst = [...this.lstFileRst]                // 파일 리스트   
                this.updatefiles = [...this.files]                       // 파일 변경 리스트(등록)
                this.updateRemoveFileId = [...this.secondRemoveFileId]   // 파일 아이디 (삭제)

                this.editYn = !this.editYn
            },

            async fn_selectTitle(data){    // 일정 선택시
                try {
                    this.$refs.LstFile.mounted = true
                    this.editYn = false

                    // 선택된 일정 파일리스트 초기화
                    this.lstFileRst = []           // 파일 리스트   
                    this.files = []                // 파일 변경 리스트(등록)
                    this.secondRemoveFileId = []   // 파일 아이디 (삭제)
                    // 일정 수정시 파일리스트 초기화
                    this.updateFileRst = []       // 파일 리스트   
                    this.updatefiles = []         // 파일 변경 리스트(등록)
                    this.updateRemoveFileId = []  // 파일 아이디 (삭제)

                    let url = '/sendApi/api/file/upFileList';       
                    let param = {
                        'fileConnectId' : data.myWorkInfoId,
                        'fileType' : 'MyJob',
                    };

                    await sendPostApi(url, param).then(async rst =>{
                        if(rst.status == '200' && typeof(rst.data.data) != 'undefined'){
                            this.lstFileRst = [...rst.data.data]  // 첨부파일 담기 

                            this.selectList = data  // 선택한 일정 데이터
                        }
                    })
                    
                    
                } catch (e) {
                    console.log(e)
                }
            },

            fn_searchCmplYn(type) {  // 완료된 할일 보기 선택시
               this.searchCmplYn = type.target.checked ? 'Y': 'N'
               this.fn_getMyjobList()
            },
            
            fn_delYn(type, data) {  // 삭제 여부 수정
                this.confirm('삭제하시겠습니까?', async() => {
                    this.fn_YnChange(type, data)
                })
            },

            async fn_YnChange(type, data) {  // 중요 / 완료 / 삭제 여부 수정
                    try {
                        let val = {                                     // 변경될 값
                            'impt' : data.impt == 1 ? 0 : 1 ,           // 중요
                            'cmplYn' : data.cmplYn == 'Y' ? 'N' : 'Y',  // 완료
                            'delYn' : 'Y'                               // 삭제
                        }

                        let url = '/sendApi/api/myWork/myJob/ynChange'
                        let payload = {
                            'myWorkInfoId' : data.myWorkInfoId,
                        }

                        payload[type] = val[type]  // 변경될 값 param 넣기

                        await sendPostApi(url, payload).then((rst) => {
                            if(rst.status == '200' && typeof(rst.data) != 'undefined'){
                                data[type] = rst.data.data[type]
                                this.cmplCount = this.myJobList.filter(item => item.cmplYn === 'N').length;  // 미완료 일정 개수 수정

                                if(type=='delYn'){   // 삭제시 새로고침
                                    this.alert("삭제되었습니다.")
                                    this.fn_getMyjobList()
                                }
                            }
                        })
                    } catch (e) {
                        console.log(e) 
                    }
            },

            fileChanged(payload, type) {  // 파일 등록 / 취소
                if(type=='register'){
                    this.registerfiles = payload
                }else if(type=='update'){
                    this.updatefiles = payload
                }else{
                     this.files = payload 
                }
            },

            fileRemoved(id, type) {  // 파일 삭제
                if(type=='register'){
                    this.registerRemoveFileId = id  
                }else if(type=='update'){
                    this.updateRemoveFileId = id
                }else{
                    this.secondRemoveFileId = id
                }
            },

            fn_date(day, data){   // 날짜 버튼 선택시 변경
                if(day == 'none'){
                    data.endDt = ''
                }else{
                    data.endDt = this.$moment().add(day, 'days').toDate()
                }
            },

            async fn_getMyjobList(){         // 나의 할일 리스트 조회
                try {
                    // 초기화
                    this.show = false
                    this.editYn = false            // 수정 여부
                    this.myJobList = []            // 나의 할일 목록
                    this.selectList = {}           // 선택 일정
                    this.update = {}               // 수정 값

                    let url = '/sendApi/api/myWork/myJob/list'
                    let param = {
                        'searchType' : this.searchType,      // 정렬순
                        'searchCmplYn' : this.searchCmplYn,  // 완료목록 여부
                        'searchValue' : this.searchValue    // 검색어
                    }
                    await sendPostApi(url, param).then(async (rst) => {
                        if(rst.status == '200' && typeof(rst.data) != 'undefined'){
                            this.myJobList = rst.data.list   // 리스트 담기

                            if(!this.$route.query.myWorkInfoId && !this.$route.params.myWorkInfoId){  // router에 선택된 일정이 없는경우
                                if(this.myJobList.length > 0){  // 리스트가 있는경우
                                    this.fn_selectTitle(this.myJobList[0])  // 첫번째 데이터 선택
                                    this.cmplCount = this.myJobList.filter(item => item.cmplYn === 'N').length;  // 미완료 일정 개수
                                }
                            }else{
                                if(this.$route.query.myWorkInfoId){ 
                                    await this.myJobList.forEach(item => {
                                        if(item.myWorkInfoId == this.$route.query.myWorkInfoId){
                                            this.fn_selectTitle(item)  // 일치하는 데이터 선택
                                        }
                                    })
                                }else{
                                    await this.myJobList.forEach(item => {
                                        if(item.myWorkInfoId == this.$route.params.myWorkInfoId){
                                            this.fn_selectTitle(item)  // 일치하는 데이터 선택
                                        }
                                    })
                                }
                            }
                        }
                        this.show = true
                    })  
                } catch (error) {
                    this.show = true
                    console.log(error)
                }
            },

            fn_clickRegister(){         // 신규 등록 버튼 클릭
                // 등록 초기화
                this.register = {...this.tmpParam}     // 입력값
                this.registerFileRst = [],             // 파일 리스트   
                this.registerfiles = [],               // 파일 변경 리스트(등록)
                this.registerRemoveFileId = [],        // 파일 아이디 (삭제)
                this.$bvModal.show('MyWorkWrite');
            },

            fn_RegisterSave(){          // 신규 등록 저장
                if(commonFn.methods.isEmpty(this.register.title)){  // 제목
                    this.alert("제목을 입력해주세요")
                    return
                }   
                if(commonFn.methods.isEmpty(this.register.date)){  // 기간 없음 선택시 날짜 없음
                    this.register.endDt = '';
                }else if(!commonFn.methods.isEmpty(this.register.date) && commonFn.methods.isEmpty(this.register.endDt.toString())){
                    this.alert("기간을 선택해주세요")
                    return
                }
                else{
                    this.register.endDt = this.$moment(this.register.endDt).format('YYYYMMDD')
                }      

                this.confirm('등록하시겠습니까?', async() => {
                    try {
                        let url = '/sendApi/api/myWork/myJob/write'

                        await sendPostApi(url, this.register).then(async(rst) => { // 신규 등록

                            if(rst.status =='200'){
                                //파일 추가
                                let resultData = true;
                                if(this.registerfiles && this.registerfiles.length > 0){
                                    requestFileOptions.headers['Authorization'] = this.$cookies.get("Authorization")
                                    const subResponse = await sendFileApi(rst.data.data.myWorkInfoId, "MyJob", this.registerfiles)
                                    if(subResponse.status == '200'){
                                    }
                                    else{
                                        resultData = false;
                                    }
                                }

                                if(resultData){
                                    this.$bvModal.hide('MyWorkWrite');
                                    this.alert('등록되었습니다.');
                                    // 리스트 갱신
                                    this.fn_getMyjobList();
                                }
                                else{
                                    this.alert('파일 등록에 실패했습니다.');            
                                }

                            } else{
                                this.alert("오류로 인해 등록되지 않았습니다.")   
                            }
                        })  
                    } catch (e) {
                        console.log(e)
                        this.alert("오류로 인해 등록되지 않았습니다.")   
                    }
                    
                })
            },

            fn_updateSave(){          // 등록된 일정 수정
                if(commonFn.methods.isEmpty(this.update.title)){  // 제목
                    this.alert("제목을 입력해주세요")
                    return
                }   
                if(commonFn.methods.isEmpty(this.update.date)){  // 기간 없음 선택시 날짜 없음
                    this.update.endDt = '';
                }else if(!commonFn.methods.isEmpty(this.update.date) && commonFn.methods.isEmpty(this.update.endDt.toString())){
                    this.alert("기간을 선택해주세요")
                    return
                }else{
                    this.update.endDt = this.$moment(this.update.endDt).format('YYYYMMDD')
                }   

                this.confirm('수정하시겠습니까?', async() => {
                    try {
                        let url = '/sendApi/api/myWork/myJob/change'
                        await sendPostApi(url, this.update).then(async(rst) => { // 나의 할일 데이터 수정

                            if(rst.status =='200'){
                                //파일 추가
                                let resultData = true;
                                if(this.updatefiles && this.updatefiles.length > 0){
                                    requestFileOptions.headers['Authorization'] = this.$cookies.get("Authorization")
                                    const subResponse = await sendFileApi(rst.data.data.myWorkInfoId, "MyJob", this.updatefiles)
                                    if(subResponse.status == '200'){
                                    }
                                    else{
                                        resultData = false;
                                    }
                                }

                                //파일 삭제
                                if(this.updateRemoveFileId && this.updateRemoveFileId.length > 0){
                                    let url = '/sendApi/api/file/fileUnUse';
                                    
                                    let payload = {
                                        fileType : "MyJob",
                                        fileComArcvIds : this.updateRemoveFileId,
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
                                    this.fn_getMyjobList()  // 새로고침
                                }
                                else{
                                    this.alert('파일 수정에 실패했습니다.');            
                                }

                            } else{
                                this.alert("오류로 인해 수정되지 않았습니다.")   
                            }
                        })  
                    } catch (e) {
                        console.log(e)
                        this.alert("오류로 인해 수정되지 않았습니다.")   
                    }
                    
                })
            },


        }
    }
</script>