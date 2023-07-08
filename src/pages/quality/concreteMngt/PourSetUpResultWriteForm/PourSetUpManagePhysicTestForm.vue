<!--
  * 콘크리트 관리 > 타설관리 > 결과 입력 > 물성시험관리
 -->
<template>
  <div class="lst_data">

	<div class="lst_data">
		<div class="button_box">
			<div class="fr">
				<button type="button" class="btn btn_sm btn_darkgray" @click="fn_addBtn" v-if="isEditable">추가시험 등록</button>
				<button type="button" class="btn btn_sm btn_darkgray" @click="fn_delBtn" v-if="isEditable">호차 삭제</button>
				<button class="btn btn_sm btn_darkblue" @click="saveGridData" v-if="isEditable">저장</button>
			</div>
		</div>

		<!-- ibsheet -->
		<div class="ib_wrap">
			<div id="pourPhysicTestFormSheet" class="ibsheet_table"></div>
		</div>
	</div>

	<b-modal
		id="pourClidFileModal"
		title="염화물 사진(염분지) 등록" 
		hide-backdrop
		size="lg"
		@shown="()=>{isPopupOpen = true}"
		@hidden="()=>{isPopupOpen = false}"
	>
		<template #default>
			<div class="pop_container">
			<LstImg
				:lst-file-rst="fileObj.clidFileList"
				:second-remove-file-id="fileObj.clidDeleteFiles"
				:files="fileObj.clidFiles"
				:copied-file-ids="fileObj.clidCopiedFileIds"
				:copied-files="fileObj.clidCopiedFiles"
				@file-changed="fn_clidFileChange"
				@file-removed="fn_clidFileDelete"
				@copied-file-changed="(payload) => {fileObj.clidCopiedFileIds = payload.copyIds; fileObj.clidCopiedFiles = payload.copy;}"
				:uploadable="isEditable"
				:copyable="isEditable"
				:downloadable="down"
				:file-type="'pourClidPopupQltyPicturePop'"
				:set-style="'margin: 0 5px 5px 0;'"
			/>
				<!-- :limit-file-count="100" -->
			</div>
		</template>
		<template #modal-footer>
			<b-button
			class="btn btn_md btn_outline btn_darkgray"
			v-if="isEditable"
			@click="fn_clidFileSave"
			>
			등록
			</b-button>
			<b-button
			class="btn btn_md btn_outline btn_gray"
			@click="fn_close('pourClidFileModal')"
			>
			닫기
			</b-button>
		</template>
	</b-modal>

	<b-modal
		id="pourBoardFileModal"
		title="사진대지 등록" 
		hide-backdrop
		size="lg"
		@shown="()=>{isPopupOpen = true}"
		@hidden="()=>{isPopupOpen = false}"
	>
		<template #default>
			<div class="pop_container">
			<LstImg
				:lst-file-rst="fileObj.boardFileList"
				:second-remove-file-id="fileObj.boardDeleteFiles"
				:files="fileObj.boardFiles"
				:copied-file-ids="fileObj.boardCopiedFileIds"
				:copied-files="fileObj.boardCopiedFiles"
				@file-changed="fn_boardFileChange"
				@file-removed="fn_boardFileDelete"
				@copied-file-changed="(payload) => {fileObj.boardCopiedFileIds = payload.copyIds; fileObj.boardCopiedFiles = payload.copy;}"
				:uploadable="isEditable"
				:copyable="isEditable"
				:downloadable="down"
				:file-type="'pourBoardPopupQltyPicturePop'"
				:set-style="'margin: 0 5px 5px 0;'"
			/>
				<!-- :limit-file-count="100" -->
			</div>
		</template>
		<template #modal-footer>
			<b-button
			class="btn btn_md btn_outline btn_darkgray"
			v-if="isEditable"
			@click="fn_boardFileSave"
			>
			등록
			</b-button>
			<b-button
			class="btn btn_md btn_outline btn_gray"
			@click="fn_close('pourBoardFileModal')"
			>
			닫기
			</b-button>
		</template>
	</b-modal>

  </div>
</template>

<script>

import API from '@/apis/'
import loader from '@ibsheet/loader'
import MsgBoxMixins  from '@plugin/mixin/MsgBox.mixins.js'
import { ConcretePourwrite } from '@/pages/common/data/MaterialsList'
import { sendPostApi, sendFileApi, requestFileOptions, requestOptions  } from '@/apis/common'
import LstImg from '@/pages/common/popup/LstImg'
import LstFile from '@/pages/common/popup/LstFile';
import authCheckMixns  from '@plugin/mixin/AuthCheck.js'
import _ from 'lodash'

