<template>
    <div>
        <div class="lookup_box multi_line">
            <table>
                <caption class="sr_only">제목</caption>
                <colgroup>
                    <col width="5%">
                    <col width="20%">
                    <col width="4%">
                    <col width="20%">
                    <col width="4%">
                    <col width="20%">
                    <col width="*">
                </colgroup>
                <tbody>
                    <tr>
                        <th>메뉴명</th>   
                        <td> 
                            <select v-model="search.menuNm" class="form_control size_md">
                                <option value="">전체</option>
                                <option v-for="option in menuNmList" :key="option" :value="option">
                                    {{ option }}
                                </option>
                            </select>
                        </td>
                        <th>TYPE명</th>
                        <td>
                            <input type="text" v-model="search.type" class="form_control size_md" placeholder="입력해주세요" @keyup.enter="docInfo()">
                        </td>
                        <th>JSP파일명</th>
                        <td>
                            <input type="text" v-model="search.jspNm" class="form_control size_md" placeholder="입력해주세요" @keyup.enter="docInfo()">
                        </td>
                        <td class="ar">
                            <button type="button" class="btn_reset" @click="clearSearchData()">초기화</button>
                            <button type="button" class="btn btn_sm btn_darkblue btn_radius btn_search" @click="docInfo()">검색</button>
                        </td>
                    </tr>
                    <tr>
                        <th>OZR파일명</th>
                        <td>
                            <input type="text" v-model="search.ozrNm" class="form_control size_md" placeholder="입력해주세요" @keyup.enter="docInfo()">
                        </td>
                        <th>기간</th>
                        <td>
                            <datepicker-range v-model="search.inDttm" />
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div class="inner">
            <div class="button_box">
                <strong class="txt_md">▣ 문서 리스트</strong>
                
                <div class="fr">
                    <button type="button" class="btn btn_sm btn_darkgray" @click="copyRow">행 복사</button>
                    <div class="btn_number">
                        <select v-model="addRowsCount" class="form_control num">
                            <option v-for="count in 10" :key="count" :value="count">
                                {{ String(count) }}
                            </option>    
                        </select>
                        <button type="button" class="btn btn_sm" @click="fn_clickAddRows()">행 추가 </button>
                    </div>
                    <button type="button" class="btn btn_sm btn_gray" @click="fn_clickDeleteRow()">행 삭제</button>
                    <button type="button" class="btn btn_sm btn_darkblue" @click="fn_Save()">저장</button>
                </div> 
            </div>
                        
            <!-- ibsheet -->
            <div class="ib_wrap mt0" style="height: calc(100vh - 355px)">
                <div id="ibsheet_ozDocType" class="ibsheet_table" style="height: 100%;"></div>
            </div>
                
        </div>   <!-- // inner -->

        <!-- 사진대장 파일 팝업 -->
        <b-modal
        id="ozPhotoModal"
        title="샘플사진" 
        hide-backdrop
        size="lg"
        :footer-bg-variant="footerBg"
        > 
            <template #default>
                <div class="pop_container">
                    <LstImg
                        :lst-file-rst="fileRst"
                        :files="files"
                        @file-removed="fileRemoved"
                        @file-changed="(payload) => {tmpFiles = payload.file} "
                        :second-remove-file-id="delFileLst"
                        :uploadable="true"
                        :downloadable="false"
                        :limit-total-file-size="1024*1024*300"
                        :accept-extn="['png', 'gif', 'jpeg', 'jpg', 'bmp']"
                        :copyable="false"
                        :file-type="'ozType'"
                    />
                </div>
            </template>
            <template #modal-footer>
                <template v-if="true">
                    <b-button
                    class="btn btn_md btn_outline btn_darkgray"
                    @click="saveFile"
                    >
                    저장
                    </b-button>
                    <b-button
                    class="btn btn_md btn_outline btn_gray"
                    @click="$bvModal.hide('ozPhotoModal')"
                    >
                    취소
                    </b-button>
                </template>
                <template v-else>
                    <b-button
                    class="btn btn_md btn_outline btn_gray"
                    @click="$bvModal.hide('ozPhotoModal')"
                    >
                    닫기
                    </b-button>
                </template>
            </template>
        </b-modal>

    </div>
