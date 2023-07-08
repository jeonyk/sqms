<template>
    <div>
        <div class="lookup_box multi_line">
            <table>
                <caption class="sr_only">제목</caption>
                <colgroup>
                    <col width="4%">
                    <col width="20%">
                    <col width="4%">
                    <col width="20%">
                    <col width="*">
                </colgroup>
                <tbody>
                    <tr>
                        <th>배치명</th>   
                        <td>
                            <input type="text" v-model="search.batchName" class="form_control size_lg" placeholder="입력해주세요" @keyup.enter="searchData(false)">
                        </td>
                        <th>상태</th>
                        <td>
                            <select
                                v-model="search.status"
                                class="form_control"
                                >
                                <option
                                    v-for="option in categoryData"
                                    :key="option.value"
                                    :value="option.value"
                                >
                                    {{ option.label }}
                                </option>
                            </select>
                        </td>
                        <td class="ar">
                            <button type="button" class="btn_reset" @click="searchData(true)">초기화</button>
                            <button type="button" class="btn btn_sm btn_darkblue btn_radius btn_search" @click="searchData(false)">검색</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div class="inner">
            <div class="button_box">
                <div class="fr">
                    <button type="button" class="btn btn_sm btn_darkblue" @click="saveData()">저장</button>
                </div>
            </div>
            <div class="ib_wrap mt0" style="height: calc(100vh - 320px)">
                <div id="ibsheet_batch" class="ibsheet_table" style="height: 100%;"></div>
            </div>
        </div>   <!-- // inner -->
        <!-- ibsheet -->
    </div>
</template>

<script>
import API from '@/apis/'
import _ from 'lodash'
import axios from 'axios'
import loader from '@ibsheet/loader';
import MsgBoxMixins  from '@plugin/mixin/MsgBox.mixins.js';
import { BatchList } from '@/pages/common/data/UserMngtList'

