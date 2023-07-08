<template>
    <div>
        <div class="inner type2">
            <div class="button_box">
                <div class="button_box">
                    <div class="fr">
                        <button type="button" class="btn btn_md btn_darkblue btn_outline" @click="langPlusBtn">언어추가</button>
                        <button type="button" class="btn btn_md btn_darkblue btn_outline" @click="saveBtn">저장</button>
                        <button type="button" class="btn btn_md btn_darkgray btn_outline" @click="deleteBtn">삭제</button>
                    </div>
                </div>
                <sqms-grid
                    id="workerEduLangSheet"
                    :columns="columns"
                    :data="gridData"
                    :upperStyle="{'height':'calc(100vh - 280px)'}"
                    :inputStyle="{'height':'100%'}"
                    :cfg="{
                        NoVScroll: false,
                        NoDataMessage : 3,
                    }"
                    @init="initSheet"
                    ref="workerEduLangRef"
                >
                </sqms-grid>
            </div>
        </div>
        <b-modal id="languageAdd" title="언어 추가" hide-backdrop size="sm">
            <!--v-on:shown="sheetCreate"-->
            <template #default>
                <div class="pop_container">
                    <div class="lookup_box multi_line align_center">
                    <table>
                        <tbody>
                            <tr>
                                <th>언어</th>   
                                <td><input type="text" class="form_control" placeholder="입력해주세요" v-model="filtering.codeNameKr" v-on:keyup="enterEvent"></td>        
                                <td class="ar">
                                    <button type="button" class="btn_reset" @click="searchData(true)">초기화</button>
                                    <button type="button" class="btn btn_sm btn_darkblue btn_radius btn_search" @click="searchData(false)">검색</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    </div>
                    <!-- ibsheet -->
                    <sqms-grid
                        id="langSheet"
                        :columns="langcolumns"
                        :data="gridLangData"
                        :inputStyle="{'height':'550px'}"
                        :cfg="{
                            NoVScroll: false,
                            NoDataMessage : 3,
                        }"
                        @init="initLangSheet"
                        ref="langRef"
                    >
                    </sqms-grid>
                </div>
            </template>
            <template #modal-footer="{ hide }">
                <b-button class="btn btn_md btn_outline btn_darkgray" @click="addBtn">추가</b-button>
                <b-button class="btn btn_md btn_outline btn_gray" @click="hide('forget')">닫기</b-button>
            </template>
        </b-modal>
    </div>
