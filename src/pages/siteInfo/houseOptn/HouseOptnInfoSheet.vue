<template>
    <div class="inner">
        <!-- <sqms-grid 
            id="houseOptnInfoTable"
            :columns="columns"
            :data="gridData"
            :header-checkbox-rowspan="3"
            :storable="true"
            :addable="true"
            :copyable="true"
            :use-checkbox="true"
            :save-mode="0"
            :save-validation="saveGridValid"
            :cfg="{
                NoDataMessage : 3,
                NoVScroll: true
            }"
            @save="saveGridData"
            @init="initSheet"
            ref="houseOptnInfoTableRef"
        >
        <template #button-prefix> -->

        <div class="button_box">
            <button
                type="button"
                class="btn btn_sm btn_excel"
                v-if="checkUser(userId, 'write') || checkUser(userId, 'change')"
                @click="excelDown"
            >
                엑셀 업로드
            </button>
            <button type="button" class="btn btn_sm btn_excel" v-if="checkUser(userId, 'down')" @click="fn_exportExcel(sheet)">엑셀 다운로드</button>
            <div class="fr">
                <button type="button" class="btn btn_sm btn_darkgray" v-if="checkUser(userId, 'write') || checkUser(userId, 'change')" @click="copyRow">행 복사</button>
                <div v-if="checkUser(userId, 'write') || checkUser(userId, 'change')" class="btn_number">
                    <select
                        v-if="maxAddRowCnt"
                        v-model="addRowsCount"
                        class="form_control num"
                    >
                        <option
                            v-for="count in maxAddRowCnt"
                            :key="count"
                            :value="count"
                        >
                            <!-- v-for="count in Array(10).fill().map((item, index) => {return index+1})" -->
                            {{ count }}
                        </option>    
                    </select>
                    <button type="button" class="btn btn_sm" v-if="checkUser(userId, 'write') || checkUser(userId, 'change')" @click="addRow">행 추가</button>
                </div>
                <button type="button" class="btn btn_sm btn_darkgray" v-if="checkUser(userId, 'unuse')" @click="deleteBtn">삭제</button>
                <button type="button" class="btn btn_sm btn_darkblue" v-if="checkUser(userId, 'write') || checkUser(userId, 'change')" @click="saveBtn">저장</button>
            </div>
        </div>
        <div class="ib_wrap" :style="{height: 'calc(100vh - 300px)'}">
            <div id="houseOptnInfoTable" class="ibsheet_table" style="height: 100%"></div>
        </div>

        <excel-upload-modal
            ref-id="HouseOptnInfoSheet_ExcelUploadModal"
            mode="CHECK"
            fileType="HOUSE"
            columnLength="0"
            @import="fn_importExcel"
        />

        <excel-download
            v-model="excelDownload.request"
            ref-id="HouseOptnInfoSheet_ExcelDownload"
            :file-name="excelDownload.fileName"
            :download-option="excelDownload.downloadOption"
            :options="excelDownload.options"
            :data="excelDownload.data"
        />
    </div>
</template>

<script>
import API from '@/apis/'
import _ from 'lodash'
import { HoldOption3 } from '@/pages/common/data/LocusList'
import MsgBoxMixins  from '@plugin/mixin/MsgBox.mixins.js'
import loader from '@ibsheet/loader'
import authCheckMixns  from '@plugin/mixin/AuthCheck.js'
import ExcelUploadModal from '@modal/common/ExcelUploadModal.vue'
import ExcelDownload from '@component/common/ExcelDownload.vue'

