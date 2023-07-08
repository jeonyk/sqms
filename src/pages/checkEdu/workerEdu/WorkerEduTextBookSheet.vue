<template>
    <div class="inner type2">
        <div class="button_box">
            <h2>공통 교육</h2>
            <div class="fr">
                <button type="button" class="btn btn_md btn_darkblue btn_outline" @click="commonPlusBtn">교육추가</button>
                <button type="button" class="btn btn_md btn_darkgray btn_outline" @click="commonDeleteBtn">삭제</button>
                <button type="button" class="btn btn_md btn_darkblue btn_outline" @click="commonSaveBtn">저장</button>
            </div>
        </div>
        <!-- ibsheet -->
        <div class="ib_wrap" style="height: calc(50vh - 185px)">
            <div id="workerEduTextBook1Sheet" class="ibsheet_table" style="height: 100%;"></div>
        </div>
        <!-- <sqms-grid
            id="workerEduTextBook1Sheet"
            :columns="columns"
            :data="gridData"
            :cfg="{
                NoVScroll: false,
            }"
            @click="clickgridData"
            @init="initSheet1"
            @renderFinish="setRowDataChange"
            ref="workerEduTextBook1Ref">
        </sqms-grid> -->
        <div class="button_box">
            <h2>공종 교육</h2>
            <div class="mt10">
                <button type="button" class="btn btn_sm btn_sm btn_blue" @click="qrCodeBtn">QR코드 출력</button>
                <div class="fr">
                    <button type="button" class="btn btn_md btn_darkblue btn_outline" @click="mainPlusBtn">교육추가</button>
                    <button type="button" class="btn btn_md btn_darkgray btn_outline" @click="mainDeleteBtn">삭제</button>
                    <button type="button" class="btn btn_md btn_darkblue btn_outline" @click="mainSaveBtn">저장</button>
                </div>
            </div>
        </div>
        <!-- ibsheet -->
        <div class="ib_wrap" style="height: calc(50vh - 185px)">
            <div id="workerEduTextBook2Sheet" class="ibsheet_table" style="height: 100%;"></div>
        </div>
        <!-- <sqms-grid
            id="workerEduTextBook2Sheet"
            :columns="columns2"
            :data="gridData2"
            :cfg="{
                NoVScroll: false,
            }"
            @click="clickgridData"
            @init="initSheet2"
            ref="workerEduTextBook2Ref">
        </sqms-grid> -->
        <div>
            <b-modal
            id="FileWrite"
            title="첨부파일(동영상, PDF) 등록" 
            hide-backdrop
            size="lg"
            >
            <template #default>
                <div class="pop_container">
                <LstFile
                    :downloadable="true"
                    :files="files"
                    :acceptExtn="acceptFileType"
                    :limit-total-file-count="1"
                    :limit-total-file-size="1024*1024*1024*2"
                    @file-changed="fileChanged"
                    @file-removed="fileRemoved"
                    :uploadable="files.length === 0"
                />
                </div>
            </template>
            <template #modal-footer>
                <b-button
                class="btn btn_md btn_outline btn_darkgray"
                @click="saveFile"
                >
                등록
                </b-button>
                <b-button
                class="btn btn_md btn_outline btn_gray"
                @click="$bvModal.hide('FileWrite')"
                >
                닫기
                </b-button>
            </template>
            </b-modal>
            <b-modal
                id="FilelstDetail"
                title="첨부파일(동영상, PDF)" 
                hide-backdrop
                size="lg"
            >
            <template #default>
                <div class="pop_container">
                    <LstFile
                        :downloadable="true"
                        :lst-file-rst="lstFileRst"
                        :files="files"
                        :acceptExtn="acceptFileType"
                        :limit-total-file-count="1"
                        :limit-total-file-size="1024*1024*1024*2"
                        :secondRemoveFileId="secondRemoveFileId"
                        @file-changed="fileChanged"
                        @file-removed="fileRemoved"
                        :uploadable="files.length === 0"                        
                    />
                </div>
            </template>
            <template #modal-footer>
                <b-button
                class="btn btn_md btn_outline btn_darkgray"
                @click="cahngeFile"
                >
                수정
                </b-button>
                <b-button
                class="btn btn_md btn_outline btn_gray"
                @click="$bvModal.hide('FilelstDetail')"
                >
                닫기
                </b-button>
            </template>
            </b-modal>
        </div>
    </div>
