<!--
  * 콘크리트 관리 > 타설관리 > 결과 입력 > 폐기 및 물량
 -->
<template>
  <div class="lst_data">
    <div class="table_normal_list">
      <table>
        <caption class="sr_only">
          제목
        </caption>
        <colgroup>
          <col width="15%">
          <col width="*">
          <col width="15%">
          <col width="*">
          <col width="15%">
          <col width="*">
        </colgroup>
        <tbody>
          <tr>
            <th>타설물량(예정)</th>
            <td>{{ concreteInfo.pourSupply }}</td>
            <th>합격 물량</th>
            <td>{{ concreteInfo.concSupply }}</td>
            <th>폐기 물량</th>
            <td>{{ concreteInfo.concDispSupply }}</td>
          </tr>
        </tbody>
      </table>
    </div>
	<section class="inner">
		<sqms-grid
		id="pourPhysicTestFormGrid"
		:data="gridData"
		:columns="columns"
		:storable="isEditable"
		:use-checkbox="false"
		:save-mode="0"
		:save-when-change="false"
		:inputStyle="{'height':'510px'}"
		:cfg="{
			NoVScroll: false
		}"
		:sheet="sheet"
		@save="saveGridData"
		@afterChange="afterCellChange"
		@renderFinish="renderFinish"
		@click="clickGrid"
		@shown="file = null"
		/>
	</section>

	<b-modal
		id="pourReadPhotoModal"
		title="사진 보기" 
		hide-backdrop
		size="lg"
	>
		<template #default>
			<div class="pop_container">
			<LstImg
				:lst-file-rst="fileObj.fileList"
				:second-remove-file-id="fileObj.deleteFiles"
				:files="fileObj.files"
				:copied-file-ids="fileObj.copiedFileIds"
				:copied-files="fileObj.copiedFiles"
				@file-changed="fn_fileChange"
				@file-removed="fn_fileDelete"
				@copied-file-changed="(payload) => {fileObj.copiedFileIds = payload.copyIds; fileObj.copiedFiles = payload.copy;}"
				:uploadable="isEditable"
				:copyable="isEditable"
				:downloadable="down"
				:file-type="'pourReadPopupQltyPicturePop'"
				:set-style="'margin: 0 5px 5px 0;'"
			/>
				<!-- :limit-file-count="100" -->
			</div>
		</template>
		<template #modal-footer>
			<b-button
			class="btn btn_md btn_outline btn_darkgray"
			@click="fn_fileSave"
			v-if="isEditable"
			>
			등록
			</b-button>
			<b-button
			class="btn btn_md btn_outline btn_gray"
			@click="fn_close('pourReadPhotoModal')"
			>
			닫기
			</b-button>
		</template>
	</b-modal>



    <!-- <photo-view-modal
      :active.sync="isPhotoViewModal"
      :image-id="fileUploadingRow ? fileUploadingRow.concImageFile : null"
      @close="isPhotoViewModal = false"
    /> -->
    <!-- :files="fileUploadingRow ? [fileUploadingRow.concImageFile] : []" -->
  </div>
</template>

<script>
import API from '@/apis/'
import { ConcretePourwrite2 } from '@/pages/common/data/MaterialsList'
import { sendFileApi, requestFileOptions, sendPostApi, requestOptions } from '@/apis/common'
import LstImg from '@/pages/common/popup/LstImg'
import MsgBoxMixins  from '@plugin/mixin/MsgBox.mixins.js'
import PhotoViewModal from '@/pages/common/popup/PhotoViewModal.vue'
import authCheckMixns  from '@plugin/mixin/AuthCheck.js'
import _ from 'lodash'

