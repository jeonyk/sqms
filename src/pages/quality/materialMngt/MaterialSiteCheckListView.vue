<template>
    <section class="tab_contents">
        <div class="inner type">
            <h2 class="sub_title"> 
                {{ siteCheckList.checkType === 'accept' ? '인수검사 Check List' : '공장검사 Check List' }} 
                <div class="fr">
                    <button
                        v-if="userWritable"
                        type="button"
                        class="btn btn_md btn_outline btn_darkgray"
                        @click="confirm('저장하시겠습니까?', fn_clickSave)"
                    >
                        {{'저장'}}
                    </button>
                    <button
                        type="button"
                        class="btn btn_md btn_outline btn_darkgray"
                        @click="$router.push({ name: 'MaterialSiteSetUpSheet'})"
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
                            <th>개정번호</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{{siteCheckList.mainName}}</td>
                            <td>{{siteCheckList.midName}}</td>
                            <td>{{siteCheckList.row.productName}}</td>
                            <td>{{$moment(siteCheckList.row.inDttm).format('YYYY-MM-DD') }}</td>
                            <td>{{siteCheckList.row[`${siteCheckList.checkType}CheckNumber`]}}</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="button_box">

                <button
                    type="button"
                    class="btn btn_sm btn_excel"
                    v-if="siteCheckList.checkType === 'accept'"
                    @click="$bvModal.show('MaterialSiteCheckListView_ExcelUploadModal1')"
                >
                    엑셀 업로드
                </button>

                <button
                    type="button"
                    class="btn btn_sm btn_excel"
                    v-if="siteCheckList.checkType === 'factory'"
                    @click="$bvModal.show('MaterialSiteCheckListView_ExcelUploadModal2')"
                >
                    엑셀 업로드
                </button>

                <button
                    type="button"
                    class="btn btn_sm btn_excel"
                    @click="fn_exportExcel"
                >
                    엑셀 다운로드
                </button>

                <div class="fr">
                    <button
                        v-if="userWritable"
                        type="button"
                        class="btn btn_sm btn_darkgray"
                        @click="fn_copyRows"
                    >
                        행 복사
                    </button>

                    <div class="btn_number" v-if="userWritable">
                        <select
                            v-model="data.addRowsCount"
                            class="form_control num"
                        >
                            <option
                                v-for="count in Array(10).fill().map((item, index) => {return index+1})"
                                :key="count"
                                :value="count"
                            >
                                {{ String(count) }}
                            </option>    
                        </select>
                        <button
                            type="button"
                            class="btn btn_sm"
                            @click="fn_addRows"
                        >
                            행 추가
                        </button>
                    </div>

                    <button
                        v-if="userUnusable"
                        type="button"
                        class="btn btn_sm btn_darkgray"
                        @click="fn_deleteRows"
                    >
                        행 삭제
                    </button>
                </div>
            </div>

            <div class="ib_wrap" style="height: calc(100vh - 390px)" >
                <div id="MaterialSiteCheckListView_sheet" class="ibsheet_table" style="height: 100%;"/>
            </div>

            <excel-upload-modal
                ref-id="MaterialSiteCheckListView_ExcelUploadModal1"
                mode="CHECK"
                fileType="ACCP"
                columnLength="0"
                @import="fn_importExcel"
            />

            <excel-upload-modal
                ref-id="MaterialSiteCheckListView_ExcelUploadModal2"
                mode="CHECK"
                fileType="FTRY"
                columnLength="0"
                @import="fn_importExcel"
            />
        </div>
    </section>
</template>

<script>
import { MaterialChecklist, MaterialChecklist2 } from '@/pages/common/data/MaterialsList'
import { mapGetters } from 'vuex'
import loader from '@ibsheet/loader'
import API from '@/apis/'

import MsgBoxMixins  from '@plugin/mixin/MsgBox.mixins.js'
import authCheckMixns  from '@plugin/mixin/AuthCheck.js'
import ExcelUploadModal from '@modal/common/ExcelUploadModal.vue'

