<template>
    <div class="tab_contents">
        <Breadcrumb :currentPath="$route.fullPath" style="position: absolute;right:0;" />
        
        <div class="tab_area desc submenu_on" v-show="currentTab == 0">
            <div class="left_content">
                <div class="guide_menu">
                    <ul>
                        <li v-for="(data, idx) in qualityPlanData" :key="idx" @click="depthIdx = idx">
                            <a v-if="idx == 0 || idx == 1 || idx == 2" href="javascript:void(0);" @click="menuHandler(data, idx, $event), depthIdx2 = ' '" :class="{ on:depthIdx == idx }">{{ data.mainTitle }}</a>
                            <a v-if="idx != 0 && idx != 1 && idx != 2" href="javascript:void(0);">{{ data.mainTitle }}</a>
                            <ul class="guide_detail" v-if="data.contents.length > 1">
                                <li v-for="(item, mIdx) in data.contents" :key="mIdx" @click="depthIdx2 = item" :class="{ active:depthIdx2 == item }">
                                    <a href="javascript:void(0);" @click="subMenuHandler(item, idx, mIdx, $event)">{{ item.subTitle }}</a>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="right_content">
                <!-- <div class="inner type2"> -->
                <div class="inner">
                    <div class="guide_case">
                        <h3>요구사항</h3>
                        <ul class="lst_menu">
                            <li v-for="(data, i) in selectedData.keyword" :key="i">{{ data }}</li>
                        </ul>
                        
                        <h3>건설공사 품질관리 업무지침</h3>
                        <div class="table_normal_list">
                            <table>
                                <caption class="sr_only">제목</caption>
                                <colgroup>
                                    <col width="40%">
                                    <col width="*">
                                </colgroup>
                                <thead>
                                    <tr>
                                        <th>확인기준</th>
                                        <th>확인 요령</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(item, idx) in selectedData.standard" :key="idx">
                                        <td>
                                            {{ item.title }}
                                        </td>
                                        <td>
                                            <ul>
                                                <li>
                                                    <p  v-for="(lst, idx) in item.tips" :key="idx">{{ lst }}</p>
                                                </li>
                                            </ul>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <h3>관련문서 Upload</h3>
                        <div class="button_box mt0">본사에서 등록한 파일을 다운로드 후 작성하여 등록해주세요.</div>
                        <div class="fr">
                            <button v-if="checkUser(userId,'write')" type="button" class="btn btn_sm btn_darkgray" @click="insertBtn">추가</button>
                            <button v-if="checkUser(userId,'unuse')" type="button" class="btn btn_sm btn_darkgray" @click="fnDelete">삭제</button>
                        </div>
                        <br/>
                        <div class="ib_wrap">
                            <div id="quliatyMngt_sheetTable_mysite" class="ibsheet_table"></div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- 관련문서 추가 팝업 -->
            <b-modal id="RelatedDocumentAdm" static :title="popTitle" hide-backdrop size="lg" :footer-bg-variant="footerBg" @shown="firstOpen()">
                <template #default>
                    <div class="pop_container" v-if="editYn">
                        <div class="table_normal_list">
                            <table>
                                <caption class="sr_only">제목</caption>
                                    <colgroup>
                                        <col width="175">
                                        <col width="*">
                                    </colgroup>
                                <tbody>
                                    <tr>
                                        <th><span class="emp_red">문서 타입</span></th>
                                        <td>
                                            <label class="input_radio" for="rdoSolar1">
                                                <input type="radio" id="rdoSolar1" name="" v-model="selectedFileYn" value="Y" checked>
                                                <span class="label_text">필수 문서</span>
                                            </label>
                                            <label class="input_radio" for="rdoSolar2">
                                                <input type="radio" id="rdoSolar2" name="" v-model="selectedFileYn" value="N">
                                                <span class="label_text">메뉴 링크</span>
                                            </label>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th><span class="emp_red">문서 제목</span></th>
                                        <td>
                                            <input type="text" class="form_control" v-model="selectedTitle" :maxlength="20">
                                        </td>
                                    </tr>
                                    
                                    <tr v-if="selectedFileYn === 'Y'">
                                        <th>문서 파일</th>
                                        <td>
                                            <!-- <div class="lst_file">
                                                <h3>첨부파일 2개 (6.2MB)</h3>
                                                <ul>
                                                    <li><a href="javascript:void(0);"><i class="ico_file file_p_red">인증서.pdf (3.1MB)</i><button type="button" class="delete"></button></a></li>
                                                    <li><a href="javascript:void(0);"><i class="ico_file file_p_red">사업자등록증.pdf (3.1MB)</i><button type="button" class="delete"></button></a></li>
                                                </ul>
                                            </div> -->
                                            <LstFile
                                                v-bind:lst-file-rst="lstFileRst"
                                                v-bind:files="files"
                                                v-bind:second-remove-file-id="secondRemoveFileId"
                                                v-on:file-changed="fileChanged"
                                                v-on:file-removed="fileRemoved"
                                            />
                                        </td>
                                    </tr>

                                    <tr v-if="selectedFileYn === 'N'">
                                        <th><span class="emp_red">메뉴 선택</span></th>
                                        <td>
                                            <select name="" id="" class="form_control d-inline-block w-25" v-model="selectedMain" @change="openPop(selectedMain,1)">
                                                <option value="">전체</option>
                                                <option v-for="(main,mIndex) in mainMenu" :key="mIndex" :value="main.menuMngtId">{{main.menuNmKr}}</option>
                                            </select>
                                            <select name="" id="" class="form_control d-inline-block w-25 ml20" :disabled="midMenu.length==0" v-model="selectedMid" @change="openPop(selectedMid,2)">
                                                <option value="">전체</option>
                                                <option v-for="(mid,miIndex) in midMenu" :key="miIndex" :value="mid.menuMngtId">{{mid.menuNmKr}}</option>
                                            </select>
                                            <select v-if="subMenu.length>0" name="" id="" class="form_control d-inline-block w-25 ml20" v-model="selectedSub" @change="selectedId=selectedSub">
                                                <option value="">전체</option>
                                                <option v-for="(sub,sIndex) in subMenu" :key="sIndex" :value="sub.menuMngtId">{{sub.menuNmKr}}</option>
                                            </select>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div class="pop_container" v-if="!editYn">
                        <div class="table_normal_list">
                            <table>
                                <caption class="sr_only">제목</caption>
                                    <colgroup>
                                        <col width="175">
                                        <col width="*">
                                    </colgroup>
                                <tbody>
                                    <tr>
                                        <th><span class="emp_red">문서 제목</span></th>
                                        <td>
                                            {{selectedTitle}}
                                        </td>
                                    </tr>
                                    <tr>
                                        <th><span class="emp_red">문서 파일 / 링크 </span></th>
                                        <td v-if="selectedFileYn == 'Y'">
                                            <div class="lst_file">
                                                <!-- <p class="disabled">첨부파일이 없습니다</p> -->
                                                <h3>첨부파일 {{totalCnt}}개 ({{totalSize}})</h3>
                                                <ul>
                                                    <li v-for="(mngrFileRst, index) in lstFileRst" v-bind:key="index" class="old">
                                                        <a href="javascript:void(0); " v-on:click="orgFileDown(index)"><i class="ico_file" :class="fn_getFileIcons(mngrFileRst.orgFileName)">{{mngrFileRst.orgFileName}} ({{mngrFileRst.fileSize}})</i></a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </td>
                                        <td v-if="selectedFileYn == 'N'">
                                            {{selectedPath}}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </template>
                <template #modal-footer="{ }">
                    <b-button v-if="editYn" class="btn btn_md btn_outline btn_darkgray" @click="beforeInsert()">저장</b-button>
                    <b-button v-if="!writeYn&&editYn" class="btn btn_md btn_outline btn_darkgray" @click="updateCancel">취소</b-button>
                    <b-button v-if="!writeYn&&!editYn" class="btn btn_md btn_outline btn_darkgray" @click="editYn=true">수정</b-button>
                    <b-button v-if="writeYn==editYn" class="btn btn_md btn_outline btn_darkgray" @click="cancelBtn()">닫기</b-button>
                </template>
            </b-modal>
        </div>
        <div class="tab_area" v-show="currentTab == 1">
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
                                <input type="text" class="form_control" placeholder="입력해주세요" v-model="projNm" @keyup.enter="loadSheet">
                            </div>    
                        </td>  
                        <th>프로젝트코드</th>
                        <td><input type="text" class="form_control" placeholder="입력해주세요" v-model="projId" @keyup.enter="loadSheet"></td>                                
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
                        <td><input type="text" class="form_control" placeholder="입력해주세요" v-model="siteNm" @keyup.enter="loadSheet"></td>                 
                        <th>현장코드</th>
                        <td><input type="text" class="form_control" placeholder="입력해주세요" v-model="searchSiteId" @keyup.enter="loadSheet"></td>                  
                        </tr>
                    </tbody>
                </table>
            </div>
            
            <div class="inner">
                <!-- ibsheet -->
                <div class="ib_wrap">
                    <div id="quliatyMngt_sheetTable_allsite" class="ibsheet_table"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import LstFile from '@/pages/common/popup/LstFile.vue'
    import DatePickerRange from '@component/common/DatePickerRange.vue'
    import { QualityState, SystemAdmin } from '../../common/data/LocusList'
    import { qualityPlanData } from '@/pages/common/data/QualityPlanData'
    import { ConcretePourstatus2 } from '../../common/data/MaterialsList'
    import loader from '@ibsheet/loader'
    import Breadcrumb from '@/pages/common/frame/Breadcrumb.vue'
    import MsgBoxMixins  from '@plugin/mixin/MsgBox.mixins.js'
    import commonUtilMixins from '@plugin/mixin/CommonUtil.js'
    import API from '@/apis/'
    import { sendFileApi, requestFileOptions } from '../../../apis/common';
    import { sendPostApi, requestOptions } from '../../../apis/common';
    import authCheckMixns  from '@plugin/mixin/AuthCheck.js'



    let sheetId = '';

    export default {
        name: 'QualityMngtAdm',
        mixins: [MsgBoxMixins,authCheckMixns, commonUtilMixins],
        components: {
            DatePickerRange,
            Breadcrumb,
            LstFile,
        },
        props : {

        },
        data() {
            return {
                subTitle: '품질시스템 관리',
                footerBg: 'transparent',
                currentTab: 0, // 기본 current 값 지정 
                tabs: ['My Site', 'All Sites'], // tab name
                depthIdx :0,
                depthIdx2 :'',
                
                qualityPlanData: qualityPlanData,
                selectedData: {
                  keyword: [],
                  standard: [],
                  tips: [],
                  files: [],
                },

                siteMstrId:'',

                //mySite
                siteId:'',
                siteName:'',
                projectId:'',
                projectName:'',
                qualityMngtSheetMy:null,
                
                docList: [
                    {
                        frstStep:4,//
                        scndStep:3,//
                        rowSeq:1,//
                        fileYn:'',
                        title:'',
                        scrinUrl:'',
                        menuMngtId:'',
                        menuPath:'',
                        admFile:[],
                        siteFile:[],
                    }
                ],
                frstStep:4,//
                scndStep:3,//
                rowSeq:1,//
                fileYn:'',
                title:'',
                scrinUrl:'',
                menuMngtId:'',
                menuPath:'',

                //popup
                popTitle:'',
                focusSeq:'',
                mainMenu:[],
                midMenu: [],
                subMenu:[],
                selectedMain:'',
                selectedMid:'',
                selectedSub:'',
                selectedId:'',
                selectedTitle:'',
                selectedFileYn:'',
                selectedPath:'',
                editYn:false, // 편집 가능 여부
                writeYn:false,
                qltyMngtIds:[],
                detailObj:{},
                
                //file
                lstFileRst : [],
                files : [],
                totalCnt:0,
                totalSize:0,
                bytes:"KB",
                secondRemoveFileId:[],                      //등록된 파일 데이터 아이디

                //allsite
                mngtTypeList:[],
                projNm: '',                                     // 프로젝트명
                projId: '',                                     // 프로젝트 코드
                siteNm: '',                                     // 현장명
                searchSiteId: '',                                     // 현장코드
                date:[],
                mngtType:'',
                qualityMngtSheetAll:null,
                
                userId: '',
            }
        },

        beforeDestroy() {
            loader.removeSheet(sheetId)

            window.removeEventListener('resize', this.calcHeight);
            window.removeEventListener('scroll', this.calcHeight);
        },
        deactivated() {
            window.removeEventListener('resize', this.calcHeight);
            window.removeEventListener('scroll', this.calcHeight);
        },

        mounted() {
            let idx = 0;
            let items = this.qualityPlanData[0];

            this.userId = this.$store.getters['auth/getUserId'];

            // this.menuHandler(items, 0);
            this.frstStep = idx+1;
            this.scndStep = 0;
            this.selectedData.keyword = items.contents[0].keyword;
            this.selectedData.standard = items.contents[0].standard;
            this.selectedData.files = items.contents[0].files;
            this.loadFileList();


            // this.siteMstrId = this.$cookies.get("siteMstrId");
            // if(this.sitrMstrId == '' || this.siteMstrId == null){
            //     this.alert('현장정보 ID를 불러올 수 없습니다.\n 다시로그인해주세요.',async()=>{
            //         this.$router.push({name: 'Login'});
            //     })
            //     return;
            // }
            this.loadSheet();

            this.calcHeight();
            window.addEventListener('resize', this.calcHeight);
            window.addEventListener('scroll', this.calcHeight);
            
        },
        created() {
            
        },
        watch:{
            currentTab: function(){
                this.loadSheet();
            },
        },
        methods: {
            loadSheet: async function(){
                if(this.currentTab == 0){
                    this.loadFileList();
                }
            },
            loadFileList: async function(){

                let listParam = {
                    'frstStep':this.frstStep,
                    'scndStep':this.scndStep,
                    // 'rowSeq':this.rowSeq,
                    'siteMstrId':'',
                };

                let listRst = await API.crack.selectSiteQltyMngtList(listParam,{
                    headers:{
                        'Authorization': this.$cookies.get("Authorization")
                    }
                });
                // console.log("listRst",listRst);
                let data = [];
                let options = SystemAdmin.options;

                if(listRst.status == 200 && listRst.data.datas.rstList.length >0){
                    data = listRst.data.datas.rstList;
                    // this.docList = listRst.data.datas.rstList;
                    for(let idx = 0; idx<data.length; idx++){
                        let temp = '';
                        if(data[idx].fileYn == 'Y'){
                            for(let y = 0; y<data[idx]['admFile'].length;y++){
                                temp += data[idx]['admFile'][y].orgFileName;
                                if(y != data[idx]['admFile'].length-1){
                                    temp += `\n`;
                                }
                                // temp.push(data[idx]['admFile'][y].orgFileName);
                            }
                        }else{
                            temp = '';
                            temp = data[idx].menuPath;
                        }
                        // console.log(temp);
                        data[idx]['fileName'] = temp;
                    }
                }else{
                    data = [];
                }
                options.Events = {
                    onDblClick: this.fnClick,
                };
                loader.createSheet({
                    el: 'quliatyMngt_sheetTable_mysite',
                    // id:'inspListSheet2',
                    data: data,
                    options: options
                }).then((sheet) => {
                    this.qualityMngtSheetMy = sheet;
                });
            },
            fnClick: function(evt){
                // console.log(evt);
                if(!this.checkUser(this.userId,'view')){
                    return;
                }
                if(evt.col != 'checkYn' && evt.kind != 'Header'){
                    this.popTitle = '관련문서 상세';
                    this.editYn = false;
                    this.writeYn = false;
                    this.addPop(evt.row.rowSeq,evt.row.fileYn);
                }
            },
            insertBtn: function(){
                this.popTitle = '관련문서 추가';
                this.editYn = true;
                this.writeYn = true;
                this.addPop(0);
            },
            addPop: function(idx,yn){
                //초기화하기
                this.focusSeq = idx;
                this.selectedFileYn = (yn=='' || yn == null)?'Y':yn;
                this.$root.$emit('bv::show::modal', 'RelatedDocumentAdm');
            },
            viewPop: function(idx){
                this.focusSeq = idx;
                // this.selectedFileYn = 'N';
                this.$root.$emit('bv::show::modal', 'ViewDocument');
            },
            firstOpen: async function(){
                this.files = [];
                this.lstFileRst = [];
                this.secondRemoveFileId = [];
                this.midMenu=[];
                this.subMenu = [];
                this.selectedTitle = '';
                this.selectedMid = '';
                this.selectedMain = '';
                this.selectedSub = '';
                // console.log(this.focusSeq);
                if(this.focusSeq == 0){
                    this.openPop('',1);
                }else{
                    let param = {
                        'frstStep':this.frstStep,
                        'scndStep':this.scndStep,
                        'rowSeq':this.focusSeq,
                    };
                    let listRst = await API.crack.selectSiteQltyMngtList(param,{
                        headers:{
                            'Authorization': this.$cookies.get("Authorization")
                        }
                    });
                    // console.log("listRst",listRst);
                    if(listRst.status == 200 && listRst.data.datas.rstList.length >0){
                        let obj = listRst.data.datas.rstList[0];
                        this.selectedFileYn = obj.fileYn;
                        this.selectedTitle = obj.title;
                        this.selectedPath = obj.menuPath;
                        // console.log('obj',obj);
                        this.lstFileRst = (obj.admFile == null ||obj.admFile.length == 0)?[]:obj.admFile;
                        this.files = [];
                        //계산식
                        this.totalCnt = 0; //파일갯수
                        this.totalSize = '0 KB';

                        if(this.lstFileRst.length>0){
                            let inputFileSize = 0;
                            for(let i = 0; i< this.lstFileRst.length;i++){
                                this.totalCnt++;
                                inputFileSize += parseInt(this.lstFileRst[i].fileSize); //총파일크기
                                this.lstFileRst[i].fileSize = this.formatBytes(parseInt(this.lstFileRst[i].fileSize), 2); //각각의 파일크기
                            }
                            if(inputFileSize > 0){
                                this.totalSize = this.formatBytes(inputFileSize,2);
                            }
                        }
                        let mainParam = {
                            'menuLevel':'1',
                        };
                        let menuRst = await API.crack.selectMenu(mainParam,{
                            headers:{
                                'Authorization': this.$cookies.get("Authorization")
                            }
                        });
                        // console.log(menuRst);
                        this.mainMenu = menuRst.data.datas.menuList;
                        if(menuRst.status == 200 && obj.mainCodeId && obj.mainCodeId != null && obj.mainCodeId != ''){
                            this.selectedMain = this.selectedFileYn == 'Y'?'':obj.mainCodeId;

                            let midParam = {
                                'mainCodeId': obj.mainCodeId,
                                'menuLevel':'2',
                            };
                            let midRst = await API.crack.selectMenu(midParam,{
                                headers:{
                                    'Authorization': this.$cookies.get("Authorization")
                                }
                            });
                            // console.log(midRst);
                            if(midRst.status == 200){
                                this.midMenu = midRst.data.datas.menuList;
                                this.selectedMid = this.selectedFileYn == 'Y'?'':obj.midCodeId;
                                // console.log('obj.menuLevel',obj.menuLevel);
                                if(obj.menuLevel != '2'){
                                    let subParam = {
                                        'midCodeId':obj.midCodeId,
                                        'menuLevel':'3',
                                    };
                                    let subRst = await API.crack.selectMenu(subParam,{
                                        headers:{
                                            'Authorization': this.$cookies.get("Authorization")
                                        }
                                    });
                                    if(subRst.status == 200){
                                        this.subMenu = subRst.data.datas.menuList;
                                        this.selectedSub = this.selectedFileYn == 'Y'?'':obj.menuMngtId;
                                        this.selectedId = this.selectedSub;
                                    }else{
                                        // console.log(subRst);
                                        this.alert('조회에 실패했습니다.');
                                        return;
                                    }
                                }else{
                                    this.selectedMid = obj.menuMngtId;
                                    this.selectedId = this.selectedMid;
                                }
                            }else{
                                // console.log(midRst);
                                this.alert('조회에 실패했습니다.');
                                return;
                            }
                        }else if(menuRst.status != 200){
                            // console.log(menuRst);
                            this.alert('조회에 실패했습니다.');
                            return;
                        }
                    }else {
                        // console.log(listRst);
                        this.alert('조회에 실패했습니다.');
                        return;
                    }
                }
            },
            openPop: async function(id,index){
                let param = {
                    'menuLevel':index.toString(),
                };
                if(index == 1 && id != null && id != ''){//2depth일때
                    param['mainCodeId'] = id;
                    param['menuLevel'] = '2';
                }else if(index == 2){//3depth일때
                    param['midCodeId'] = id;
                    param['menuLevel'] = '3';
                }
                // console.log(param);
                
                let menuRst = await API.crack.selectMenu(param,{
                    headers:{
                        'Authorization': this.$cookies.get("Authorization")
                    }
                });

                // console.log("menuRst",menuRst);
                if(menuRst.status == 200){
                    if(index == 1 && (id == null || id == '')){
                        this.mainMenu = menuRst.data.datas.menuList;
                        this.midMenu = [];
                        this.subMenu = [];
                        this.selectedMid = '';
                        this.selectedSub = '';
                        this.selectedId='';
                    }else if(index == 1 && id != null && id != ''){
                        this.midMenu = menuRst.data.datas.menuList;
                        this.selectedMid = '';
                        this.selectedSub = '';
                        this.subMenu = [];
                        this.selectedId='';
                    }else if(index == 2){
                        this.subMenu = menuRst.data.datas.menuList;
                        if(this.subMenu.length>0){
                            this.selectedId='';
                        }else{
                            this.selectedId = this.selectedMid;
                        }
                    }
                    // console.log('main',this.selectedMain,'mid',this.selectedMid,'sub',this.selectedSub);
                }
            },
            fnDelete: async function(){
                this.qltyMngtIds = [];
                let rows = this.qualityMngtSheetMy.getRowsByChecked('checkYn');
                if(rows.length == 0){
                    this.alert('선택된 행이 없습니다.');
                    return;
                }else{
                    for(let x = 0; x<rows.length; x++){
                        let id = 'F'+rows[x].frstStep+'S'+rows[x].scndStep+'_'+rows[x].rowSeq;
                        this.qltyMngtIds.push(id);
                    }
                    this.confirm('삭제하시겠습니까?', async()=>{
                        let param = {
                            'qltyMngtIds':this.qltyMngtIds,
                        };
                        let menuRst = await API.crack.siteQltyMngtUnuse(param,{
                            headers:{
                                'Authorization': this.$cookies.get("Authorization")
                            }
                        });
                        // console.log(menuRst);
                        if(menuRst.data.rCode == '0000' && menuRst.data.datas.cnt>0){
                            this.alert('삭제되었습니다',this.fnClose());
                            this.qltyMngtIds = [];
                        }else{
                            this.alert('삭제에 실패했습니다.');
                            return;
                        }
                    });
                }
            },
            beforeInsert:function(){
                if(this.selectedTitle == '' || this.selectedTitle == null){
                    this.alert('문서 제목을 입력해주세요.');
                    return;
                }
                // if(this.selectedFileYn == 'Y' && this.files.length==0 && this.lstFileRst.length==0){
                //     this.alert('파일을 선택해주세요.');
                //     return;
                // }
                if(this.selectedFileYn == 'N' && (this.selectedId == '' || this.selectedId == null)){
                    this.alert('연결할 메뉴를 선택해주세요.');
                    return;
                }
                this.confirm('저장하시겠습니까?',this.fnInsert);
            },
            fnInsert: async function(){
                // console.log(this.selectedFileYn);
                let param = {
                    'fileYn':this.selectedFileYn,
                    'frstStep':this.frstStep,
                    'scndStep':this.scndStep,
                    'rowSeq':this.focusSeq,
                    'title':this.selectedTitle,
                    'menuMngtId':(this.selectedFileYn == 'N' && this.selectedSub != '' && this.selectedSub != null)?this.selectedSub:(this.selectedFileYn == 'N' && (this.selectedSub == '' || this.selectedSub == null))?this.selectedMid:'',
                    'qltyMngtIds':this.secondRemoveFileId,
                };
                // console.log(param);
                let updateRst = await API.crack.siteQltyMngtUpdate(param,{
                    headers:{
                        'Authorization': this.$cookies.get("Authorization")
                    }
                });
                // console.log('updateRst',updateRst);
                if(updateRst.data.rCode == '0000' && this.selectedFileYn == 'N'){
                    this.alert('저장되었습니다.',this.fnClose());
                    return;
                }else if(updateRst.data.rCode == '0000' && this.selectedFileYn == 'Y' && this.files != '' && typeof(this.files) != 'undefined'){
                    requestFileOptions.headers['Accept-Language'] = "ko";
                    requestFileOptions.headers['Authorization'] = this.$cookies.get("Authorization");
                    let id = 'F'+this.frstStep+'S'+this.scndStep+'_'+updateRst.data.datas.id;
                    let fileSaveRst = await sendFileApi(id, "qualitySysMngt", this.files).then((result) => {
                        return result.data;
                    }).catch((e) => {
                        // console.log(e.response.data);
                        return e.response.data;
                    });
                    let fileRst = fileSaveRst.data; //저장된 데이터개수 받아오기
                    if(fileRst == ''){
                        this.alert('저장에 실패했습니다.');
                        return;
                    }else{
                        this.alert('저장되었습니다.',this.fnClose());
                        return;
                    }
                }else if(updateRst.data.rCode == '0000'){
                    this.alert('저장되었습니다.',this.fnClose());
                    return;
                }else{
                    this.alert('저장에 실패했습니다.');
                    return;
                }
            },
            fnClose: function(){
                this.$root.$emit('bv::hide::modal', 'RelatedDocumentAdm');
                this.loadFileList();
            },
            menuHandler(items,idx) {
                if(!this.checkUser(this.userId,'view')){
                    return;
                }
                // console.log("main",idx);
                // console.log(items);
                this.frstStep = idx+1;
                this.scndStep = 0;
                this.selectedData.keyword = items.contents[0].keyword;
                this.selectedData.standard = items.contents[0].standard;
                this.selectedData.files = items.contents[0].files;
                this.loadFileList();
            },
            subMenuHandler(items,idx,mIdx) {
                if(!this.checkUser(this.userId,'view')){
                    return;
                }
                // console.log("main",idx," mid",mIdx);
                this.frstStep = idx+1;
                this.scndStep = mIdx+1;
                this.selectedData.keyword = items.keyword;
                this.selectedData.standard = items.standard;
                this.selectedData.files = items.files;
                this.loadFileList();
            },
            fnSecondClick: function(evt){
                let focusSiteMstrId = evt.row.siteMstrId;
                this.$store.dispatch('setInformation', {
                    siteMstrId: focusSiteMstrId,
                    allSiteYn: 'Y',
                })
                let blankTemp = this.$router.resolve({
                    name : 'QualityMngtAllSite',
                });
                window.open(blankTemp.href,'_blank');
            },
            filterReset: function(){
                this.projNm= '';
                this.projId= '';
                this.siteNm= '';
                this.searchSiteId= '';  
                this.date=[];
                this.mngtType='';
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
            fileChanged(payload) {
                this.files = payload
                // console.log("this.files");
                // console.log(this.files);
            },
            fileRemoved(id) {
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
            cancelBtn:function(){
                if(this.writeYn){
                    this.confirm('취소하시겠습니까?',()=>{
                        this.$root.$emit('bv::hide::modal', 'RelatedDocumentAdm');
                    });
                }else{
                    this.$root.$emit('bv::hide::modal', 'RelatedDocumentAdm');
                }
            },
            updateCancel: function(){
                this.confirm('취소하시겠습니까?',()=>{
                    this.editYn=false;
                    this.firstOpen();
                });
            },

            calcHeight() {
                let winH = window.innerHeight;
                let winW = window.innerWidth;
                let lnb = document.querySelector('.left_content');
                let ft = document.getElementById('footer');
                let lnbHt = null;
                
                var scrollHeight = document.compatMode=="CSS1Compat"? document.documentElement.scrollHeight : document.body.scrollHeight;
                var clientHeight = document.compatMode=="CSS1Compat"? document.documentElement.clientHeight : document.body.clientHeight;
                var ScrollTop = document.compatMode == "CSS1Compat"? document.documentElement.scrollTop : document.body.scrollTop;
                var scrollPos = scrollHeight - ScrollTop;

                if(winW < 1900) {
                    lnbHt = winH - lnb.getBoundingClientRect().top - ft.clientHeight - 17;
                } else {
                    lnbHt = winH - lnb.getBoundingClientRect().top - ft.clientHeight;
                }

                // console.log(clientHeight, scrollPos)

                if(clientHeight >= scrollPos){
                    // console.log("scroll end");
                }else {
                    lnb.style.height = lnbHt + 'px'
                }
            },
        },

    }
</script>