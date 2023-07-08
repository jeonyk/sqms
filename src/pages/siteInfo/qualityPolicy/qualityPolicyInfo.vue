<template>
    <div class="tab_contents">
        <Breadcrumb :currentPath="$route.fullPath"/>
        <!-- <h2 class="sub_title">현장 품질방침/목표</h2> -->

        <div class="lst_tabs">
            <ul class="">
                <li v-for="(tab, index) in tabs" v-bind:class="{active:currentTab===index}" :key="index"><a href="javascript:void(0);" v-on:click="currentTab=index">{{tab}}</a></li>
            </ul>
        </div>

        <div class="tab_area" v-show="currentTab == 0">
            <div class="lookup_box">
                <table>
                    <caption class="sr_only"></caption>
                    <colgroup>
                        <col width="70">
                        <col width="310">
                        <col width="*">
                    </colgroup>
                    <tbody>
                        <tr>
                            <th>연도</th>
                            <td>
                                <select name="" id="" class="form_control" v-model="searchValue">
                                    <option 
                                        v-for="(item,yIndex) in yearList"
                                        :key="yIndex">{{item}}</option>
                                </select>
                            </td>
                            <td>
                                <button v-if="checkUser(userId,'view')" type="button" class="btn btn_sm btn_darkblue btn_radius btn_search" @click="loadSheet">검색</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="inner a4" id="print_area">
                <div class="button_box">
                    <!-- <button v-if="checkUser(userId,'down')" type="button" class="btn btn_sm btn_excel" @click="reportView">Report</button> -->
                    <!-- <button v-if="checkUser(userId,'down')" type="button" class="btn btn_sm btn_excel" v-print="'#print_area'">Report</button> -->
                    <!-- <div class="fr">
                        <button type="button" class="btn btn_md btn_outline btn_darkgray" @click="addGoal" :class="{disabled: info.aprvInfoId != '' && info.aprvInfoId != null}">품질목표추가</button>
                        <button type="button" class="btn btn_md btn_outline btn_darkgray" @click="getSign" :class="{disabled: info.aprvInfoId != '' && info.aprvInfoId != null}">결재상신</button>
                    </div> -->
                    <div class="fr">
                        <button v-if="checkUser(userId,'write')" type="button" class="btn btn_md btn_outline btn_darkgray" @click="addGoal">품질목표추가</button>
                        <button v-if="checkUser(userId,'write')" type="button" class="btn btn_md btn_outline btn_darkgray" @click="getSign" v-show="goalList.length > 0">결재상신</button>
                        <button v-if="checkUser(userId,'view')" type="button" class="btn btn_md btn_outline btn_darkgray" @click="viewAprv" v-show="info.aprvInfoId != null && info.aprvInfoId != ''">결재완료본 출력</button>
                    </div>
                </div>

                <div class="table_data">
                    <div class="write_box">
                        <!-- 타이틀 -->
                        <h3>품질 방침
                            <div v-show="!writeChkYn" class="fr">
                                <button v-if="checkUser(userId,'write')" type="button" class="btn btn_sm btn_darkgray" @click="writeChkYn = true">수정</button>
                            </div>
                            <div v-show="writeChkYn" class="fr">
                                <button v-if="checkUser(userId,'write')" type="button" class="btn btn_sm btn_darkgray" @click="updateInfo">저장</button>
                                <button type="button" class="btn btn_sm btn_gray" @click="cancelBtn">취소</button>
                            </div>
                        </h3>

                        <!-- 제목라인 -->
                        <div v-show="!writeChkYn" class="data_tit">{{info.title}}</div>
                        <div v-show="writeChkYn" class="data_tit">
                            <p class="fixed_title">제목</p>
                            <input type="text" class="form_control" v-model="info.title" :maxlength="100"/>
                        </div>

                        <!-- 이미지라인 -->
                        <div v-show="!writeChkYn" class="img_area">
                            <img v-bind:src="(fileImg.length != 0 ? fileImg[0].preview : ((info.qltyPlcyFrntFileId != '' && info.qltyPlcyFrntFileId != null)? '/sendApi/api/fileCall/getSiteInfoImgFile/' + info.qltyPlcyFrntFileId : require('@/assets/img/layout/img_blank.png')))" alt="">
                            <div v-if="info.qltyPlcyFrntFileId != '' && info.qltyPlcyFrntFileId != null && checkUser(userId,'down')">
                                <a href="javascript:void(0);" class="btn_img_download2" v-on:click="download" id="downBtn"></a>
                            </div>
                        </div>
                        <div v-show="writeChkYn" class="data_tit">이미지 Upload
                            <div class="btn_area ar">
                                <div class="file_upload">
                                    <input type="file" id="input_upload_copy2" class="upload_hidden" name="file-input" @change="handleFileInput" style="display:none">
                                    <label v-if="checkUser(userId,'write')" for="input_upload_copy2" class="btn btn_sm btn_darkgray btn_addimg">이미지 첨부</label>
                                </div>
                            </div>
                            <div class="img_area">
                                <img v-bind:src="(fileImg.length != 0 ? fileImg[0].preview : ((info.qltyPlcyFrntFileId != '' && info.qltyPlcyFrntFileId != null)? '/sendApi/api/fileCall/getSiteInfoImgFile/' + info.qltyPlcyFrntFileId : require('@/assets/img/layout/img_blank.png')))" alt="">
                            </div>
                        </div>

                        <!-- 파일라인 -->
                        <div v-show="writeChkYn" class="data_tit">파일 Upload</div>
                        <LstFile
                            v-bind:lst-file-rst="lstFileRst"
                            v-bind:files="files"
                            v-bind:second-remove-file-id="secondRemoveFileId"
                            v-on:file-changed="fileChanged"
                            v-on:file-removed="fileRemoved"
                            :downloadable="checkUser(userId,'down')"
                            :uploadable="writeChkYn"
                        />

                    </div>


                    <!-- <div class="write_box" v-if="!writeChkYn">
                        <h3>품질방침
                            <div class="fr">
                                <button v-if="checkUser(userId,'write')" type="button" class="btn btn_sm btn_darkgray" @click="writeChkYn = true">수정</button>
                            </div>
                        </h3>
                        <div class="data_tit">{{info.title}}</div>
                        <div class="img_area">
                            <img v-bind:src="(fileImg.length != 0 ? fileImg[0].preview : ((info.qltyPlcyFrntFileId != '' && info.qltyPlcyFrntFileId != null)? '/sendApi/api/fileCall/getSiteInfoImgFile/' + info.qltyPlcyFrntFileId : require('@/assets/img/layout/img_blank.png')))" alt="">
                            <div v-if="info.qltyPlcyFrntFileId != '' && info.qltyPlcyFrntFileId != null && checkUser(userId,'down')">
                                <a href="javascript:void(0);" class="btn_img_download" v-on:click="download" id="downBtn"></a>
                            </div>
                        </div>

                        <div class="lst_file">
                            <h3>첨부파일 {{totalCnt}}개 ({{totalSize}})</h3>
                            <ul>
                                <li v-for="(mngrFileRst, index) in lstFileRst" v-bind:key="index" class="old">
                                    <a href="javascript:void(0); " v-on:click="orgFileDown(index)"><i class="ico_file file_p_red">{{mngrFileRst.orgFileName}} ({{mngrFileRst.fileSize}})</i></a>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div class="write_box" v-if="writeChkYn">
                        <h3>품질방침
                            <div class="fr">
                                <button v-if="checkUser(userId,'write')" type="button" class="btn btn_sm btn_darkgray" @click="updateInfo">수정</button>
                                <button type="button" class="btn btn_sm btn_gray" @click="cancelWriteInfo">취소</button>
                            </div>
                        </h3>
                        <div class="data_tit">
                            <p class="fixed_title">제목</p>
                            <input type="text" class="form_control" v-model="info.title"/>
                        </div>

                        <div class="data_tit">이미지 Upload
                            <div class="btn_area ar">
                                <div class="file_upload">
                                    <input type="file" id="input_upload_copy2" class="upload_hidden" name="file-input" @change="handleFileInput" style="display:none">
                                    <label v-if="checkUser(userId,'write')" for="input_upload_copy2" class="btn btn_sm btn_darkgray btn_addimg">이미지 첨부</label>
                                </div>
                            </div>
                        </div>
                        <div class="img_area">
                            <img v-bind:src="(fileImg.length != 0 ? fileImg[0].preview : ((info.qltyPlcyFrntFileId != '' && info.qltyPlcyFrntFileId != null)? '/sendApi/api/fileCall/getSiteInfoImgFile/' + info.qltyPlcyFrntFileId : require('@/assets/img/layout/img_blank.png')))" alt="">
                        </div>
                        <div class="data_tit">파일 Upload</div>
                        <LstFile
                            v-bind:lst-file-rst="lstFileRst"
                            v-bind:files="files"
                            v-bind:second-remove-file-id="secondRemoveFileId"
                            v-on:file-changed="fileChanged"
                            v-on:file-removed="fileRemoved"
                            :downloadable="checkUser(userId,'down')"  
                        />
                    </div> -->

                    <qualityPolicyGoal v-for="(goal,gIndex) in goalList" :key="goal.qltyPlcyGoalSeq" :goal="goal" :year="searchValue"
                        :goal-index="gIndex" :site-mstr-id="siteMstrId" :qlty-plcy-info-id="info.qltyPlcyInfoId"
                        :aprv-id="info.aprvInfoId" :user-id="userId"
                        @cancel-edit="cancelEdit" @open-multi-pop="openMultiPop"
                        @delete-goal="deleteGoal"/>

                    <div class="write_box disabled" v-if="goalList.length%2 == 0" style="opacity:0.5;">
                        상단의 품질목표추가 버튼을 클릭하세요.
                    </div>
                </div>
            </div>
            <approve
                ref-id="qltyPlcyApproveModal"
                doc-type="QLTY"
                :code-type="approve.codeType"
                :code-dtl-type="approve.codeDtlType"
                :main-code-id="approve.mainCodeId"
                :mid-code-id="approve.midCodeId"
                :request-id="approve.requestId"
                :doc-name="approve.docName"
                :doc-seq="approve.docSeq"
                :file-type="approve.fileType"
                :site-mstr-id="approve.siteMstrId"
                @callback="fn_setSourceApproval"
                alertable
            />
            <approval-view
                ref-id="QualityPolicyInfo_AprvView"
                :aprv-info-id="info.aprvInfoId"
            />
        </div>


        <div class="tab_area" v-show="currentTab == 1" v-if="userType === 'HEC' ? true : false">
            <div class="lookup_box multi_line">
                <table>
                    <colgroup>
                        <col width="6%">
                        <col width="24%">
                        <col width="6%">
                        <col width="24%">
                        <col width="5%">
                        <col width="24%">
                        <col width="*">
                    </colgroup>
                    <tbody>
                        <tr>
                        <th>프로젝트명</th>
                        <td>
                            <div class="form_area">
                                <select name="" id="" class="form_control" v-model="mngtType">
                                    <option value="">전체</option>
                                    <option v-for="(type,index) in mngtTypeList" :key="index" :value="type.codeVal">{{type.codeName}}</option>
                                </select>
                                <input type="text" class="form_control" placeholder="입력해주세요" v-model="projNm" @keyup.enter="loadSheet" :maxlength="100">
                            </div>    
                        </td>  
                        <th>프로젝트코드</th>
                        <td><input type="text" class="form_control" placeholder="입력해주세요" v-model="projId" @keyup.enter="loadSheet" :maxlength="30"></td>                                
                        <th>공사기간</th>
                        <td>
                            <date-picker-range v-model="date"/>
                        </td>
                        <td class="ar">
                            <button type="button" class="btn_reset" v-on:click="filterReset">초기화</button>
                            <button type="button" class="btn btn_sm btn_darkblue btn_radius btn_search" v-on:click="loadSheet">검색</button>
                        </td>
                        </tr>

                        <tr>
                        <th>현장명</th>
                        <td><input type="text" class="form_control" placeholder="입력해주세요" v-model="siteNm" @keyup.enter="loadSheet" :maxlength="100"></td>                 
                        <th>현장코드</th>
                        <td><input type="text" class="form_control" placeholder="입력해주세요" v-model="siteId" @keyup.enter="loadSheet" :maxlength="30"></td>                  
                        </tr>
                    </tbody>
                </table>
            </div>
            
            <div class="inner">
                <div class="button_box">
                    <button v-if="checkUser(userId,'down')" type="button" class="btn btn_sm btn_excel" v-on:click="fn_exportExcel()">엑셀 다운로드</button>
                    <button v-if="checkUser(userId,'down')" type="button" class="btn btn_md btn_outline btn_darkgray btn_print" @click="printSheet()">출력</button>
                </div>
                <!-- ibsheet -->
                <div class="ib_wrap" style="height: calc(100vh - 300px)">
                    <div id="allSitesheetTable" class="ibsheet_table" style="height: 100%"></div>
                </div>
            </div>
        </div>
        
        <div class="tab_area" v-show="(userType === 'HEC' && currentTab == 2)||(userType !== 'HEC' && currentTab == 1)">
            <div class="inner">

                <div class="button_box">
                    <div class="fr">
                        <div class="file_upload">
                            <input type="file" id="input_upload_copy3" class="upload_hidden" name="file-input" @change="handleFileInput" style="display:none" >
                            <label for="input_upload_copy3" class="btn btn_sm btn_darkgray btn_addimg" v-if="userType === 'HEC' ? true : false">등록</label>
                            <button type="button" class="btn btn_sm btn_darkgray" v-on:click="download" id="downBtn2">이미지 다운로드</button>
                        </div>
                    </div>
                </div>

                <div class="img_area">
                    <!-- <img src="../../../assets/img/layout/qualityadmin_bg2.png" alt=""> -->
                    <img v-bind:src="((admImgId != '' && admImgId != null)? '/sendApi/api/fileCall/getSiteInfoImgFile/' + admImgId : require('@/assets/img/layout/img_blank.png'))" alt="">
                </div>
            </div>
        </div>
        <MultiEmployeeSearch :pop-idx="'1'"  v-on:fn-multi-employee-choice="fnMultiEmployeeChoice"
            v-bind:insert-site-name="selectSite" v-bind:site-code="info.siteId" :site-mstr-id="siteMstrId"
            v-bind:member-list-id = "listId" v-bind:member-list-nm = "listNm" :ref-id="'qltyPlcy_MultiEmployeeSearch'"/>
        <excel-download
            v-model="excelDownload.request"
            ref-id="QualityPolicyInfo_ExcelDownload"
            :file-name="excelDownload.fileName"
            :options="excelDownload.options"
            :data="excelDownload.data"
        />
    </div>
