<template>
    <section class="tab_contents">
        <!-- class inner type2(half size) -->
        <div class="inner type">
            <h2 class="sub_title"> {{ checklistInformation.checkType === 'accept' ? ui.title[0] : ui.title[1] }} 
                <div class="fr">
                    <button
                        v-if="userWritable"
                        type="button"
                        class="btn btn_md btn_outline btn_darkgray"
                        @click="confirm('저장하시겠습니까?', clickSave)"
                    >
                        {{'저장'}}
                    </button>
                    <button
                        type="button"
                        class="btn btn_md btn_outline btn_darkgray"
                        @click="clickList"
                    >
                        {{'목록'}}
                    </button>
                </div>
            </h2>

            <div class="table_normal_list mt0">
                <table>
                    <caption class="sr_only">제목</caption>
                    <colgroup>
                        <col width="7%">
                        <col width="20%">
                        <col width="*">
                        <col width="18%">
                    </colgroup>
                    <thead>
                        <tr>
                            <th>공종</th>
                            <th>세부공종</th>
                            <th>품명</th>
                            <th>등록일자</th>
                            <th v-if="checklistInformation.pageType === 'site'"> 개정번호 </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{{checklistInformation.mainName}}</td>
                            <td>{{checklistInformation.midName}}</td>
                            <td>{{checklistInformation.row.productName}}</td>
                            <td>{{$moment(checklistInformation.row.inDttm).format('YYYY-MM-DD') }}</td>
                            <td v-if="checklistInformation.pageType === 'site'"> {{ checklistInformation.row[`${checklistInformation.checkType}CheckNumber`]}} </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="button_box">

                <div class="fr">
                    <button
                        v-if="userWritable"
                        type="button"
                        class="btn btn_sm btn_darkgray"
                        @click="clickCopyRows"
                    >
                        행 복사
                    </button>

                    <div class="btn_number" v-if="userWritable">
                        <select
                            v-model="grid.addRowsCount"
                            class="form_control num"
                        >
                            <option
                                v-for="count in Array(10).fill().map((item, index) => {return index+1})"
                                :key="count"
                                :value="count"
                            >
                                {{ String(count).padStart(3, '0') }}
                            </option>    
                        </select>
                        <button
                            type="button"
                            class="btn btn_sm"
                            @click="clickAddRows"
                        >
                            행 추가
                        </button>
                    </div>

                    <button
                        v-if="userUnusable"
                        type="button"
                        class="btn btn_sm btn_darkgray"
                        @click="clickDeleteRow"
                    >
                        행 삭제
                    </button>
                </div>

            </div>
            <div class="ib_wrap" style="height: calc(100vh - 390px)" >
                <div id="materialCheckList" class="ibsheet_table" style="height: 100%;"/>
            </div>
        </div>

        <!-- <wrapped-alert
            refs="alertPopup"
            :title="popup.title"
            :is-show.sync="popup.isShow"
            :message="popup.message"
            :purpose="popup.purpose"
            :use-cancel-button="false"
            @click-confirm="clickPopupConfirm"
        />   -->
    </section>
</template>

<script>

// import WrappedAlert from "@/pages/quality/materialMngt/component/WrappedAlert"
import { MaterialChecklist, MaterialChecklist2 } from '@/pages/common/data/MaterialsList'
import API from '@/apis/'

// import API from '@/pages/quality/materialMngt/apis/material'
import { mapGetters } from 'vuex'
import loader from '@ibsheet/loader'

import MsgBoxMixins  from '@plugin/mixin/MsgBox.mixins.js'
import authCheckMixns  from '@plugin/mixin/AuthCheck.js'


