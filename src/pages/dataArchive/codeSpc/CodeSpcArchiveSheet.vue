<template>
    <div class="tab_contents">
        <Breadcrumb :currentPath="$route.fullPath" />
        <div class="lookup_box multi_line mt15">
            <table>
                <caption class="sr_only"></caption>
                <colgroup>
                    <col width="5%">
                    <col width="17%">
                    <col width="5%">
                    <col width="17%">
                    <col width="5%">
                    <col width="17%">
                    <col width="5%">
                    <col width="17%">
                    <col width="*">
                </colgroup>
                <tbody>
                    <tr>
                        <th>Dicipline</th>
                        <td>
                            <select name="" id="" v-model="search.dicipline" class="form_control form_sm" @change="fn_selectChange('item')">
                                <option value="">
                                    전체
                                </option>
                                <option v-for="( list, index ) in diciplineList" :key="index" :value="list.codeVal">
                                    {{ list.codeNameKr }}
                                </option>
                            </select>
                        </td>
                        <th>Item</th>
                            <td>
                                <select name="" id="" v-model="search.item" class="form_control form_sm" @change="fn_selectChange('section')">
                                    <option value="">
                                        전체
                                    </option>
                                    <option v-for="( list, index ) in itemList" :key="index" :value="list.codeVal">
                                        {{ list.codeNameKr }}
                                    </option>
                                </select>
                            </td>
                        <th>Section</th>
                        <td>
                            <select name="" id="" v-model="search.section" class="form_control form_sm">
                                <option value="">
                                    전체
                                </option>
                                <option v-for="( list, index ) in sectionList" :key="index" :value="list.codeVal">
                                    {{ list.codeNameKr }}
                                </option>
                            </select>
                        </td>
                        <th>Purpose</th>
                        <td>
                            <select name="" id="" v-model="search.purpose" class="form_control form_sm">
                                <option value="">
                                    전체
                                </option>
                                <option v-for="( list, index ) in purposeList" :key="index" :value="list.codeVal">
                                    {{ list.codeNameKr }}
                                </option>
                            </select>
                        </td>
                        <td class="ar">
                            <button type="button" class="btn_reset" v-on:click="fn_searchReset">초기화</button>
                            <button type="button" class="btn btn_sm btn_darkblue btn_radius btn_search" @click="fn_search">검색</button>
                        </td>
                    </tr>
                    <tr>
                        <th>제목</th>
                        <td><input type="text" v-model="search.title"  class="form_control" placeholder="제목을 입력해주세요" @keyup.enter="fn_search" maxlength="50"></td>     
                        <th>내용</th>
                        <td><input type="text" v-model="search.contents" class="form_control" placeholder="내용을 입력해주세요" @keyup.enter="fn_search" maxlength="50"></td>
                        <th>등록자</th>
                        <td><input type="text" v-model="search.inUserName" class="form_control" placeholder="등록자를 입력해주세요" @keyup.enter="fn_search" maxlength="50"></td>
                        <th>등록일</th>                
                        <td>
                        <DatePickerRange
                            v-model="search.inputDate"
                            :input-style="{'max-width': '100%'}"
                        />
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div class="inner">
            <div class="button_box">
                <button type="button" class="btn btn_sm btn_excel" @click="fn_exportExcel(sheet)">엑셀 다운로드</button>
                <div class="fr" >
                    <button type="button" class="btn btn_md btn_darkgray btn_outline" v-if="adminYn === '1' || checkUser(userId,'write')" @click="fn_dataArchiveWrite">등록</button>
                    <button type="button" class="btn btn_md btn_darkgray btn_outline" v-if="adminYn === '1'" @click="fn_dataArchiveDelete">삭제</button>
                </div>
            </div>

            <!-- ibsheet -->
            <div class="ib_wrap"  :style="{height: 'calc(100vh - 350px)'}">
                <div id="codeSpcArchiveSheet" class="ibsheet_table" style="height: 100%;" />
            </div>
        </div>
        <file-download
            modal-title="파일 보기"
            :refId="fileModalId"
            :file-connect-id="fileConnectId"
            :file-type="fileType"
        />
        <excel-download
            v-model="excelDownload.request"
            ref-id="CodeSpcArchiveSheet_ExcelDownload"
            :file-name="excelDownload.fileName"
            :options="excelDownload.options"
            :data="excelDownload.data"
        />
    </div>