</template>
<script>
   import { WorkerTrainingList4, WorkerTrainingList5 } from '@/pages/common/data/InspectionList'
   import loader from '@ibsheet/loader'
   import API from '@/apis/'
   import _ from 'lodash'
   import LstFile from '@/pages/common/popup/LstFile';
   import MsgBoxMixins  from '@plugin/mixin/MsgBox.mixins.js'
   import { sendPostApi, requestOptions, requestFileOptions, sendFileApi } from '../../../apis/common' 
import { mapGetters } from 'vuex'

   export default {
        name: 'WorkerEduTextBookSheet',
        mixins: [MsgBoxMixins],
        components: {
            LstFile,
        },
        computed: {
            ...mapGetters({
                projectId: 'auth/getProjectId',
            }),
        },
        data: function () {
            return {
                columns: [], // 공통교육 그리드 컬럼
                gridData: [], // 그리드 데이터
                sheet: null, // 그리드 시트
                columns2: [], // 공종교육 그리드 컬럼
                gridData2: [], // 그리드 데이터
                sheet2: null, // 그리드 시트
                files: [],
                acceptFileType : [],
                subfiles : [],
                lstFileRst : [],
                secondRemoveFileId: [],
                categoryData: [],
                workerEduMtrlId : '',
                fileSubType: null,
                siteNm : '',
                selQrCodeView : 'one',
                disabled: false,
                ozReport : {
                    src : '',
                }
            }
        },
        async created(){
            // 공통교육 그리드 컬럼 셋팅
            this.columns = WorkerTrainingList4.options.Cols;
            // 공종교육 그리드 컬럼
            this.columns2 = WorkerTrainingList5.options.Cols;
        },
        async mounted(){
            // 교육,공종 그리드 적용 처리            
            await this.getCategoryData();

            // 언어설정 처리            
            await this.getWorkerEduLangList();

            // 교육교재 정보 처리            
            await this.getEduCationList();
        },
        methods: {
            /**
             * 공종 교재 공종 및 세부 공종 셀렉트 옵션 데이터 세팅
             */
             async getCategoryData () {
                const payload = {
                    codeType : 'EDU'
                 }
            
                // 교육 공종/세부공종 정보 가져오기
                const response = await API.workerEdu.getCategoryData(payload)
            
                if (response?.list.length > 0) {
                    this.categoryData = response.list;  

                    //그리드 공종/세부공종 셋팅을 위한 OBJ
                    let optionsObj = {
                        categoryData: this.categoryData,                                // 공종/세부공정 정보                              
                        seperator: '|',                                                 // 구분자
                        key:'CodeId',                                                   // key값
                        value: 'Name',                                                  // 명
                        innerObjectKey: 'midCodeList',                                  // 상속 객체 key값
                        main: this.columns2.find(col => col.Name === 'mainCodeId'),     // 공종 칼럼 정보
                        mid: this.columns2.find(col => col.Name === 'midCodeId')        // 세부공종 컬럼 정보
                    }    

                    optionsObj.main.Enum = `${optionsObj.seperator}${optionsObj.categoryData.map(item => item['main'.concat(optionsObj.value)]).join(optionsObj.seperator)}`
                    optionsObj.main.EnumKeys = `${optionsObj.seperator}${optionsObj.categoryData.map(item => item['main'.concat(optionsObj.key)]).join(optionsObj.seperator)}`
                    optionsObj.main.clear = optionsObj.mid.Name

                    optionsObj.mid.Related = optionsObj.main.Name
                    optionsObj.categoryData.forEach(item => {
                        optionsObj.mid[`Enum${item['main'.concat(optionsObj.key)]}`] = `${optionsObj.seperator}${item[optionsObj.innerObjectKey].map(inner => inner['mid'.concat(optionsObj.value)]).join(optionsObj.seperator)}`
                        optionsObj.mid[`EnumKeys${item['main'.concat(optionsObj.key)]}`] = `${optionsObj.seperator}${item[optionsObj.innerObjectKey].map(inner => inner['mid'.concat(optionsObj.key)]).join(optionsObj.seperator)}`
                    })
                }

            },
            /**
             * 언어설정 리스트 조회
             */
            async getWorkerEduLangList() {
                try {
                    const response = await API.workerEdu.getWorkerEduLangList()
                    if(response?.dlWorkerEduLang){
                        this.setTopFilterOptions(response.dlWorkerEduLang)
                    }
                } catch (error) {
                    console.error('언어 설정 초기 조회 에러 :', error)
                }
            },
             /**
             * 그리드 상단 셀렉트 옵션 데이터를 세팅합니다.
             * 언어 
             */
            setTopFilterOptions (data) {

                // 그리드의 셀렉트 처리 만들기 위한 정보 분리
                const allEduLangList = data.map(item => {
                    return {
                        label: item.langName,
                        value: item.langCode
                    }
                })

                if(this.columns?.length){
                    let langNameCol = this.columns.find(col => col.Name === 'langName');
                    let langNamelabel = allEduLangList.map(item => item.label);
                    let langNameCodes = allEduLangList.map(item => item.value);
                    let langNameEnum = '|' + langNamelabel.join('|');
                    let langNameEnumKeys = '|' + langNameCodes.join('|');
                    langNameCol.EnumKeys = langNameEnumKeys; 
                    langNameCol.Enum = langNameEnum;            
                }
                if(this.columns2?.length){
                    let langNameCol = this.columns2.find(col => col.Name === 'langName');
                    let langNamelabel = allEduLangList.map(item => item.label);
                    let langNameCodes = allEduLangList.map(item => item.value);
                    let langNameEnum = '|' + langNamelabel.join('|');
                    let langNameEnumKeys = '|' + langNameCodes.join('|');
                    langNameCol.EnumKeys = langNameEnumKeys; 
                    langNameCol.Enum = langNameEnum;
                }

            },
            /**
             * 공통 교육 및 공통 교재 불러오기
             */
            async getEduCationList(){
                try {
                    
                    let commonEdu = [];
                    let mainEdu = [];

                    //교육교재 정보 가져오기    
                    const response = await API.workerEdu.getEduCationList();

                    if(response.dlMaterial != null){

                        //공통교육정보
                        commonEdu = response.dlMaterial.filter(item => item.workerEduType === '1');
                        //공종교육정보
                        mainEdu = response.dlMaterial.filter(item => item.workerEduType === '2');

                        // 공통교육 그리드 옶션
                        let options = WorkerTrainingList4.options  
                        // 공통교육 그리드 이벤트 추가
                        options.Events = {
                            onAfterClick : this.clickgridData,
                            onRenderFinish : this.setRowDataChange,
                        }
                        
                        //공통교육 그리드 생성
                        loader.createSheet({
                            el : 'workerEduTextBook1Sheet',
                            data : this.mappingInitGridData(_.cloneDeep(commonEdu)),
                            options : options
                        }).then(sheet => {
                            this.sheet = sheet
                            
                        })

                        // 교육 공종교육 그리드 옵션
                        let options2 = WorkerTrainingList5.options;
                        // 교육 공종교육 그리드 이벤트 추가
                        options2.Events = {
                            onAfterClick : this.clickgridData,
                            onAfterChange: event => {
                                switch(event.col) {
                                    case 'mainCodeId': {
                                        // event.sheet.setAttribute(event.row, , 'Value', '')
                                        event.row.midCodeId = ''
                                        event.sheet.refreshCell(event.row, 'midCodeId')
                                        break
                                    }
                                }
                            },
                        }
                       
                        loader.createSheet({
                            el : 'workerEduTextBook2Sheet',
                            data : this.mappingInitGridData(_.cloneDeep(mainEdu)),
                            options : options2
                        }).then(sheet => {                                                  
                            this.sheet2 = sheet                            
                        })
                    }
                } catch (error) {
                    console.error('공통 교육 및 공통 교재 불러오기 에러 : ',error)
                }                
            },
            /**
             * 초기 그리드를 데이터를 가공합니다.
             */
            mappingInitGridData (data) {
                
                if(!data) return [];

                const mappedData = data.map(row => {                    
                    
                    // 0:등록, 1:보기
                    if(row.videoFileConnectId != null && row.videoFileConnectId != ''){
                        row.videoFileConnectId = 1;
                    }else{
                        row.videoFileConnectId = 0;
                    }

                    if(row.pdfFileConnectId != null && row.pdfFileConnectId != ''){
                        row.pdfFileConnectId = 1;
                    }else{
                        row.pdfFileConnectId = 0;
                    }

                    return {
                        ...row
                    }
                })
                return mappedData
            },
            /**
             * 그리드 로드후 데이터 강제 삽입
             */
            setRowDataChange(evt) {
                const rows = evt.sheet.getDataRows()
                rows.forEach(row => {
                    evt.sheet.setValue(row, 'gubun', '품질')
                })
            },
            /**
             * 그리드 첨부파일 동영상 PDF 등록 클릭시 이벤트
             */
            async clickgridData (evt) {
                
                //행 추가된 row에 파일등록 선택 막음
                if(evt.row.Added != "1"){
                    const rowData = evt.sheet.getRowValue(evt.row)

                    if(evt.col === 'videoFileConnectId') {
                        if(rowData.videoFileConnectId === '0') {                            
                            this.workerEduMtrlId = evt.row.workerEduMtrlId
                            this.fileSubType = 'video'
                            
                            // 파일정보 초기화
                            this.files = [];                   
                            this.lstFileRst = [];
                            this.secondRemoveFileId = [];
                            this.acceptFileType = ['mp4','wav','avi']

                            this.$bvModal.show('FileWrite')
                        }else{
                            this.workerEduMtrlId = evt.row.workerEduMtrlId
                            this.fileSubType = 'video'
                            this.getFileInfoList()
                            
                            // 파일정보 초기화
                            this.files = [];                   
                            this.acceptFileType = ['mp4','wav','avi']
                            this.lstFileRst = [];
                            this.secondRemoveFileId = [];

                            this.$bvModal.show('FilelstDetail')

                        }
                    }
                    if(evt.col === 'pdfFileConnectId') {
                        if(rowData.pdfFileConnectId === '0') {
                            
                            // 파일정보 초기화
                            this.files = [];                   
                            this.lstFileRst = [];
                            this.secondRemoveFileId = [];

                            this.workerEduMtrlId = evt.row.workerEduMtrlId
                            this.fileSubType = 'pdf'
                            this.acceptFileType = ['pdf']
                            this.$bvModal.show('FileWrite')

                        }else{
                            this.workerEduMtrlId = evt.row.workerEduMtrlId
                            this.fileSubType = 'pdf'
                            this.getFileInfoList()
                            
                            // 파일정보 초기화
                            this.files = [];
                            this.acceptFileType = ['.pdf']                   
                            this.lstFileRst = [];
                            this.secondRemoveFileId = [];
                            
                            this.$bvModal.show('FilelstDetail')
                        }
                    }
                }
            },
            /**
             * 공통 교육 교육추가버튼
             */
            async commonPlusBtn() {
                this.sheet.addRow({ next : this.sheet.getFirstRow()})                
                this.sheet.setValue(this.sheet.getFirstRow(), 'gubun', '품질');

            },
            /**
             * 공통 교육 삭제버튼
             */
            commonDeleteBtn() {
                const checkedRows = this.sheet.getRowsByChecked('isCheck')
                this.confirm('교육을 삭제하시겠습니까?', async () => {
                    if(checkedRows.length <= 0) {
                        return this.alert("삭제 할 행을 선택하여주세요.")
                    }
                    this.sheet.deleteRows(checkedRows)
                    checkedRows.forEach(item => {
                        this.sheet.hideRow({
                            row: item,
                            del: false,
                            norender: false
                        })
                    })
                    const payload = this.sheet.getSaveJson({ saveMode: 3 }).data.filter(item => item.STATUS === "Deleted" )
                    payload.forEach(item => {
                        item.status = item.STATUS
                        item.workerEduMtrlId = item.workerEduMtrlId
                        item.workerEduType = "1"
                        item.langCode = item.langName
                        item.mtrlName = item.mtrlName
                    })
                    try {
                        const result = await API.workerEdu.getEduCationChange(payload)
                        if(result.count > 0){
                            this.alert('삭제되었습니다.')
                            this.getEduCationList()
                        }else{
                            this.alert('삭제에 실패하였습니다.')                            
                        }
                    } catch (error) {
                        this.alert('삭제에 실패하였습니다.') 
                        console.error('공통 교육 삭제 에러 : ', error)
                    }
                })
            },
            /**
             * 공통 교육 저장버튼
             */
            async commonSaveBtn() {

                let payload = this.sheet.getSaveJson({
                    saveMode: 3
                })

                //IBsheet 필수 에러
                if(payload.Code != null && payload.Code != ''){
                    if(payload.Message == "RequiredError"){
                        if(payload.col == "langName"){
                            return this.alert('공통교육 언어를 선택해주세요.')
                        }

                        if(payload.col == "mtrlName"){
                             return this.alert('공통교육 교육명을 입력해주세요.')
                        }
                    }
                }

                this.confirm('저장하시겠습니까?', async () => {
                    const failSave = () => {
                        return this.alert('저장에 실패하였습니다.')
                    }
                    try {
                        payload.data.forEach(item => {
                            item.status = item.STATUS
                            item.workerEduMtrlId = item.workerEduMtrlId
                            item.workerEduType = "1"
                            item.langCode = item.langName
                            item.mtrlName = item.mtrlName
                        })                    
                        const result = await API.workerEdu.getEduCationChange(payload.data)
                        if(result.count > 0){
                            this.alert('저장되었습니다.')
                            this.getEduCationList()
                        }else{
                            this.alert('변경된 정보가 없습니다.')
                        }
                    } catch (error) {
                        console.error('공통 교육 저장 에러 : ', error)
                        failSave()
                    }
                })
            },
            /**
             * 공종 교재 교육추가 버튼
             */
            async mainPlusBtn() {
                this.sheet2.addRow({ next : this.sheet2.getFirstRow()})
            },
            /**
             * 공종교재 삭제 버튼
             */
            async mainDeleteBtn() {
                const checkedRows = this.sheet2.getRowsByChecked('isCheck')
                if(checkedRows.length <= 0)return this.alert("삭제 할 행을 선택하여주세요.")
                this.confirm('삭제하시겠습니까?', async () => {
                    this.sheet2.deleteRows(checkedRows)
                    checkedRows.forEach(item => {
                        this.sheet2.hideRow({
                            row: item,
                            del: false,
                            norender: false
                        })
                    })
                    let delMailParam = this.sheet2.getSaveJson({ saveMode: 3 }).data.filter(item => item.STATUS === "Deleted" )
                    delMailParam.forEach(item => {
                        item.status = item.STATUS
                        item.workerEduMtrlId = item.workerEduMtrlId
                        item.workerEduType = "2"
                        item.langCode = item.langName
                        item.mtrlName = item.mtrlName
                    })
                    try {

                        const result = await API.workerEdu.getEduCationChange(delMailParam)
                        if(result.count > 0){
                            this.alert('삭제되었습니다.')
                            this.getEduCationList()
                        }else{
                            this.alert('삭제에 실패하였습니다..')
                            this.getEduCationList()
                        }
                    } catch (error) {
                        this.alert('삭제에 실패하였습니다..')
                        this.getEduCationList()
                        console.error('공통 교육 삭제 에러 : ', error)
                    }
                })
            },
            /**
             * 공종교재 저장버튼
             */
            async mainSaveBtn() {

                let payload = this.sheet2.getSaveJson({
                    saveMode: 3
                })

                //IBsheet 필수 에러
                if(payload.Code != null && payload.Code != ''){
                    if(payload.Message == "RequiredError"){
                        if(payload.col == "mainCodeId"){
                            return this.alert('공종을 선택해주세요.')
                        }

                        if(payload.col == "midCodeId"){
                             return this.alert('세부공종을 선택해주세요.')
                        }

                        if(payload.col == "langName"){
                             return this.alert('공종교육 언어를 선택해주세요.')
                        }

                        if(payload.col == "mtrlName"){
                             return this.alert('공종교육 교육명을 선택해주세요.')
                        }
                    }
                }
                
                this.confirm('저장하시겠습니까?', async () => {
                    const failSave = () => {
                        return this.alert('저장에 실패하였습니다.')
                    }
                    try {
                        
                        payload.data.forEach(item => {
                            item.status = item.STATUS
                            item.workerEduMtrlId = item.workerEduMtrlId
                            item.workerEduType = "2"
                            item.mainCodeId = item.mainCodeId
                            item.midCodeId = item.midCodeId
                            item.langCode = item.langName
                            item.mtrlName = item.mtrlName
                        })
                        
                        const result = await API.workerEdu.getEduCationChange(payload.data)
                        if(result.count > 0){
                            this.alert('저장되었습니다.')
                            this.getEduCationList()
                        }else{
                            this.alert('변경된 정보가 없습니다.')
                        }
                    } catch (error) {
                        console.error('공통 교재 저장 에러 : ', error)
                        failSave()
                    }
                })
            },
            /**
             * File 등록 버튼
             */
            saveFile() {
                //this.file
                if(!this.files.length){
                    this.alert('등록할 파일이 없습니다.')
                    //this.$bvModal.hide('FileWrite')
                }else{
                    if(!this.files?.length && !this.lstFileRst?.length) return this.alert("파일을 선택하여 주세요.")
                    this.confirm('저장하시겠습니까?', async () => {
                        try {
                            requestFileOptions.headers['Authorization'] = this.$cookies.get("Authorization")
                            
                            const result = await sendFileApi(
                                this.workerEduMtrlId, //fileConnectId
                                'WorkerEdu', //fileType
                                this.files,
                                this.fileSubType, //fileSubType
                            )
    
                            
    
                            if(result?.data){
                                if(this.fileSubType === 'video'){
                                    const filePayload = {
                                        workerEduMtrlId : this.workerEduMtrlId,
                                        videoFileConnectId : this.workerEduMtrlId,
                                    }
                                    const resultFile = await API.workerEdu.setEduMtrlFileChange(filePayload)
                                    if(resultFile?.count > 0){
                                        this.getEduCationList()
                                        this.alert('저장 되었습니다.')
                                        this.$bvModal.hide('FileWrite')
                                    }
                                }else{
                                    const filePayload = {
                                        workerEduMtrlId : this.workerEduMtrlId,
                                        pdfFileConnectId : this.workerEduMtrlId,
                                    }
                                    const resultFile = await API.workerEdu.setEduMtrlFileChange(filePayload)
                                    if(resultFile?.count > 0){
                                        this.getEduCationList()
                                        this.files = []
                                        this.lstFileRst = []
                                        this.alert('저장 되었습니다.')
                                        this.$bvModal.hide('FileWrite')
                                    }
                                }
                            }
                        } catch (error) {
                            console.error('시방배합 파일 변경 에러 : ', error)
                            return this.alert('파일 등록에 실패했습니다.')
                        }
                    })
                }
            },
            async getFileInfoList() {
                const payload = {
                    fileConnectId : this.workerEduMtrlId,
                    fileType : 'WorkerEdu',
                    fileSubType: this.fileSubType
                }
                try {
                    const result = await API.concrete.loadFileInfo(payload)
                    
                    if(result?.data){
                        this.lstFileRst = result.data
                    }
                } catch (error) {
                    console.error('파일 불러오기 에러 : ', error)
                }
            },
            /**
             * File 수정 버튼
             */
            cahngeFile(){
                if(this.files.length < 1 && this.secondRemoveFileId.length < 1){
                    this.alert('수정할 파일이 없습니다.');                    
                }else{
                    this.confirm('수정하시겠습니까?', async () => {
                        try {

                            // 삭제할 데이터 처리
                            if(this.secondRemoveFileId.length > 0){
                                const payload = {
                                    fileConnectId : this.workerEduMtrlId,
                                    fileChkEduArcvIds : this.secondRemoveFileId, 
                                    fileType : "WorkerEdu"
                                }

                                //파일 삭제 요청
                                const res_data = await sendPostApi('/sendApi/api/file/fileUnUse', payload);

                                //정상처리가 되었으면
                                if(res_data.status == '200'){
                                    if(this.lstFileRst.length === 0){
                                        // 파일이 전부 삭제 되었을 경우 파일 정보 처리
                                        if(this.fileSubType === 'video'){
                                            const filePayload = {
                                                workerEduMtrlId : this.workerEduMtrlId,
                                                videoFileConnectId : this.workerEduMtrlId,
                                            }                                    
                                            const resultFile = await API.workerEdu.setEduMtrlFileUnuse(filePayload)
                                        }else{
                                            const filePayload = {
                                                workerEduMtrlId : this.workerEduMtrlId,
                                                pdfFileConnectId : this.workerEduMtrlId,
                                            }
                                            const resultFile = await API.workerEdu.setEduMtrlFileUnuse(filePayload)
                                        }
                                    }

                                    this.secondRemoveFileId = [];
                                }else{
                                    return this.alert('수정에 실패했습니다.')
                                }
                            }

                            if(this.files.length > 0){
                                const result = await sendFileApi(
                                    this.workerEduMtrlId, //fileConnectId
                                    'WorkerEdu', //fileType
                                    this.files,
                                    this.fileSubType, //fileSubType
                                )
                                if(result?.data){
                                    if(this.fileSubType === 'video'){
                                        const filePayload = {
                                            workerEduMtrlId : this.workerEduMtrlId,
                                            videoFileConnectId : this.workerEduMtrlId,
                                        }
                                        const resultFile = await API.workerEdu.setEduMtrlFileChange(filePayload)
                                        if(resultFile?.count > 0){
                                            this.files = [];
                                            this.lstFileRst = [];
                                        }else{                                    
                                            return this.alert('수정에 실패했습니다.')
                                        }
                                    }else{
                                        const filePayload = {
                                            workerEduMtrlId : this.workerEduMtrlId,
                                            pdfFileConnectId : this.workerEduMtrlId,
                                        }
                                        const resultFile = await API.workerEdu.setEduMtrlFileChange(filePayload)
                                        if(resultFile?.count > 0){
                                            //this.getEduCationList()
                                            this.files = [];
                                            this.lstFileRst = [];
                                            //return this.alert('PDF 파일 등록에 성공하였습니다.')
                                        }else{
                                            return this.alert('수정에 실패했습니다.')
                                        }
                                    }
                                }
                            }
                            
                            if(this.fileSubType === 'video'){
                                this.alert('Video 파일 수정에 성공하였습니다.')
                            }else if(this.fileSubType === 'pdf'){
                                this.alert('PDF 파일 수정에 성공하였습니다.')
                            }
                            
                            this.getEduCationList();
                            this.$bvModal.hide('FilelstDetail');

                        } catch (error) {
                            console.error('시방배합 파일 변경 에러 : ', error)
                            return this.alert('수정에 실패했습니다.')
                        }
                    })
                }
            },

            /**
             * 변경된 파일
             */
            fileChanged(payload) {
                
                // 새로 추가된 파일 정보
                 this.files = payload
            },
            /**
             * 파일 삭제
             */
            async fileRemoved(id) {                
                // 삭제된 파일 리스트 저장
                this.secondRemoveFileId = id;
            },
            qrCodeBtn () {
                // const length = this.sheet2.getRowsByChecked('isCheck').length
                // if(length <= 0){
                //     return this.alert('QR코드를 출력할 교재를 선택하여주세요.')
                // } 
                // if(length > 0 && length < 2) {
                //     this.selQrCodeView = 'one'
                //     this.disabled = true
                // }
                // if(length > 1 && length < 3) {
                //     this.selQrCodeView = 'two'
                //     this.disabled = true
                // }
                // if(length >= 3 && length < 5) {
                //     this.selQrCodeView = 'three'
                //     this.disabled = true
                // }
                // if(length > 4){
                //     this.selQrCodeView = 'four'
                //     this.disabled = true
                // }
                
                // const rows = this.sheet2.getDataRows();
                // let urlParam = '';
                // rows.forEach(item => {
                //     //if(urlParam[0].length > 0) urlParam + ",";
                //     urlParam += item.mainCodeId + "/" + item.midCodeId + "/" + item.langCode + ",";
                // });
                // /*
                // var popUrl = "http://61.251.164.137:8080/oz80/sample/viewer/eduWorker.jsp?urlParam=" + urlParam;
                // var popOption = "top=10, left=10, width=1000, height=600, status=no, menubar=no, toolbar=no, resizable=no";
                // window.open(popUrl, "WORKER_EDU", popOption);
                // */
                // const url = process.env.VUE_APP_OZ_DOMAIN + process.env.VUE_APP_OZ_PATH
                // this.ozReport.src = url 
                // + '/eduWorker.jsp?' 
                // + 'urlParam='     + urlParam
                // window.open(this.ozReport.src, '_blank')

                // const rows = this.sheet2.getDataRows();
                const rows = this.sheet2.getRowsByChecked('isCheck');
                let urlParam = '';
                rows.forEach(item => {
                    urlParam += item.mainCodeId + "/" + item.midCodeId + "/" + item.langCode + ",";
                });
                
                // const url = process.env.VUE_APP_OZ_DOMAIN + process.env.VUE_APP_OZ_PATH
                this.ozReport.src = this.$store.getters['auth/getOzTypeList'][42].jspNm
                + '&projectId=' + this.projectId
                + '&urlParam='     + urlParam
                window.open(this.ozReport.src, '_blank')               
            }
        }
   }
</script>