<template>
    <div class="tab_contents">
        <div class="inner type">
            <h2 class="sub_title">강도시험 보기
                <div class="fr">
                    <button type="button" class="btn btn_md btn_outline btn_darkgray" @click="approveViewBtn" :disabled="!isApproveBtn" v-if="checkUser(userId,'write')">결재보기</button>
                    <button type="button" class="btn btn_md btn_outline btn_darkgray" @click="aprvSg" :disabled="isApproveBtn" v-if="checkUser(userId,'write')">결재상신</button>
                    <button type="button" class="btn btn_md btn_outline btn_darkgray" @click="goChange" :disabled="isUpdateBtn" v-if="checkUser(userId,'change')">수정</button>
                    <button type="button" class="btn btn_md btn_outline btn_darkgray" @click="routeToList">목록</button>
                </div>
            </h2>
            <!-- 사진대장 파일 팝업 -->
                <b-modal
                id="photoModalView"
                title="사진대장 파일" 
                hide-backdrop
                size="lg"
                :footer-bg-variant="footerBg"
                >
                <template #default>
                    <div class="pop_container">
                        <LstImg
                            :lst-file-rst="lstFileRst[concCompStrgLstId]"
                            :files="files[concCompStrgLstId]"
                            :uploadable="false"
                            :copyable="false"
                            :downloadable="true"
                            @file-removed="()=>{}"
                            :file-type="'compStrgSetupQltyPicturePop'"
                        />
                    </div>
                </template>
                <template #modal-footer>
                    <b-button
                    class="btn btn_md btn_outline btn_gray"
                    @click="$bvModal.hide('photoModalView')"
                    >
                    닫기
                    </b-button>
                </template>
            </b-modal>
            <sqms-grid
                ref="compStrgSetUpWriteSheet"
                id="compStrgSetUpWriteSheet"
                :columns="columns"
                :data="gridData"
                :useCheckbox="false"
                :inputStyle="{height: 'calc(100vh - 250px)'}"
                :cfg="cfg"
                @click="clickgridData"
                @dataLoad="gridDataLoad"
                @renderFinish="setRowChangeEvt"
                @init="initSheet"
            />
            <!-- ibsheet -->
            <!-- <div class="ib_wrap mt10">
                <div id="sheetTable" class="ibsheet_table"></div>
            </div> -->
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
                :requestId="requestId"
                fileType="ConcreteMngt"
            />
        </div>
    </div>
</template>