export default {
    name: 'HouseOptnInfoSheet',
    mixins: [MsgBoxMixins, authCheckMixns],
    components: {
        ExcelUploadModal,
        ExcelDownload
    },
    data(){
        return {
            sheet : null,
            sheetData : null,
            columns : [],
            gridData : [],
            addRowsCount : 1,
            maxAddRowCnt : 10,
            userId : '',
            /** excel */
            excelDownload: {
                request: false,
                fileName: '',
                options: {},
                data: [],
                downloadOption: {}
            },
        }
    },
    mounted(){
        let options = HoldOption3.options
        options.Events = {
            onRenderFirstFinish: () => {
                this.getHouseOptnList()
            },
        }
        loader.createSheet({
            el: 'houseOptnInfoTable',
            data : [],
            options : options
        }).then(sheet => {
            this.sheet = sheet
        })
        this.userId = this.$store.getters['auth/getUserId']
    },
    methods: {
        initSheet (sheet) {
            this.sheet = sheet
        },
        async getHouseOptnList() {
            const payload = {
                siteMstrId : this.$store.getters['auth/getSiteMstrId']
            }
            try {
                const resultList = await API.houseOptn.getHouseOptnList(payload)
                if(resultList?.dlHouseSet.length > 0){ 
                    this.sheetData = resultList.dlHouseSet
                    this.sheet.loadSearchData({
                        data: resultList.dlHouseSet
                    })
                } 
            } catch (error) {
                
            }
        },
        /** 행복사 이벤트 */
        copyRow(){
            let sheet = this.sheet;
            let checkedRows = [];
            let checkColumn = 'isChecked';
            
            checkedRows = sheet.getRowsByChecked(checkColumn);
            if(checkedRows.length === 0) {
                return this.alert('복사할 행을 선택해주세요.');
            }
            let copiedRows = sheet.copyRows(checkedRows);
            copiedRows.forEach(item => {
                item['isChecked'] = 0;
                sheet.refreshCell(item, checkColumn)
            })
        },
        /** 행추가 이벤트 */
        addRow(){
            this.sheet.getRowsByChecked(HoldOption3.options.Cols[0].Name)
            for(let i = 0; i < this.addRowsCount; i++){
                this.sheet.addRow({ next: this.sheet.getFirstRow(), init: this.addRowData})
            }
            // this.sheet.addRows({
            //     count: this.addRowsCount,
            //     next: this.sheet.getFirstRow()
            //     // next: checkedRows.length > 0 ? checkedRows[0].nextSibling : null
            // })
        },
        /**
         * 저장 버튼 클릭시 이벤트
         */
        async saveBtn () {
            /** 수정 또는 추가 된 데이터가 있는지 확인 */
            const sheetData = this.sheet.getSaveJson({
                saveMode : 3
            })
            if(sheetData.data.length === 0){
                return this.alert('저장할 데이터가 없습니다.')
            }
            /** 저장전 유효성 체크 */
            const valiData = this.sheet.getSaveJson({
                saveMode : 1
            })
            let data = valiData.data
            for(let i = 0; i < data.length; i++){
                if(!data[i].standDong){
                    return this.alert(`${i+1} 번째의 동을 입력해주세요.`)
                }
                if(!data[i].line){
                    return this.alert(`${i+1} 번째의 라인을 입력해주세요.`)
                }
                if(!data[i].standHo){
                    return this.alert(`${i+1} 번쨰의 호수를 입력해주세요.`)
                }
                if(!data[i].firstFloor){
                    return this.alert(`${i+1} 번째의 첫 층수를 입력해주세요.`)
                }
                if(!data[i].lastFloor){
                    return this.alert(`${i+1} 번쨰의 마지막 층수를 입력해주세요.`)
                }
            }
            const dupli1 = this.sheet.getRowsByDup("standDong,standHo", false, false,false, "Deleted")
            // const dupli2 = this.sheet.getRowsByDup("standHo", false, false,false, "Deleted")
            // const dupli3 = this.sheet.getRowsByDup("standHo", false, false,false, "Deleted")
            // const dupli4 = this.sheet.getRowsByDup("firstFloor", false, false,false, "Deleted")
            // const dupli5 = this.sheet.getRowsByDup("lastFloor", false, false,false, "Deleted")
            /** 중복된 데이터 검증 */
            if(dupli1.length > 0){ // dupli3.length > 0 && dupli4.length > 0 && dupli5.length > 0 
                return this.alert('중복된 데이터가 있습니다. 다시 작성해주세요.')
            }else{
                this.confirm('저장하시겠습니까?', async () => {
                    const failSave = () => {
                        return this.alert('저장에 실패하였습니다.')
                    }
                    try {
                        const saveData = this.sheet.getSaveJson({
                            saveMode : 1
                        })
                        let payload = saveData.data.map(item => {
                            return {
                                ...item,
                                status : item.STATUS,
                                siteMstrId : this.$store.getters['auth/getSiteMstrId'],
                                projectId: this.$session.get('userInfo').projectId
                            }
                        })
                        const result = await API.houseOptn.setHouseOptnWrite(payload)
                        if(result?.count > 0){
                            this.alert('저장되었습니다.')
                            this.getHouseOptnList()
                        } else {
                            failSave()
                        }
                    } catch (error) {
                        console.log('세대 설정 저장에 실패하였습니다.')
                        failSave()
                    }
                })
            }
        },
        /**
         * 삭제버튼 클릭시 이벤트
         */
        deleteBtn() {
            const selectedRow = this.sheet.getRowsByChecked('isChecked');
            if(selectedRow?.length === 0){
                return this.alert('선택된 행이 없습니다')
            }else{
                this.confirm('삭제하시겠습니까?', () => {
                    this.sheet.deleteRows(selectedRow)
                    selectedRow.forEach(row => {
                        this.sheet.hideRow({
                            row,
                            del: false ,
                            norender: false
                        })
                    })
                })    
            }
        },
        /** 엑셀 임포트 익스포트 */
        importExcel () {
            const options = {
                append: 1,                  // 새로로드할지, 뒤에 붙일지 여부
                fileExt: 'xls|xlsx|csv',    // 가용 확장자
                mode: 'HeaderMatch'         // column 명 매칭해서 처리
            }

            this.sheet.importData(options)
        },

        exportExcel () {
            // export Data options
            // 확장자에 따른 다운로드 형식 변화(xlsx, xls, csv, txt)
            var today = new Date();
            var year = today.getFullYear();
            var month = ('0' + (today.getMonth() + 1)).slice(-2);
            var day = ('0' + today.getDate()).slice(-2);
            var dateString = year+ month+ day;
            const options = {
                fileName: `HouseOptnInfoSheet_${dateString}.xlsx`,
                downRows : 'Visible',
            }
            this.sheet.exportData(options)
        },
        fn_importExcel: function (data) {
            this.sheet.loadSearchData({
                data: data,
                append: true,
                next: this.sheet.getFirstRow()
            });
            this.$bvModal.hide('HouseOptnInfoSheet_ExcelUploadModal');
        },

        /** 엑셀 다운로드 */
        fn_exportExcel: function (sheet) {
            sheet.down2Excel({
                merge:      1,                  // 머지된 내용 그대로 출력할 것인지
                downCols:   'Visible',          // 'Visible' : 화면상 보이는 Column 그외엔 문자열 join 형태(mainCodeId|midCodeId|...)
                reqHeader:  {
                                'Authorization': this.$cookies.get('Authorization'),
                                'Accept-Language': 'ko'
                            },
                fileName:   `세대옵션정보_${this.$moment().format('YYYYMMDD')}.xlsx`,  // file명 : 현재화면 페이지 _현재 날짜
            })
        },
        excelDown: function () {
            this.excelDownload.options   = {
                Cfg: HoldOption3.options.Cfg,
                Cols: HoldOption3.options.Cols.filter(item => !['isChecked'].includes(item.Name)),
            }
            this.excelDownload.fileName  = `세대설정_${this.$moment().format('YYYYMMDD')}.xlsx`
            this.excelDownload.data      = this.sheetData
            this.excelDownload.request   = true
        },
    }
}
</script>