export default {
    name: 'MaterialSiteCheckListView',
    mixins: [MsgBoxMixins, authCheckMixns],
    components: {
        ExcelUploadModal,
    },
    computed: {
        ...mapGetters({
            siteCheckList: 'quality/getMaterialSiteCheckList',
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
    mounted: function () {
        this.$nextTick(() => {
            this.fn_initialize()
        })
    },
    beforeDestroy: function () {
        // if (this.data.sheet) loader.removeSheet(this.data.sheet)
        if (this.data.sheet) this.data.sheet.dispose()
    },
    methods: {
        fn_initialize: function () {
            this.data.options   = this.siteCheckList.checkType === 'accept' 
                                    ? MaterialChecklist.options 
                                    : MaterialChecklist2.options

            /** 공장검사-레미콘/아스콘인경우 처리 */
            // if (this.siteCheckList.checkType === 'factory' && this.raFlag.includes( String(this.siteCheckList.row.raFlag)) ) {
            //     this.data.options.Cols = this.data.options.Cols.filter(itm => itm.Name !== 'checkStandard')
            // }
            
            this.data.options.Events = {
                onRenderFirstFinish: async  () => {
                    await this.fn_fetchData()
                },
                onRenderFinish: event => {
                    if (!this.userWritable) {
                        event.sheet.getDataRows().forEach(row => {
                            event.sheet.setAttribute(row, null, 'CanEdit', 2)
                        })
                    }
                }
            }

            loader.createSheet({
                el: 'MaterialSiteCheckListView_sheet',
                data: [],
                options: this.data.options,
            }).then(sheet => {
                this.data.sheet = sheet
            })
        },
        fn_fetchData: async function () {
            const payload = {
                materialSiteDetailId:    this.siteCheckList.row.materialSiteDetailId,
                materialProjectDetailId: this.siteCheckList.row.materialProjectDetailId,
                checkType:               this.siteCheckList.checkType === 'accept' ? 'ACCP' : 'FTRY'
            }

            try {
                const response = await API.material.getSiteCheckList(payload)

                if (response.status === 200 && response.data) {
                    this.data.data = response.data.data

                    if (this.data.sheet) {
                        this.data.sheet.loadSearchData({
                            data: this.data.data
                        })
                    }
                } else {
                    throw new Error('fn_fetchData')
                }
            } catch (error) {
                console.error(error)
            }
        },
        fn_clickSave: function () {
            // validate
            let validate = true

            if (this.data.sheet.getSaveJson({ saveMode: 3}).length === 0) {
                validate = false
                this.alert('수정된 내용이 없습니다.')
                return
            }
            
            this.data.sheet
                    .getDataRows()
                    .filter(row => !row.Deleted)
                    .some(row => {
                        if (String(row.checkMethod).trim() === '') {
                            validate = false
                            // this.alert(`${row.SEQ}번 ${this.siteCheckList.checkType === 'factory' ? '구분' : '검사방법' }이 입력되지 않았습니다.`)
                            if (this.siteCheckList.checkType === 'factory') {
                                this.alert(row.SEQ + '번 구분이 입력되지 않았습니다.')
                            } else {
                                this.alert(row.SEQ + '번 검사방법이 입력되지 않았습니다.')
                            }
                            return true
                        }

                        if (this.siteCheckList.checkType === 'factory' 
                            && this.raFlag.includes( String(this.siteCheckList.row.raFlag)) 
                            && String(row.checkStandard).trim() === '') {
                            validate = false
                            // this.alert(`${row.SEQ}번 검사기준이 입력되지 않았습니다.`)
                            this.alert(row.SEQ +'번 검사기준이 입력되지 않았습니다.')
                            return true
                        }

                        if (this.siteCheckList.checkType !== 'accept' && String(row.checkContent).trim === '') {
                            validate = false
                            // this.alert(`${row.SEQ}번 검사내용이 입력되지 않았습니다.`)
                            this.alert(row.SEQ+ '번 검사내용이 입력되지 않았습니다.')
                            return true
                        }
                        
                    })

            if (validate) this.fn_setData()
        },
        fn_setData: async function () {

            try {
                let response

                if (this.siteCheckList.row[`${this.siteCheckList.checkType}CheckNumber`] === 0) {
                    response    = await API.material.addSiteCheckList(
                                        this.data.sheet
                                            .getSaveJson({
                                                saveMode: 0
                                            })
                                            .data
                                            .map(row => {
                                                row.status                  = 'Added'
                                                row.materialProjectDetailId = this.siteCheckList.row.materialProjectDetailId
                                                row.materialSiteDetailId    = this.siteCheckList.row.materialSiteDetailId
                                                row.checkType               = this.siteCheckList.checkType === 'accept' ? 'ACCP' : 'FTRY'
                                                row.revisionOrder           = 0
                                                row.siteMstrId              = this.$store.getters['auth/getSiteMstrId']
    
                                                return row
                                            })
                                    )
                } else {
                    response    = await API.material.setSiteCheckList(
                                    {
                                        listData:   this.data.sheet
                                                        .getSaveJson({
                                                            saveMode: 0
                                                        })
                                                        .data
                                                        .filter(row => row.STATUS !== 'Deleted'),
                                        data:       {
                                                        materialProjectDetailId: this.siteCheckList.row.materialProjectDetailId,
                                                        materialSiteDetailId:    this.siteCheckList.row.materialSiteDetailId,
                                                        checkType:               this.siteCheckList.checkType === 'accept' ? 'ACCP' : 'FTRY',
                                                        revisionOrder:           this.siteCheckList.row[`${this.siteCheckList.checkType}CheckNumber`],
                                                        siteMstrId:              this.$store.getters['auth/getSiteMstrId']
                                                    }
                                    })
                }

    
                if (response.status === 200 ) {
                    this.$store.dispatch('tabInfo/setSavePage', this.$route.name)
                    this.alert('저장되었습니다.', () => {
                        this.$router.push({
                            name: 'MaterialSiteSetUpSheet'
                        })
                    })
                } else {
                    throw new Error('fn_setData')
                }

            } catch(error) {
                console.error(error)
                this.alert('저장에 실패했습니다.')
            }

            
        },

        fn_copyRows: function () {
            const checkedRows = this.data.sheet.getRowsByChecked(this.data.options.Cols[0].Name)
            if (checkedRows.length === 0) {
                this.alert('선택된 행이 없습니다.')
                return
            }

            const copiedRows = this.data.sheet.copyRows(checkedRows, this.data.sheet.getFirstRow())
            copiedRows.forEach(row => {
                this.data.sheet.setCheck({
                    row: row,
                    col: this.data.options.Cols[0].Name,
                    val: false,
                })
            })
        },
        fn_addRows: function () {
            const checkedRows = this.data.sheet.getRowsByChecked(this.data.options.Cols[0].Name)

            this.data.sheet.addRows({
                count: this.data.addRowsCount,
                // next: checkedRows.length > 0 ? checkedRows[0].nextSibling : null
                next: (checkedRows.length > 0 && !checkedRows[0].Deleted) ? checkedRows[0].nextSibling : this.data.sheet.getRowByIndex(1)
            })
        },
        fn_deleteRows: function () {
            const checkedRows = this.data.sheet.getRowsByChecked(this.data.options.Cols[0].Name)
            if (checkedRows.length === 0) {
                this.alert('선택된 행이 없습니다.')
                return
            }

            // this.data.sheet.deleteRows(checkedRows)
            // checkedRows.forEach(row => {
            //     this.data.sheet.hideRow({
            //         row: row,
            //         del: false,
            //         norender: false,
            //     })
            // })

            /*추가[S] */
            this.data.sheet.removeRows(checkedRows);
            /*추가[E] */
        },

        /** Excel */
        // fn_importExcel: function () {
        //     this.data.sheet.importData({
        //         append: 1,
        //         fileExt: 'xls|xlsx|csv',
        //         mode: 'HeaderMatch'
        //     })
        // },
        fn_importExcel: function (data) {
            // this.data.sheet.loadSearchData({
            //     data: data,
            //     append: true,
            //     next: this.data.sheet.getFirstRow()
            // });
            this.data.sheet.addRows({
                count : data.length,
                next : this.data.sheet.getFirstRow()
            })
            for(let x = 1; x<=data.length; x++){
                let row = this.data.sheet.getRowByIndex(x);
                row['checkMethod'] = data[x-1].checkMethod;
                row['checkStandard'] = data[x-1].checkStandard;
                if(this.siteCheckList.checkType != 'accept'){
                    row['checkContent'] = data[x-1].checkContent;
                }
                // this.data.sheet.refreshRow(row);
            }
            this.data.sheet.rerender();
            this.$bvModal.hide('MaterialSiteCheckListView_ExcelUploadModal1');
            this.$bvModal.hide('MaterialSiteCheckListView_ExcelUploadModal2');
        },
        fn_exportExcel: function () {
            this.data.sheet.down2Excel({
                merge:      1,                  // 머지된 내용 그대로 출력할 것인지
                // downCols:   'Visible',          // 'Visible' : 화면상 보이는 Column 그외엔 문자열 join 형태(mainCodeId|midCodeId|...)
                downCols:   this.siteCheckList.checkType === 'accept'
                                ? 'SEQ|checkMethod|checkStandard'
                                : 'SEQ|checkMethod|checkContent|checkStandard',
                reqHeader:  {
                                'Authorization': this.$cookies.get('Authorization'),
                                'Accept-Language': 'ko'
                            },
                fileName:   `현장체크리스트_${this.siteCheckList.row.productName}_${this.$moment().format('YYYYMMDD')}.xlsx`,  // file명 : 현재화면 페이지 _현재 날짜
            })
        },
    },
    data: function () {
        return {
            data: {
                options: {},
                data: [],
                sheet: null,
                addRowsCount: 1
            },

            raFlag: ['R', 'A'],
        }
    }

}
</script>
