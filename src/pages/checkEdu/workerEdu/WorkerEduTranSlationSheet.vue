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
                id="workerEduTranSlationSheet"
                :columns="columns"
                :data="gridData"
                :upperStyle="{'height':'calc(100vh - 280px)'}"
                :inputStyle="{'height':'100%'}"
                :cfg="{
                    NoVScroll: false
                }"
                @init="initSheet"
                ref="workerEduTranSlationRef"
            >
            </sqms-grid>
        </div>
    </div>
</template>
<script>
   import { WorkerEduTranSlantion } from '@/pages/common/data/InspectionList'
   import API from '@/apis/'
   import _ from 'lodash'
   import MsgBoxMixins  from '@plugin/mixin/MsgBox.mixins.js'

   export default {
        name: 'WorkerEduTranSlationSheet',
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
                    this.getWorkerEduTranSlation(this.filtering.langCode)
                },
            },
           
        },
        async created(){
            this.columns = WorkerEduTranSlantion.options.Cols
            this.getWorkerEduLangList()
            this.getWorkerEduTranSlation(this.filtering.langCode)
            
        },
        methods: {
            initSheet (sheet) {
                this.sheet = sheet
            },
            /**
             * 언어번역 리스트 조회
             */
            async getWorkerEduTranSlation(data){
                const payload = {
                    langCode: data
                }
                try {
                    const response = await API.workerEdu.getWorkerEduTranSlation(payload)
                    if(response.dlContsMultiLang && response.dlContsMultiLang.length > 0){
                        this.gridData = response.dlContsMultiLang
                        this.gridData.forEach(row => {
                            row.korean = WorkerEduTranSlantion.data.find(item => item.contsPage === row.contsPage && item.contsLoc === row.contsLoc && item.contsType === row.contsType).korean
                        })
                    }else{
                        this.gridData = WorkerEduTranSlantion.data
                    }
                } catch (error) {
                    console.error('언어번역 리스트 조회 에러 : ',error)
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
            async saveBtn(){
                this.confirm('언어번역을 저장하시겠습니까?', async () => {
                    const failSave = () => {
                        return this.alert('저장에 실패하였습니다.')
                    }
                    try {
                        const payload = this.sheet.getSaveJson({
                            saveMode: 0
                        })
                        payload.data.forEach(item => {
                            item.langCode =  this.filtering.langCode
                            item.contsPage = item.contsPage
                            item.contsPageName = item.contsPageName
                            item.contsType = item.contsType
                            item.transContsName = item.transContsName
                            item.contsLoc = item.contsLoc
                            item.contsMultiLangId = item.contsMultiLangId
                        })
                        const result = await API.workerEdu.getWorkerEduTranSlationChange(payload.data)
                        if(result.count > 0){
                            this.alert('언어번역이 저장되었습니다.')
                            this.getWorkerEduTranSlation(this.filtering.langCode)
                        }else{
                            this.alert('언어번역 저장에 실패하였습니다.')
                        }
                    } catch (error) {
                        console.error('코드 번역 저장 에러 : ', error)
                        failSave()
                    }
                })
            }
        }
   }
</script>