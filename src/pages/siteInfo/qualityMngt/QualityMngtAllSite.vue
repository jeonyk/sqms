<template>
    <div class="tab_contents">
        <!-- <h2 class="sub_title">{{subTitle}}</h2> -->
        <div class="table_normal_list mb20" v-show="currentTab == 0">
            <table>
                <caption class="sr_only">제목</caption>
                <colgroup>
                    <col width="100">
                    <col width="*">
                    <col width="100">
                    <col width="*"> 
                </colgroup>
                <tbody>
                    <tr>
                        <th>현장명</th>
                        <td colspan="3">[{{siteId}}] {{siteName}}</td>
                    </tr>
                    <tr>
                        <th>프로젝트명</th>
                        <td colspan="3">[{{projectId}}] {{projectName}}</td>
                    </tr>
                </tbody>
            </table>
        </div>
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
                <button v-if="checkUser(userId,'down')" type="button" class="btn btn_md btn_outline btn_darkgray btn_print" v-print="'#print_area'" style="margin-left:104em;">출력</button>
            <div class="right_content a4" id="print_area">
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
                        

                        <div class="table_normal_list align_center">
                            <table>
                                <caption class="sr_only"></caption>
                                <colgroup>
                                    <col width="5%">
                                    <col width="15%">
                                    <col width="40%">
                                    <col width="*">
                                </colgroup>
                                <thead>
                                    <tr>
                                        <th>번호</th>
                                        <th>문서제목</th>
                                        <th>참고문서 /Link</th>
                                        <th>현장</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(doc,dIndex) in docList" :key="dIndex">
                                        <td>{{dIndex+1}}</td>
                                        <td style="white-space:pre-line;word-break:break-all;text-align:left;">{{doc.title}}</td>
                                        <td v-if="doc.fileYn == 'Y'" style="white-space:pre-line;word-break:break-all;text-align:left;">
                                            <ul v-for="(file,aIndex) in doc.admFile" :key="aIndex">
                                                <li>
                                                    <a href="javascript:void(0)" v-on:click="orgFileDown(file.orgFileName, file.fileComArcvId)">
                                                        <i class="ico_file" :class="fn_getFileIcons(file.orgFileName)">{{file.orgFileName}}</i>
                                                    </a>
                                                </li>
                                            </ul>
                                        </td>
                                        <!-- <td v-if="doc.fileYn == 'N' && checkUser(userId,'view')" colspan="2">
                                            <router-link :to="doc.scrinUrl">
                                                {{doc.menuPath}}
                                            </router-link>
                                        </td> -->
                                        <td v-if="doc.fileYn == 'N'" colspan="2">
                                            {{doc.menuPath}}
                                        </td>
                                        <td v-if="doc.fileYn == 'Y'">
                                            <ul v-for="(sFile,sIndex) in doc.siteFile" :key="sIndex">
                                                <li>
                                                    <a href="javascript:void(0)" v-on:click="orgFileDown(sFile.orgFileName, sFile.fileComArcvId)">
                                                        <i class="ico_file" :class="fn_getFileIcons(sFile.orgFileName)">{{sFile.orgFileName}}</i>
                                                    </a>
                                                </li>
                                            </ul>
                                        </td>
                                    </tr>
                                    <tr v-if="docList.length==0">
                                        <td colspan="4">
                                            조회된 데이터가 없습니다.
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div class="ib_wrap">
                            <div id="quliatyMngt_sheetTable_mysite" class="ibsheet_table"></div>
                        </div>

                    </div>
                </div>
            </div>

            <!-- 관련문서 추가 팝업 -->
            <b-modal id="RelatedDocument" static :title="popTitle" hide-backdrop size="lg" :footer-bg-variant="footerBg" @shown="firstOpen()">
                <template #default>
                    <div class="pop_container">
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
                                        <!--<td>
                                            <label class="input_radio" for="rdoSolar1">
                                                <input type="radio" id="rdoSolar1" name="" v-model="selectedFileYn" value="Y" checked>
                                                <span class="label_text">필수 문서</span>
                                            </label>
                                            <label class="input_radio" for="rdoSolar2">
                                                <input type="radio" id="rdoSolar2" name="" v-model="selectedFileYn" value="N">
                                                <span class="label_text">메뉴 링크</span>
                                            </label>
                                        </td> -->
                                        <td>필수문서</td>
                                    </tr>
                                    <tr>
                                        <th><span class="emp_red">문서 제목</span></th>
                                        <td>
                                            {{selectedTitle}}
                                            <!-- <input type="text" class="form_control" v-model="selectedTitle"> -->
                                        </td>
                                    </tr>
                                    
                                    <tr v-if="editYn">
                                        <th><span class="emp_red">문서 파일</span></th>
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

                                    <tr v-if="!editYn">
                                        <th><span class="emp_red">문서 파일</span></th>
                                        <td>
                                            <div class="lst_file">
                                                <!-- <p class="disabled">첨부파일이 없습니다</p> -->
                                                <h3>첨부파일 {{totalCnt}}개 ({{totalSize}})</h3>
                                                <ul>
                                                    <li v-for="(mngrFileRst, index) in lstFileRst" v-bind:key="index" class="old">
                                                        <a href="javascript:void(0); " v-on:click="orgFileDown(mngrFileRst.orgFileName, mngrFileRst.fileComArcvId)"><i class="ico_file" :class="fn_getFileIcons(mngrFileRst.orgFileName)">{{mngrFileRst.orgFileName}} ({{mngrFileRst.fileSize}})</i></a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </template>
                <template #modal-footer="{ hide }">
                    <b-button v-if="editYn" class="btn btn_md btn_outline btn_darkgray" @click="fnInsert()">저장</b-button>
                    <b-button v-if="!writeYn&&editYn" class="btn btn_md btn_outline btn_darkgray" @click="editYn=false, firstOpen()">취소</b-button>
                    <b-button v-if="!writeYn&&!editYn" class="btn btn_md btn_outline btn_darkgray" @click="editYn=true">수정</b-button>
                    <b-button v-if="writeYn==editYn" class="btn btn_md btn_outline btn_gray" @click="hide('forget')">닫기</b-button>
                </template>
            </b-modal>
        </div>
    </div>