export default {
	name: 'PourSetUpDisuseForm',
	mixins: [MsgBoxMixins, authCheckMixns],
	components: { LstImg, PhotoViewModal },
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
		concreteInfo: { // 콘크리트 물량
			pourSupply: 0, // 타설물량
			concSupply: 0, // 합격물량
			concDispSupply: 0 // 폐기 및 삭제 물량
		},
		gridData: [],
		columns: [],
		sheet:[],
		files: [],
		lstFileRst : [],
		secondRemoveFileId: [],
		copiedFileIds : [],
		copiedFiles:[],
		fileUploadingRow: null,
		isPhotoViewModal: false,
		userId : '',
		siteMstrId : '',
		write : false,
		fileObj : {
			selectRow : {},
			fileList: [],
			deleteFiles: [],
			files: [],
			copiedFileIds:[],
			copiedFiles:[],
		},
	}),
	async created () {
		if(!this.data.concPourDtlId){
			this.$router.push({
				name: 'PourSetUpSheet'
			})
		}
		this.userId = this.$store.getters['auth/getUserId']
		this.write = this.checkUser(this.userId,'write')
		this.siteMstrId = this.$store.getters['auth/getSiteMstrId']
		this.columns = this.isEditable ? ConcretePourwrite2.options.Cols : ConcretePourwrite2.options.Cols.map(col => { return { ...col, CanEdit: 0 }})
		await this.getDisposeConcreteSupplyInfo() // 콘크리트 물량 조회 (타설물량, 합격물량, 폐기물량)
		await this.getDisposeSupplyList() // 폐기 및 물량 리스트 조회
	},
	methods: {
		/**
		 * API: 콘크리트 물량 조회 (타설물량, 합격물량, 폐기물량)
		 */
		async getDisposeConcreteSupplyInfo () {
			try {
				const response = await API.concrete.getDisposeConcreteSupplyInfo({
					concPourDtlId: this.data.concPourDtlId,
					siteMstrId : this.siteMstrId
				})
				if(response?.data) {
					this.concreteInfo = response.data
				}
			} catch (error) {
				console.error('콘크리트 물량 조회 에러: ', error)
			}
		},
		/**
		 * API: 폐기 및 물량 리스트 조회
		 */
		async getDisposeSupplyList () {
			try {
				const response = await API.concrete.getDisposeSupplyList({
					concPourDtlId: this.data.concPourDtlId,
					siteMstrId : this.siteMstrId
				})
				if(response?.data) {
					this.gridData = response.data.map(row => {
						return {
							...row,
							isConcImageFile: row.fileCnt > 0 ? "1" : this.data.pourProgress === 'POUR_COMPL' || this.data.pourProgress === 'APVL' || this.data.pourProgress === 'APRV'? "2" : "0"
						}
					})
				}
			} catch (error) {
				console.error('폐기 및 물량 조회 에러: ', error)
			}
		},
		/**
		 * 그리드 > [저장] 버튼 클릭 시 발생 이벤트
		 */
		async saveGridData ({ sheet, data }) {
			const failSave = () => {
				return this.alert('저장에 실패하였습니다.')
			}

			try {

				if (data) {

					let resultFileList = [];
					const fileType = 'ConcreteMngtImg';

					const payload = data.map(row => {
						return {
							...row,
							concStatus: row.concStatus === '폐기' ? 'DISPOSE' : row.concStatus,
							concPourDtlId: this.$route.params.concPourDtlId,
							siteMstrId : this.$store.getters['auth/getSiteMstrId']
						}
					})

					sheet.getDataRows().forEach(row => {
						if((row.files && row.files.length > 0) || (row.copiedFileIds && row.copiedFileIds.length > 0)){
							const fileObj = {
								'actionType' : 'upload',
								'fileConnectId' : row.concDispSuplDtlId ,
								'fileType' : fileType,
								'fileSubType' : 'dispPhoto',
								'files' : row.files,
								'copiedFileIds' :row.copiedFileIds,
							}
							resultFileList.push(fileObj);
						}

						if(row.deleteFiles){
							if(row.deleteFiles.length > 0){
								const fileObj = {
									'actionType' : 'delete',
									'fileType' : fileType,
									'fileSubType' : 'dispPhoto',
									'fileQltArcvIds' : row.deleteFiles,
								};
								resultFileList.push(fileObj);
							}
						}
					});

					const result = await API.concrete.updateDisposeSupplyList(payload)

					if(result?.count) {
						if(resultFileList.length > 0){
							let returnDataList = [];
							for await (const item of resultFileList){
								if(item.actionType == 'upload'){
									const returnData = await sendFileApi(item.fileConnectId, item.fileType, item.files ,item.fileSubType, item.copiedFileIds)
									returnDataList.push(returnData);
								}
								else if(item.actionType == 'delete'){
									const url = '/sendApi/api/file/fileUnUse';
									const filePayload = {
										fileType : item.fileType,
										fileSubType : item.fileSubType,
										fileQltArcvIds : item.fileQltArcvIds
									};
									const returnData = await sendPostApi(url, filePayload);
									returnDataList.push(returnData);
								}  
							}
							this.alert('저장되었습니다.', () => {
								this.$store.dispatch('tabInfo/setSavePage',this.$route.name);
								this.$parent.getPourStatusView(2);
							});
						}
						else{
							this.alert('저장되었습니다.', () => {
								this.$store.dispatch('tabInfo/setSavePage',this.$route.name);
								this.$parent.getPourStatusView(2);
							});
						}


					} else {
						failSave()
					}
				}
			} catch (error) {
				console.error(error)
				failSave()
			}
		},
		/**
		 * [sqms grid] 셀 정보 바뀐 다음 발생 이벤트
		 */
		afterCellChange (evt) {
			const rowId = evt.row?.id
			const rowData = evt.sheet.getRowValue(evt.row)

			if(!rowId) return

			if(evt?.col === 'concStatus') {
				if (rowData.concStatus === 'DELETE') evt.sheet.setValue(evt.row, 'concDispReason', 'LONG_STAY')
				else evt.sheet.setValue(evt.row, 'concDispReason', null)
			}
		},
		/**
		 * [sqms grid] 클릭 이벤트
		 */
		async clickGrid (evt) {

			if((evt.col === 'isConcImageFile') && evt.event.target.tagName == "BUTTON"){
				this.fn_fileModal(evt);
			}

/* 			const rowData = evt.sheet.getRowValue(evt.row)
			this.fileUploadingRow = rowData
			this.fileUploadingRow.concDispSuplDtlId = evt.row.concDispSuplDtlId
			if (evt.col === 'isConcImageFile' && rowData.isConcImageFile == '0') { // 등록
				this.files = []
				this.$bvModal.show('updatePhotoModal')
			} else if(evt.col === 'isConcImageFile' && rowData.isConcImageFile == '1'){ // 보기
				this.getFileInfoList()
				this.isPhotoViewModal = true
				this.$bvModal.show('pourReadPhotoModal')
			} */
		},

		async fn_fileModal(evt) {
			
			this.sheet = evt.sheet;
			let fileList = []
			
			if(evt.row.fileCnt > 0){
				let payload = {
					fileType : "ConcreteMngtImg",
					fileSubType : "dispPhoto",
					fileConnectId : evt.row.concDispSuplDtlId,
				}
				fileList = await this.fn_responseFileList(payload, evt.row.deleteFiles ? evt.row.deleteFiles : []);
			}

			this.fileObj.fileList = fileList;
			this.fileObj.deleteFiles =	_.cloneDeep(evt.row.deleteFiles ? evt.row.deleteFiles : [])
			this.fileObj.files = _.cloneDeep(evt.row.files ? evt.row.files : [])
			this.fileObj.copiedFileIds = _.cloneDeep(evt.row.copiedFileIds ? evt.row.copiedFileIds : [])
			this.fileObj.copiedFiles = _.cloneDeep(evt.row.copiedFiles ? evt.row.copiedFiles : [])
			this.fileObj.selectRow = evt.row;
			this.$bvModal.show('pourReadPhotoModal');
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
				return fileList.length > 0 ? fileList : [];
			}
			else {
				return [];
			}
		},
		
		/**
		 * [sqms grid] 렌더 후 이벤트
		 */
		renderFinish (evt) {
			const rows = evt.sheet.getDataRows()

			rows.forEach(row => {
				const rowData = evt.sheet.getRowValue(row)

				if (rowData.concStatus === '') { // 폐기 > 상태 변경 불가능 및 폐기사유 자동 입력 (장시간 대기)
					evt.sheet.setAttribute(row, 'concStatus', 'Type', 'String')
					evt.sheet.setAttribute(row, 'concStatus', 'CanEdit', 0)
					evt.sheet.setValue(row, 'concStatus', '폐기')
					// evt.sheet.setValue(row, 'concDispReason', 'LONG_STAY')
				}
			})
		},

		fn_fileChange(files){
			this.fileObj.files = files.file;
			// this.fileObj.copiedFileIds = files.copyIds;
			// this.fileObj.files = files
		},

		fn_fileDelete(files){
			this.fileObj.deleteFiles = files
		},
		fn_fileSave(){
			this.confirm('등록하시겠습니까?', () => {
				this.sheet.setValue(this.fileObj.selectRow, 'fileList', _.cloneDeep(this.fileObj.fileList))
				this.sheet.setValue(this.fileObj.selectRow, 'files', _.cloneDeep(this.fileObj.files))
				this.sheet.setValue(this.fileObj.selectRow, 'deleteFiles', _.cloneDeep(this.fileObj.deleteFiles))
				this.sheet.setValue(this.fileObj.selectRow, 'copiedFileIds', _.cloneDeep(this.fileObj.copiedFileIds))
				this.sheet.setValue(this.fileObj.selectRow, 'copiedFiles', _.cloneDeep(this.fileObj.copiedFiles))
				if(this.fileObj.fileList.length > 0 || this.fileObj.files.length > 0 || this.fileObj.copiedFileIds.length > 0 ){
					this.sheet.setValue(this.fileObj.selectRow, 'isConcImageFile', '1');
				}
				else{
					this.sheet.setValue(this.fileObj.selectRow, 'isConcImageFile', '0');
				}
				this.sheet.refreshRow(this.fileObj.selectRow);
				this.alert('등록되었습니다.', () => {
					this.fn_close('pourReadPhotoModal');
				});
			});
		},

		fn_close(modalId){
			this.fileObj.selectRow = {}
			this.fileObj.fileList = []
			this.fileObj.files = []
			this.fileObj.deleteFiles = []
			this.fileObj.copiedFileIds = []
			this.$bvModal.hide(modalId);
		},
	}
}
</script>