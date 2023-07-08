<template>
  <div class="sqms-grid-wrap" >
    <div class="button_box">
      <slot name="button-prefix" />

      <button
        v-if="downloadable"
        type="button"
        class="btn btn_sm btn_excel"
        @click="excelDown()"
      >
        엑셀 다운로드
      </button>

      <div class="fr">
        <slot
          name="button-suffix"
          :sheet="sheet"
        />
        <button
          v-if="fileable" 
          type="button" 
          class="btn btn_sm btn_darkgray" 
          @click="fileRow()"
        >
          {{ buttonName.file }}
        </button>
        <button
          v-if="copyable"
          type="button"
          class="btn btn_sm btn_darkgray"
          @click="copyRow()"
        >
          {{ buttonName.copy }}
          <!-- 행 복사 -->
        </button>

        <div
          class="btn_number"
          v-if="addable"
        >
          <select
            v-if="maxAddRowCnt"
            class="form_control num"
            v-model="addRowCnt"
          >
            <option
              v-for="num in maxAddRowCnt"
              :key="num"
              :value="num"
            >
              {{ num }}
            </option>
          </select>
          <button
            type="button"
            class="btn btn_sm"
            @click="addRow()"
          >
            {{ buttonName.add }}
            <!-- 행 추가 -->
          </button>
        </div>

        <button
          v-if="deletable"
          type="button"
          class="btn btn_sm btn_darkgray"
          @click="deleteRow()"
        >
          {{ buttonName.delete }}
          <!-- 행 삭제 -->
        </button>
        <button
          v-if="storable"
          type="button"
          class="btn btn_sm btn_darkblue"
          @click="openSavePop"
        >
          {{ buttonName.store }}
          <!-- 저장 -->
        </button>
      </div>
    </div>
    <div class="ib_wrap" :style="upperStyle">
      <div
        class="ibsheet_table"
        ref="SQMSGridRef"
        :id="id"
        :style="inputStyle"
      />
    </div>

    <!-- '저장하시겠습니까? 팝업' -->
    <pop-alert
      :pop-id="'savePop_' + this.id"
      :msg="savePopAlertmsg"
      confirm-use
      :btn-name="{first : '확인', second : '취소'}"
      @first-btn-fn="save()"
      @second-btn-fn="closePopAlert"
    />

    <!-- 선택 row 없을 때 얼럿 -->
    <pop-alert
      pop-id="noRowAlert_sqmsGrid"
      :msg="noRowAlert"
      :btn-name="{first : '확인'}"
      @first-btn-fn="$bvModal.hide('noRowAlert_sqmsGrid')"
    />

    <pop-alert
        pop-id="plusInfoAlert"
        :msg="plusInfoMsg"
        :btn-name="{first: '확인'}"
        @first-btn-fn="$bvModal.hide('plusInfoAlert')"
    />
  </div>
</template>