</template>

<script>
import loader from '@ibsheet/loader';
import MsgBoxMixins  from '@plugin/mixin/MsgBox.mixins.js';
import { OzdocType } from '@/pages/common/data/UserMngtList'
import { sendPostApi, requestOptions, sendFileApi } from '@/apis/common';
import LstImg from '@/pages/common/popup/LstImg';
import DatepickerRange from '@component/common/DatePickerRange.vue'
import _ from 'lodash'
import { commonFn } from '@/script/commonFn.js'

    export default {
        name: 'OzDocTypeSheet',
        mixins: [MsgBoxMixins],
        components: {
            DatepickerRange,
            LstImg
        },
        data() {
            return {
                addRowsCount : 1,           // 행추가 Num
                footerBg: 'transparent',
                docInfoList : [],           // 기본 문서 리스트
                menuNmList : [],            // 메뉴명 리스트
                deleteList : [],          // 삭제 리스트
                
                // 파일
                selectEvt : {},
                fileRst : [],            // (임시) 저장된 사진대장
                files: [],               // (임시) 추가된 사진대장
                delFileLst : [],         // (임시)삭제된 사진대장

                // 시트
                ozGrid : {
                    data : null,
                    options : {},
                },
                search : {
                    menuNm : '' ,
                    type : '' ,
                    jspNm : '' ,
                    ozrNm : '' ,
                    inDttm : [null, null] ,
                },
                
            }
        },
        async mounted() {
            await this.docInfo();
        },
        beforeDestroy() {
            if(this.ozGrid.data) loader.removeSheet(this.ozGrid.data)
        },
        methods: {
            copyRow: function(){    //행복사
                let sheet = this.ozGrid.data;
                let checkedRows = [];
                let checkColumn = 'isChecked';
                checkedRows = sheet.getRowsByChecked(checkColumn);
                 
                if(checkedRows.length === 0) {
                    this.alert('복사할 행을 선택해주세요.');
                    return;
                }

                // 추가 행 초기화
                checkedRows.forEach(row => {
                    row.regDttm = ''
                    row.files = []
                    row.fileRst = []
                })


                // 행복사 row 값 세팅
                let copiedRows = sheet.copyRows(checkedRows, sheet.getFirstRow());
                copiedRows.forEach(async item => {
                    item.isChecked = 0

                    let btnNm = _.cloneDeep(item.btnNm)
                    let docNm = _.cloneDeep(item.docNm)

                    this.ozGrid.data.setAttribute(item, "btnNm","CanEdit", 1)
                    this.ozGrid.data.setAttribute(item, "docNm","CanEdit", 1)

                    if(item.menuNm != null && item.menuNm != ''){
                        this.getEnum('menuNm', item);
                    }
                    item.btnNm = btnNm
                    
                    if(item.btnNm != null && item.btnNm != ''){
                        this.getEnum('btnNm', item);
                    }
                    
                    let docSeq =  await this.docInfoList.filter(row => row.docNm == docNm)[0]

                    if(typeof docSeq != 'undefined'){
                        item.docNm =  docSeq.seq
                    }else{
                        item.docNm = docNm
                    }

                    item[checkColumn] = false;
                    sheet.refreshRow(item)
                })
            },

            /* 행 추가 */
            fn_clickAddRows(){
                let sheet = this.ozGrid.data;

                sheet.addRows({                // 행추가
                    count: this.addRowsCount,                  // 추가 행 개수
                    next: sheet.getFirstRow()  // 추가 행 위치
                })

                sheet.blur()
                sheet.focus(sheet.getFirstRow())
            },

            // init 
            initGrid : function() {
                let data    = OzdocType.data;
                let options = OzdocType.options;

                let menuNm = options.Cols.find(col => col.Name === 'menuNm')

                menuNm.Enum = '|'+this.menuNmList.join('|')
                menuNm.EnumKeys = '|'+this.menuNmList.join('|')

                options.Events = {
                    onclick : this.click,
                    onAfterChange : this.change,
                    onRenderFirstFinish : (event) => {
                        this.searchData();
                    },
                    onAfterRowAdd:function(event){
                        // 행추가시 canedit 변경
                        event.sheet.setAttribute(event.row, "menuNm","CanEdit", 1,  1)
                        event.sheet.setAttribute(event.row, "type","CanEdit", 1,  1)
                        event.sheet.setAttribute(event.row, "jspNm","CanEdit", 1,  1)
                        event.sheet.setAttribute(event.row, "ozrNm","CanEdit", 1,  1)
                        event.sheet.setAttribute(event.row, "btnNm","Type", "Enum",  1)
                        event.sheet.setAttribute(event.row, "docNm","Type", "Enum",  1)
                        event.sheet.setAttribute(event.row, "fileYn", 0,  0)
                    }
                }

                loader.createSheet({
                    el: 'ibsheet_ozDocType',
                    data: data,
                    options: options,
                }).then((sheet) => {
                    this.ozGrid.data = sheet
                });
            },

            // 문서 리스트 조회
            docInfo : async function() {
                this.deleteList = []         // 삭제 리스트

                let url = '/sendApi/api/myWork/userMngt/ozReportDocInfo/list';
                await sendPostApi(url, {}).then((data) => { 
                    if(typeof data.data.datas.docInfo != 'undefined'){
                        
                        // 문서 리스트 
                        this.docInfoList = data.data.datas.docInfo
                        
                        // 메뉴명 리스트
                        this.menuNmList = _.uniqBy(data.data.datas.docInfo, 'menuNm').map(row => row.menuNm)

                        // 테이블 생성
                        this.initGrid();
                    }
                });
            },

            // 리스트 조회
            searchData : async function() {
                let url = '/sendApi/api/myWork/userMngt/admOzReportInfoList/list';
                let param = {
                    menuNm : this.search.menuNm ,
                    type : this.search.type ,
                    jspNm : this.search.jspNm ,
                    ozrNm : this.search.ozrNm ,
                    searchStartDt : this.search.inDttm[0],
                    searchEndDt : this.search.inDttm[1]
                }

                await sendPostApi(url, param).then(async (data) => {
                    if(typeof data.data.datas.admOzInfo != 'undefined'){
                        let infoList = data.data.datas.admOzInfo
                        url = '/sendApi/api/file/upFileList';   // 파일 조회 URL
                        
                        for (const row of infoList) {
                            let fileParam = {
                                fileType : "ozType",
                                fileSubType : row.ozSeq,
                                fileConnectId : row.seq,
                            }

                            await sendPostApi(url, fileParam).then(fileList => {
                                row.fileRst = fileList.data.data
                            })
                        }

                        this.ozGrid.data.loadSearchData({
                            data: infoList
                        });
                    }
                });
             },

            // 검색 초기화
            clearSearchData : function() {
                this.search.menuNm  = '';
                this.search.type = '';
                this.search.jspNm = '';
                this.search.ozrNm = '';
                this.search.inDttm = [null, null] ;
            },


            // 시트 클릭 이벤트
            click : function(evt) {
                if(evt.col == 'fileYn'){
                    this.selectEvt = evt
                    this.files = []
                    this.fileRst = []

                    if(evt.row.fileRst != null){
                      this.fileRst =  _.cloneDeep(evt.row.fileRst)
                    }
                    if(evt.row.files != null){
                      this.files =  _.cloneDeep(evt.row.files)
                    }

                    this.$bvModal.show('ozPhotoModal')
                }
            },


            getEnum(type,row){
                if(type == 'menuNm'){
                    row.btnNm = ''  // 버튼명 초기화
                    row.docNm = ''  // 문서명 초기화
                    
                    // 버튼명 리스트
                    let btnNmList = this.docInfoList.filter(item => item.menuNm == row.menuNm).map(tmp => tmp.btnNm)   

                    this.ozGrid.data.setAttribute(row, "btnNm","Type", "Enum",  1)
                    this.ozGrid.data.setAttribute(row, "btnNm","Enum", '|'+btnNmList.join('|'),  1)
                    this.ozGrid.data.setAttribute(row, "btnNm","EnumKeys", '|'+btnNmList.join('|'),  1)
                    
                    // 버튼명 선택 여부 수정
                    this.ozGrid.data.setAttribute(row, "btnNm","CanEdit", 1,  1)
                    
                    // 문서명 선택 여부 수정
                    this.ozGrid.data.setAttribute(row, "docNm","CanEdit", 0,  1)
                    this.ozGrid.data.setAttribute(row, "docNm","Enum", '|',1)
                    this.ozGrid.data.setAttribute(row, "docNm","EnumKeys", '|',1)
                }

                if(type == 'btnNm'){
                    row.docNm = ''  // 문서명 초기화
                    
                    // 버튼명 리스트
                    let docNmList = this.docInfoList.filter(item => item.menuNm == row.menuNm && item.btnNm == row.btnNm).map(tmp => tmp.docNm)   
                    let ozSeqList = this.docInfoList.filter(item => item.menuNm == row.menuNm && item.btnNm == row.btnNm).map(tmp => tmp.seq)   

                    this.ozGrid.data.setAttribute(row, "docNm","Type", "Enum",  1)
                    this.ozGrid.data.setAttribute(row, "docNm","Enum", '|'+docNmList.join('|'),  1)
                    this.ozGrid.data.setAttribute(row, "docNm","EnumKeys", '|'+ozSeqList.join('|'),  1)
                    
                    // 문서명 선택 여부 수정
                    this.ozGrid.data.setAttribute(row, "docNm","CanEdit", 1,  1)
                }

            },



            // 시트 변경 이벤트
            change(evt){
                // 메뉴명 변경시
                if(evt.col == 'type' && evt.val == '기본'){
                    this.alert('기본 TYPE명은 사용할 수 없습니다')

                    this.ozGrid.data.setAttribute(evt.row, "type", "")
                    return
                }

                if(evt.col == 'menuNm' || evt.col == 'btnNm'){
                    this.getEnum(evt.col, evt.row)
                }
            },

            /* 행 삭제 */
            fn_clickDeleteRow(){
                // changed 기록엔 남아있음
                const checkedRows = this.ozGrid.data.getRowsByChecked('isChecked')

                this.ozGrid.data.deleteRows(checkedRows)
                checkedRows.forEach(item => {
                    if(item.Added == 1){
                        this.ozGrid.data.removeRow(item)
                    }else{
                        this.deleteList.push(item.seq)
                        this.ozGrid.data.removeRow(item)
                    }
                })
            },

            // 저장
            fn_Save : async function(evt) {
                let rows = this.ozGrid.data.getDataRows().map(item => {return { 
                        'seq'    : item.seq ,
                        'ozSeq'    : item.ozSeq ,
                        'menuNm' : item.menuNm ,
                        'btnNm'  : item.btnNm ,
                        'docNm'  : item.docNm ,
                        'type'   : item.type ,
                        'jspNm'  : item.jspNm ,
                        'ozrNm'  : item.ozrNm ,
                        'Added'  : item.Added ,
                        'del'    : item.del ,
                        'chg'    : item.chg ,
                        'files'  : item.files,
                        'id'     : item.id
                    }
                })

                // sheet 중복체크
                let dup =  this.ozGrid.data.getRowsByDup('docNm,type', false, false, false, "Deleted");

                if(dup.length > 0){
                    for(let x = 0; x< dup.length; x++){
                        for(let y = 0; y < dup[x].length; y++){
                            this.ozGrid.data.setAttribute({
                                row: dup[x][y],
                                attr: 'Color',
                                val: '#ffb4b4'
                            })
                        }
                    }
                    this.alert('동일한 문서 TYPE이 존재합니다.')
                    return
                }

                let addList = rows.filter(row => row.Added == '1')  // 추가 리스트
                let chgList = rows.filter(row => row.chg == '1')    // 수정 리스트
                let delList = this.deleteList;                      // 삭제 리스트

                let list = [...addList,...chgList]
                
                for (const row of list) {
                    if(commonFn.methods.isEmpty(row.menuNm)){
                        this.alert('메뉴명을 선택해주세요')
                        return
                    }

                    if(commonFn.methods.isEmpty(row.btnNm)){
                        this.alert('버튼명을 선택해주세요')
                        return
                    }
                    
                    if(commonFn.methods.isEmpty(row.docNm)){
                        this.alert('문서명을 선택해주세요')
                        return
                    }

                    if(commonFn.methods.isEmpty(row.type)){
                        this.alert('TYPE명을 입력해주세요')
                        return
                    }

                    if(commonFn.methods.isEmpty(row.jspNm)){
                        this.alert('JPS 파일명을 입력해주세요')
                        return
                    }
                    
                    if(commonFn.methods.isEmpty(row.ozrNm)){
                        this.alert('OZR 파일명을 입력해주세요')
                        return
                    }
                }

                this.confirm("저장하시겠습니까?", async () => {
                    
                    let param = {
                        'addList' : addList,
                        'chgList' : chgList,
                        'delList' : delList,
                    }   
                    try{
                        let url = '/sendApi/api/myWork/userMngt/admOzReportInfo/cnt';
                        await sendPostApi(url, param).then(async (rst) => {
                            if(rst.data.InfoList.length > 0 ){
                                await this.ozGrid.data.getDataRows().forEach(row => {         
                                    row["Color"] = "#ffffff"

                                    rst.data.InfoList.forEach(chkRow=>{
                                        if(row.id == chkRow.id){
                                            row["Color"] = "#ffb4b4"
                                        }
                                    })     
                                    this.ozGrid.data.refreshRow(row);
                                })  
                                return this.alert('동일한 문서 TYPE이 존재합니다.')
                            }else{
                                url = '/sendApi/api/myWork/userMngt/admOzReportInfo/write';
                                 // 문서 리스트 등록
                                await sendPostApi(url, param).then(async (data) => { 
                                    if(data.data.rCode == '0000'){
                                        if(typeof data.data.resultList != 'undefined'){
                                            let rstList = data.data.resultList;
                                            // 파일 등록
                                            await list.forEach(async fileList => {
                                                let index = rstList.map(item => item.id).indexOf(fileList.id)
                                                
                                                if(index > -1){
                                                    let file = fileList.files
                                                    await sendFileApi(rstList[index].seq , "ozType", file, rstList[index].ozSeq)
                                                }
                                            })
                                            
                                            if(this.delFileLst.length > 0){
                                                let url = '/sendApi/api/file/fileUnUse';
                                                let payload = {
                                                    fileType : "ozType",
                                                    fileComArcvIds : this.delFileLst,
                                                };
            
                                                await sendPostApi(url, payload).then( result => {
                                                })
                                            }

                                            this.alert('문서 TYPE이 저장되었습니다.',()=>{
                                                this.docInfo()
                                            })
                                        }
            
                                        
                                    }
                                });
                            }
                         })
                         // DB 중복 체크 확인
                        return

                    }catch(e){
                        this.alert('문서 TYPE 저장에 실패했습니다.');
                    }
                })

            },

            /* 사진대장 저장 */
            saveFile(){
                this.selectEvt.row.files = _.cloneDeep(this.files)
                this.selectEvt.row.fileRst = _.cloneDeep(this.fileRst)

                if(this.selectEvt.row.files.length + this.selectEvt.row.fileRst.length > 0){
                    this.selectEvt.sheet.setValue(this.selectEvt.row, 'fileYn', 1)  // 형변환
                }else{
                    this.selectEvt.sheet.setValue(this.selectEvt.row, 'fileYn', 0)  // 형변환
                }

                // 추가 row 가 아닌경우 수정 
                if(this.selectEvt.row.Added != 1){
                    this.selectEvt.row.chg = 1; 
                }

                this.$bvModal.hide('ozPhotoModal')
            },

            /* 사진대장 삭제 */
            async fileRemoved(id){  
                this.delFileLst = id 
            },
        },
   }
</script>