export default {
    name: 'MaterialCheckListSheet',
    mixins: [MsgBoxMixins, authCheckMixns],
    components: {
        // WrappedAlert
    },
    props: {

    },
    watch: {

    },
    computed: {
        ...mapGetters({
            'checklistInformation': 'quality/getMaterialCheckList',
            userId: 'auth/getUserId',
        }),
        userWritable: {
            get: function () {
                return this.checkUser(this.userId, 'write')
            },
        },
        userUnusable: {
            get: function () {
                return this.checkUser(this.userId, 'unuse')
            },
        },
        userChangable: {
            get: function () {
                return this.checkUser(this.userId, 'change')
            },
        },
    },
    mounted () {

        // this.validateInforamtion()

        this.$nextTick(()=> {
            this.initializeGrid ()
        })
    
    },
    beforeDestroy () {
        // this.grid.grid.dispose()
        // loader.removeSheet(this.grid.grid.id)
    },
    methods: {
        validateInforamtion () {
            if (this.checklistInformation.row === undefined || this.checklistInformation.row === null ) {
                    this.$router.replace({
                    name: 'materialHeadSetUpSheet',
                })
            }
        },
        initializeGrid () {
            this.grid.options = this.checklistInformation.checkType === 'accept' ?  MaterialChecklist.options : MaterialChecklist2.options

            this.grid.data = []

            this.grid.options.Events = {
                onRenderFirstFinish: async  () => {
                    await this.getGridData()
                },
                onRenderFinish: event => {
                    if (!this.userWritable) {
                        event.sheet.getDataRows().forEach(row => {
                            event.sheet.setAttribute(row, null, 'CanEdit', '2')
                        })
                    }
                }
            }

            loader.createSheet({
                el: 'materialCheckList',
                options: this.grid.options,
                data: this.grid.data
            }).then(async sheet => {
                this.grid.grid = sheet

                // this.grid.data = this.checklistInformation.pageType === 'project' ? this.checklistInformation.row[`${this.checklistInformation.checkType}CheckList`] : await this.getGridData()

                
            })

        },
        async getGridData (param) {
            // console.log('get gridData')

            const payload = {
                ...param,
                materialSiteDetailId: this.checklistInformation.row.materialSiteDetailId,
                materialProjectDetailId: this.checklistInformation.row.materialProjectDetailId,
                checkType: this.checklistInformation.checkType === 'accept' ? 'ACCP' : 'FTRY'
            }

            const response = await API.material[`get${this.firstToUpperCase(this.checklistInformation.pageType)}CheckList`](payload)

            // console.log(`get${this.firstToUpperCase(this.checklistInformation.pageType)}CheckList`)
            // console.log(response)

            if (response.status === 200 && response.data) {
                this.grid.data = response.data.data

                this.grid.grid.loadSearchData({
                    data: this.grid.data,
                    append: false
                })
            } else {
                return []
            }

        },
        importExcel () {
            const options = {
                append: 1,                  // 새로로드할지, 뒤에 붙일지 여부
                fileExt: 'xls|xlsx|csv',    // 가용 확장자
                mode: 'HeaderMatch'         // column 명 매칭해서 처리
            }

            this.grid.grid.importData(options)
        },
        exportExcel () {
            // export Data options
            // 확장자에 따른 다운로드 형식 변화(xlsx, xls, csv, txt)
            const options = {
                fileName: `checklist_${'date'}.xlsx`,
            }

            this.grid.grid.exportData(options)
            
        },
        clickAddRows() {
            const checkedRows = this.grid.grid.getRowsByChecked(this.grid.options.Cols[0].Name)

            this.grid.grid.addRows({
                count: this.grid.addRowsCount,
                next: checkedRows.length > 0 ? checkedRows[0].nextSibling : null
            })
                // next: this.grid.grid.getLastRow()

            // this.grid.grid.blur()
            // this.grid.focus.row = this.grid.grid.getFirstRow()
            // this.grid.focus.col = this.grid.options.Cols[1].Name
            // this.grid.grid.focus(this.grid.focus.row, this.grid.focus.col)
            
            // if (checkedRows.length > 0) {

            // } else {
            //     this.grid.grid.addRows({
            //         count: this.grid.addRowsCount
            //     })
            // }
        },
        clickCopyRows () {
            const checkedRows = this.grid.grid.getRowsByChecked(this.grid.options.Cols[0].Name)

            if (checkedRows.length === 0) {
                this.alert('선택된 행이 없습니다.')
                return
            }
            const copiedRows = this.grid.grid.copyRows(checkedRows, this.grid.grid.getFirstRow())
            copiedRows.forEach(item => {
                item[this.grid.options.Cols[0].Name] = false
                this.grid.grid.refreshCell(item, this.grid.options.Cols[0].Name)
            })

        },
        clickDeleteRow () {

            const checkedRows = this.grid.grid.getRowsByChecked(this.grid.options.Cols[0].Name)
            if(checkedRows.length === 0) {
                this.alert('선택된 행이 없습니다.')
                return
            }

            /** 삭제 방식 수정 */
            this.grid.grid.deleteRows(checkedRows)
            checkedRows.forEach(item => {
                this.grid.grid.hideRow({
                    row: item,
                    del: false,
                    norender: false
                })
            })

            /** 삭제 방식 완전삭제 */
            // this.grid.grid.removeRows()
        },
        clickSave () {
            // console.log('click save')

            // validate
            let validate = true

            this.grid.grid.getDataRows().some(item => {
                this.grid.focus.row = item
                if (item.Deleted) return false

                
                // Array(this.checklistInformation.checkType === 'accept' ? 2 : 3 ).fill().map((item, index) => {return index+2}).some((columnIndex) => {
                //     this.grid.focus.col = this.grid.options.Cols[columnIndex].Name
                //     if(item[this.grid.focus.col] === '') {
                //         validate = false
                //         // this.open

                //         this.openPopup('emptyRequired')
                //     }
                //     // dataOver
                //     // if (this.grid.focus.col === 'checkMethod')
                // })

                const columnList = this.checklistInformation.checkType === 'accept' 
                    ? ['checkMethod', 'checkStandard'] 
                    : ['checkMethod', 'checkContent', 'checkStandard']
                columnList.forEach(column => {
                    this.grid.focus.col = column
                    
                    // validate Empty Required
                    if (item[column] === '') {
                        validate = false
                        // this.openPopup('emptyRequired')
                        this.alert('필수 입력 사항이 모두 입력되지 않았습니다.')
                    }

                    // switch(column) {
                    //     case 'checkMethod': {
                    //         if (item[column].length > 100) {
                    //             validate = false
                    //             this.openPopup('dataOver')
                    //         }
                    //         break
                    //     }
                    //     case 'checkStandard': {
                    //         if (item[column].length > 1000) {
                    //             validate = false
                    //             this.openPopup('dataOver')
                    //         }
                            
                    //         break
                    //     }
                    //     case 'checkContent': {
                    //         // if (item[column].length > 1000) {
                    //         //     validate = false
                    //         //     this.openPopup('dataOver')
                    //         // }
                            
                    //         break
                    //     }
                    // }
                })


            })

            

            if (validate) this.saveData()
        },
        clickList () {
            // console.log('click list')
            this.$router.push({
                name: this.checklistInformation.pageType === 'project' ? 'MaterialHeadSetUpSheet' : 'MaterialSiteSetUpSheet',
            })
        },

        async saveData () {
            // console.log('save data')

            let response = null

            const changedInfoToJson = this.grid.grid.getSaveJson({
                saveMode: 3
            })

            if (this.checklistInformation.pageType === 'project') {
    
                changedInfoToJson.data.forEach(item => {
                    item.status = item.STATUS
                    item.materialProjectDetailId = this.checklistInformation.row.materialProjectDetailId
                    item.checkType = this.checklistInformation.checkType === 'accept' ? 'ACCP' : 'FTRY'
                    item.revisionOrder = this.checklistInformation.row[`${this.checklistInformation.checkType}CheckNumber`]
                })
                
                response = await API.material.setProjectCheckList(changedInfoToJson.data.reverse())

            } else {
                
                let payload = {}


                if (this.checklistInformation.row[`${this.checklistInformation.checkType}CheckNumber`] === 0) {
                    if (changedInfoToJson.data.length === 0) return

                    payload = this.grid.grid.getSaveJson({
                        saveMode: 0
                    }).data

                    payload.forEach(item => {
                        item.status = "Added"
                        item.materialProjectDetailId = this.checklistInformation.row.materialProjectDetailId
                        item.materialSiteDetailId = this.checklistInformation.row.materialSiteDetailId
                        item.checkType = this.checklistInformation.checkType === 'accept' ? 'ACCP' : 'FTRY'
                        item.revisionOrder = this.checklistInformation.row[`${this.checklistInformation.checkType}CheckNumber`]
                        item.siteMstrId = this.$cookies.get('siteMstrId')
                    })

                    // payload.listData = this.grid.grid.getSaveJson({
                    //     saveMode: 0
                    // }).data
                    // payload.data = {
                    //     materialProjectDetailId: this.checklistInformation.row.materialProjectDetailId,
                    //     materialSiteDetailId: this.checklistInformation.row.materialSiteDetailId,
                    //     checkType: this.checklistInformation.checkType === 'accept' ? 'ACCP' : 'FTRY',
                    //     revisionOrder: this.checklistInformation.row[`${this.checklistInformation.checkType}CheckNumber`],
                    //     siteMstrId: this.$cookies.get('siteMstrId'),
                    // }

                    // console.log(payload)
                    response = await API.material.addSiteCheckList(payload)
                    
                } else {

                    // payload = this.grid.grid.getSaveJson({
                    //     saveMode: 0
                    // }).data

                    // payload.forEach(item => {
                    //     // item.status = item.STATUS
                    //     item.status = "Changed"
                    //     item.materialProjectDetailId = this.checklistInformation.row.materialProjectDetailId
                    //     item.materialSiteDetailId = this.checklistInformation.row.materialSiteDetailId
                    //     item.checkType = this.checklistInformation.checkType === 'accept' ? 'ACCP' : 'FTRY'
                    //     item.revisionOrder = this.checklistInformation.row[`${this.checklistInformation.checkType}CheckNumber`]
                    //     item.siteMstrId = this.$cookies.get('siteMstrId')
                    // })

                    payload.listData = this.grid.grid.getSaveJson({
                        saveMode: 0
                    }).data.filter(item => item.STATUS !== 'Deleted')

                    payload.data = {
                        materialProjectDetailId: this.checklistInformation.row.materialProjectDetailId,
                        materialSiteDetailId: this.checklistInformation.row.materialSiteDetailId,
                        checkType: this.checklistInformation.checkType === 'accept' ? 'ACCP' : 'FTRY',
                        revisionOrder: this.checklistInformation.row[`${this.checklistInformation.checkType}CheckNumber`],
                        siteMstrId: this.$cookies.get('siteMstrId'),
                    }

                    // console.log(payload)
                    response = await API.material.setSiteCheckList (payload)
                }

            }

            // console.log(response)

            if (response.status === 200 ) {
                this.$store.dispatch('tabInfo/setSavePage', this.$route.name)
                // this.openPopup('saveSuccessed')
                this.alert('저장되었습니다.', () => {

                    this.$router.push({
                        name: this.checklistInformation.pageType === 'project' ? 'MaterialHeadSetUpSheet' : 'MaterialSiteSetUpSheet'
                    })
                })
            } else {
                // this.openPopup('saveFailed')
                this.alert('저장에 실패했습니다.')
            }
        },
        // openPopup (type) {
        //     this.popup = {
        //         ...this.popup,
        //         ...this.popup.default[type]  
        //     }
        //     this.popup.isShow = true
        // },
        // clickPopupConfirm (purpose) {
        //     this.popup.isShow = false

        //     switch (purpose) {
        //         case 'saveSuccessed':

        //             // back to Service
        //             // this.$router.go(-1)
        //             this.$router.push({
        //                 name: this.checklistInformation.pageType === 'project' ? 'MaterialHeadSetUpSheet' : 'MaterialSiteSetUpSheet'
        //             })
                    
        //             break
        //         case 'saveFailed':
        //         case 'emptyRequired':
        //         case 'dataOver':
        //             break
        //     }
        // },
        firstToUpperCase (string) {
            return string[0].toUpperCase() + string.slice(1)
        },
        

    },
    data () {
        return {
            grid: {
                grid: null,
                data: [],
                options: {},
                addRowsCount: 1,
                focus: {
                    row: null,
                    col: null
                }
            },

            projectDetail: {
                mainCodeId: '',
                mainCode: '',
                midCodeId: '',
                midCode: '',
                productName: '',
                inDttm: '',
                upDttm: ''
            },

            ui: {
                title: ['인수검사 Check List', '공장검사 Check List']
            },

            popup: {
                isShow: false,
                message: '',
                purpose: '',
                title: '',

                default: {
                    saveSuccessed: {
                        title: '알림',
                        message: '저장되었습니다.',
                        purpose: 'saveSuccessed',
                        buttonName: {
                            confirm: '확인'
                        }
                    },
                    saveFailed: {
                        title: '알림',
                        message: '저장에 실패했습니다.',
                        purpose: 'saveFailed',
                        buttonName: {
                            confirm: '확인'
                        }
                    },
                    emptyRequired: {
                        title: '알림',
                        message: '필수 입력 사항이 모두 입력되지 않았습니다.',
                        purpose: 'emptyRequired',
                        buttonName: {
                            confirm: '확인'
                        }
                    },
                    dataOver: {
                        title: '알림',
                        message: '입력 가능한 글자 수를 초과하였습니다.',
                        purpose: 'dataOver',
                        buttonName: {
                            confirm: '확인'
                        }
                    }
                    

                    
                    
                }
            },

            default: {
                popup: {

                }
            }
        }
    }

}
</script>