<script>
    import API from '@/apis/'
    import { ConcretePourresult } from '@/pages/common/data/MaterialsList';
    import MsgBoxMixins  from '@plugin/mixin/MsgBox.mixins.js'
    import Approve from '@modal/approval/Approve.vue'
    import { sendPostApi, requestOptions, requestFileOptions, sendFileApi } from '@/apis/common'
    import VueCookies from 'vue-cookies';
    import axios from 'axios'
    import { commonFn } from '@/script/commonFn.js'
    import _ from 'lodash'
    import LstImg from '@/pages/common/popup/LstImg';
    import authCheckMixns  from '@plugin/mixin/AuthCheck.js'
    import ApprovalView from '@modal/approval/ApprovalView.vue'

   export default {
        name: 'CompStrgSetUpView',
        mixins: [MsgBoxMixins, authCheckMixns],
        components: {
            Approve,
            LstImg,
            ApprovalView,
        },
        data: () => ({
            footerBg: 'transparent',
            approve : {},  // 결재상신 정보
            editingRow: null, // 수정 중인 행
            concCompStrgLstIds : [], //강도관리 리스트 ID
            concCompStrgLstId : null,
            gridData: [], //그리드 데이터
            columns: [], // 그리드 컬럼
            isEditing: false, // 편집 가능한지?
            lstFileRst : {},
            files: {},
            tmpFiles: {},
            delFileLst : {},
            copiedFileIds : [],
            cfg: {},
            brkgCompRadio: 'b',
            passStandard : '',
            strgTestTypeNm : '',
            testYn : 'Y',
            passYn : { //합격여부 종류
                '합격': 'Y',
                '불합격': 'N',
            },
            sheet:null,
            isApproveBtn : null,
            isUpdateBtn: null,
            userId: '',
            aprvInfoId : '',
            requestId : '',
        }),
        async created () {
            if(this.$route.params.concCompStrgLstIds){
                this.columns = this.isEditing ? ConcretePourresult.options.Cols : ConcretePourresult.options.Cols.map(col => { return { ...col, CanEdit: 0 }})
                this.concCompStrgLstIds = this.$route.params.concCompStrgLstIds
                this.aprvInfoId = 
                this.requestId = this.concCompStrgLstIds[0]
                this.cfg = ConcretePourresult.Cfg
                await this.getStrgMngtDetail() //강도관리 입력
                this.userId = this.$store.getters['auth/getUserId']
            } else {
                this.$store.dispatch('tabInfo/setSavePage',this.$route.name);
                this.$router.push({name: 'SelectCurrentStrgTab'});
                return;
            }
            // else{
            //     this.cfg = ConcretePourresult.Cfg
            //     this.routeToList()
            // }
            
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
                        this.getStrgMngtDetail() //강도관리 입력
                    }

                }).catch((e) => {
                    // console.log(e);
                    return e.response;
                });
            }
        },
        methods: {
            initSheet (sheet) {
                this.sheet = sheet
            },
            
            goChange(){
                this.$router.push({ 
                    name: 'CompStrgSetupWrite',
                    params: { concCompStrgLstIds: this.$route.params.concCompStrgLstIds,
                              compTest : false,
                    }
                })
            },
            routeToList() {
                this.$router.push({
                    name: 'SelectCurrentStrgTab'
                })
            },
            gridDataLoad(evt) {
                const rows = evt?.sheet?.getDataRows()
                if(rows) {
                    rows.forEach(row => {
                        evt.sheet.setValue(row, 'passYn', row.passYn === 'N' ? '불합격' : row.passYn === 'Y' ? '합격' : '')
                    })
                }
            },
            /**
             * DataMerge 그리드 로드후 조평균 보정 압축강도 조단위 강제 뭘지
             */
            setRowChangeEvt(evt){
                const allRows = evt.sheet.getDataRows()

                let menu = ['fileImageRgt','passStandard','tTApS','sTxApD','docSeq','strgTestDt']  // Merge 메뉴
                let merge = _.uniqBy(allRows,'concCompStrgLstId')                                  // Merge 수량
                let idx = allRows[0]                                                               // 1번째 row

                if(merge.length == 1){
                    menu.forEach(menuItem => {
                        evt.sheet.setMergeRange(allRows[0], menuItem, allRows[allRows.length-1], menuItem)
                    })
                    this.fn_fileInfo(idx, evt.sheet) // 사진 조회
                }
                
                allRows.forEach((item, index) => {
                    if((index+1) % 3 == 0){   // 조단위 (조 / 평균 압축강도 / 합격여부)
                        evt.sheet.setMergeRange(allRows[index-2], 'concAtclNum', item, 'concAtclNum' )
                        evt.sheet.setMergeRange(allRows[index-2], 'passYn', item, 'passYn' )
                        evt.sheet.setMergeRange(allRows[index-2], 'atcAvgStrCorc', item, 'atcAvgStrCorc' )
                    }
                    
                    if(merge.length > 1){     // merge 수량 2이상일 경우
                        if(idx.concCompStrgLstId != item.concCompStrgLstId){
                            for (let menuItem of menu) {
                                evt.sheet.setMergeRange(idx, menuItem, allRows[index-1], menuItem) // merge 범위 지정
                            }
                             this.fn_fileInfo(idx, evt.sheet) // 사진 조회
                            idx = allRows[index]
                        }else if(index == (allRows.length-1)){
                            for (let menuItem of menu) {
                                evt.sheet.setMergeRange(idx, menuItem, allRows[index], menuItem) // merge 범위 지정
                            }
                            this.fn_fileInfo(idx, evt.sheet)  // 사진 조회
                        }
                    }
                })
            },
            /**
             * fileInfoList
             */
            async fn_fileInfo(data, sheet){
                let payload = {
                    fileConnectId : data.concCompStrgLstId,
                    fileType: 'ConcreteMngtImg',
                }

                this.lstFileRst[data.concCompStrgLstId] = []

                    await API.concrete.loadFileInfo(payload).then( fileRst =>{
                        if(typeof fileRst.data != 'undefined' && fileRst.data != null){
                            this.lstFileRst[data.concCompStrgLstId] = fileRst.data
                            if(fileRst.data.length > 0){
                                let rows = sheet.getDataRows();
                                rows.forEach(item => {
                                    sheet.setValue(item,'fileImageRgt','1');
                                })
                            }
                        }
                    })
            },
            /**
             * 강도관리 시험입력 리스트를 조회합니다.
             */
            async getStrgMngtDetail() {
                const payload = {
                    concCompStrgLstIds : this.concCompStrgLstIds
                }
                try {
                    const response = await API.concrete.getStrgMngtDetail(payload)
                    if(response?.data) {
                        this.aprvInfoId = response.data[0].aprvInfoId
                        this.gridData = response.data.map(row => {
                            let strgTestExpDt, strgTestType
                            if(row.strgTestExpDt) strgTestExpDt = row.strgTestExpDt.split('T')[0]

                            const tTApS = `
                                           <br>
                                            <span 
                                                class="label_text">
                                                ${row.strgTestTypeNm}
                                            </span>
                                           <br>
                                           <br>
                                            <span 
                                                class="label_text">
                                                ${row.pourSupply}㎥
                                            </span>
                                           <br>
                                           <br>
                                            <span 
                                                class="label_text">
                                                ${row.pourOption}
                                            </span>
                                           <br>
                                           `
                            
                            this.strgTestTypeNm = row.strgTestTypeNm
                            const sTxApD = `
                                           <br>
                                            <span 
                                                class="label_text">
                                                ${row.strgTestExpDt}
                                            </span>
                                           <br>
                                           <br>
                                            <span 
                                                class="label_text">
                                                (${row.pourDay})
                                            </span>
                                           <br>
                                           <br>
                                           `
                            const passStandard = `
                                                <br>
                                                    <span 
                                                        class="label_text">
                                                        ${row.passStandard} ㎫ 이상
                                                    </span>
                                                <br>
                                                 `
                            this.passStandard = row.passStandard
                            this.isApproveBtn = row.strgTestStatus !== 'APRV' && row.strgTestStatus !== 'APVL' ? false : true
                            this.isUpdateBtn = row.strgTestStatus !== 'APRV' && row.strgTestStatus !== 'APVL' ? false : true

                            return {
                                ...row,
                                tTApS,
                                sTxApD,
                                fileImageRgt : "",
                                passStandard,
                            }
                        })
                    }
                } catch (error) {
                    console.error('강도관리 상세조회 에러: ', error)
                }
            },
           clickgridData (evt) {   // 클릭 이벤트
                // const rowData = evt.sheet.getRowValue(evt.row)
                if(evt.col === 'fileImageRgt' && evt.event.target.tagName == "BUTTON") {
                    this.concCompStrgLstId = evt.row.concCompStrgLstId
                    

                    this.files[this.concCompStrgLstId] = []
                    this.files[this.concCompStrgLstId] = _.clone(this.tmpFiles[this.concCompStrgLstId])
                    this.copiedFileIds[this.concCompStrgLstId] = _.clone(this.copiedFileIds[this.concCompStrgLstId])

                    this.$bvModal.show('photoModalView')
                }
            },
            async aprvSg(e){  // 결재상신
                if(this.concCompStrgLstIds.length > 1){
                    this.isApproveBtn = true
                    return this.alert('복수입력 상태에서는 결재상신 할 수 없습니다.')
                }
                if(this.gridData[0].strgTestStatus != 'CHECK'){ 
                    if(this.gridData[0].strgTestStatus == 'APVL' || this.gridData[0].strgTestStatus == 'APRV'){
                        this.alert('결재중이거나 완료된 건입니다.')
                        return;
                    }else{
                        this.alert('완료되지 않은 건입니다.')
                        return;
                    }
                }else{
                    let check = false 
                    check = this.sheet.getDataRows().some( item => {
                        if(commonFn.methods.isEmpty(item.passYn)){
                            this.alert('합격여부를 확인해주세요')
                            return true
                        }
                    })

                    if(check){ 
                        return
                    }
                }
                const rowData = this.sheet.getDataRows()

                this.approve = {
                    requestId : this.concCompStrgLstIds[0],
                    fileType : 'ConcreteMngt',
                    siteMstrId : this.$store.getters['auth/getSiteMstrId'],
                    mainCodeId : '',
                    midCodeId : '',
                    codeType : 'CCRT',
                    codeDtlType : 'STRG', 
                    docSeq : rowData[0].docSeq,
                    docName :"거푸집 탈형용 압축강도시험 성과표",   // 임시
                    docType : "CCRT"
                }
                this.$bvModal.show('ApproveModal_CompStrgSetUpView');

            },

            async fn_setSourceApproval(obj){
                const rowData = this.sheet.getDataRows()
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
            /** 결재보기 버튼 이벤트 */
            approveViewBtn(){
                this.$bvModal.show('AprvViewModal');
            },
        }
   }
</script>