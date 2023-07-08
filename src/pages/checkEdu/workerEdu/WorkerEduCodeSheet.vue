<template>
    <div>
        <div class="inner type2">
            <div class="button_box">
                <div class="fr">
                    <button type="button" class="btn btn_sm btn_darkblue" @click="saveBtn">저장</button>
                </div>
                <div class="mt10">
                    <select v-model="filtering.langCode" class="form_control">
                        <option
                            v-for="option in langListOptions"
                            :key="option.value"
                            :value="option.value"
                        >
                            {{ option.label }}
                        </option>
                    </select>
                </div>
            </div>

            <!-- ibsheet -->
            <sqms-grid
                id="workerEduCodeSheet"
                :columns="columns"
                :data="gridData"
                :upperStyle="{'height':'calc(100vh - 280px)'}"
                :inputStyle="{'height':'100%'}"
                :cfg="{
                    NoVScroll: false
                }"
                @init="initSheet"
                ref="workerEduCodeRef"
            >
            </sqms-grid>
        </div>
    </div>
</template>
<script>
   import { WorkerTrainingList3 } from '@/pages/common/data/InspectionList'
   import API from '@/apis/'
   import _ from 'lodash'
   import MsgBoxMixins  from '@plugin/mixin/MsgBox.mixins.js'

   export default {
        name: 'WorkerEduCodeSheet',
        mixins: [MsgBoxMixins],
        components: {
        },
        data: () => ({
            columns: [], // 그리드 컬럼
		    gridData: [], // 그리드 데이터
            sheet: null, // 그리드 시트
            langListOptions: [],
            filtering: {
                langCode: 'kr'
            }
        }),
        watch:{
            'filtering.langCode': {
                handler: function () {
                    this.getWorkerEduCodeLangList(this.filtering.langCode)
                },
            },
           
        },
        async created() {
            this.columns = WorkerTrainingList3.options.Cols
            this.getWorkerEduLangList()
            this.getWorkerEduCodeLangList(this.filtering.langCode)
        },
        methods: {
            initSheet (sheet) {
                this.sheet = sheet
            },
            /**
             * 코드 번역 리스트 조회
             */
            async getWorkerEduCodeLangList(data) {
                const payload = {
                    langCode: data
                }
                try {
                    const response = await API.workerEdu.getWorkerEduCodeLangList(payload)
                    if(response.dlCodeMultiLang){
                        this.gridData = this.mappingInitGridData(response.dlCodeMultiLang)
                    }else{
                        this.gridData = WorkerTrainingList3.data 
                    }
                } catch (error) {
                    console.error('코드번역 초기 조회 에러 : ', error)
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
             * 초기 그리드 데이터 세팅
             */
            mappingInitGridData(data){
                if(!data) return []

                const mappedData = data.map(row => {
                    row.codeSubType = row.codeType
                    row.codeType = row.codeType === "MAIN"? '공종':'세부공종'
                    return {
                        ...row,
                    }
                })
                return mappedData
            },
            /**
             * 그리드 상단 셀렉트 옵션 데이터를 세팅합니다.
             * 코드 번역 
             */
            setTopFilterOptions (data) {
                const allEduLangList = data.map(item => {
                    return {
                        label: item.langName,
                        value: item.langCode
                    }
                })
                this.langListOptions = [..._.uniqBy(allEduLangList, 'value')]
                this.filtering.langCode = 'kr'
            },
            async saveBtn() {
                this.confirm('코드번역을 저장하시겠습니까?', async () => {
                    const failSave = () => {
                        return this.alert('저장에 실패하였습니다.')
                    }
                    try {
                        const payload = this.sheet.getSaveJson({
                            saveMode: 1
                        })
                        payload.data.forEach(item => {
                            item.langCode =  this.filtering.langCode
                            item.codeType = item.codeSubType
                            item.transCodeName = item.transCodeName
                            item.code = item.code
                        })
                        const result = await API.workerEdu.getWorkerEduCodeLangChange(payload.data)
                        if(result.count > 0){
                            this.alert('저장되었습니다.')
                            this.getWorkerEduCodeLangList(this.filtering.langCode)
                        } else {
                            failSave()
                        }
                        // else{
                        //     this.alert('변경된 정보가 없습니다.')
                        // }
                    } catch (error) {
                        console.error('코드 번역 저장 에러 : ', error)
                        failSave()
                    }
                })
            }
        }
   }
</script>