export default {
	name: 'PourSetUpManagePhysicTestForm',
	mixins: [MsgBoxMixins, authCheckMixns],
	components: { LstImg, LstFile } ,
	props: {
		data: {
			type: Object,
			default: undefined
		},
		isEditable: { // 편집 가능한 지?
			type: Boolean,
			default: true
		},
		change: { // 편집 가능한 지?
			type: Boolean,
			default: false
		},
		unuse: { // 편집 가능한 지?
			type: Boolean,
			default: false
		},
		down: { // 편집 가능한 지?
			type: Boolean,
			default: false
		},
	},
	data: () => ({
		gridData: [],
		sheet:null,

		pourOptionPartInfo: {},
		addRowData: {
			concHocha: '',
			concTemp: '',
			case4: '',
			concSlump: '',
			case6: '',
			concAirAmt: '', // 겉보기 공기량
			airAmt: '', // 공기량 (겉보기 공기량 - 골재수정계수)
			clDensity1e: '',
			clDensity2e: '',
			unitConcMix : '',
			unitQty: '',
			unitQtyMin: '',
			passJdt: '',
			isClidPhoto: '0',
			isFileBoard: '0',
			boardFileList: [],
			boardDeleteFiles: [],
			boardFiles: [],
			boardCopiedFileIds:[],
			boardCopiedFiles:[],
			clidFileList: [],
			clidDeleteFiles: [],
			clidFiles: [],
			clidCopiedFileIds:[],
			clidCopiedFiles:[],
		},
		files: [],
		fileUploadingRow: null, // 파일 업로드 중인 row의 정보
		fileUploadfield: '', // 어느 항목 파일 업로드 중인지? [clidPhoto: 염분지, fileBoard: 사진대지]
		concPsptDtlId: 0,
		//파일 추가
		fileConnectId: 0,
		lstFileRst : [],
		secondRemoveFileId: [],
		userId : '',
		concHochaTotalCnt : 0,
		fileObj : {
			selectRow : {},
			boardFileList: [],
			boardDeleteFiles: [],
			boardFiles: [],
			clidFileList: [],
			clidDeleteFiles: [],
			clidFiles: [],
			clidCopiedFileIds:[],
			clidCopiedFiles:[],
			boardCopiedFileIds:[],
			boardCopiedFiles:[],
		},
		siteMstrId : '',
		headerChgLength : 0,
		isPopupOpen:false,
	}),
	mounted () {
		if(!this.data || !this.data.concPourDtlId){
			this.$router.push({
				name: 'PourSetUpSheet'
			})
		}
		this.siteMstrId = this.$store.getters['auth/getSiteMstrId']
		this.getPourOptionPartInfo();
		if(this.isEditable){
			document.addEventListener('change', this.fn_settingsUpdate);
		}
	},
	
	beforeDestroy () {
		if(this.isEditable){
			document.removeEventListener('change', this.fn_settingsUpdate);
		}
	},
	methods: {

		fn_settingsUpdate(e){
			if(this.isPopupOpen){
				return;
			}
			// console.log(e)
			// console.log(e.target.baseURI.indexOf('/pourSetUp/view') > -1)
			
			// if(e.target && e.target.tagName == 'INPUT' && e.target.dataset ){
			if(e.target && e.target.tagName == 'INPUT' && e.target.dataset && e.target.baseURI.indexOf('/pourSetUp/view') > -1 ){

				let pourOptionPartInfo = {
					...this.pourOptionPartInfo
				};

				let inputTarget = e.target;

				//기존값
				let existingValue = _.cloneDeep(pourOptionPartInfo[inputTarget.dataset.code]);

				let msg = '합격기준 ';
				if(inputTarget.dataset.code == 'pcPcalTempMin' || inputTarget.dataset.code == 'pcPcalTempMax'){
					msg = msg + '온도';
				}
				else if(inputTarget.dataset.code == 'pcPcalSlmpMin' || inputTarget.dataset.code == 'pcPcalSlmpMax'){
					msg = msg + '슬럼프';
				}
				else if(inputTarget.dataset.code == 'pcPcalAirMin' || inputTarget.dataset.code == 'pcPcalAirMax'){
					msg = msg + '공기량';
				}
				else if(inputTarget.dataset.code == 'pcPcalClid'){
					msg = msg + '평균 염화물 함량';
				}
				else if(inputTarget.dataset.code == 'pcPcalUnitMin' || inputTarget.dataset.code == 'pcPcalUnitMax'){
					msg = msg + '단위수량';
				}
				else{
					return false;
				}

				//입력값 체크
				if(inputTarget.value == null || inputTarget.value == ""){
					inputTarget.value = existingValue;
					inputTarget.focus();
					return this.alert(msg + '를(을) 입력해주세요.');
				}
				else if(isNaN(parseFloat(inputTarget.value).toFixed(3))){
					inputTarget.value = existingValue;
					inputTarget.focus();
					return this.alert(msg + '에 잘못된 값이 입력되었습니다.\n다시 입력해주세요.');
				}
				else{
					inputTarget.value = Number(parseFloat(inputTarget.value).toFixed(3));
					pourOptionPartInfo[inputTarget.dataset.code] = Number(inputTarget.value);
				}

				if(pourOptionPartInfo.pcPcalTempMin > pourOptionPartInfo.pcPcalTempMax){
					inputTarget.value = existingValue;
					inputTarget.focus();
					return this.alert('합격기준 온도에 잘못된 값이 입력되었습니다.\n다시 입력해주세요.');
				}
				if(pourOptionPartInfo.pcPcalSlmpMin > pourOptionPartInfo.pcPcalSlmpMax){
					inputTarget.value = existingValue;
					inputTarget.focus();
					return this.alert('합격기준 슬럼프에 잘못된 값이 입력되었습니다.\n다시 입력해주세요.');
				}
				if(pourOptionPartInfo.pcPcalAirMin > pourOptionPartInfo.pcPcalAirMax){
					inputTarget.value = existingValue;
					inputTarget.focus();
					return this.alert('합격기준 공기량에 잘못된 값이 입력되었습니다.\n다시 입력해주세요.');
				}
				if(this.data.useUnit == 'Y'){
					if(pourOptionPartInfo.pcPcalUnitMin > pourOptionPartInfo.pcPcalUnitMax){
						inputTarget.value = existingValue;
						inputTarget.focus();
						return this.alert('합격기준 단위수량에 잘못된 값이 입력되었습니다.\n다시 입력해주세요.');
					}
				}

				this.pourOptionPartInfo = pourOptionPartInfo;
				const rows = this.sheet.getDataRows();
				rows.forEach(row => {
					this.fn_sheetCheck(row);
				});
			}

		},

		/**
		 * API: 타설 옵션 부분 조회 -> 헤더 초기 데이터
		 */
		async getPourOptionPartInfo () {
			try {
				const response = await API.concrete.getPourOptionPartInfo({
					concPourOptnId: this.data.concPourOptnId,
					concPourDtlId: this.data.concPourDtlId
				})
				if (response?.data) {
					const { pcPcalTempMin, pcPcalTempMax, pcPcalSlmpMin, pcPcalSlmpMax, pcPcalAirMin, pcPcalAirMax, pcPcalClid, pcPcalUnitMin, pcPcalUnitMax, ags, pourSupply, concPoursAmt } = response.data

					this.pourOptionPartInfo = {
						pcPcalTempMin: +pcPcalTempMin || 0,
						pcPcalTempMax: +pcPcalTempMax || 0,
						pcPcalSlmpMin: +pcPcalSlmpMin || 0,
						pcPcalSlmpMax: +pcPcalSlmpMax || 0,
						pcPcalAirMin: +pcPcalAirMin || 0,
						pcPcalAirMax: +pcPcalAirMax || 0,
						pcPcalClid: +pcPcalClid || 0,
						pcPcalUnitMin: +pcPcalUnitMin || 0,
						pcPcalUnitMax: +pcPcalUnitMax || 0,
						ags: +ags || 0,
						pourSupply : +pourSupply || 0,
						concPoursAmt : +concPoursAmt || 0,
					};

					this.getPrptTestList();
					
				} else return null
			} catch (error) {
				console.error('타설옵션 부분 조회 에러: ', error)
			}
		},

		/**
		 * API: 물성시험관리 조회
		 */
		async getPrptTestList () {
			try {
				const response = await API.concrete.getPrptTestList({
					concPourDtlId: this.data.concPourDtlId,
					siteMstrId : this.siteMstrId
				})
				if (response?.data) {
					this.addRowData.unitConcMix = Number(response.data[0].w1) + Number(response.data[0].w2)
					this.concHochaTotalCnt = response.concHochaTotalCnt;
					const sheetData = response.data.map(row => {
						this.pourOptionPartInfo.useUnit = row.useUnit
						row['unitConcMix'] = this.data.w1 != null && this.data.w2 != null ? Number(this.data.w1) + Number(this.data.w2) : ''
						return {
							...row,
							boardFileList : [],
							boardDeleteFiles : [],
							boardFiles : [],
							boardCopiedFileIds:[],
							clidFileList : [],
							clidDeleteFiles : [],
							clidFiles : [],
							clidCopiedFileIds:[],
							isClidPhoto: Number(row.clidPhotoCnt) > 0 ? "1" : this.data.pourProgress === 'POUR_COMPL' || this.data.pourProgress === 'APVL' || this.data.pourProgress === 'APRV'? "2":"0",
							isFileBoard: Number(row.fileBoardCnt) > 0 ? "1" : this.data.pourProgress === 'POUR_COMPL' || this.data.pourProgress === 'APVL' || this.data.pourProgress === 'APRV'? "2":"0",
						}
					})
					this.fn_sheet(sheetData);
				}
			} catch (error) {
				console.error('물성시험관리 조회 에러: ', error)
			}
		},

		fn_sheet(data){

			let options = {
				Cols : this.setInitHeaderData(ConcretePourwrite.options.Cols),
				Cfg : {NoVScroll: 0,},
				Events : {
					onAfterChange: this.afterCellChange,
					onclick: this.fn_selectRow,
					onDataLoad: this.gridDataLoad,
					onRowAdd: (evt) => {
						this.autoRowMerge(evt.sheet, [evt.row]);
					},
					onRenderFirstFinish: async (evt) => {
						if(!this.isEditable){
							evt.sheet.setAttribute(evt.sheet.getHeaderRows()[0], "isCheckedIcon", "", 0, 1);
							evt.sheet.setAttribute(null, "isChecked", "CanEdit", 0, 1);
							evt.sheet.setAttribute(null, "concHocha", "CanEdit", 0, 1);
							evt.sheet.setAttribute(null, "concTemp", "CanEdit", 0, 1);
							evt.sheet.setAttribute(null, "concSlump", "CanEdit", 0, 1);
							evt.sheet.setAttribute(null, "concAirAmt", "CanEdit", 0, 1);
							evt.sheet.setAttribute(null, "clDensity1e", "CanEdit", 0, 1);
							evt.sheet.setAttribute(null, "clDensity2e", "CanEdit", 0, 1);
							evt.sheet.setAttribute(null, "unitQty", "CanEdit", 0, 1);
						}
						evt.sheet.loadSearchData({
							data: data,
							append: false
						})
					},
				}
			}

			loader.createSheet({
				el: 'pourPhysicTestFormSheet',
				data: data, 
				options: options
			}).then(async sheet => {
				this.sheet = sheet
			})
		},

		/**
		 * 그리드 헤더 영역 초기 세팅
		 */
		setInitHeaderData (columns) {
			if(!this.pourOptionPartInfo) return columns

			const inputForm = (value, dataCode) => {
				let disabled = '';
				if(dataCode 
				&& (dataCode == 'pcPcalUnitMin' || dataCode == 'pcPcalUnitMax')
				&& this.data.useUnit !== 'Y'){
					value = '';
					disabled = 'disabled';
				}
				return `
				<input
					type="text"
					class="form_control num ac"
					value="${value || !isNaN(parseFloat(value)) ? Number((value).toFixed(3)) : ''}"
					data-code="${dataCode}"
					maxlength="8"
					${disabled}
				/>`
			}
			columns.forEach(col => {
				if(col.custom) {
					const inputHeader = col.Header.find(h => h.Type === 'Html')
					if (inputHeader) inputHeader.Value = this.isEditable ? inputForm(this.pourOptionPartInfo[col.custom], col.custom) : this.pourOptionPartInfo[col.custom]
				}
			})

			return columns
		},

		//
		fn_addBtn() { //행추가
			let checkedRows = this.sheet.getRowsByChecked('isChecked');
			let selectRows = [];
			checkedRows.forEach(item => {
				if(!item.Deleted){
					selectRows.push(item);
				}
			});
			if(selectRows.length === 0){
				this.sheet.addRow({
					next : this.sheet.getFirstRow(),
					init : {...this.addRowData}
				})	
			} else {
				this.sheet.addRow({
					next : this.sheet.getNextSiblingRow(selectRows[0]),
					init : {...this.addRowData}
				})
			}
		},

		fn_delBtn() {//행삭제
			const checkedRows = this.sheet.getRowsByChecked('isChecked');
			let deleteRows = [];

			checkedRows.forEach(item => {
				if(!item.Deleted){
					deleteRows.push(item);
				}
			});

			if(deleteRows.length === 0) {
				return this.alert("선택된 행이 없습니다.");
			}

			this.sheet.deleteRows(deleteRows);
			deleteRows.forEach(item => {
				this.sheet.hideRow({
					row: item,
					/* del: false, */
					norender: false
				});
			});

			/* if(0 >= this.sheet.getshownRows(0).length){
				this.sheet.loadSearchData({}, 0 );
			} */
		},

		/**
		 * [sqms grid] 클릭 이벤트 파일 체크
		 */
		fn_selectRow(evt) {
			if((evt.col === 'isFileBoard' || evt.col === 'isClidPhoto') && evt.event.target.tagName == "BUTTON"){
				this.fn_fileModal(evt);
			}
		},

		//sheet 클릭 이벤트 분리
		async fn_fileModal(evt) {
			
			let boardFileList = []
			let clidFileList = []
			
			if(evt.col === 'isFileBoard'){

				if(evt.row.fileBoardCnt > 0){
					let payload = {
						fileType : "ConcreteMngtImg",
						fileSubType : "fileBoard",
						fileConnectId : evt.row.concPsptDtlId,
					}
					boardFileList = await this.fn_responseFileList(payload, evt.row.boardDeleteFiles);
				}
				
				this.fileObj.boardFileList = boardFileList;
				this.fileObj.boardDeleteFiles =	_.cloneDeep(evt.row.boardDeleteFiles)
				this.fileObj.boardFiles = _.cloneDeep(evt.row.boardFiles)
				this.fileObj.boardCopiedFileIds = _.cloneDeep(evt.row.boardCopiedFileIds)
				this.fileObj.boardCopiedFiles = _.cloneDeep(evt.row.boardCopiedFiles)
				this.fileObj.selectRow = evt.row;
				this.$bvModal.show('pourBoardFileModal');
			}
			else if(evt.col === 'isClidPhoto'){
				if(evt.row.clidPhotoCnt > 0){
					let payload = {
						fileType : "ConcreteMngtImg",
						fileSubType : "clidPhoto",
						fileConnectId : evt.row.concPsptDtlId,
					}

					clidFileList = await this.fn_responseFileList(payload, evt.row.clidDeleteFiles);
				}

				this.fileObj.clidFileList = clidFileList;
				this.fileObj.clidDeleteFiles =	_.cloneDeep(evt.row.clidDeleteFiles)
				this.fileObj.clidFiles = _.cloneDeep(evt.row.clidFiles)
				this.fileObj.clidCopiedFileIds = _.cloneDeep(evt.row.clidCopiedFileIds)
				this.fileObj.clidCopiedFiles = _.cloneDeep(evt.row.clidCopiedFiles)
				this.fileObj.selectRow = evt.row;
				this.$bvModal.show('pourClidFileModal');
			}
		},

		async fn_responseFileList(payload, deleteFileList){

			const url = '/sendApi/api/file/upFileList';
			let response = await sendPostApi(url, payload);

			if(response.status == '200'){
				let fileList = [];
				if(response.data.data && response.data.data.length > 0){
					response.data.data.forEach(item => {
						if(!deleteFileList.includes(item.fileQltArcvId)){
							fileList.push(item);
						}
					});
				}
				return fileList;
			}
			else {
				return [];
			}
		},

		fn_boardFileChange(files){
			// this.fileObj.boardFiles = files
			this.fileObj.boardFiles = files.file;
            // this.fileObj.boardCopiedFileIds = files.copyIds;
		},
		fn_boardFileDelete(files){
			this.fileObj.boardDeleteFiles = files
		},
		fn_clidFileChange(files){
			// this.fileObj.clidFiles = files
			this.fileObj.clidFiles = files.file;
            // this.fileObj.clidCopiedFileIds = files.copyIds;
		},
		fn_clidFileDelete(files){
			this.fileObj.clidDeleteFiles = files
		},
		//사진대지
		fn_boardFileSave(){
			this.confirm('등록하시겠습니까?', () => {
				this.sheet.setValue(this.fileObj.selectRow, 'boardFileList', _.cloneDeep(this.fileObj.boardFileList))
				this.sheet.setValue(this.fileObj.selectRow, 'boardFiles', _.cloneDeep(this.fileObj.boardFiles))
				this.sheet.setValue(this.fileObj.selectRow, 'boardDeleteFiles', _.cloneDeep(this.fileObj.boardDeleteFiles))
				this.sheet.setValue(this.fileObj.selectRow, 'boardCopiedFileIds', _.cloneDeep(this.fileObj.boardCopiedFileIds))
				this.sheet.setValue(this.fileObj.selectRow, 'boardCopiedFiles', _.cloneDeep(this.fileObj.boardCopiedFiles))
				if(this.fileObj.boardFileList.length > 0 || this.fileObj.boardFiles.length > 0 || this.fileObj.boardCopiedFiles.length >0){
					this.sheet.setValue(this.fileObj.selectRow, 'isFileBoard', '1');
				}
				else{
					this.sheet.setValue(this.fileObj.selectRow, 'isFileBoard', '0');
				}
				this.sheet.refreshRow(this.fileObj.selectRow);
				this.alert('등록되었습니다.', () => {
					this.fn_close('pourBoardFileModal');
				});
			});
		},
		//염화물
		fn_clidFileSave(){
			this.confirm('등록하시겠습니까?', () => {
				this.sheet.setValue(this.fileObj.selectRow, 'clidFileList', _.cloneDeep(this.fileObj.clidFileList))
				this.sheet.setValue(this.fileObj.selectRow, 'clidFiles', _.cloneDeep(this.fileObj.clidFiles))
				this.sheet.setValue(this.fileObj.selectRow, 'clidDeleteFiles', _.cloneDeep(this.fileObj.clidDeleteFiles))
				this.sheet.setValue(this.fileObj.selectRow, 'clidCopiedFileIds', _.cloneDeep(this.fileObj.clidCopiedFileIds))
				this.sheet.setValue(this.fileObj.selectRow, 'clidCopiedFiles', _.cloneDeep(this.fileObj.clidCopiedFiles))
				if(this.fileObj.clidFileList.length > 0 || this.fileObj.clidFiles.length > 0 || this.fileObj.clidCopiedFiles.length >0){
					this.sheet.setValue(this.fileObj.selectRow, 'isClidPhoto', '1');
				}
				else{
					this.sheet.setValue(this.fileObj.selectRow, 'isClidPhoto', '0');
				}
				this.sheet.refreshRow(this.fileObj.selectRow);
				this.alert('등록되었습니다.', () => {
					this.fn_close('pourClidFileModal');
				});
			});
		},
		//모달 닫기
		fn_close(modalId){
			this.$bvModal.hide(modalId);
			this.fileObj.selectRow = {};
			this.fileObj.boardFileList = [];
			this.fileObj.boardFiles = [];
			this.fileObj.boardDeleteFiles = [];
			this.fileObj.boardCopiedFileIds = [];
			this.fileObj.clidFileList = [];
			this.fileObj.clidFiles = [];
			this.fileObj.clidDeleteFiles = [];
			this.fileObj.clidCopiedFileIds = [];
		},

		//sheet div 영역

		fn_sheetInputCheck (row, key, val) {

			if(isNaN(parseFloat(val))){
				val = '';
			}
			else{
				if(['clDensity1e','clDensity2e'].includes(key)){
					val = this.fn_numMaxLength(val, 5, 4, true);
				} else if(['clDensityAvg'].includes(key)) {
					val = this.fn_numMaxLength(val, 5, 4);
				} else if(['clConTent'].includes(key)){
					val = this.fn_numMaxLength(val, 5, 4);
				} else {
					val = this.fn_numMaxLength(val, 5, 4);
				}
			}
			this.sheet.setValue(row, key, val);
		},
        fn_numMaxLength(val, maxLength, decLength, check){
            if(val){
                val = String(val);
               //소수점 자리수 체크 decLength
                if(val.indexOf('.') > -1){
                    const valArr = val.split('.');
                    let intVal = valArr[0];
                    let decVal = valArr[1];

                    //정수 자리수 길이 체크
                    if(intVal.length > maxLength){
                        intVal = intVal.slice(0 , maxLength);
                    }

                    //소수점 자리수 길이 체크
                    if(decVal.length > decLength){
                        decVal = decVal.slice(0 , decLength);
                    }
                    val = intVal +"."+ decVal;
                }
                else{
                    //maxlength
                    if(val.length > maxLength){
                        val = val.slice(0 , maxLength);
                    }
                }
            }

			if(check){
				return val;
			}
			else{
				return Number(val);
			}
        },

		gridDataLoad (evt) {
			const rows = evt?.sheet?.getDataRows()
			if(rows) {
				const rowId = evt.row?.id
				if(this.data.useUnit !== 'Y'){
					evt.sheet.setAttribute(evt.sheet.getRowById(rowId), 'unitQty', 'CanEdit',0);
				}
				rows.forEach(row => {
					this.fn_sheetCheck(row);
				})
				this.autoRowMerge(this.sheet, rows)
			}
		},
		/**
		 * row 머지 (온도, 슬럼프, 단위수량 컬럼)
		 */
		autoRowMerge (sheet, rows) {
			rows.forEach(row => {
				sheet.setMergeRange(row, 'concTemp', row, 'case4')
				sheet.setMergeRange(row, 'concSlump', row, 'case6')
				sheet.setMergeRange(row, 'unitQty', row, 'unitQtyMin')
			})
		},

		fn_sheetCheck(row){
			//sheet input row check
			this.fn_sheetInputCheck(row, 'concTemp', row.concTemp);
			this.fn_sheetInputCheck(row, 'concSlump', row.concSlump);
			this.fn_sheetInputCheck(row, 'concAirAmt', row.concAirAmt);
			this.fn_sheetInputCheck(row, 'clDensity1e', row.clDensity1e);
			this.fn_sheetInputCheck(row, 'clDensity2e', row.clDensity2e);
			let concDispReason = '';
			let concStatus = '';
			const clDensityResult = ((Number(row.clDensity1e) + Number(row.clDensity2e)) * 0.5);
			const unitConcMixResult = (clDensityResult * Number(row.unitConcMix)/100);

			if(this.data.useUnit === 'Y'){
				this.fn_sheetInputCheck(row, 'unitQty', row.unitQty);
			}
			else{
				this.fn_sheetInputCheck(row, 'unitQty', '');
			}

			//공기량
			if(row.concAirAmt !== ''){
				this.fn_sheetInputCheck(row, 'airAmt', (row.concAirAmt - this.pourOptionPartInfo.ags));
			}
			else{
				this.fn_sheetInputCheck(row, 'airAmt', '');
			}
			
			//cl 평균
			if(row.clDensity1e !== '' && row.clDensity2e !== ''){
				this.fn_sheetInputCheck(row, 'clDensityAvg', clDensityResult);
				this.fn_sheetInputCheck(row, 'clConTent', unitConcMixResult);
			}
			else{
				this.fn_sheetInputCheck(row, 'clDensityAvg', '');
				this.fn_sheetInputCheck(row, 'clConTent', '');
			}

			//온도
			if(row.concTemp !== ''){
				if(row.concTemp < this.pourOptionPartInfo.pcPcalTempMin || row.concTemp > this.pourOptionPartInfo.pcPcalTempMax){
					this.sheet.setAttribute(row, 'concTemp', 'TextColor', '#FF0000')
					this.sheet.setValue(row, 'concTempPassYn', 'N')
					concDispReason = 'TEMP';
					concStatus = 'DISPOSE'
				}else{
					this.sheet.setAttribute(row, 'concTemp', 'TextColor', '#000000')
					this.sheet.setValue(row, 'concTempPassYn', 'Y')
				}
			}
			else{
				this.sheet.setValue(row, 'concTempPassYn', '')
			}
			//슬럼프
			if(row.concSlump !== ''){
				if(row.concSlump < this.pourOptionPartInfo.pcPcalSlmpMin || row.concSlump > this.pourOptionPartInfo.pcPcalSlmpMax){
					this.sheet.setAttribute(row, 'concSlump', 'TextColor', '#FF0000')
					this.sheet.setValue(row, 'concSlumpPassYn', 'N')
					if(concDispReason == "" || concStatus == ""){
						concDispReason = 'SLUMP';
						concStatus = 'DISPOSE'
					}
				}else{
					this.sheet.setAttribute(row, 'concSlump', 'TextColor', '#000000')
					this.sheet.setValue(row, 'concSlumpPassYn', 'Y')
				}
			}
			else{
				this.sheet.setValue(row, 'concSlumpPassYn', '')
			}
			//겉보기
			if(row.concAirAmt !== ''){
				if(row.airAmt < this.pourOptionPartInfo.pcPcalAirMin || row.airAmt > this.pourOptionPartInfo.pcPcalAirMax){
					this.sheet.setAttribute(row, 'airAmt', 'TextColor', '#FF0000')
					this.sheet.setValue(row, 'concAirAmtPassYn', 'N')
					if(concDispReason == "" || concStatus == ""){
						concDispReason = 'AIR';
						concStatus = 'DISPOSE'
					}
				}else{
					this.sheet.setAttribute(row, 'airAmt', 'TextColor', '#000000')
					this.sheet.setValue(row, 'concAirAmtPassYn', 'Y')
				}
			}
			else{
				this.sheet.setValue(row, 'concAirAmtPassYn', '')
			}

			//cl 
			if(row.clDensity1e !== '' && row.clDensity2e !== ''){
				if(unitConcMixResult > this.pourOptionPartInfo.pcPcalClid){
					this.sheet.setAttribute(row, 'clConTent', 'TextColor', '#FF0000')
					this.sheet.setValue(row, 'clDensityPassYn', 'N')
					if(concDispReason == "" || concStatus == ""){
						concDispReason = 'DENSITY';
						concStatus = 'DISPOSE'
					}
				}else{
					this.sheet.setAttribute(row, 'clConTent', 'TextColor', '#000000')
					this.sheet.setValue(row, 'clDensityPassYn', 'Y')
				}
			}
			else{
				this.sheet.setValue(row, 'clDensityPassYn', '')
			}

			//단위수량
			if(row.unitQty !== ''){
				if(row.unitQty < this.pourOptionPartInfo.pcPcalUnitMin || row.unitQty > this.pourOptionPartInfo.pcPcalUnitMax){
					this.sheet.setAttribute(row, 'unitQty', 'TextColor', '#FF0000')
					this.sheet.setValue(row, 'unitQtyPassYn', 'N')
					if(concDispReason == "" || concStatus == ""){
						concDispReason = 'UNIT';
						concStatus = 'DISPOSE'
					}
				}else{
					this.sheet.setAttribute(row, 'unitQty', 'TextColor', '#000000')
					this.sheet.setValue(row, 'unitQtyPassYn', 'Y')
				}
			}
			else{
				this.sheet.setValue(row, 'unitQtyPassYn', '')
			}

			if(this.data.useUnit == 'Y'){
				if(row.concTemp !== '' && row.concSlump !== '' && row.concAirAmt !== '' && row.clDensity1e !== '' && row.clDensity2e !== '' && row.unitQty !== ''){
					this.sheet.setValue(row, 'passJdt', concStatus == '' ? 'NORMAL' : concStatus);
					this.sheet.setValue(row, 'concStatus', concStatus == '' ? 'NORMAL' : concStatus);
					this.sheet.setValue(row, 'concDispReason', concDispReason);
				}
				else{
					this.sheet.setValue(row, 'passJdt', concStatus);
					this.sheet.setValue(row, 'concStatus', concStatus);
					this.sheet.setValue(row, 'concDispReason', concDispReason);
				}
			}
			else{
				if(row.concTemp !== '' && row.concSlump !== '' && row.concAirAmt !== '' && row.clDensity1e !== '' && row.clDensity2e !== ''){
					this.sheet.setValue(row, 'passJdt', concStatus == '' ? 'NORMAL' : concStatus);
					this.sheet.setValue(row, 'concStatus', concStatus == '' ? 'NORMAL' : concStatus);
					this.sheet.setValue(row, 'concDispReason', concDispReason);
				}
				else{
					this.sheet.setValue(row, 'passJdt', concStatus);
					this.sheet.setValue(row, 'concStatus', concStatus);
					this.sheet.setValue(row, 'concDispReason', concDispReason);
				}
			}
		},

		afterCellChange (evt) {
			let rows = evt.sheet.getDataRows();
			rows.forEach(row => {
				this.fn_sheetCheck(row);
			});
		},
		/**

		/**
		 * 그리드 > [저장] 버튼 클릭 시 발생 이벤트
		 */
		saveGridData() {
			const sheetData = this.sheet.getSaveJson({
				saveMode : 2
			})

			if(sheetData.data.length === 0){
				return this.alert('저장할 데이터가 없습니다.')
			}

			const shownRows = this.sheet.getDataRows();
			
			let concHochaArr = [];
			if(shownRows.length > 0){
				for (const item of shownRows) {
					if(!item.Deleted){
						if(!item.concHocha || isNaN(Number(item.concHocha))){
							this.alert('호차 번호를 입력해주세요.');
							return false;
						}
						else if(Number(item.concHocha) > this.concHochaTotalCnt){
							this.alert(this.concHochaTotalCnt + '호차까지만 입력해주세요.');
							return false;
						}
						else if(concHochaArr.includes(item.concHocha)){
							this.alert('다른 호차 번호를 입력해주세요.');
							return false;
						}
						else{
							concHochaArr.push(item.concHocha);
						}
					}
				}
			}

			this.confirm('저장하시겠습니까?', async () => {

				let dataRows = this.sheet.getDataRows();
				let resultList = [];
				let resultFileList = [];
				const fileType = 'ConcreteMngtImg';

				dataRows.forEach((item, idx) => {
					item['status'] = item["Deleted"] ? "Deleted" : item["Added"] ? "Added" : item["Changed"] ? "Changed" : '' 
					let check = true;
					if(item.status == 'Deleted'){
						if(!item.concPsptDtlId){
							check = false;
						}
					}

					if(check){

						const obj = {
							concPourDtlId : this.data.concPourDtlId,
							siteMstrId : this.data.siteMstrId,
							concTemp : item.concTemp,
							concSlump : item.concSlump,
							concAirAmt : item.concAirAmt,
							clDensity1e : item.clDensity1e,
							clDensity2e : item.clDensity2e,
							clDensityAvg : item.clDensityAvg,
							clConTent : item.clConTent,
							unitQty : this.data.useUnit == 'Y' ? item.unitQty : '',
							concTempPassYn : item.concTempPassYn,
							concSlumpPassYn : item.concSlumpPassYn,
							concAirAmtPassYn : item.concAirAmtPassYn,
							clDensityPassYn : item.clDensityPassYn,
							unitQtyPassYn : item.unitQtyPassYn,
							concHocha : item.concHocha,
							concStatus : item.concStatus ? item.concStatus : 'NORMAL',
							passJdt : item.passJdt,
							concPsptDtlId : item.concPsptDtlId ? item.concPsptDtlId : '',
							concDispReason : item.concDispReason,
							status : item.status,
						}

						if(item.status != 'Deleted'){

							//염화물 파일
							if(item.clidFiles.length > 0 || (item.boardCopiedFileIds && item.boardCopiedFileIds.length>0)){
								const fileObj = {
									'key' : idx,
									'actionType' : 'upload',
									'fileConnectId' : item.concPsptDtlId ? item.concPsptDtlId : '',
									'fileType' : fileType,
									'fileSubType' : 'clidPhoto',
									'files' : item.clidFiles,
									'copiedFileIds':item.clidCopiedFileIds,
								}
								resultFileList.push(fileObj);
							}
	
							//염화물 삭제파일
							if(item.clidDeleteFiles.length > 0){
								const fileObj = {
									'key' : idx,
									'actionType' : 'delete',
									'fileType' : fileType,
									'fileSubType' : 'clidPhoto',
									'fileQltArcvIds' : item.clidDeleteFiles,
								};
								resultFileList.push(fileObj);
							}
	
							//사진대지 파일
							if(item.boardFiles.length > 0 || (item.boardCopiedFileIds && item.boardCopiedFileIds.length>0)){
								const fileObj = {
									'key' : idx,
									'actionType' : 'upload',
									'fileSubType' : 'fileBoard',
									'fileType' : fileType,
								  	'fileConnectId' : item.concPsptDtlId ? item.concPsptDtlId : '',
								  	'files' : item.boardFiles,
									'copiedFileIds':item.boardCopiedFileIds,
								}
								resultFileList.push(fileObj);
							}
	
							//사진대지 삭제파일
							if(item.boardDeleteFiles.length > 0){
								let fileObj = {
									'key' : idx,
									'actionType' : 'delete',
									'fileType' : fileType,
									'fileSubType' : 'fileBoard',
									'fileQltArcvIds' : item.boardDeleteFiles,
								};
								resultFileList.push(fileObj);
							}
						}

						resultList.push(obj);
					}
				});
				
				const optionResponse = await API.concrete.updatePourOptionPartInfo({
					...this.pourOptionPartInfo,
					concPourDtlId: this.data.concPourDtlId,
					siteMstrId : this.$store.getters['auth/getSiteMstrId']
				});

				const response = await API.concrete.updatePrptTestList(resultList);

				if (response?.json?.rCode === '0000'
					&& optionResponse?.json?.rCode === '0000') {

					if(resultFileList.length > 0){
						const paramData = response.data;

						let returnDataList = []
						for await (const item of resultFileList){
							item.fileConnectId = paramData[item.key].concPsptDtlId;
							if(item.actionType == 'upload'){
								const returnData = await sendFileApi(item.fileConnectId, item.fileType, item.files, item.fileSubType, item.copiedFileIds)
								returnDataList.push(returnData);
							}
							else if(item.actionType == 'delete'){
								const url = '/sendApi/api/file/fileUnUse';
								const filePayload = {
									fileType : item.fileType,
									fileQltArcvIds : item.fileQltArcvIds
								};
								const returnData = await sendPostApi(url, filePayload);
								returnDataList.push(returnData);
							}  
						}
						return this.alert('저장되었습니다.', () => {
							this.$store.dispatch('tabInfo/setSavePage',this.$route.name);
							this.$parent.getPourStatusView(1);
						});
					}
					else {
						return this.alert('저장되었습니다.', () => {
							this.$store.dispatch('tabInfo/setSavePage',this.$route.name);
							this.$parent.getPourStatusView(1);
						});
					}
				}
			});
		},
	}
}
</script>