</template>
<script>
   import { WorkerTrainingList, WorkerTrainingList2 } from '@/pages/common/data/InspectionList'
   import API from '@/apis/'
   import _ from 'lodash'
   import MsgBoxMixins  from '@plugin/mixin/MsgBox.mixins.js'

   export default {
        name: 'WorkerEduLangSheet',
        mixins: [MsgBoxMixins],
        components: {
        },
        data: () => ({
            columns: [], // 그리드 컬럼
		    gridData: [], // 그리드 데이터
            sheet: null, // 그리드 시트
            langcolumns: [], //언어추가 그리드 컬럼
            gridLangData: [], //언어추기 그리드 데이터
            langSheet: null, // 그리드 시트
            filtering: {
                codeNameKr : ''
            },
        }),
        async created(){
            this.columns = WorkerTrainingList.options.Cols
            this.langcolumns = WorkerTrainingList2.options.Cols
            this.getWorkerEduLangList()
            this.getLanguageMasterCodeList()
        },
        methods: {
            initSheet (sheet) {
                this.sheet = sheet
            },
            initLangSheet(sheet) {
                this.langSheet = sheet
            },
            enterEvent : function(e) { //검색조건 enter event
                if(e.keyCode == 13) {
                this.getLanguageMasterCodeList(this.filtering)
                }
            },
            /**
             * 언어설정 리스트 조회
             */
            async getWorkerEduLangList() {
                try {
                    const response = await API.workerEdu.getWorkerEduLangList()
                    if(response?.dlWorkerEduLang){
                        this.gridData = response.dlWorkerEduLang
                    }
                } catch (error) {
                    console.error('언어 설정 초기 조회 에러 :', error)
                }
            },
            /**
             * 언어추가 팝업 마스터코드 조회
             */
            async getLanguageMasterCodeList() {
                const payload = {
                    groupCode : 'EDU_LANG',
                    codeNameKr : this.filtering.codeNameKr
                }
                try {
                    const response = await API.eduTraining.getMasterCodeList(payload)
                    if(response?.data){
                        this.gridLangData = response.data
                    }
                } catch (error) {
                    console.error('언어추가 조회 에러: ', error)
                }
            },
            /**
             * 언어추가 검색/초기화 버튼
             */
            async searchData(isReset){
                if (isReset) {
                    this.filtering = {
                        codeNameKr: '',
                    }
                }
                return await this.getLanguageMasterCodeList(this.filtering)
            },
            /**
             * 언어 추가 버튼
             */
            async langPlusBtn(){
                this.$bvModal.show('languageAdd')
            },
            /**
             * 삭제 버튼
             */
            async deleteBtn(){
                this.confirm('선택하신 언어를 삭제 하시겠습니까?', async () => {
                    const failSave = () => {
                        return this.alert('삭제에 실패하였습니다.')
                    }
                    try {
                        const payload = this.sheet.getSaveJson({
                            saveMode: 3
                        })
                        payload.data.forEach(item => {
                            item.status = "Deleted"
                            item.workerEduLangId = item.workerEduLangId
                        })
                        if(payload.data.length > 0){
                            const result = await API.workerEdu.getWorkerEduLangChange(payload.data)
                            if(result?.count > 0){
                                this.alert('삭제되었습니다.')
                                this.getWorkerEduLangList()
                            }
                        }else{
                            this.alert('삭제할 언어를 선택해주세요.')
                        }
                    } catch (error) {
                        console.error('언어 설정 저장 에러 :', error)
                        failSave()
                    }
                })
            },
            /**
             * 언어추가 추가 버튼
             */
            async addBtn(){
                const addRows = this.langSheet.getRowsByChecked('isCheck');
                if(addRows.length === 0) {
                    return this.alert("추가 할 행을 선택하여주세요.");
                }else{
                    addRows.forEach(row => {
                        row.langName = row.codeNameKr
                        row.langCode = row.codeVal
                        this.sheet.copyRow({row:row})

                        const dup = this.sheet.getRowsByDup('langCode')

                        if (dup.length > 0) {
                            dup.forEach(upper => {
                                upper.slice(1).forEach(item => {
                                    this.sheet.removeRow(item)
                                })

                            })
                            //hide 랑 기타 작업들
                        }
                    });
                    this.$bvModal.hide('languageAdd')
                }
            },
            /**
             * 저장 버튼
             */
            saveBtn() {
                this.confirm('언어 설정을 저장하시겠습니까?', async () => {
                    const dupli = this.sheet.getRowsByDup("langCode", false, false, false, "Deleted")
                    if(dupli.length > 0){
                        return this.alert('중복된 언어가 있습니다. 중복된 언어를 삭제후 저장해주세요.')
                    }
                    const failSave = () => {
                        return this.alert('저장에 실패하였습니다.')
                    }
                    try {
                        const payload = this.sheet.getSaveJson({
                            saveMode: 3
                        })
                        payload.data.forEach(item => {
                            item.status = item.STATUS
                            item.langCode = item.langCode
                        })
                        if(payload.data.length > 0){
                            const result = await API.workerEdu.getWorkerEduLangChange(payload.data)
                            if(result?.count > 0){
                                this.alert('저장되었습니다.')
                                this.getWorkerEduLangList()
                            }
                        }else{
                            this.alert('변경된 정보가 없습니다.')
                        }
                    } catch (error) {
                        console.error('언어 설정 저장 에러 :', error)
                        failSave()
                    }
                })
            },
        }
   }
</script>