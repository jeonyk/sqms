<template>
    <div class="tab_contents">
        <div class="inner type">
            <div class="button_box">
                <h2>타설입력(강도시험)</h2>
                <div class="fr">
                    <!-- 버튼 -->
                    <!-- 진행상태 - 시험등록 or 복수입력시 -->
                    <template v-if="strgTestStatus == 'REGT' || concCompStrgLstIds.length > 1">
                        <button type="button" class="btn btn_md btn_outline btn_darkgray" @click="saveData" v-if="checkUser(userId,'write')">저장</button>
                        <button type="button" class="btn btn_md btn_outline btn_darkgray" 
                            @click="$router.push({
                                name: 'SelectCurrentStrgTab'
                            })">목록
                        </button>
                    </template>
                    <!-- 그외 -->
                    <template v-else>
                        <!-- 수정 -->
                        <template v-if="compTest">
                            <button type="button" class="btn btn_md btn_outline btn_darkgray" @click="saveData" v-if="checkUser(userId,'write')">저장</button>
                            <button type="button" class="btn btn_md btn_outline btn_darkgray" @click="fn_changePage('view')" >취소</button>
                        </template>
                        <!-- 상세 -->
                        <template v-else>
                            <button type="button" class="btn btn_md btn_outline btn_darkgray" @click="approveViewBtn" :disabled="!isApproveBtn" v-if="checkUser(userId,'write') && strgTestType != '7D'">결재보기</button>
                            <button type="button" class="btn btn_md btn_outline btn_darkgray" @click="aprvSg" :disabled="isApproveBtn" v-if="checkUser(userId,'write') && strgTestType != '7D'">결재상신</button>
                            <button type="button" class="btn btn_md btn_outline btn_darkgray" @click="testComplete" :disabled="isApproveBtn" v-if="checkUser(userId,'write') && strgTestType == '7D'">시험완료</button>
                            <button type="button" class="btn btn_md btn_outline btn_darkgray" @click="fn_changePage('write')" :disabled="isUpdateBtn" v-if="checkUser(userId,'change')">수정</button>
                            <button type="button" class="btn btn_md btn_outline btn_darkgray" 
                                @click="$router.push({
                                    name: 'SelectCurrentStrgTab'
                                })" >목록
                            </button>
                        </template>
                    </template>
                    
                </div>
            </div>
            <div v-if="compTest">
                <label class="input_radio">
                    <input type="radio"  name="brkgCompRadio" value="b" v-model="brkgCompRadio">
                    <span class="label_text">파괴하중 입력</span>
                </label>
                <label class="input_radio">
                    <input type="radio"  name="brkgCompRadio" value="c" v-model="brkgCompRadio">
                    <span class="label_text">압축강도 입력</span>
                </label>
            </div>
            <!-- ibsheet -->
            <div class="ib_wrap" style="height: calc(100vh - 275px)">
                <div id="compStrgSetUpWriteSheet" class="ibsheet_table" style="height:100%"></div>
            </div>

            <!-- 사진대장 파일 팝업 -->
            <b-modal
            id="photoModal"
            title="사진대장 파일" 
            hide-backdrop
            size="lg"
            :footer-bg-variant="footerBg"
            >
                <template #default>
                    <div class="pop_container">
                        <LstImg
                            :lst-file-rst="tmpFileRst"
                            :files="tmpFiles"
                            :copied-file-ids="tmpCopiedFileIds"
                            :copied-files="tmpCopiedFiles"
                            @file-removed="fileRemoved"
                            @file-changed="(payload) => {tmpFiles = payload.file;}"
                            @copied-file-changed="(payload) => {tmpCopiedFileIds = payload.copyIds; tmpCopiedFiles = payload.copy;}"
                            :second-remove-file-id="tmpDelFileLst"
                            :uploadable="compTest"
                            :copyable="compTest"
                            :downloadable="!compTest"
                            :limit-total-file-size="1024*1024*300"
                            :accept-extn="['png', 'gif', 'jpeg', 'jpg', 'bmp']"
                            :file-type="'compStrgSetupPopupQltyPicturePop'"
                            :set-style="'margin: 0 5px 5px 0;'"
                        />
                    </div>
                </template>
                <template #modal-footer>
                    <template v-if="compTest">
                        <b-button
                        class="btn btn_md btn_outline btn_darkgray"
                        @click="saveFile"
                        >
                        저장
                        </b-button>
                        <b-button
                        class="btn btn_md btn_outline btn_gray"
                        @click="$bvModal.hide('photoModal')"
                        >
                        취소
                        </b-button>
                    </template>
                    <template v-else>
                        <b-button
                        class="btn btn_md btn_outline btn_gray"
                        @click="$bvModal.hide('photoModal')"
                        >
                        닫기
                        </b-button>
                    </template>
                </template>
            </b-modal>

             <Approve
                ref-id="ApproveModal_CompStrgSetUpView"
                :code-type="approve.codeType"
                :code-dtl-type="approve.codeDtlType"
                :doc-seq="approve.docSeq"
                :doc-name="approve.docName"
                :doc-type="approve.docType"
                :main-code-id="approve.mainCodeId"
                :mid-code-id="approve.midCodeId"
                :request-id="approve.requestId"
                :file-type="approve.fileType"
                :site-mstr-id="approve.siteMstrId"
                @callback="fn_setSourceApproval"
                alertable
            />

            <approval-view
                ref-id="AprvViewModal"
                :aprv-info-id="aprvInfoId"
                :requestId="concCompStrgLstIds[0]"
                fileType="ConcreteMngt"
            />

        </div>
    </div>