</template>

<script>
   import API from '@/apis/'
   import loader from '@ibsheet/loader'
   import axios from 'axios'
   import _ from 'lodash'
   import { DataArchiveCodeSpecList } from '@plugin/ibsheet/community/communitySheet'
   import { commonFn } from '@/script/commonFn.js';
   import MsgBoxMixins from '@plugin/mixin/MsgBox.mixins.js'
   import DatePickerRange from '@component/common/DatePickerRange.vue'
   import FileDownload from '@modal/common/FileDownloadModal.vue'
   import { mapGetters } from 'vuex'
   import Breadcrumb from '@/pages/common/frame/Breadcrumb.vue'
   import { sendPostApi , requestOptions } from '../../../apis/common';
   import authCheckMixns  from '@plugin/mixin/AuthCheck.js'
   import ExcelDownload from '@component/common/ExcelDownload.vue'

   let SHEET_ID = '';

   export default {
        name: 'CodeSpcArchiveSheet',
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
            Breadcrumb,
            FileDownload,
            ExcelDownload,
        },
        data() {
            return {
                footerBg: 'transparent',
                searchYn : '0',
                archiveType : '',
                sheet : [],
                fileConnectId : '',
                fileType : '',
                search: {
                    title : '',
                    contents: '',
                    inUserName: '',
                    searchStartDt: '',
                    searchEndDt: '',
                    inputDate: [null, null],
                    dicipline:"",    
                    item:"",    
                    section:"",    
                    purpose:"",    
                },
                adminYn : '0',
                excelDownload : { //엑셀 다운로드
                    options : {},
                    downloadOption : {},
                    fileName : "",
                    data : [],
                    request : false,
                },
                diciplineList : [],
                itemList : [],
                sectionList : [],
                purposeList : [],
                fileModalId : '',
            }
        },
        mounted() {
            this.archiveType = 'CODE_SPEC'
            this.fileModalId = 'FileDownloadModal_' + this.archiveType;
            this.adminYn = this.$store.getters['auth/getGroupAuthInfoId'] == "GRAT_0000000009" ? '1' : '0';
            this.fn_masterCodeList();
            this.fn_dataArchiveList();
        },
        activated(){
            // keepAlive 재조회 처리
            if(this.$store.getters['tabInfo/getSavePage'].length > 0){
                
                //keepAlive 재조회 처리
                let menuid = this.$store.getters['tabInfo/getCurrentMenuId'];
                let url="/sendApi/api/programMngt/menuChildProgram/list"
                let reSearch = false;
                let param = {"menuMngtId":menuid}; 
                
                // sdave정보가 있는지 체크하여 처리
                sendPostApi(url, param).then((result) => {
                    // 하부 페이지 정보
                    for (let i = 0; i < result.data.dlprogram.length ; i++){
                        // 저장 페이지 정보와 비교
                        for(let j = 0; j < this.$store.getters['tabInfo/getSavePage'].length ; j++){
                            if(result.data.dlprogram[i].routerName == this.$store.getters['tabInfo/getSavePage'][j]){
                                this.$store.dispatch('tabInfo/reMoveSavePage', this.$store.getters['tabInfo/getSavePage'][j]);

                                reSearch = true;
                                break;
                            }
                        }

                        if(reSearch){
                            break;
                        }
                    }

                    if(reSearch){
                        this.fn_dataArchiveList();
                    }

                }).catch((e) => {
                    // console.log(e);
                    return e.response;
                });
            }
        },
        beforeDestroy() {
            loader.removeSheet(SHEET_ID)
        },
        methods: {

            //마스터 코드 조회
            async fn_masterCodeList() {
                const response = await API.community.codeSpecMasterCodeList({});
                if(response.status == '200'){
                    if(response.data.data){
                        this.diciplineList = response.data.data;
                    }
                    
                    //점검유형 코드
                    let url = '/sendApi/api/common/masterCode/list';
                    requestOptions.headers['Accept-Language'] = "ko";
                    requestOptions.headers['Authorization'] = this.$cookies.get("Authorization")

                    let payload = {
                        groupCode : 'PURPOSE'
                    }
                    const subResponse = await sendPostApi(url, payload)
                    if(subResponse.status == '200'){
                        if(subResponse.data.data){
                            this.purposeList = subResponse.data.data;
                        }
                    }
                }
            },

            //코드 선택
            fn_selectChange(type){
                if(type == 'item'){
                    if(this.search.dicipline != ''){
                        this.diciplineList.forEach(item => {
                            if(this.search.dicipline == item.codeVal){
                                this.search.item = '';
                                this.itemList = item.masterCodeList;
                            }
                        });
                        this.sectionList = [];
                        this.search.section = ''
                    }
                    else{
                        this.itemList = [];
                        this.sectionList = [];
                        this.search.item = ''
                        this.search.section = ''
                    }
                }
                else{
                    if(this.search.item != ''){
                        this.diciplineList.forEach(item => {
                            item.masterCodeList.forEach(subItem => {
                                if(this.search.item == subItem.codeVal){
                                    this.sectionList = subItem.masterCodeList
                                    this.search.section = ''
                                }
                            })
                        });
                    }
                    else{
                        this.sectionList = [];
                        this.search.section = ''
                    }
                }
            },

            //리스트 호출
            async fn_dataArchiveList() {
                
                try {

                    let payload = {
                        'title' : commonFn.methods.isEmpty(this.search.title) ? '':this.search.title.trim(),
                        'contents' : commonFn.methods.isEmpty(this.search.contents) ? '':this.search.contents.trim(),
                        'inUserName' : commonFn.methods.isEmpty(this.search.inUserName) ? '':this.search.inUserName.trim(),
                        'searchStartDt' : '',
                        'searchEndDt' : '',
                        'dicipline' : this.search.dicipline,
                        'item' : this.search.item,
                        'section' : this.search.section,
                        'purpose' : this.search.purpose,
                        'archiveType' : this.archiveType,
                    };
                    
                    if(!commonFn.methods.isEmpty(this.search.inputDate[0]) && !commonFn.methods.isEmpty(this.search.inputDate[1])){
                        payload['searchStartDt'] = this.search.inputDate[0];
                        payload['searchEndDt'] = this.search.inputDate[1];
                    }

                    const response = await API.community.selectDataArchiveList(payload);    
                    
                    let data = [];
                    let checkData = response.data.data;
                    if(checkData && checkData.length > 0){
                        checkData.forEach(item => {
                            item.inDttm = this.$moment(item.inDttm).format("YYYY-MM-DD")
                            if(item.fileCnt  > 0){
                                item['fileYn'] = '0'
                            }
                        });
                        data = checkData;
                    }

                    let options = DataArchiveCodeSpecList.options

                    options.Events = {
                        onClick: this.fn_selectFile,
                        ondblclick : this.fn_dataArchiveView,
                        onRenderFirstFinish: async () => {
                            this.sheet.loadSearchData({
                                data: data,
                                append: false
                            })
                        },
                    }
                    options.Cfg = {NoVScroll: 0,}
                    options.Cols    =   this.adminYn === '1' 
                                        ? options.Cols
                                        : options.Cols.filter(col => col.Name !== 'ischeck')

                    loader.createSheet({
                        el: 'codeSpcArchiveSheet',
                        options: options,
                        data: data,
                    }).then((sheet) => {
                        this.sheet = sheet;
                    });

                } catch (error) {
                    this.alert('조회를 실패했습니다.');
                }
            },

            fn_selectFile(evtParam){
                
                let selectRow = evtParam.row
                if(evtParam.col == "fileYn" && evtParam.event.target.tagName == "BUTTON"){ 

                    if(!this.checkUser(this.userId, 'down')) {
                        this.alert('다운로드 권한이 없습니다.')
                        return
                    }
                    
                    if(1 >= selectRow.fileCnt){

                        const url = '/sendApi/api/file/upFileList'
                        const paylaod = {
                            fileConnectId: selectRow.dataArchiveId,
                            fileType:      'DataArchive',
                        }
                        const options = {
                            headers: {
                                'Authorization': this.$cookies.get('Authorization'),
                                'Content-Type': 'application/json',
                                'Accept-Language': 'ko'
                            }
                        }

                        axios.post(url, paylaod, options)
                            .then( async response => {
                            if(response.status == '200'){
                                if(response.data.data && response.data.data.length > 0){
                                    const file = response.data.data[0]
                                    await API.community.fn_communityFileDownload(file.fileComArcvId, file);
                                }
                                else{
                                    return this.alert('파일다운로드를 실패했습니다.');
                                }
                            }
                        })
                        .catch((e) => {
                            console.error(e);
                            return this.alert('파일다운로드를 실패했습니다.');
                        })
                    }
                    else{
                        this.fileConnectId = selectRow.dataArchiveId;
                        this.fileType = 'DataArchive';
                        this.$bvModal.show(this.fileModalId);
                    }
                }
            },

            fn_dataArchiveWrite() {
                this.$router.push({ name: 'CodeSpcArchiveWrite' })
            },
            fn_dataArchiveView(param) {
                var selectRow = this.sheet.getRowById(param.row.id);
                if(!selectRow.dataArchiveId){
                    return;
                }
                else{
                    this.$router.push({ 
                        name: 'CodeSpcArchiveView', 
                        params : 
                        {
                            'dataArchiveId' : selectRow.dataArchiveId ,
                        }
                    })
                }
            },
            fn_searchReset() { //검색조건 초기화
                this.search.title = ''
                this.search.contents = ''
                this.search.inUserName = ''
                this.search.inputDate = [null,null];
                this.search.dicipline = ''
                this.search.item = ''
                this.search.section = ''
                this.search.purpose = ''
                this.fn_dataArchiveList();
            },
            fn_search (){
                this.fn_dataArchiveList();
            },

            fn_dataArchiveDelete() {
                let rows = this.sheet.getRowsByChecked("ischeck")
                if(!rows || 0 >= rows.length){
                    this.alert('선택된 행이 없습니다.');
                    return;
                }
                else{
                    this.confirm('삭제하시겠습니까?', async() => {
    
                        try {
                            let param = [];
            
                            rows.forEach(item => {
                                let obj = {
                                    'dataArchiveId' : item.dataArchiveId
                                }
                                param.push(obj);
                            });
                            let payload = {
                                'dataArchiveList' : param
                            };
    
                            const response = await API.community.deleteDataArchive(payload);
                            if(response.status == '200' && response.data.data.rCode == "0000"){
                                this.alert('삭제되었습니다.');
                            }
                            else{
                                this.alert('삭제에 실패했습니다.');
                            }
                            this.fn_dataArchiveList();
                            this.sheet.renderBody();
                        } catch (error) {
                            this.alert('삭제에 실패했습니다.');
                        }
                    })
                }
            },
				
            /** 엑셀 다운로드 */
            fn_exportExcel: function (sheet) {
                this.excelDownload.options   = {
                    Cfg: sheet.options.Cfg,
                    Cols: sheet.options.Cols.filter((item) => !['ischeck','fileYn'].includes(item.Name))
                }
                this.excelDownload.downloadOption = {
                    checkBoxOnValue:    'Y',
                    checkBoxOffValue:   'Y',
                }
                this.excelDownload.fileName  = `품질관리_Code_Spec_Requirement_${this.$moment().format('YYYYMMDD')}.xlsx`,  // file명 : 현재화면 페이지 _현재 날짜
                this.excelDownload.data      = _.cloneDeep(sheet.getShownRows(0));
                this.excelDownload.request  = true;
            },
        }
   }
</script>