</template>

<script>
    import LstFile from '@/pages/common/popup/LstFile.vue'
    import DatePickerRange from '@component/common/DatePickerRange.vue'
    import { QualityState, SystemAdmin } from '@/pages/common/data/LocusList'
    import { qualityPlanData } from '@/pages/common/data/QualityPlanData'
    import { ConcretePourstatus2 } from '../../common/data/MaterialsList'
    import loader from '@ibsheet/loader'
    import Breadcrumb from '@/pages/common/frame/Breadcrumb.vue'
    import MsgBoxMixins  from '@plugin/mixin/MsgBox.mixins.js'
    import API from '@/apis/'
    import { sendFileApi, requestFileOptions } from '../../../apis/common';
    import { sendPostApi, requestOptions } from '../../../apis/common';
    import { mapGetters } from 'vuex'
    import authCheckMixns  from '@plugin/mixin/AuthCheck.js'
    import commonUtilMixins from '@plugin/mixin/CommonUtil.js'


    let sheetId = '';

    export default {
        name: 'QualityMngtAllSite',
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
                editYn:false, // 편집 가능 여부 
                writeYn:false,
                
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
        },
        created() {
            
        },
        computed:{
            ...mapGetters({
                'information': 'getInformation'
            })
        },
        methods: {
            loadSheet: async function(){
                this.siteMstrId = this.information.siteMstrId;
                let param = {};
                if(this.currentTab == 0){
                    param['siteMstrId'] = this.siteMstrId;
                    
                    let rst = await API.crack.selectSiteQltyMngtName(param,{
                        headers:{
                            'Authorization': this.$cookies.get("Authorization")
                        }
                    });
                    //console.log("rst",rst);
                    if(rst.data.rCode == '0000'){
                        this.siteName = rst.data.datas.nameList.siteName;
                        this.projectName = rst.data.datas.nameList.projectName;
                        this.siteId = rst.data.datas.nameList.siteId;
                        this.projectId = rst.data.datas.nameList.projectId;

                        this.loadFileList();

                        // loader.createSheet({
                        //     el: 'quliatyMngt_sheetTable_mysite',
                        //     options: {
                        //         Cfg : {
                        //             CanEdit : 0,
                        //             DataMerge : 0
                        //         },
                        //         Cols : options.Cols,
                        //         Events : {
                        //         }
                        //     },
                        //     data: data
                        // }).then((sheet) => {
                        //     sheetId = sheet.id
                        // });
                    }
                }else{
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
                    if(this.searchSiteId !=''){//현장코드
                        param['siteId']=this.searchSiteId;
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
                            onAfterClick: this.fnSecondClick,
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
                        };
                    }else{
                        data2 = [];
                    }

                    loader.createSheet({
                        el: 'quliatyMngt_sheetTable_allsite',
                        // id:'inspListSheet2',
                        data: data2,
                        options: options2
                    }).then((sheet) => {
                        this.qualityPolicySheetAll = sheet;
                    });
                }
            },
            loadFileList: async function(){
                let listParam = {
                    'frstStep':this.frstStep,
                    'scndStep':this.scndStep,
                    // 'rowSeq':this.rowSeq,
                    'siteMstrId':this.siteMstrId,
                };

                let listRst = await API.crack.selectSiteQltyMngtList(listParam,{
                    headers:{
                        'Authorization': this.$cookies.get("Authorization")
                    }
                });
                //console.log("listRst",listRst);
                // let data = [];
                // let options = SystemAdmin.options;
                if(listRst.data.rCode == '0000'){
                    this.docList = listRst.data.datas.rstList;
                }
            },
            addPop: function(idx){
                //초기화하기
                this.focusSeq = idx;
                this.selectedFileYn = 'Y';
                this.$root.$emit('bv::show::modal', 'RelatedDocument');
            },
            firstOpen: async function(){
                //console.log(this.editYn);
                // if(this.focusSeq == 0){
                //     this.openPop('',1);
                // }else{
                    let param = {
                        'frstStep':this.frstStep,
                        'scndStep':this.scndStep,
                        'rowSeq':this.focusSeq,
                        'siteMstrId':this.siteMstrId,
                    };
                    let listRst = await API.crack.selectSiteQltyMngtList(param,{
                        headers:{
                            'Authorization': this.$cookies.get("Authorization")
                        }
                    });
                    //console.log("listRst",listRst);
                    if(listRst.status == 200 && listRst.data.datas.rstList.length >0){
                        let obj = listRst.data.datas.rstList[0];
                        //console.log('obj',obj);
                        this.lstFileRst = (obj.siteFile == null ||obj.siteFile.length == 0)?[]:obj.siteFile;
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
                        this.selectedTitle = obj.title;
                        this.selectedPath = obj.menuPath;
                    }else {
                        this.alert('조회에 실패했습니다.');
                        return;
                    }
                // }
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
                //console.log(param);
                
                let menuRst = await API.crack.selectMenu(param,{
                    headers:{
                        'Authorization': this.$cookies.get("Authorization")
                    }
                });

                //console.log("menuRst",menuRst);
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
                }
            },
            fnInsert: async function(){
                if(this.selectedTitle == '' || this.selectedTitle == null){
                    this.alert('문서 제목을 입력해주세요.');
                    return;
                }
                if(this.selectedFileYn == 'Y' && this.files.length>0){
                    this.alert('파일을 선택해주세요.');
                    return;
                }
                if(this.selectedFileYn == 'N' && (this.selectedId == '' || this.selectedId == null)){
                    this.alert('연결할 메뉴를 선택해주세요.');
                    return;
                }
                let param = {
                    'fileYn':this.selectedFileYn,
                    'frstStep':this.frstStep,
                    'scndStep':this.scndStep,
                    // 'rowSeq':this.focusSeq,
                    'title':this.selectedTitle,
                    'menuMngtId':this.fileYn == 'N'?this.selectedId:'',
                };
                let updateRst = await API.crack.siteQltyMngtUpdate(param,{
                    headers:{
                        'Authorization': this.$cookies.get("Authorization")
                    }
                });
                //console.log('updateRst',updateRst);
                if(updateRst.data.rCode == '0000'){
                    this.alert('저장되었습니다.',fnClose());
                }
            },
            fnClose: function(){
                this.$root.$emit('bv::hide::modal', 'RelatedDocument');
                this.loadSheet();
            },
            menuHandler(items,idx) {
                if(!this.checkUser(this.userId,'view')){
                    return;
                }
                //console.log("main",idx);
                //console.log(items);
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
                //console.log("main",idx," mid",mIdx);
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
            fnInsert: async function(){
                if(this.selectedFileYn == 'Y' && this.files.length==0 && this.lstFileRst.length==0){
                    this.alert('파일을 선택해주세요.');
                    return;
                }
                let param = {
                    'fileYn':this.selectedFileYn,
                    'frstStep':this.frstStep,
                    'scndStep':this.scndStep,
                    'rowSeq':this.focusSeq,
                    'title':this.selectedTitle,
                    'menuMngtId':(this.selectedFileYn == 'N' && this.selectedSub != '' && this.selectedSub != null)?this.selectedSub:(this.selectedFileYn == 'N' && (this.selectedSub == '' || this.selectedSub == null))?this.selectedMid:'',
                    'qltyMngtIds':this.secondRemoveFileId,
                };
                //console.log(param);
                let updateRst = await API.crack.siteQltyMngtUpdate(param,{
                    headers:{
                        'Authorization': this.$cookies.get("Authorization")
                    }
                });
                //console.log('updateRst',updateRst);
                if(updateRst.data.rCode == '0000' && this.selectedFileYn == 'Y' && this.files != '' && typeof(this.files) != 'undefined'){
                    requestFileOptions.headers['Accept-Language'] = "ko";
                    requestFileOptions.headers['Authorization'] = this.$cookies.get("Authorization");
                    let id = 'F'+this.frstStep+'S'+this.scndStep+'_'+updateRst.data.datas.id;
                    let fileSaveRst = await sendFileApi(id, "qualitySysMngt", this.files, this.siteMstrId).then((result) => {
                        return result.data;
                    }).catch((e) => {
                        //console.log(e.response.data);
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
            orgFileDown: function(name,id){//데이터 등록된 파일
                if(!this.checkUser(this.userId,'down')){
                    return;
                }
                let fileName = name;
                let fileCode = id;
                    
                // //console.log(fileCode);
                
                let element = document.createElement('a');
                element.setAttribute('href','/sendApi/api/fileCall/getSiteInfoImgFile/'+fileCode);
                element.setAttribute('download',fileName);
                element.click();
                element.remove();
            },
            fileChanged(payload) {
                this.files = payload
                //console.log("this.files");
                //console.log(this.files);
            },
            fileRemoved(id) {
                this.secondRemoveFileId = id
                //console.log("fileRemoved"+this.secondRemoveFileId);
            },
            formatBytes(bytes, decimals = 0) {//바이트 계산
                if (bytes === 0) return '0 MB';
                const k = 1024;
                const dm = decimals < 0 ? 0 : decimals;
                const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
                const i = Math.floor(Math.log(bytes) / Math.log(k));
                return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
            },
        },

    }
</script>