</template>

<script>
    import API from '@/apis/'
    import { ConcretePourresult } from '@/pages/common/data/MaterialsList';
    import MsgBoxMixins  from '@plugin/mixin/MsgBox.mixins.js'
    import LstImg from '@/pages/common/popup/LstImg';
    import { sendPostApi, requestOptions, requestFileOptions, sendFileApi } from '@/apis/common'
    import { commonFn } from '@/script/commonFn.js'
    import _ from 'lodash'
    import authCheckMixns  from '@plugin/mixin/AuthCheck.js'
    import loader from '@ibsheet/loader';
    import Approve from '@modal/approval/Approve.vue'
    import ApprovalView from '@modal/approval/ApprovalView.vue'
    import { mapGetters } from 'vuex';

   export default {
        name: 'CompStrgSetUpWrite',
        mixins: [MsgBoxMixins, authCheckMixns],
        components: {
            LstImg,
            Approve,
            ApprovalView,
        },
        computed:{
            ...mapGetters({
                'compStrg': 'conc/getCompStrg'
            })
        },
        data: () => ({
            footerBg: 'transparent',
            approve : {},               // 결재상신 정보
            concCompStrgLstIds : [],    // 강도관리 리스트 ID
            brkgCompRadio: 'b',         // 입력 구분 (파괴하중 / 압축강도)
            passStandard : '',          // 합격 기준
            strgTestType : '',          // 시험 종류
            strgTestTypeNm : '',        // 시험 종류명
            lstFileRst : {},            // 저장된 사진대장
            tmpFileRst : [],            // (임시) 저장된 사진대장
            files: {},                  // 추가된 사진대장
            tmpFiles: [],               // (임시) 추가된 사진대장
            delFileLst : {},            // 삭제된 사진대장  
            tmpDelFileLst : [],         // (임시)삭제된 사진대장
            tmpCopiedFileIds : [],
            tmpCopiedFiles : [],
            copiedFileIds : {},
            copiedFiles : {},
            selectRow: null,            // 선택된 행
            strgTestStatus: '',         // 진행 상태
            strgSheet : null,           // 강도관리 시트
            compTest : false,           // 등록 / 상세 페이지 구분값
            userId : '',                // 로그인 유저 ID
            isApproveBtn : false,       // 결재 버튼 여부
            isUpdateBtn : false,        // 수정 버튼 여부
            docSeq : null,              // 결재 문서
            aprvInfoId : null,          // 결재 문서
        }),

        watch : {
            'brkgCompRadio': {    // 입력 구분 변경 ( b : 파괴하중 / c : 압축강도 )
                handler() {
                    if(this.brkgCompRadio === 'b'){
                        const rowData = this.strgSheet.getDataRows()
                        rowData.map(row =>{
                           this.strgSheet.setAttribute(row, "concCompStr", "CanEdit", 0, 1)
                           this.strgSheet.setAttribute(row, "concBrkgLoad", "CanEdit", 1, 1)
                        })
                    } else if(this.brkgCompRadio === 'c'){
                        const rowData = this.strgSheet.getDataRows()
                        rowData.map(row =>{
                            this.strgSheet.setAttribute(row, "concCompStr", "CanEdit", 1, 1)
                            this.strgSheet.setAttribute(row, "concBrkgLoad", "CanEdit", 0, 1)
                        })
                    }
                }
            }
        },

        async created () {
            if(this.compStrg.concCompStrgLstIds){   // 강도관리 ID 여부 확인
                this.concCompStrgLstIds = this.compStrg.concCompStrgLstIds
                this.userId = this.$store.getters['auth/getUserId']
                this.compTest = this.compStrg.compTest   // 상세 / 저장 페이지 구분 
            } else {
                this.$store.dispatch('tabInfo/setSavePage',this.$route.name);   // 조회할 ID값이 없을경우 리스트 페이지로 이동
                this.$router.push({name: 'SelectCurrentStrgTab'});
                return;
            }
        },

        mounted(){
            /* 시트 생성 */
            if(this.compTest){   // 저장 / 상세 페이지 구분
                this.createSheetLst('write')
            }else{
                this.createSheetLst('view')
            }
        },

        beforeDestroy() {
            /* 시트 삭제 */
            if (this.strgSheet)  loader.removeSheet(this.strgSheet)
        },

        methods: {
             /* 강도관리 시트 */
            createSheetLst (type) {
                let col = _.clone(ConcretePourresult.options.Cols)
                let canEdit = 0

                if(type == 'write'){ // 등록 화면
                    canEdit = 1
                    col.push(
                        { Name: 'fileImageRgt', Header: [{ Value: '사진대장' }],  CanEdit: 0, Format: {"0": "<button type='button' class='btn_input'>입력</button>","1": "<button type='button' class='btn_view'>보기</button>"}, RelWidth: 7 , Width: 100, CanSort: 0 },
                    )
                }else{               // 상세화면
                     col.push(
                        { Name: 'fileImageRgt', Header: [{ Value: '사진대장' }],  CanEdit: 0, Format: {"0" : '-', "1": "<button type='button' class='btn_view'>보기</button>"}, RelWidth: 7 , Width: 100, CanSort: 0 },
                    )
                }

                loader.createSheet({
                    el: 'compStrgSetUpWriteSheet',
                    data: [],
                    options: {
                        Cols : col,
                        Cfg: {
                            NoVScroll: 0,
                            CanEdit : canEdit
                        },
                        Events: {
                            onAfterClick : this.clickgridData,
                            onAfterChange : this.afterCellChange,
                            onRenderFirstFinish: () => {
                                this.getStrgMngtDetail() // 강도관리 상세 조회
                            },
                        }
                    }
                }).then((sheet) => {
                    this.strgSheet = sheet
                });
            },
            
            /* write / view 페이지 전환 */
            fn_changePage(type){
                if(type == 'write'){
                    this.compTest = true
                    this.createSheetLst('write')
                }else{
                    this.compTest = false
                    this.createSheetLst('view')
                }
            },
           
            /* 상세 데이터 merge */
            setRowChangeEvt(){
                const allRows = this.strgSheet.getDataRows()

                let merge = _.uniqBy(allRows,'concCompStrgLstId')                                  // Merge 수량
                let idx = allRows[0]                                                               // 1번째 row
                let lotIdx = allRows[0]                                                            // 1번째 lot

                
                let comp = ['fileImageRgt','passStandard','tTApS','sTxApD','docSeq']   // 표준형
                let demold = ['fileImageRgt','docSeq']                                 // 탈형
                let menu = comp
                

                allRows.forEach((item, index) => {
                    
                    if(lotIdx.concLotNum != item.concLotNum || lotIdx.concCompStrgLstId != item.concCompStrgLstId){  // 로트단위 (조 / 평균 압축강도 / 합격여부)
                        this.strgSheet.setMergeRange(lotIdx, 'strgTestDt', allRows[index-1], 'strgTestDt')
                        this.strgSheet.setMergeRange(lotIdx, 'concLotNum', allRows[index-1], 'concLotNum')
                        this.strgSheet.setMergeRange(lotIdx, 'lotAvgStrCorc', allRows[index-1], 'lotAvgStrCorc')
                        lotIdx = allRows[index]
                    }else if(index == (allRows.length-1)){
                        this.strgSheet.setMergeRange(lotIdx, 'strgTestDt', allRows[index], 'strgTestDt')
                        this.strgSheet.setMergeRange(lotIdx, 'concLotNum', allRows[index], 'concLotNum')
                        this.strgSheet.setMergeRange(lotIdx, 'lotAvgStrCorc', allRows[index], 'lotAvgStrCorc')
                    }

                    // if(idx.strgTestType == 'DEMOLD'){  // 시험종류 - 탈형
                    //     menu = demold

                    //     if((index+1) % 3 == 0){   // 조단위 (조 / 평균 압축강도 / 합격여부)
                    //         this.strgSheet.setMergeRange(allRows[index-2], 'passStandard', item, 'passStandard')
                    //         this.strgSheet.setMergeRange(allRows[index-2], 'tTApS', item, 'tTApS')
                    //         this.strgSheet.setMergeRange(allRows[index-2], 'sTxApD', item, 'sTxApD')
                    //         this.strgSheet.setMergeRange(allRows[index-2], 'strgTestDt', item, 'strgTestDt')
                    //     }
                    // }else{ // 시험종류 - 표준형
                    //     menu = comp
                    // }

                    if((index+1) % 3 == 0){   // 조단위 (조 / 평균 압축강도 / 합격여부)
                        this.strgSheet.setMergeRange(allRows[index-2], 'concAtclNum', item, 'concAtclNum')
                        this.strgSheet.setMergeRange(allRows[index-2], 'atcAvgStrCorc', item, 'atcAvgStrCorc')
                        this.strgSheet.setMergeRange(allRows[index-2], 'passYn', item, 'passYn')
                    }

                    if(merge.length > 1){     // merge 수량 2이상일 경우
                        if(idx.concCompStrgLstId != item.concCompStrgLstId){
                            for (let menuItem of menu) {
                                this.strgSheet.setMergeRange(idx, menuItem, allRows[index-1], menuItem) // merge 범위 지정
                            }
                            this.fn_fileInfo(idx) // 사진 조회
                            idx = allRows[index]
                        }else if(index == (allRows.length-1)){
                            for (let menuItem of menu) {
                                this.strgSheet.setMergeRange(idx, menuItem, allRows[index], menuItem) // merge 범위 지정
                            }
                            this.fn_fileInfo(idx)  // 사진 조회
                        }
                    }
                })

                if(merge.length == 1){   // 1개인 경우 전체 merge
                    menu.forEach(menuItem => {
                        this.strgSheet.setMergeRange(allRows[0], menuItem, allRows[allRows.length-1], menuItem)
                    })
                    this.fn_fileInfo(idx) // 사진 조회
                }


            },

            /* 사진대장 조회 */
            async fn_fileInfo(data){
                let payload = {
                    fileConnectId : data.concCompStrgLstId,
                    fileType: 'ConcreteMngtImg',
                }
                
                this.lstFileRst['strg_'+data.concCompStrgLstId] = []

                try { 
                    await API.concrete.loadFileInfo(payload).then( fileRst =>{
                        if(typeof fileRst.data != 'undefined' && fileRst.data != null){
                            this.lstFileRst['strg_'+data.concCompStrgLstId] = fileRst.data
                        }
                    })
                } catch (error) {
                    console.error('파일 불러오기 에러 : ', error)
                }
            },
                            
            /* 강도관리 상세 정보 조회 */
            async getStrgMngtDetail() {
                // 데이터 초기화
                this.lstFileRst = {}            // 저장된 사진대장
                this.files      = {}            // 추가된 사진대장
                this.delFileLst = {}            // 삭제된 사진대장  
                this.copiedFileIds  = [];

                const payload = {
                    concCompStrgLstIds : this.concCompStrgLstIds
                }
                try {
                    await API.concrete.getStrgMngtDetail(payload).then(async rst => {
                        if(typeof rst.data != 'undefinded'){
                            if(rst.data.length > 0){
                                this.strgTestType = rst.data[0].strgTestType        // 시험 종류
                                this.strgTestTypeNm = rst.data[0].strgTestTypeNm    // 시험 종류명
                                this.passStandard = rst.data[0].passStandard        // 합격 기준
                                this.strgTestStatus = rst.data[0].strgTestStatus    // 진행 상태
                                this.docSeq = rst.data[0].docSeq                    // 시험번호
                                this.aprvInfoId = rst.data[0].aprvInfoId            // 결재 ID
                                
                                this.isApproveBtn = rst.data[0].strgTestStatus !== 'APRV' && rst.data[0].strgTestStatus !== 'APVL' ? false : true  // 결재상신 여부
                                this.isUpdateBtn = rst.data[0].strgTestStatus !== 'APRV' && rst.data[0].strgTestStatus !== 'APVL' ? false : true   // 수정버튼 여부

                                await rst.data.forEach(row => {
                                    // 시험종류 (타설량)
                                    row.tTApS = `<br>                           
                                                    <span class="label_text">
                                                    ${row.strgTestTypeNm}
                                                    </span>
                                                <br>
                                                <br>
                                                    <span class="label_text">
                                                        (${row.pourSupply}㎥)
                                                    </span>
                                                <br>
                                                <br>
                                                    <span class="label_text">
                                                        ${row.pourOption}
                                                    </span>
                                                <br>`
                                    // 시험예정일 (타설일)
                                    row.sTxApD = `<br>
                                                     <span class="label_text">
                                                         ${row.strgTestExpDt}
                                                     </span>
                                                 <br>
                                                 <br>
                                                     <span  class="label_text">
                                                         (${row.pourDay})
                                                     </span>
                                                 <br>
                                                 <br>`
                                    // 합격 기준
                                    row.passStandard = `<br>
                                                            <span class="label_text">
                                                                ${parseFloat(row.passStandard).toFixed(2)} ㎫ 이상
                                                            </span>
                                                        <br>`
                                })

                                this.strgSheet.loadSearchData({
                                    data: rst.data,  // strgSheet 데이터 세팅
                                })

                                this.strgSheet.options.Cfg.CanEdit = 0
                            }
                            this.setRowChangeEvt()  // 데이터 merge
                        }
                    })
                } catch (error) {
                    console.error('강도관리 상세조회 에러: ', error)
                }
            },

            /* 시트 click */
            async clickgridData (evt) {
                
                // 사진대장 선택시
                if(evt.col === 'fileImageRgt') {
                    // 상세화면 - 사진파일 없는경우 return
                    if((!this.compTest) && evt.row.fileImageRgt == 0){      
                        return
                    }

                    // 선택된 시험 ID값 저장
                    this.selectRow = evt.row
                    let concCompStrgLstId = evt.row.concCompStrgLstId
                    
                    // tempFiles 값 가져오기
                    if(typeof this.files['strg_'+concCompStrgLstId] == 'undefined'){
                        this.tmpFiles = []
                    }else{
                        this.tmpFiles = _.cloneDeep(this.files['strg_'+concCompStrgLstId])
                    }

                    if(typeof this.lstFileRst['strg_'+concCompStrgLstId] == 'undefined'){
                        this.tmpFileRst = []
                    }else{
                        this.tmpFileRst = _.cloneDeep(this.lstFileRst['strg_'+concCompStrgLstId])
                    }

                    if(typeof this.copiedFiles['strg_'+concCompStrgLstId] == 'undefined' && typeof this.copiedFileIds['strg_'+concCompStrgLstId] == 'undefined'){
                        this.tmpCopiedFileIds = [];
                        this.tmpCopiedFiles = [];
                    }else{
                        this.tmpCopiedFileIds = _.cloneDeep(this.copiedFileIds['strg_'+concCompStrgLstId])
                        this.tmpCopiedFiles = _.cloneDeep(this.copiedFiles['strg_'+concCompStrgLstId])
                    }

                    this.$bvModal.show('photoModal')
                }
            },

            /* 사진대장 저장 */
            saveFile(){
                let concCompStrgLstId = this.selectRow.concCompStrgLstId

                // tepFiles에 변동된 files 값 담기
                this.files['strg_' + concCompStrgLstId]      = _.cloneDeep(this.tmpFiles)               // 파일 리스트
                this.lstFileRst['strg_' + concCompStrgLstId] = _.cloneDeep(this.tmpFileRst)             // 기존 파일 리스트
                this.delFileLst['strg_' + concCompStrgLstId] = _.cloneDeep(this.tmpDelFileLst)          // 삭제 파일 리스트
                this.copiedFileIds['strg_' + concCompStrgLstId] = _.cloneDeep(this.tmpCopiedFileIds)    // 품질사진 파일 아이디 리스트
                this.copiedFiles['strg_' + concCompStrgLstId] = _.cloneDeep(this.tmpCopiedFiles)        // 품질사진 파일 리스트


                if(this.tmpFiles.length + this.tmpFileRst.length + this.tmpCopiedFileIds.length > 0){
                    this.strgSheet.setValue(this.selectRow, 'fileImageRgt', 1)  // 형변환
                }else{
                    this.strgSheet.setValue(this.selectRow, 'fileImageRgt', 0)  // 형변환
                }

                this.$bvModal.hide('photoModal')
            },

            /* 사진대장 삭제 */
            async fileRemoved(id){  
                // 삭제할 파일 ID 값 저장
                this.tmpDelFileLst =  id
            },

            /* 시험 값 입력시 */
            afterCellChange (evt) {
                let rowData = evt.sheet.getRowValue(evt.row)             // 입력된 행 데이터 가져오기
                
                let concBeingPartial = 0.00  // 단면적
                let concCompStr = 0.00       // 압축강도
                let concBrkgLoad = 0.00      // 파괴하중

                // 단면적 계산식
                if(!commonFn.methods.isEmpty(rowData.concDiameter)){   // 직경 여부 확인
                    let concDiameter = (parseFloat(rowData.concDiameter) / 2);
                    concBeingPartial = ((concDiameter * concDiameter) * 3.14).toFixed(2)

                    evt.sheet.setValue(evt.row, 'concBeingPartial', isNaN(concBeingPartial) ? '' : parseFloat(concBeingPartial))
                }else{
                    evt.sheet.setValue(evt.row, 'concBeingPartial', concBeingPartial)
                }
              
                if(this.brkgCompRadio === 'b') {       // 파괴하중 입력(b)
                    if(commonFn.methods.isEmpty(rowData.concDiameter) || rowData.concDiameter == 0){
                        evt.sheet.setValue(evt.row, 'concCompStr', '')
                    }else{
                        concCompStr = (parseFloat(rowData.concBrkgLoad) / parseFloat(concBeingPartial)).toFixed(2)
                        evt.sheet.setValue(evt.row, 'concCompStr', isNaN(concCompStr) ? '' : parseFloat(concCompStr))
                    }
                }else if(this.brkgCompRadio === 'c'){  // 압축강도 입력(c)
                    if(commonFn.methods.isEmpty(rowData.concDiameter) || rowData.concDiameter == 0){
                        evt.sheet.setValue(evt.row, 'concBrkgLoad', '')
                    }else{
                        concCompStr = rowData.concCompStr
                        concBrkgLoad = (parseFloat(concCompStr) * parseFloat(concBeingPartial)).toFixed(2)
                        evt.sheet.setValue(evt.row, 'concBrkgLoad', isNaN(concBrkgLoad)? '' : parseFloat(concBrkgLoad))
                    }
                }

                //보정압축강도 계산
                let corcCompStr =  (parseFloat(concCompStr) * parseFloat(rowData.concStrCorcCnt)).toFixed(2);

                if(corcCompStr){
                    evt.sheet.setValue(evt.row, 'corcCompStr', isNaN(corcCompStr) ? '' : parseFloat(corcCompStr))
                }else{
                    evt.sheet.setValue(evt.row, 'corcCompStr', '')
                }

                const allRows = evt.sheet.getDataRows()
                
                let avg = 0          // 평균값
                let seq = 0          // 조 number
                let empty = false    // 조 내 빈값 여부

                if(evt.row.SEQ % 3 == 0){
                    seq = evt.row.SEQ / 3
                }else{
                    seq = parseInt(evt.row.SEQ / 3) + 1
                }

                let max = (seq*3)  // 조 최대값
                let min = max - 2  // 조 최소값

                for(let i = min; i < max+1; i++){
                    let num = 0

                    if((allRows[i-1].concBrkgLoad).toString() == ''  || (allRows[i-1].concCompStr).toString() == ''|| (allRows[i-1].concBeingPartial).toString() == ''){ 
                        empty = true
                    }else{
                        num = parseFloat(allRows[i-1].corcCompStr)
                    }
                    avg += num
                }

                // lot 평균 구하기
                let data = allRows.filter( filterRow => filterRow.concLotNum == evt.row.concLotNum && filterRow.concCompStrgLstId == evt.row.concCompStrgLstId)
                let compStr = data.map( mapRow => mapRow.corcCompStr)
                let lotAvg = 0

                if(isNaN(evt.val) || evt.val < 0 || evt.val.toString() == '' || evt.val == null){  // 문자 변경
                    evt.sheet.setValue(evt.row, evt.col, '')
                    evt.sheet.setValue(evt.row, 'concCompStr', '')
                    evt.sheet.setValue(evt.row, 'concBrkgLoad', '')
                    evt.sheet.setValue(evt.row, 'corcCompStr', '')
                    evt.sheet.setValue(allRows[min-1], 'atcAvgStrCorc', '')
                    evt.sheet.setValue(allRows[min-1], 'passYn', '')
                    
                    data.forEach(row => {
                        evt.sheet.setValue(row , 'lotAvgStrCorc', '')
                    })
                    
                    return
                }

                // 시험일자
                data.forEach(row => {
                    row.strgTestDt = data[0].strgTestDt
                })

                if(compStr.indexOf(null) == -1 && compStr.indexOf("") == -1){
                    lotAvg = compStr.reduce((a, b) => a + b, 0) / compStr.length

                    data.forEach( row => {
                        evt.sheet.setValue(row , 'lotAvgStrCorc', lotAvg.toFixed(2))
                    })
                }else{
                    data.forEach( row => {
                        evt.sheet.setValue(row , 'lotAvgStrCorc', '')
                    })
                }

               
                
                if(!empty){
                    avg = (avg / 3).toFixed(2)
                    evt.sheet.setValue(allRows[min-1], 'atcAvgStrCorc', isNaN(avg) ? '' : parseFloat(avg))
                    const passYnCheck = ((avg / Number(this.passStandard)) * 100);
                    
                    if(this.strgTestTypeNm == '7일'){
                        if(passYnCheck >= 70){
                            evt.sheet.setValue(allRows[min-1], 'passYn', 'Y')
                        } else {
                            evt.sheet.setValue(allRows[min-1], 'passYn', 'N')
                        }
                    }else{
                        if(passYnCheck >= 100){
                            evt.sheet.setValue(allRows[min-1], 'passYn', 'Y')
                        } else {
                            evt.sheet.setValue(allRows[min-1], 'passYn', 'N')
                        }
                    }
                }else{
                    evt.sheet.setValue(allRows[min-1], 'atcAvgStrCorc', '')
                    evt.sheet.setValue(allRows[min-1], 'passYn', '')
                }
            },

            async saveData() {  // 저장
                const saveJson = this.strgSheet.getSaveJson({
                    saveMode: 0
                }).data.filter(item => item.STATUS !== 'Deleted')

                let avg = ''               // 조 평균
                let passYn = ''            // 합격여부
                let saveValidation = true; // 유효성 체크

                await saveJson.forEach((row,index) => {
                    
                    if((index+1) % 3 == 1){
                        avg = row.atcAvgStrCorc
                        passYn = row.passYn
                    }else{
                        row.atcAvgStrCorc = avg
                        row.passYn = passYn
                    }
                    // row.atcAvgStrCorc = saveJson[0].atcAvgStrCorc
                })

                saveJson.some((row) => {
                    if(commonFn.methods.isEmpty(row.strgTestDt)){
                        this.alert("시험일자를 선택해주세요.");
                        saveValidation = false;
                        return true;
                    }
                });

                if(!saveValidation) {
                    return
                }

                try {
                    this.confirm('강도관리 시험 결과를 저장하시겠습니까?', async () => {
                        const result = await API.concrete.updateCompStrgInfo(saveJson)
                        if(result.data === '0000') {
                            let resultData = true;
                           
                            for(var i of Object.keys(this.files)){     // 파일 등록
                                let files = this.files[i]
                                let secondRemoveFileId = this.delFileLst[i]
                                let copiedFileIds = this.copiedFileIds[i];

                                if(files == 'undefined' || files == null){
                                    files = [];
                                }

                                if(secondRemoveFileId == 'undefined' || secondRemoveFileId == null){
                                    secondRemoveFileId = []
                                }

                                //파일 수정 여부 체크
                                if((files.length > 0 || secondRemoveFileId.length > 0)||(copiedFileIds && copiedFileIds.length > 0)){
                                    let connetId = i.replace('strg_','')
                                    //파일 추가
                                    if((files && files.length > 0)||(copiedFileIds && copiedFileIds.length >0)){
                                        requestFileOptions.headers['Authorization'] = this.$cookies.get("Authorization")
                                        const subResponse = await sendFileApi(connetId, "ConcreteMngtImg", files,null,copiedFileIds)
                                        
                                        if(subResponse.status == '200'){
                                        }
                                        else{
                                            resultData = false;
                                        }
                                    }
                                    //파일 삭제
                                    if(secondRemoveFileId && secondRemoveFileId.length > 0){
                                        let url = '/sendApi/api/file/fileUnUse';
                                        let payload = {
                                            fileType : "ConcreteMngtImg",
                                            fileQltArcvIds : secondRemoveFileId,
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
                                }
                            }

                            // 파일 저장 여부 확인
                            if(resultData){
                                this.alert('저장되었습니다.',()=>{
                                    this.copiedFileIds = {};
                                    this.copiedFiles = {};
                                    this.$store.dispatch('tabInfo/setSavePage', this.$route.name)
                                    this.brkgCompRadio = 'b' 
                                    if(this.concCompStrgLstIds.length > 1){ 
                                        this.fn_changePage('write')  // 복수 입력 - 등록 페이지 유지
                                    }else{
                                        this.fn_changePage('view')  // 그외 - 상세페이지 이동
                                    }
                                });
                            }
                            else{
                                this.alert('저장에 실패했습니다.');
                            }
                        }
                    })
                } catch (error) {
                    this.alert('저장에 실패했습니다.');
                    console.error('저장에 실패했습니다.', error)
                }
            },

            async testComplete() {  // 시험 완료 (7일 시험)
                let check = false 
                let data = this.strgSheet.getDataRows()

                check = data.some( item => {
                    if(commonFn.methods.isEmpty(item.passYn)){
                        this.alert('합격여부를 확인해주세요')
                        return true
                    }
                })

                if(check){ 
                    return
                }

                try {
                    this.confirm('완료하시면 시험결과 수정이 불가능합니다. \n 완료하시겠습니까?', async () => {
                        let param = {
                            'strgTestStatus' : 'APRV',                          // 결재완료
                            'aprvInfoId' : this.concCompStrgLstIds[0],          // 결재상신 ID = 강도관리ID
                            'concCompStrgLstId' : this.concCompStrgLstIds[0]    // 강도관리ID
                        }

                        await API.concrete.concreteCompStatusInfoChange(param).then(rst => {
                            if(rst.resultCode == '0000'){
                                this.$store.dispatch('tabInfo/setSavePage',this.$route.name);
                                this.getStrgMngtDetail();
                            }else{
                                return this.alert('완료에 실패했습니다.');
                            }
                        })
                        
                    })
                } catch (error) {
                    this.alert('완료에 실패했습니다.');
                    console.error('완료에 실패했습니다.', error)
                }
            },

            /** 결재보기 버튼 이벤트 */
            approveViewBtn(){
                this.$bvModal.show('AprvViewModal');
            },

            /* 결재상신 데이터 확인 */
            async aprvSg(){  
                let data = this.strgSheet.getDataRows()

                if(this.concCompStrgLstIds.length > 1){
                    this.isApproveBtn = true
                    return this.alert('복수입력 상태에서는 결재상신 할 수 없습니다.')
                }
                if(this.strgTestStatus != 'CHECK'){ 
                    if(this.strgTestStatus == 'APVL' || this.strgTestStatus == 'APRV'){
                        this.alert('결재중이거나 완료된 건입니다.')
                        return;
                    }else{
                        this.alert('완료되지 않은 건입니다.')
                        return;
                    }
                }else{
                    let check = false 
                    check = data.some( item => {
                        if(commonFn.methods.isEmpty(item.passYn)){
                            this.alert('합격여부를 확인해주세요')
                            return true
                        }
                    })

                    if(check){ 
                        return
                    }
                }

                let type = data[0].strgTestType

                this.approve = {
                    requestId : this.concCompStrgLstIds[0],
                    fileType : 'ConcreteMngt',
                    siteMstrId : this.$store.getters['auth/getSiteMstrId'],
                    mainCodeId : '',
                    midCodeId : '',
                    codeType : 'CCRT',
                    codeDtlType : 'STRG', 
                    docSeq : data[0].docSeq,
                    
                    docType : "CCRT"
                }

                if(['7D', '28D','91D'].includes(type)){
                    this.approve.docName = "콘크리트 압축강도 시험 성과표"
                }else{
                    this.approve.docName = "거푸집 탈형용 압축강도시험 성과표"
                }

                this.$bvModal.show('ApproveModal_CompStrgSetUpView');

            },
            
            /* 결재상신 진행 */
            async fn_setSourceApproval(obj){
                const rowData = this.strgSheet.getDataRows()
                let payload = {
                    'concCompStrgLstId' : this.concCompStrgLstIds[0],  // 강도 ID
                    'aprvInfoId' : obj.aprvInfoId,                     // 결재 ID
                    'docSeq' : rowData[0].docSeq,                      // 문서 번호 
                    'strgTestStatus' : 'APVL'                          // 결재중
                }

                try {
                    const response = await API.concrete.concreteCompStatusInfoChange(payload)
                    if(response.resultCode == '0000'){
                        this.alert('결재상신 되었습니다.',()=>{
                            this.$store.dispatch('tabInfo/setSavePage',this.$route.name);
                            this.$bvModal.hide('ApproveModal_CompStrgSetUpView');
                            this.getStrgMngtDetail();
                        });
                    }
                    
                } catch (error) {
                    console.error('타설 결재상신 수정 오류: ', error)
                }
            },
        }
   }
</script>