<script>
  import loader from '@ibsheet/loader'
  import PopAlert from '@/pages/common/popup/PopAlert.vue'

  const pageInfo = {}
  let SHEET_ID = ''

  export default {
    name: 'SQMSGrid',
    components: {
      PopAlert
    },
    props: {
      id: {
        type: String,
        default: 'sqmsGrid',
        require: true
      },
      columns: {
        type: Array,
        default: () => []
      },
      data: {
        type: Array,
        default: () => []
      },
      useCheckbox: {
        type: Boolean,
        default: false
      },
      useRadio: {
        type: Boolean,
        default: false
      },
      headerCheckboxRowspan: {
        type: Number,
        default: 1
      },

      savePopAlertmsg: {
        type: String,
        default: '저장하시겠습니까?'
      },

      inputStyle: {
        type: Object,
        default: undefined
      },
      upperStyle: {
        type: Object,
        default: undefined
      },

      // 버튼
      fileable: { // 첨부일괄등록 버튼 노출 여부
        type: Boolean,
        default: false
      },
      copyable: { // 행 복사 버튼 노출 여부
        type: Boolean,
        default: false
      },
      addable: { // 행 추가 버튼 노출 여부
        type: Boolean,
        default: false
      },
      deletable: { // 행 삭제: 행 삭제 버튼 노출 여부 => 삭제된 행 hidden
        type: Boolean,
        default: false
      },
      removable: { // 행 삭제: 행 삭제 버튼 노출 여부 => 행 아예 삭제
        type: Boolean,
        default: false
      },
      storable: { // 저장 버튼 노출 여부
        type: Boolean,
        default: false
      },
      downloadable: { // 엑셀 다운로드 노출 여부
        type: Boolean,
        default: false,
      },
      cfg: {
        type: Object,
        default: () => {}
      },
      saveMode: { // 저장 모드 [ 1: 전체, 2: 삭제를 제외한 전체 데이터, 3: 변경한 전체 데이터 ]
        type: Number,
        default: 3,
        validator (value) {
          return [0, 1, 2, 3].includes(value)
        }
      },
      addRowData: { // 행 추가 : 행 추가할 때, 추가할 row data
        type: Object,
        default: undefined
      },
      maxAddRowCnt: { // 행 추가 : 최대 추가할 수 있는 행의 수
        type: Number,
        default: 10
      },
      addRowPosition: { // 행 추가 : 행 추가 어디로 할 지? [ start: 제일 윗줄, end: 제일 아랫줄 ]
        type: String,
        default: 'start',
        validator (value) {
          return ['start', 'end'].includes(value)
        }
      },
      useNoDataEmptyRow: { // 데이터가 없을 때, 빈 row를 추가할 지?
        type: Boolean,
        default: false
      },
      saveValidation: { // 저장 전 validation
        type: Function,
        default: undefined
      },
      deleteValidation: { // 삭제 전 validation
        type: Function,
        default: undefined
      },
      buttonLabel: {
        type: Object,
        default: undefined
      },
      saveWhenChange: { // True: 변경정보 있을 때만 저장, False: 변경정보 없을 때도 저장(저장시 변경 유무 체크하지 않음.)
        type: Boolean,
        default: true
      },
      excelFileName: {
        type: String,
        default: () => {
          return `Sheet.xlsx`
        }
      },
    },
    data: () => ({
      options: {
        Cols: []
      },
      sheet: null,
      addRowCnt: 1, // 추가할 행 갯수
      removedData: [], // removable => 삭제되버린 row 들...
      plusInfoMsg : '',
      noRowAlert: '',
      buttonName: {
        add: '행 추가',
        copy: '행 복사',
        delete: '행 삭제',
        store: '저장',
        file: '첨부일괄등록'
      }
    }),
    watch: {
      data () {
        this.init()
      },
      columns () {
        // if(this.useCheckbox) this.setCheckboxColumn()
        // this.init()
      },
      buttonLabel: {
        immediate: true,
        deep: true,
        handler(newLabels) {
          this.buttonName = {
            ...this.buttonName,
            ...newLabels
          }
        }
      }
    },
    created () {
      if(this.columns?.length) {
        this.init()
      }
    },
    beforeDestroy () {
      pageInfo[this.id]?.dispose()
      // loader?.removeSheet(SHEET_ID)
    },
    methods: {
      async init () {
        this.$nextTick(async function(){
          if (this.useCheckbox) await this.setCheckboxColumn()
          if (this.useRadio) await this.setRadioColumn()
          await this.setOptions()
          this.loadSheet()
        })
      },
      setOptions () {
        this.options = {
          Cols: this.columns,
          Cfg: this.cfg ? this.cfg : {
            NoVScroll: true
          },
          Events: {
            onRenderFirstFinishAll : (evt) => {
              // console.log('renderFirstFinish')
              this.$emit('renderFirstFinishAll', evt)
            },
            onClick: (evt) => { this.$emit('click', evt) }, // row 클릭 이벤트
            onDblClick: (evtParam) => { this.$emit('dbClick', evtParam) }, // row 더블클릭 이벤트
            onRowAdd: (evtParam) => {
              this.$emit('rowAdd', evtParam)
            },
            onAfterRowAdd: (evtParam) => {
              this.$emit('afterRowAdd', evtParam)
            },
            onAfterRowDelete: (evtParam) => {
              this.$emit('afterRowDelete', evtParam)
            },
            onMouseOver: (evtParam) => {
              this.$emit('mouseOver', evtParam)
            },
            onAfterChange: (evtParam) => {
              this.$emit('afterChange', evtParam)
            },
            onRenderFinish: (evtParam) => {
              this.$emit('renderFinish', evtParam)
              this.$emit('init', evtParam.sheet)
            },
            onDataLoad: (evtParam) => {
              this.$emit('dataLoad', evtParam)
            }
          }
        }
      },
      loadSheet (options = this.options) {
        if(!options || !this.id || !this.$refs?.SQMSGridRef) return

        const emptyRow = {}
        this.columns.forEach(col => {
          emptyRow[col.Name] = ''
        })

        this.$nextTick(function() {
          loader.createSheet({
            el: this.$refs?.SQMSGridRef,
            options,
            data: this.data?.length ? this.data : (this.useNoDataEmptyRow ? [{...emptyRow}] : [])
          }).then((sheet) => {
            // SHEET_ID = sheet.id
            if(sheet) {
              pageInfo[this.id] = sheet
              this.sheet = sheet
            }
          })
        })
      },
      /**
       * 0번째 컬럼에 체크박스 컬럼을 추가합니다.
       */
      setCheckboxColumn () {
        if(this.columns.length && this.columns[0]?.Name !== 'isChecked') {
          const checkboxCol =   {
            Name: 'isChecked',
            Header: [{ Value: '', HeaderCheck: 1, Class: 'chk_notext', IconAlign: 'Center', RowSpan: this.headerCheckboxRowspan }],
            Type: 'Bool',
            CanSort: 0,
            Width: 50
          }
          this.columns.unshift(checkboxCol)
        }
      },
      /**
       * 0번째 컬럼에 체크박스 컬럼을 추가합니다.
       */
      setRadioColumn () {
        if(this.columns.length && this.columns[0]?.Name !== 'isChecked') {
          const checkboxCol =   {
            Name: 'isChecked',
            Header: [{ Value: '', HeaderCheck: 1, RowSpan: this.headerCheckboxRowspan }],
            Type: 'Radio',
            HRadio: 0,
            CanSort: 0,
            Width: 50
          }
          this.columns.unshift(checkboxCol)
        }
      },
      /**
       * 첨부일괄등록
       */
      fileRow (sheet = pageInfo[this.id]) {
        if(!sheet) return

         const selectedRow = this.useCheckbox || this.useRadio ?
          sheet.getRowsByChecked('isChecked') :
          [sheet.getFocusedRow()]

        if(!selectedRow?.length) {
          this.noRowAlert = '첨부일괄등록할 행을 선택해주세요.'
          return this.$bvModal.show('noRowAlert_sqmsGrid')
        } else {
          this.$emit('fileBatchReg', selectedRow)
        }

      },
      /**
       * 행 복사
       */
      copyRow (sheet = pageInfo[this.id]) {
        if(!sheet) return
        const selectedRow = this.useCheckbox || this.useRadio ? sheet.getRowsByChecked('isChecked') : [sheet.getFocusedRow()]

        if(!selectedRow?.length) {
          this.noRowAlert = '복사할 행을 선택해주세요.'
          return this.$bvModal.show('noRowAlert_sqmsGrid')
        }

        for(let i = 0; i< selectedRow.length; i ++){
          let focusRow = selectedRow[i]
          let idx = sheet.getRowIndex(focusRow)+1
          // this.sheet1.copyRow({row:focusRow,next:this.sheet1.getNextRow(focusRow)})
          sheet.copyRow({row:focusRow,next:selectedRow[0]})
          let selectRow = sheet.getRowByIndex(idx);
          selectRow['isChecked'] = 0;
          sheet.refreshRow(selectRow);
          // console.log('selectRow',selectedRow[i])
          // console.log('sheet',sheet)
          sheet.setAttribute(selectedRow[i], 'tradeNm', 'CanEdit', 1, 1)
          sheet.setAttribute(selectedRow[i], 'concMixSd', 'CanEdit', 1, 1)
        }
      },
      /**
       * 행 추가
       */
      addRow (sheet = pageInfo[this.id]) {
        if(!sheet) return

        const newRow = this.addRowData ? { visible: 1, ...this.addRowData} : { visible: 1 }

        let selectedRow = sheet.getRowsByChecked('isChecked')
        let nextRow = null
        if(this.id === 'pourPlanGrid' || this.id === 'materialGrid' || this.id === 'ctemGrid'){
            nextRow = this.addRowPosition === 'start' ? sheet.getNextSiblingRow(sheet.getFocusedRow()) : null
          // const nextRow = this.addRowPosition === 'start' ? sheet.getNextSiblingRow(sheet.getFocusedRow()) : null
          for (let i = 0; i < this.addRowCnt; i++) {
            pageInfo[this.id]?.addRow({ next : nextRow, init : newRow })
          }
        } else {
          if(selectedRow.length > 1){
            this.noRowAlert = '기준이 될 행을 하나만 선택해주세요.'
            return this.$bvModal.show('noRowAlert_sqmsGrid')
          } else {
            if( selectedRow.length === 1){
              // nextRow = this.addRowPosition === 'start' ? sheet.getNextSiblingRow(sheet.getFocusedRow()) : null
              nextRow = this.addRowPosition === 'start' ? sheet.getNextRow(selectedRow[0]) : null
            } else {
              nextRow = this.addRowPosition === 'start' ? sheet.getFirstRow() : null
            }
          }
          // const nextRow = this.addRowPosition === 'start' ? sheet.getNextSiblingRow(sheet.getFocusedRow()) : null
  
          for (let i = 0; i < this.addRowCnt; i++) {
            pageInfo[this.id]?.addRow({ next : nextRow, init : newRow })
          }

        }
      },
      /**
       * 행 삭제
       */
      deleteRow (sheet = pageInfo[this.id]) {
        if(!sheet) return

        const selectedRow = this.useCheckbox || this.useRadio ?
          sheet.getRowsByChecked('isChecked') :
          [sheet.getFocusedRow()]

        const deleteFlag = this.deleteValidation ? this.deleteValidation(selectedRow) : true // True || False 반드시 리턴

        if(selectedRow?.length && deleteFlag) {
          sheet.deleteRows(selectedRow)
          selectedRow.forEach(row => {
            sheet.hideRow({
              row,
              del: false ,
              norender: false
            })
          })

          if (this.removable) {
            selectedRow.forEach(row => {
              this.removedData.push(sheet.getRowValue(row))
            })
            sheet.removeRows(selectedRow)
          }

          // sheet.removeRows(selectedRow)
        } else {
          this.noRowAlert = '삭제할 행을 선택해주세요.'
          return this.$bvModal.show('noRowAlert_sqmsGrid')
        }
        this.$emit('afterDelete', sheet)
      },
      /**
       * 변경사항이 있으면 '저장하시겠습니까?' 팝업 띄움
       */
      openSavePop () {
        if (this.saveWhenChange) {
          const changedSheetData = pageInfo[this.id].getSaveJson({
            saveMode: 3
          })
          const changedData = this.removable ? [...changedSheetData.data, ...this.removedData] : changedSheetData.data
  
          if(!changedData?.length) {
            this.noRowAlert = '저장할 데이터가 없습니다.'
            return this.$bvModal.show('noRowAlert_sqmsGrid')
          }
        }

        const allData =  pageInfo[this.id].getSaveJson({ saveMode: 0 })
        const saveFlag = this.saveValidation ? this.saveValidation(allData?.data) : true // True || False 반드시 리턴
        if (saveFlag)  this.$bvModal.show('savePop_' + this.id)
        else return
      },

      // ========== 저장 >PopAlert ============
      /**
       * alert > 취소
       */
      closePopAlert () {
        this.$root.$emit('bv::hide::modal', 'savePop_' + this.id)
      },
      /**
       * 저장
       */
      save () {
        this.closePopAlert()
        const sheetData = pageInfo[this.id].getSaveJson({
          saveMode: this.saveMode
        })

        const saveData = sheetData?.data.map(item => {
          return {
            ...item,
            status: item.STATUS,
            siteMstrId: this.$cookies.get("siteMstrId")
          }
        })
        this.$emit('save', {sheet: pageInfo[this.id], data: saveData})

        this.removedData = []
      },

      /** 엑셀 다운 */
      excelDown () {
        this.sheet.down2Excel({
                merge:      1,                  // 머지된 내용 그대로 출력할 것인지
                downCols:   'Visible',          // 'Visible' : 화면상 보이는 Column 그외엔 문자열 join 형태(mainCodeId|midCodeId|...)
                reqHeader:  {
                                'Authorization': this.$cookies.get('Authorization'),
                                'Accept-Language': 'ko'
                            },
                fileName:   this.excelFileName,  // file명 : 현재화면 페이지 _현재 날짜
            })
      }
    },
  }
</script>