</template>

<script>
    import LstFile from '@/pages/common/popup/LstFile.vue'
    import loader from '@ibsheet/loader'
    import DatePickerRange from '@component/common/DatePickerRange.vue'
    import API from '@/apis/'
    import { sendFileApi, requestFileOptions } from '../../../apis/common';
    import { sendPostApi, requestOptions } from '../../../apis/common';
    import MsgBoxMixins  from '@plugin/mixin/MsgBox.mixins.js'
    import qualityPolicyGoal from '@/pages/siteInfo/qualityPolicy/qualityPolicyGoal.vue'
    import Breadcrumb from '@/pages/common/frame/Breadcrumb.vue'
    import { QualityState } from '../../common/data/LocusList'
    import { ConcretePourstatus2 } from '../../common/data/MaterialsList'
    import MultiEmployeeSearch from '@/pages/common/popup/MultiEmployeeSearch.vue'
    import Approve from '@modal/approval/Approve.vue'
    import ApprovalView from '@modal/approval/ApprovalView.vue'
    import axios from 'axios'
    import authCheckMixns  from '@plugin/mixin/AuthCheck.js'
    import ExcelDownload from '@component/common/ExcelDownload.vue'

    let SHEET_ID = '';

    export default {
        name: 'QualityPolicyInfo',
        mixins: [MsgBoxMixins,authCheckMixns],
        components: {
            LstFile,
            DatePickerRange,
            qualityPolicyGoal,
            Breadcrumb,
            MultiEmployeeSearch,
            Approve,
            ApprovalView,
            ExcelDownload,
        },
        data() {
            return {
                footerBg: 'transparent',
                currentTab: 0, // 기본 current 값 지정 
                tabs: ['My site', 'All sites', 'HEC'], // tab name
                userId: '',
                userType: '',
                
                writeYn:false,
                writeChkYn: false,
                siteMstrId:'',
                selectSite:'',
                yearList:[],
                searchValue:0,
                info:{
                    qltyPlcyInfoId:'',  
                    title:'',
                    year:0,
                    qltyPlcyFrntFileId:'',
                    orgFileName:'',
                    aprvInfoId:'',
                    siteId:'',
                    siteNm:'',
                },
                goalList:[
                    {
                        qltyPlcyGoalSeq:'',
                        goal:'',
                        metrics:'',
                        crntLevel:'',
                        nextLevel:'',
                        endLevel:'',
                        achvImpt:'',
                        mntrMethod:'',
                        rst1:'',
                        rst2:'',
                        rst3:'',
                        rst4:'',
                        planList: [
                            {
                                qltyPlcyPlanSeq:'',
                                actnPlan:'',
                                prmtTerm:'',
                                mainPrsnId:'',
                                midPrsnId:'',
                                rowOrder:0,
                            }
                        ],
                        fileList:[],
                    }
                ],
                focusRow: 0,
                focusPrsn:'',
                listId:[],
                listNm:[],
                goalndex:0,
                //info 이미지
                deleteImgLst:[],//지울 아이디
                fileImg:[],//이미지 미리보기용
                insertFiles:[],//실제파일
                
                //hec 이미지
                admImg:[],
                insertAdmFiles:[],
                admImgId:'',
                orgFileName : '',

                //파일 리스트및 삭제
                lstFileRst : [],
                // lstImgRst : [],
                files : [],
                // img : [],
                // secondRemoveImgId:[],                       //이미지용 삭제 Id
                totalCnt:0,
                totalSize:0,
                bytes:"KB",
                secondRemoveFileId:[],                      //등록된 파일 데이터 아이디

                mngtTypeList:[],
                projNm: '',                                     // 프로젝트명
                projId: '',                                     // 프로젝트 코드
                siteNm: '',                                     // 현장명
                siteId: '',                                     // 현장코드
                date:[],
                mngtType:'0',
                qualityPolicySheetAll:null,
                approve: {
                    codeType: 'SITE',
                    codeDtlType: 'SITE',
                    mainCodeId: '',
                    midCodeId: '',
                    docSeq: null,
                    docName: '',
                    docNameId: null,
                    requestId: null,
                    fileType: null,
                    siteMstrId: null,
                },
                //엑셀다운로드
                excelDownload : {
                    request : false,
                    fileName :'',
                    downloadOption :'',
                    options : null,
                    data : [],
                }
            }
        },
        mounted() {
            this.userId = this.$session.get('userInfo').userId;
            this.userType = this.$session.get('userInfo').userType;
            if(this.userType !== 'HEC'){
                this.tabs= ['My site', 'HEC'];
            }
            this.siteMstrId = this.$store.getters['auth/getSiteMstrId'];
            this.selectSite = this.$store.getters['auth/getSiteNm'];
            if(this.sitrMstrId == '' || this.siteMstrId == null){
                this.alert('현장정보 ID를 불러올 수 없습니다.\n 다시로그인해주세요.',async()=>{
                    this.$router.push({name: 'Login'});
                })
                return;
            }
            
            this.writeChkYn = false;
            if(this.currentTab ==0){
                this.loadYear();
            }
            // this.loadSheet();
        },
        beforeDestroy() {
            loader.removeSheet(SHEET_ID)
        },
        watch:{
            currentTab: function(){
                if(this.currentTab == 0){
                    this.loadYear();
                }else if(this.currentTab == 1){
                    this.getMngtType();
                }else{
                    this.loadSheet();
                }
            },
            goalList:function(){
                // console.log(this.goalList);
            }
        },
        methods: {
            loadYear: async function(){//연도 selectbox 불러오기
                if(this.sitrMstrId == '' || this.siteMstrId == null){
                    this.alert('현장정보 ID를 불러올 수 없습니다.\n 다시로그인해주세요.',async()=>{
                        this.$router.push({name: 'login'});
                    })
                    return;
                }
                this.yearList = [];
                this.writeYn = false;
                let param = {
                    'siteMstrId':this.siteMstrId,
                };

                let yearRst = await API.crack.selectSiteQltyPolicyYear(param,{
                    headers:{
                        'Authorization': this.$cookies.get("Authorization")
                    }
                });
                // console.log(yearRst);
                // if(yearRst.data.rCode == '0000' && yearRst.data.datas.yearList.length == 0){
                //     this.yearList.push(new Date().getFullYear());
                //     this.writeYn = true;
                // }else if(yearRst.data.rCode == '0000' && yearRst.data.datas.yearList.indexOf(new Date().getFullYear())<0){
                //     this.yearList = yearRst.data.datas.yearList;
                //     console.log(this.yearList);
                //     this.yearList.unshift(new Date().getFullYear());
                //     this.writeYn = true;
                // }
                this.yearList = yearRst.data.datas.yearList;
                this.searchValue = this.yearList[0];
                // this.searchValue = new Date().getFullYear();
                this.loadSheet();
            },
            getMngtType: async function(){
                requestOptions.headers['Accept-Language'] = "ko";
                requestOptions.headers['Authorization'] = this.$cookies.get("Authorization");
                
                let url = '/sendApi/api/common/masterCode/list';
                let payload = {
                    groupCode: 'MNGT_TYPE' 
                };

                try {
                    const response = await sendPostApi(url, payload);
                    if (response.status === 200 && response.data) {
                        this.mngtTypeList = [];
                        let list = response.data.data;
                        for(let i =0; i<list.length;i++){
                            //kor일경우(한국어)
                            this.mngtTypeList.push(
                                {
                                    'codeVal':list[i].codeVal,
                                    'codeName':list[i].codeNameKr
                                }
                            );
                        }
                        // console.log(this.mngtTypeList);
                        this.loadSheet();
                    }
                } catch (error) {
                    // console.error(error);
                    this.alert('조회에 실패했습니다.');
                    return;
                }
            },
            loadSheet: async function(){//info 조회
                this.writeChkYn = false;
                this.fileImg = [];
                this.insertFiles = [];
                this.admImg = [];
                this.insertAdmFiles = [];
                this.admImgId = '';
                this.deleteImgLst = [];
                this.goalList = [];
                if(this.secondRemoveFileId.length>0){
                    this.secondRemoveFileId = [];
                }
                if(this.files.length>0){
                    this.files = [];
                }
                // this.lstFileRst = [];
                if(this.currentTab == 0){
                    this.goalList = [];
                    
                    let param = {
                        'siteMstrId':this.siteMstrId,
                        'year':this.searchValue,
                    };

                    let rst = await API.crack.siteQltyPolicyInfoList(param,{
                        headers:{
                            'Authorization': this.$cookies.get("Authorization")
                        }
                    });

                    // console.log(rst);
                    // if(rst.data.rCode == '0000' && !this.writeYn){
                    if(rst.data.rCode == '0000'){
                        if(rst.data.datas.dlMySite != null){
                            this.info = rst.data.datas.dlMySite;
                        }else{
                            this.info = {
                                qltyPlcyInfoId:'',  
                                title:'',
                                year:0,
                                qltyPlcyFrntFileId:'',
                                orgFileName:'',
                                aprvInfoId:'',
                                siteId:'',
                                siteNm:'',
                            };
                        }
                        // this.info = rst.data.datas.dlMySite;
                        // console.log(this.info);
                        if(rst.data.datas.goalList != null){
                            this.goalList = rst.data.datas.goalList;
                        }else{
                            this.goalList = [];
                        }
                        // this.goalList = rst.data.datas.goalList;

                        //첨부파일 가져오기
                        let url = '/sendApi/api/file/upFileList';
                        let param = {
                            fileType : "QualityPolicyInfo",
                            fileConnectId : this.info.qltyPlcyInfoId,
                        };
                        requestOptions.headers['Accept-Language'] = "ko";
                        requestOptions.headers['Authorization'] = this.$cookies.get("Authorization");
                        let fileBringRst = await sendPostApi(url, param).then((result) => {
                            return result.data;
                        }).catch((e) => {
                            // console.log(e);
                            return e.response.data;
                        });
                        this.lstFileRst = fileBringRst.data;
                        //계산식
                        this.totalCnt = 0; //파일갯수
                        this.totalSize = '0 KB';

                        if(this.lstFileRst.length>0){
                            let inputFileSize = 0;
                            for(let i = 0; i< this.lstFileRst.length;i++){
                                this.totalCnt++;
                                inputFileSize += parseInt(this.lstFileRst[i].fileSize); //총파일크기
                                this.lstFileRst[i].fileSizeView = this.formatBytes(parseInt(this.lstFileRst[i].fileSize), 2); //각각의 파일크기
                            }
                            if(inputFileSize > 0){
                                this.totalSize = this.formatBytes(inputFileSize,2);
                            }
                        }
                        this.$forceUpdate();
                    }
                }else if(this.currentTab == 1){
                    let param = {};
                    if(this.mngtType != ''){
                        param['mngtType'] = this.mngtType;
                    }
                    if(this.projNm !=''){//프로젝트명
                        param['projectNm']=this.projNm;
                    }
                    if(this.projId !=''){//프로젝트코드
                        param['projectId']=this.projId;
                    }
                    if(this.siteNm !=''){//현장명
                        param['siteNm']=this.siteNm;
                    }
                    if(this.siteId !=''){//현장코드
                        param['siteId']=this.siteId;
                    }
                    if(this.date.length>0){
                        param['csrtStartDt']=this.date[0];
                        param['csrtEndDt']=this.date[1];
                    }
                    const resData2 =  await API.crack.getsiteList(param, {
                        headers:{
                            'Authorization': this.$cookies.get("Authorization")
                        }
                    });

                    let data2 = resData2.data.datas.resultList;
                    let options2 = ConcretePourstatus2.options;

                    // if(resData2.statusText == 'OK' && data2.length >0){
                    if(resData2.status == 200 && data2.length >0){
                        options2.Events = {
                            onDblClick: this.fnSecondClick,
                            // onDataLoad: this.progressBar,
                        };
                        options2.Cols = [
                            { Name: 'SEQ', Header: [{ Value: '번호', RowSpan: 2 }], RelWidth: 4, CanEdit: 0 },
                            { Name: 'baseTypeNm', Header: [{ Value: '본부', RowSpan: 2 }], RelWidth: 10, CanEdit: 0 },
                            { Name: 'csrtTypeNm', Header: [{ Value: '공사유형', RowSpan: 2 }], RelWidth: 10, CanEdit: 0 },
                            { Name: 'projectId', Header: [{ Value: '프로젝트코드', RowSpan: 2 }], RelWidth: 10, CanEdit: 0 },
                            { Name: 'projectNm', Header: [{ Value: '프로젝트명', RowSpan: 2 }], RelWidth: 15, CanEdit: 0 },
                            { Name: 'siteId', Header: [{ Value: '현장코드', RowSpan: 2 }], RelWidth: 10, CanEdit: 0 },
                            { Name: 'siteNm', Header: [{ Value: '현장명', RowSpan: 2 }], RelWidth: 15, CanEdit: 0 },
                            { Name: 'csrtStartDt', Header: [{ Value: '공사기간', Span: 2 }, { Value: '시작' }], RelWidth: 10, CanEdit: 0 },
                            { Name: 'csrtEndDt', Header: [{}, { Value: '종료' }], RelWidth: 10, CanEdit: 0 },
                            { Name: 'csrtMngrNm', Header: [{ Value: '현장소장', RowSpan: 2 }], RelWidth: 10, CanEdit: 0 },
                        ];
                        options2.Cfg = {
                            NoDataMessage:3,
                            NoVScroll: false,
                        };
                    }else{
                        data2 = [];
                    }

                    loader.createSheet({
                        el: 'allSitesheetTable',
                        // id:'inspListSheet2',
                        data: data2,
                        options: options2
                    }).then((sheet) => {
                        this.qualityPolicySheetAll = sheet;
                    });
                }else if(this.currentTab == 2){
                    //첨부파일 가져오기
                    let url = '/sendApi/api/file/upFileList';
                    let param = {
                        fileType : "QualityPolicyAdm",
                        fileConnectId : 'QualityPolicyAdm',
                    };
                    requestOptions.headers['Accept-Language'] = "ko";
                    requestOptions.headers['Authorization'] = this.$cookies.get("Authorization");
                    let admRst = await sendPostApi(url, param).then((result) => {
                        return result.data;
                    }).catch((e) => {
                        // console.log(e);
                        return e.response.data;
                    });
                    if(admRst.data.length>0){
                        let index = 0;
                        index = admRst.data.length-1;
                        this.admImgId = admRst.data[index].fileComArcvId;
                        this.orgFileName = admRst.data[index].orgFileName;
                        // console.log(admRst.data)
                    }
                }
            },
            addGoal: function(){//목표추가
                // if(this.info.aprvInfoId != '' && this.info.aprvInfoId != null){
                //     return;
                // }
                let yn = false;
                for(let i = 0; i<this.goalList.length; i++){
                    if(this.goalList[i].qltyPlcyGoalSeq == 0 || this.goalList[i].qltyPlcyGoalSeq == '' || this.goalList[i].qltyPlcyGoalSeq == null){
                        yn = true;
                    }
                }
                if(yn){
                    this.alert(`작성중인 글이 있습니다.\n 저장 후 다시 시도해 주시기 바랍니다.`);
                    return;
                }else{
                    this.goalList.push({
                        qltyPlcyGoalSeq:'',
                        goal:'',
                        metrics:'',
                        crntLevel:'',
                        nextLevel:'',
                        endLevel:'',
                        achvImpt:'',
                        mntrMethod:'',
                        rst1:'',
                        rst2:'',
                        rst3:'',
                        rst4:'',
                        editYn: false,
                        writeYn: true,
                        planList: [],
                    });
                    this.alert(`품질목표 추가되었습니다.`);
                    return;
                }
            },
            cancelEdit:async function(obj){//목표쪽에서 취소했을때
                if(obj.seq == '' || obj.seq == null){
                    this.goalList.splice(obj.idx,1);
                    this.$forceUpdate();
                }else{
                    this.goalList[obj.idx] = obj.detail;
                    this.$forceUpdate();
                    // console.log(obj.detail,this.goalList[obj.idx]);
                    // let param = {
                    //     'siteMstrId':this.siteMstrId,
                    //     'qltyPlcyInfoId':this.info.qltyPlcyInfoId,
                    //     'qltyPlcyGoalSeq':obj.seq,
                    // };

                    // let goalRst = await API.crack.selectSingleGoalList(param,{
                    //     headers:{
                    //         'Authorization': this.$cookies.get("Authorization")
                    //     }
                    // });

                    // if(goalRst.data.rCode == '0000'){
                    //     console.log(goalRst.data.datas.goalList);
                    //     this.goalList[obj.idx] = goalRst.data.datas.goalList[0];
                    //     console.log(this.goalList);
                    // }
                }
            },
            deleteGoal(idx){
                // console.log(idx);
                // console.log(this.goalList[idx]);
                this.alert('삭제되었습니다.',this.goalList.splice(idx,1));
                // console.log(this.goalList);
                return;
            },
            openMultiPop: function(prsn){//목표에서 사원검색시
                // console.log(prsn);
                this.focusRow = prsn.focusRow;
                this.focusPrsn = prsn.focusPrsn;
                if(typeof(prsn.listId)== 'string'){
                    this.listId = prsn.listId.split(',');
                }else if(typeof(prsn.listId)== 'number'){
                    this.listId = [];
                    this.listId.push(prsn.listId.toString());
                }else if(typeof(prsn.listId)== 'undefined'||prsn.listId == null || prsn.listId == ''){
                    this.listId = [];
                }else{
                    this.listId = prsn.listId;
                }
                if(typeof(prsn.listNm)== 'string'){
                    this.listNm = prsn.listId.split(',');
                }else if(typeof(prsn.listNm)== 'number'){
                    this.listNm = [];
                    this.listNm.push(prsn.listNm.toString());
                }else if(typeof(prsn.listNm)== 'undefined'||prsn.listNm == null || prsn.listNm == ''){
                    this.listNm = [];
                }else{
                    this.listNm = prsn.listNm;
                }
                // this.listId = prsn.listId;
                // this.listNm = prsn.listNm;
                this.goalIndex = prsn.goalIndex;
                this.$root.$emit('bv::show::modal', 'qltyPlcy_MultiEmployeeSearch');
            },
            fnMultiEmployeeChoice : function(infoEmployee){//사원검색팝업에서 선택후
                let dtlSheet = this.goalList[this.goalIndex]['sheet'];
                let row = dtlSheet.getRowByIndex(this.focusRow+1);
                let data = this.goalList[this.goalIndex].planList[this.focusRow];
                // console.log(infoEmployee);
                if(this.focusPrsn == 'showMainPrsnNm'){
                    data['mainPrsnId'] = infoEmployee.userIds;
                    data['mainPrsnNm'] = infoEmployee.userNames;
                    data['showMainPrsnNm'] = '<div class="srch_user"> <span>'+infoEmployee.userNames+'</span> <button type="button" class="btn_search">검색</button> </div>';
                    dtlSheet.setValue(row,'mainPrsnNm',data['mainPrsnNm']);
                    dtlSheet.setValue(row,'mainPrsnId',data['mainPrsnId']);
                    dtlSheet.setValue(row,'showMainPrsnNm',data['showMainPrsnNm']);
                }else if(this.focusPrsn == 'showMidPrsnNm'){
                    data['midPrsnId'] = infoEmployee.userIds;
                    data['midPrsnNm'] = infoEmployee.userNames;
                    data['showMidPrsnNm'] = '<div class="srch_user"> <span>'+infoEmployee.userNames+'</span> <button type="button" class="btn_search">검색</button> </div>';
                    dtlSheet.setValue(row,'midPrsnId',data['midPrsnId']);
                    dtlSheet.setValue(row,'midPrsnNm',data['midPrsnNm']);
                    dtlSheet.setValue(row,'showMidPrsnNm',data['showMidPrsnNm']);
                }
                this.$forceUpdate();
                // dtlSheet.refreshCell(row,this.focusPrsn);
                // this.detail[this.focusRow]
                
                // if(this.focusPrsn == 'showMainPrsnNm'){
                //     this.detail.planList[this.focusRow].mainPrsnId = infoEmployee.userIds;
                //     this.detail.planList[this.focusRow].mainPrsnNm = infoEmployee.userNames;
                //     this.detail.planList[this.focusRow].viewPrsnNm = '<div class="srch_user"> <span>'+infoEmployee.userNames+'</span> <button type="button" class="btn_search">검색</button> </div>';
                // }else if(this.focusPrsn == 'showMidPrsnNm'){
                //     this.detail.planList[this.focusRow].mainPrsnId = infoEmployee.userIds;
                //     this.detail.planList[this.focusRow].mainPrsnNm = infoEmployee.userNames;
                //     this.detail.planList[this.focusRow].viewPrsnNm = '<div class="srch_user"> <span>'+infoEmployee.userNames+'</span> <button type="button" class="btn_search">검색</button> </div>';
                // }
                // this.detail[this.focusRow]
            },
            cancelBtn: function(){
                this.confirm('취소하시겠습니까?', this.cancelWriteInfo);
            },
            cancelWriteInfo: async function(){//info 작성 취소
                this.fileImg = [];
                this.insertFiles = [];
                this.admImg = [];
                this.insertAdmFiles = [];
                this.deleteImgLst = [];
                this.admImgId = '';
                this.secondRemoveFileId = [];
                this.files = [];
                this.lstFileRst = [];
                let param = {
                    'siteMstrId':this.siteMstrId,
                    'year':this.searchValue,
                };

                let rst = await API.crack.selectSingleInfoList(param,{
                    headers:{
                        'Authorization': this.$cookies.get("Authorization")
                    }
                });

                // console.log(rst);
                if(rst.data.rCode == '0000'){
                    this.info = rst.data.datas.dlMySite;
                    this.writeChkYn = false;
                    // console.log(this.info.title);
                    let url = '/sendApi/api/file/upFileList';
                    let param = {
                        fileType : "QualityPolicyInfo",
                        fileConnectId : this.info.qltyPlcyInfoId,
                    };
                    requestOptions.headers['Accept-Language'] = "ko";
                    requestOptions.headers['Authorization'] = this.$cookies.get("Authorization");
                    let fileBringRst = await sendPostApi(url, param).then((result) => {
                        return result.data;
                    }).catch((e) => {
                        // console.log(e);
                        return e.response.data;
                    });
                    this.lstFileRst = fileBringRst.data;
                    //계산식
                    this.totalCnt = 0; //파일갯수
                    this.totalSize = '0 KB';

                    if(this.lstFileRst.length>0){
                        let inputFileSize = 0;
                        for(let i = 0; i< this.lstFileRst.length;i++){
                            this.totalCnt++;
                            inputFileSize += parseInt(this.lstFileRst[i].fileSize); //총파일크기
                            this.lstFileRst[i].fileSizeView = this.formatBytes(parseInt(this.lstFileRst[i].fileSize), 2); //각각의 파일크기
                        }
                        if(inputFileSize > 0){
                            this.totalSize = this.formatBytes(inputFileSize,2);
                        }
                    }
                }
            },
            updateInfo: async function(){
                this.confirm("저장하시겠습니까?",async() =>{
                    let fileConnectId = this.info.qltyPlcyInfoId;

                    //파일 삭제먼저
                    let url = '/sendApi/api/file/fileUnUse';
                    let arr = this.secondRemoveFileId;
                    if(this.deleteImgLst.length>0){
                        arr = this.secondRemoveFileId.concat(this.deleteImgLst);
                        // console.log(arr);
                    }
                    if(arr.length>0){
                        let delParam = {
                            fileType : " ",//빈란으로 넣어서 이미지, 파일 둘다 삭제
                            fileComArcvIds : arr
                        };
                        const delFileData = await sendPostApi(url, delParam).then((result) => {
                            return result.data;
                        }).catch((e) => {
                            // console.log(e);
                            return e.response.data;
                        });
                        // console.log(delFileData);
                    }

                    //이미지 등록
                    if(this.fileImg != [] > 0){
                        requestOptions.headers['Accept-Language'] = "ko";
                        requestFileOptions.headers['Authorization'] = this.$cookies.get("Authorization");
                        const insertImgData = await sendFileApi(fileConnectId, "QualityPolicyInfoImg", this.insertFiles).then((result) => {
                            return result.data;
                        }).catch((e) => {
                            // console.log(e.response.data);
                            //return e.response.data;
                        });
                        // console.log(insertImgData);
                        this.info.qltyPlcyFrntFileId = insertImgData.data;
                    }

                    //파일 등록
                    if(this.files != '' && typeof(this.files) != 'undefined'){
                        requestFileOptions.headers['Accept-Language'] = "ko";
                        requestFileOptions.headers['Authorization'] = this.$cookies.get("Authorization");
                        try{
                            let fileSaveRst = await sendFileApi(fileConnectId, "QualityPolicyInfo", this.files).then((result) => {
                                return result.data;
                            }).catch((e) => {
                                // console.log(e.response.data);
                                return e.response.data;
                            });
                            let fileRst = fileSaveRst.data; //저장된 데이터개수 받아오기
                            if(fileRst == ''){
                                this.alert('저장에 실패했습니다.');
                                return;
                            }
                        }catch(error){
                            // console.log(error);
                            this.alert('저장에 실패했습니다.');
                            return;
                        }
                    }

                    //info수정
                    let param = this.info;
                    param['siteMstrId'] = this.siteMstrId;
                    let updateRst = await API.crack.siteQltyPolicyInfoUpdate(param);
                    // console.log(updateRst);
                    if(updateRst.data.datas.rst>0){
                        this.info.year = updateRst.data.datas.year;
                        this.searchValue = updateRst.data.datas.year;
                        this.info.qltyPlcyInfoId = updateRst.data.datas.id;

                        this.alert('저장되었습니다.',this.cancelWriteInfo());
                    }
                });
            },
            getSign:function(){
                // if(this.info.aprvInfoId != '' && this.info.aprvInfoId != null){
                //     return;
                // }
                // this.approve.mainCodeId     = this.mainCodeId;
                // this.approve.midCodeId      = this.midCodeId;
                // this.approve.docSeq         = this.inptDoc;
                this.approve.siteMstrId     = this.siteMstrId ? this.siteMstrId : null;

                this.approve.requestId      = this.info.qltyPlcyInfoId;
                this.approve.fileType       = 'QualityPolicyInfo';
                this.approve.docName        = '현장품질방침';

                this.$bvModal.show('qltyPlcyApproveModal');
            },
            fn_setSourceApproval: function (payload) {
                // console.log(payload)

                const url = '/sendApi/api/siteInfo/qltyPolicy/info/sign';
                const _payload = {
                    ...payload,
                    // inptDoc: this.inptDoc,
                    // ...payload.data.datas.dmApprvDoc,
                    'siteMstrId':this.siteMstrId,
                    // 'copyInptSeq':this.copyInptSeq,
                    'qltyPlcyInfoId':this.info.qltyPlcyInfoId,
                    // 'qprvInfoId':payload.aprvInfoId,
                }
                const options = {
                    headers: {
                        'Authorization': this.$cookies.get('Authorization'),
                        'Content-Type': 'application/json',
                        'Accept-Language': 'ko'
                    }
                }

                axios.post(url, _payload, options)
                .then(res => {
                    // console.log(res)
                                        
                    // this.detailObj = [];
                    this.alert('결재상신 되었습니다.',this.loadYear);
                    return;
                })
                .catch(error => {
                    // console.error(error)
                    
                    this.saveYn = false;
                    // this.detailObj = [];
                    this.alert('결재상신에 실패했습니다.');
                    return;
                })
            },
            handleFileInput(e) { // 버튼 클릭시 리스트에 파일 추가
                e.preventDefault();
                let files = e.target.files;
                files = e.target.files;
                // console.log(files);
                
                if(!files) return;

                var ext = files[0].name;
                
                if(this.currentTab == 0){
                    //이미지파일일경우
                    if(ext.indexOf(".jpg")>0 || ext.indexOf(".png")>0 || ext.indexOf(".gif")>0 || ext.indexOf(".jpeg")>0||ext.indexOf(".JPG")>0 || ext.indexOf(".PNG")>0 || ext.indexOf(".GIF")>0 || ext.indexOf(".JPEG")>0){
                        this.fileImg = [];//미리보기용
                        this.insertFiles = [];//실제 데이터 대입용
                        var fileInfo = 
                            {file: files[0],
                            preview: URL.createObjectURL(files[0]),
                            filename: files[0].name};
                        this.fileImg.push(fileInfo);
                        this.deleteImgLst.push(this.info.qltyPlcyFrntFileId);
                        ([...files]).forEach(f => {
                            if(this.fileCheck(f, this.insertFiles)) this.insertFiles.push(f);
                        });
                        // console.log(this.fileImg[0].file);
                        // console.log(this.fileImg);
                        // this.fileSizeRefresh();
                    }else{
                        this.alert('이미지파일을 선택해주세요.');
                        return;
                    }
                }else if(this.currentTab == 2){
                    //이미지파일일경우
                    if(ext.indexOf(".jpg")>0 || ext.indexOf(".png")>0 || ext.indexOf(".gif")>0 || ext.indexOf(".jpeg")>0||ext.indexOf(".JPG")>0 || ext.indexOf(".PNG")>0 || ext.indexOf(".GIF")>0 || ext.indexOf(".JPEG")>0){
                        this.admImg = [];//미리보기용
                        this.insertAdmFiles = [];//실제 데이터 대입용
                        this.admImgId = '';
                        var fileInfo = 
                            {file: files[0],
                            preview: URL.createObjectURL(files[0]),
                            filename: files[0].name};
                        this.admImg.push(fileInfo);
                        // this.deleteImgLst.push(this.info.qltyPlcyFrntFileId);
                        ([...files]).forEach(f => {
                            if(this.fileCheck(f, this.insertAdmFiles)) this.insertAdmFiles.push(f);
                        });
                        // console.log(this.admImg[0].file);
                        // console.log(this.admImg);
                        // this.fileSizeRefresh();
                        this.insertImg();
                    }else{
                        this.alert('이미지파일을 선택해주세요.');
                        return;
                    }
                }
            },
            insertImg: async function(){
                let fileConnectId = 'QualityPolicyAdm';
                if(this.admImg != [] > 0){
                    requestOptions.headers['Accept-Language'] = "ko";
                    requestFileOptions.headers['Authorization'] = this.$cookies.get("Authorization");
                    const AdmImgData = await sendFileApi(fileConnectId, "QualityPolicyAdm", this.insertAdmFiles).then((result) => {
                        return result.data;
                    }).catch((e) => {
                        // console.log(e.response.data);
                        //return e.response.data;
                    });
                    // console.log(AdmImgData);
                    this.admImgId = AdmImgData.data;
                }
            },
            fileCheck(fileInput, fileData) {
                var result = true;
                
                if(fileData.length == 0) return true;
                fileData.forEach(data => {
                    if(fileInput.name == data.name && fileInput.size == data.size && fileInput.lastModified == data.lastModified) {
                        result = false;
                    }
                });
                return result;
            },
            imageUrl: function (fileInfo) {
                const defaultUrl = '/sendApi/api/fileCall/getSiteInfoImgFile/${fileInfo.fileComArcvId}'
                let addedUrl = `/getSiteInfoImgFile/${fileInfo.fileComArcvId}`

                return defaultUrl + addedUrl
            },
            download: function(){
                let btn = document.createElement('a');
                // let btn2 = document.createElement('a');
                let id = '';
                if(this.currentTab == 0 && this.info.qltyPlcyFrntFileId != ''){
                    // console.log('here');
                    id = this.info.qltyPlcyFrntFileId;
                    btn.setAttribute('href','/sendApi/api/fileCall/getSiteInfoImgFile/' + id);
                    btn.setAttribute('download',this.info.orgFileName);
                    btn.click();
                }else if((this.currentTab == 2 || (this.userType == 'PTNR' && this.currentTab == 1)) && this.admImgId != ''){
                    id = this.admImgId;
                    //console.log(this.orgFileName);
                    btn.setAttribute('href','/sendApi/api/fileCall/getSiteInfoImgFile/'+id);
                    btn.setAttribute('download',this.orgFileName);
                    btn.click();
                   // console.log(btn2);
                }
            },
            orgFileDown: function(index){//데이터 등록된 파일
                if(!this.checkUser(this.userId,'down')){
                    return;
                }
                let fileName = this.lstFileRst[index].orgFileName;
                let fileCode = this.lstFileRst[index].fileComArcvId;
                    
                // console.log(fileCode);
                
                let element = document.createElement('a');
                element.setAttribute('href','/sendApi/api/fileCall/getSiteInfoImgFile/'+fileCode);
                element.setAttribute('download',fileName);
                element.click();
                element.remove();
            },
            fileChanged(payload) {//
                this.files = payload
                // console.log("this.files");
                // console.log(this.files);
            },
            fileRemoved(id) {//
                this.secondRemoveFileId = id
                // console.log("fileRemoved"+this.secondRemoveFileId);
            },
            formatBytes(bytes, decimals = 0) {//바이트 계산
                if (bytes === 0) return '0 MB';
                const k = 1024;
                const dm = decimals < 0 ? 0 : decimals;
                const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
                const i = Math.floor(Math.log(bytes) / Math.log(k));
                return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
            },
            fnSecondClick: function(evt){
                // console.log(evt.row.Kind);
                if(evt.row.Kind != 'Data'){
                    return;
                }
                let focusSiteMstrId = evt.row.siteMstrId;
                this.$store.dispatch('setInformation', {
                    siteMstrId: focusSiteMstrId,
                    // allSiteYn: 'Y',
                    hasYearList: true,
                })
                let blankTemp = this.$router.resolve({
                    name : 'QualityPolicyAllSite',
                });
                window.open(blankTemp.href,'_blank');
            },
            filterReset: function(){
                this.projNm= '';
                this.projId= '';
                this.siteNm= '';
                this.siteId= '';  
                this.date=[];
                this.mngtType='0';
            },
            reportView: function(){
                if(this.yearList.length==0){
                    return;
                }
                // console.log('report');
            },
            viewAprv:function(){
                // console.log(this.info.aprvInfoId);
                this.$root.$emit('bv::show::modal', 'QualityPolicyInfo_AprvView');
            },
            /** 엑셀 다운로드 */
            fn_exportExcel: function () {
                let sheet = this.qualityPolicySheetAll;
                this.excelDownload.options   = {
                    Cfg: sheet.options.Cfg,
                    Cols : sheet.options.Cols
                }
                this.excelDownload.fileName  = `현장품질방침_${this.$moment().format('YYYYMMDD')}.xlsx`
                this.excelDownload.data = sheet.getDataRows();
                this.excelDownload.request  = true
                // this.qualityPolicySheetAll.down2Excel({
                //     merge:      1,                  // 머지된 내용 그대로 출력할 것인지
                //     downCols:   'Visible',          // 'Visible' : 화면상 보이는 Column 그외엔 문자열 join 형태(mainCodeId|midCodeId|...)
                //     reqHeader:  {
                //                     'Authorization': this.$cookies.get('Authorization'),
                //                     'Accept-Language': 'ko'
                //                 },
                //     fileName:   `현장품질방침_${this.$moment().format('YYYYMMDD')}.xlsx`,  // file명 : 현재화면 페이지 _현재 날짜
                // })
            },
            printSheet:function(){
                this.qualityPolicySheetAll.doPrint();
            }
        }
    }
</script>