export default {
    name: 'SqmsBatchSheet',
    mixins: [MsgBoxMixins],
    components: {
    },
    data: () => ({
        footerBg: 'transparent',
        sheet : null,
        sheetData : null,
        search : {
            batchName : '',
            status : '',
        },
        categoryData : [
            { label : '전체', value: ''},
            { label : '성공', value: 'COMPLETED'},
            { label : '실행중', value: 'STARTED'},
            { label : '실패', value: 'FAIL'},
        ]            
    }),
    mounted() {
        this.batchList()
    },
    methods: {
        /**
         * 초기 그리드 데이터를 가공합니다
         */
        mappingInitGridData(data){
            if(!data) return []

            const mappedData = data.map(row => {
                row.status = row.status === 'COMPLETED'? '성공': row.status === 'STARTED'? '실행중':'실패'
				if(row.inDttm) row.inDttm = row.inDttm.split('T')[0]
				if(row.upDttm) row.upDttm = row.upDttm.split('T')[0]
                return {
                    ...row,
                }
            })
            return mappedData
        },
        async batchList(payload = this.search) {
            let options = BatchList.options
            payload["projectId"] = this.$store.getters['auth/getProjectId'];
            options.Events = {
                onRenderFirstFinish: async () => {
                    try {
                        await API.batch.getSelectBatchList(payload).then(response => {
                            if(response.datas?.length > 0) {
                                this.sheetData = this.mappingInitGridData(response.datas)
                                this.sheet.loadSearchData({
                                    data : this.sheetData
                                })
                            }else{
                                this.sheet.loadSearchData({
                                    data : []
                                })
                            }
                        })
                    } catch (error) {
                        console.error(error)
                    }
                },
                onAfterClick: (evt) => {
                    this.clickGrid(evt)
                },
            }

            loader.createSheet({
                el: 'ibsheet_batch',
                data: [],
                options : options
            }).then(sheet => {
                this.sheet = sheet
            })
        },
        clickGrid(evt) {
            if(evt.col === 'execution'){
                this.BatchApi(evt)
            }
        },
        BatchApi(evt){
            this.confirm('배치명 : ' + evt.row.batchName + '을 실행하시겠습니까?', async ()=> {
                if(evt.row.jobName === 'Job0'){
                    try {
                        const response = await API.batch.testRrqstMtrlAccpTestExDateApi()
                        console.log(response)
                        if(response == 'Y'){
                            this.alert(evt.row.batchName + '실행 하였습니다.')
                            this.batchList()
                        } else {
                            this.alert('발송 대상자가 없습니다')
                            this.$router.push({
                                name: 'UserMngtTab'
                            })
                        }
                    } catch (error) {
                        console.error(error)
                        this.alert(evt.row.batchName + ' 배치 실패')
                    }
                } else if(evt.row.jobName === 'Job1'){
                    try {
                        const response = await API.batch.concMngtCrckMngtMesgTrgtListApi()
                        if(response == 'Y'){
                            this.alert(evt.row.batchName + '실행 하였습니다.')
                            this.batchList()
                        } else {
                            this.alert('발송 대상자가 없습니다')
                            this.$router.push({
                                name: 'UserMngtTab'
                            })
                        }
                    } catch (error) {
                        console.error(error)
                        this.alert(evt.row.batchName + ' 배치 실패')
                    }
                } else if(evt.row.jobName === 'Job2'){
                    try {
                        const response = await API.batch.extrnSelfMesgTrgApi()
                        if(response == 'Y'){
                            this.alert(evt.row.batchName + '실행 하였습니다.')
                            this.batchList()
                        } else {
                            this.alert('발송 대상자가 없습니다')
                            this.$router.push({
                                name: 'UserMngtTab'
                            })
                        }
                    } catch (error) {
                        console.error(error)
                        this.alert(evt.row.batchName + ' 배치 실패')
                    }
                } else if(evt.row.jobName === 'Job3'){
                    try {
                        const response = await API.batch.bscheckDefectPrcsDelyNotiMesgTrgtListApi()
                        if(response == 'Y'){
                            this.alert(evt.row.batchName + '실행 하였습니다.')
                            this.batchList()
                        } else {
                            this.alert('발송 대상자가 없습니다')
                            this.$router.push({
                                name: 'UserMngtTab'
                            })
                        }
                    } catch (error) {
                        console.error(error)
                        this.alert(evt.row.batchName + ' 배치 실패')
                    }        
                } else if(evt.row.jobName === 'Job4'){
                    try {
                        const response = await API.batch.dvicCorctDelyEduPlanDtApi()
                        if(response == 'Y'){
                            this.alert(evt.row.batchName + '실행 하였습니다.')
                            this.batchList()
                        } else {
                            this.alert('발송 대상자가 없습니다')
                            this.$router.push({
                                name: 'UserMngtTab'
                            })
                        }
                    } catch (error) {
                        console.error(error)
                        this.alert(evt.row.batchName + ' 배치 실패')
                    }            
                } else if(evt.row.jobName === 'Job5'){
                    try {
                        const response = await API.batch.ptnrPswdExprMesgTrgApi()
                        if(response == 'Y'){
                            this.alert(evt.row.batchName + '실행 하였습니다.')
                            this.batchList()
                        } else {
                            this.alert('발송 대상자가 없습니다')
                            this.$router.push({
                                name: 'UserMngtTab'
                            })
                        }
                    } catch (error) {
                        console.error(error)
                        this.alert(evt.row.batchName + ' 배치 실패')
                    }                
                } else if(evt.row.jobName === 'Job6'){
                    try {
                        const response = await API.batch.houseOptionBatchApi()
                        if(response.count > 0){
                            this.alert(evt.row.batchName + '실행 하였습니다.')
                            this.batchList()
                        } else {
                            this.alert(evt.row.batchName +'배치 도중 문제가 발생하였습니다. 다시 시도해 주세요')
                            this.$router.push({
                                name: 'UserMngtTab'
                            })
                        }
                    } catch (error) {
                        console.error(error)
                        this.alert(evt.row.batchName + ' 배치 실패')
                    }                    
                } else if(evt.row.jobName === 'Job7'){
                    try {
                        const response = await API.batch.siteInsertUserBatchApi()
                        if(response.count > 0){
                            this.alert(evt.row.batchName + '실행 하였습니다.')
                            this.batchList()
                        } else {
                            this.alert(evt.row.batchName +'배치 도중 문제가 발생하였습니다. 다시 시도해 주세요')
                            this.$router.push({
                                name: 'UserMngtTab'
                            })
                        }
                    } catch (error) {
                        console.error(error)
                        this.alert(evt.row.batchName + ' 배치 실패')
                        
                    }                        
                }
            })
        },
        /**
         * 그리드 상단 필터링 > 검색 버튼 클릭 시 발생 이벤트
         * @param {Boolean} isReset 초기화 버튼 클릭인지?
         */
        async searchData(isReset) {
            if(isReset){
                this.search = {
                    batchName : '',
                    status : '',
                }
                return
            }else{
                return await this.batchList(this.search)
            }
        },
        async saveData () {
            const sheetData = this.sheet.getSaveJson({
                saveMode : 2
            })
            if(sheetData.data.length === 0){
				return this.alert('저장할 데이터가 없습니다.')
			}
            /**
			 * 저장전 유효성 체크
			 */
			const valiData = this.sheet.getSaveJson({
				saveMode : 1
			})
			let data = valiData.data
			for(let i = 0; i < data.length; i++) {
				if(!data[i].batchName){
					return this.alert(`${i+1} 번째 행의 배치명을 입력해주세요.`)
				}
				if (!data[i].cronExpression) {
					return this.alert(`${i+1} 번째 행의 배치 주기를 입력해주세요.`)
				}
			}

            this.confirm('배치 관리 설정을 저장하시겠습니까?', async ()=> {
                const failSave = () => {
					return this.alert('저장에 실패하였습니다.')
				}
                try {
                    const payload = sheetData.data.map(item => {
                        return {
                            status : item.STATUS,
                            schedulerId : item.schedulerId,
                            cronExpression : item.cronExpression,
                            batchName : item.batchName,
                            upUser : this.$store.getters['auth/getUserId']
                        }
                    })
                    const response = await API.batch.updateSchedulerInfo(payload)
                    console.log(response)
                    if(response?.count > 0) {
                        this.alert('저장되었습니다.')
                        await this.batchList()
                    } else {
                        failSave()
                    }
                } catch (error) {
                    console.error(error)
                    failSave()
                }
            })
        },
    },
}
</script>