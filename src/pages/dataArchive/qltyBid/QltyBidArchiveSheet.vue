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
                        <th>자료구분</th>
                        <td>
                            <select name="" id="" v-model="search.csfcData" class="form_control form_sm">
                                <option value="">
                                    전체
                                </option>
                                <option v-for="( list, index ) in csfcDataList" :key="index" :value="list.codeVal">
                                    {{ list.codeNameKr }}
                                </option>
                            </select>
                        </td>
                        <th>본부</th>
                        <td>
                            <select name="" id="" v-model="search.central" class="form_control form_sm">
                                <option value="">
                                    전체
                                </option>
                                <option v-for="( list, index ) in centralList" :key="index" :value="list.codeVal">
                                    {{ list.codeNameKr }}
                                </option>
                            </select>
                        </td>
                        <th>국가</th>
                        <td>
                            <select name="" id="" v-model="search.country" class="form_control form_sm">
                                <option value="">
                                    전체
                                </option>
                                <option v-for="( list, index ) in countryList" :key="index" :value="list.codeVal">
                                    {{ list.codeNameKr }}
                                </option>
                            </select>
                        </td>
                        <th>발생년도</th>
                        <td>
                            <select name="" id="" v-model="search.occurYear" class="form_control form_sm">
                                <option value="">
                                    전체
                                </option>
                                <option v-for="( list, index ) in occurYearList" :key="index" :value="list.codeVal">
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
                        <th>발주처</th>
                        <td>
                            <select name="" id="" v-model="search.buyer" class="form_control form_sm">
                                <option value="">
                                    전체
                                </option>
                                <option v-for="( list, index ) in buyerList" :key="index" :value="list.codeVal">
                                    {{ list.codeNameKr }}
                                </option>
                            </select>
                        </td>
                        <th>프로젝트</th>
                        <td><input type="text" v-model="search.dataProject" class="form_control" placeholder="프로젝트를 입력해주세요" @keyup.enter="fn_search" maxlength="50"></td>
                        <th>제목</th>
                        <td><input type="text" v-model="search.title"  class="form_control" placeholder="제목을 입력해주세요" @keyup.enter="fn_search" maxlength="50"></td>     
                        <th>내용</th>
                        <td><input type="text" v-model="search.contents" class="form_control" placeholder="내용을 입력해주세요" @keyup.enter="fn_search" maxlength="50"></td>
                    </tr>
                    <tr>
                        <th>등록자</th>
                        <td><input type="text" v-model="search.inUserName" class="form_control" placeholder="등록자를 입력해주세요" @keyup.enter="fn_search" maxlength="50"></td>
                        <th>등록일</th>                
                        <td>
                        <DatePickerRange
                            v-model="search.inputDate"
                            :input-style="{'max-width': '100%'}"
                        />
                        </td>
                        <th></th>
                        <td></td>
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

            <div class="ib_wrap"  :style="{height: 'calc(100vh - 350px)'}">
                <div id="qltyBidArchiveSheet" class="ibsheet_table" style="height: 100%;" />
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
            ref-id="QltyBidArchiveSheet_ExcelDownload"
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
   import { DataArchiveQltyBddbList } from '@plugin/ibsheet/community/communitySheet'
   import { commonFn } from '@/script/commonFn.js';
   import MsgBoxMixins from '@plugin/mixin/MsgBox.mixins.js'
   import DatePickerRange from '@component/common/DatePickerRange.vue'
   import FileDownload from '@modal/common/FileDownloadModal.vue'
   import { mapGetters } from 'vuex'
   import Breadcrumb from '@/pages/common/frame/Breadcrumb.vue'
   import { sendPostApi, requestOptions } from '../../../apis/common';
   import authCheckMixns  from '@plugin/mixin/AuthCheck.js'   
   import ExcelDownload from '@component/common/ExcelDownload.vue'

   let SHEET_ID = '';

   export default {
        name: 'QltyBidArchiveSheet',
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
                    csfcData:"",
                    central:"",
                    dataProject:"",
                    buyer:"",
                    country:"",
                    occurYear:"",
                },
                adminYn : '0',
                excelDownload : { //엑셀 다운로드
                    options : {},
                    downloadOption : {},
                    fileName : "",
                    data : [],
                    request : false,
                },
                csfcDataList : [],
                centralList : [],
                buyerList : [],
                countryList : [],
                occurYearList : [],
                fileModalId : '',
            }
        },
        mounted() {
            this.archiveType = 'QLTY_BDDB';
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
                    
                //점검유형 코드
                let url = '/sendApi/api/common/masterCode/list';
                requestOptions.headers['Accept-Language'] = "ko";
                requestOptions.headers['Authorization'] = this.$cookies.get("Authorization")

                const codeValArr = ['CSFC_DATA','CENTRAL','BUYER', 'COUNTRY'];

                codeValArr.forEach( async item => {
                    const payload = {
                        groupCode : item
                    }
                    const response = await sendPostApi(url, payload)
    
                    if(response.status == '200'){

                        let codeList = response.data.data;

                        if(item == 'CSFC_DATA'){
                            this.csfcDataList = codeList;
                        }
                        else if(item == 'CENTRAL'){
                            
                            this.centralList = codeList;
                        }
                        else if(item == 'BUYER'){
                            
                            this.buyerList = codeList;
                        }
                        else if(item == 'COUNTRY'){
                            
                            this.countryList = codeList;
                        }
                    }
                });

                const defaultYear = '2013';
                const nowYear = this.$moment().format('YYYY');
                let resultYearList = [];
                let chkCnt = (Number(nowYear) - Number(defaultYear)); 
                for (chkCnt; -1 < chkCnt; chkCnt--) {
                    let yearStr = String(Number(defaultYear) + chkCnt);
                    const obj = {
                        'codeNameKr' : yearStr+'년도',
                        'codeNameEn' : yearStr+'년도',
                        'codeVal' : yearStr,
                    }
                    resultYearList.push(obj);
                }
                this.occurYearList = resultYearList;
            },

            //리스트 호출
            async fn_dataArchiveList() {
                
                try {

                    let payload = {
                        'title' : commonFn.methods.isEmpty(this.search.title) ? '':this.search.title.trim(),
                        'contents' : commonFn.methods.isEmpty(this.search.contents) ? '':this.search.contents.trim(),
                        'inUserName' : commonFn.methods.isEmpty(this.search.inUserName) ? '':this.search.inUserName.trim(),
                        'csfcData' : this.search.csfcData,
                        'central' : this.search.central,
                        'dataProject' : this.search.dataProject,
                        'buyer' : this.search.buyer,
                        'country' : this.search.country,
                        'occurYear' : this.search.occurYear,
                        'searchStartDt' : '',
                        'searchEndDt' : '',
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
                            item['occurYearNm'] = item.occurYear+'년도'
                            if(item.fileCnt  > 0){
                                item['fileYn'] = '0'
                            }
                        });
                        data = checkData;
                    }

                    let options = DataArchiveQltyBddbList.options

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

                    options.Cols    =   this.adminYn === '1' 
                                        ? options.Cols
                                        : options.Cols.filter(col => col.Name !== 'ischeck')
                    options.Cfg = {NoVScroll: 0,}
                    loader.createSheet({
                        el: 'qltyBidArchiveSheet',
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
                this.$router.push({ name: 'QltyBidArchiveWrite' })
            },
            fn_dataArchiveView(param) {
                var selectRow = this.sheet.getRowById(param.row.id);
                if(!selectRow.dataArchiveId){
                    return;
                }
                else{
                    this.$router.push({ 
                        name: 'QltyBidArchiveView', 
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
                this.search.csfcData = '';
                this.search.central = '';
                this.search.dataProject = '';
                this.search.buyer = '';
                this.search.country = '';
                this.search.occurYear = '';
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
                this.excelDownload.fileName  = `참고자료_품질입찰DB_${this.$moment().format('YYYYMMDD')}.xlsx`,  // file명 : 현재화면 페이지 _현재 날짜
                this.excelDownload.data      = _.cloneDeep(sheet.getShownRows(0));
                this.excelDownload.request  = true;
            },
        }
   }
</script>