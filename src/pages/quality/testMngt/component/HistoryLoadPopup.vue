<template>
    <b-modal id="HistoryLoad" title="History 불러오기" hide-backdrop size="lg" @shown="sheetLoad" @hide="removeSheet" :footer-bg-variant="footerBg">
        <template #default>
            <div class="pop_container">
                <h3 class="subject"><strong>최종 등록 정보</strong></h3>
                <div class="ib_wrap">
                    <div id="historyLoadTable" class="ibsheet_table" style="height:448px;"></div>
                </div>
            </div>
        </template>
        <template #modal-footer="{}">
            <b-button class="btn btn_md btn_outline btn_darkgray" @click="selectHistory">선택</b-button>
            <b-button class="btn btn_md btn_outline btn_gray" @click="closePopup">닫기</b-button>
        </template>
    </b-modal>
</template>

<script>
import { HistoryLoad } from '@/pages/quality/testMngt/data/testData';
import loader from '@ibsheet/loader';
import { sendPostApi, requestOptions } from '@/apis/common';

export default {
    name: 'HistoryLoad',
    data() {
        return {
            footerBg: 'transparent',
            grid: {
                sheetEl: [],
                sheetId: [],
                data: [],
                options: {},
                focus: {
                    row: null,
                    col: null
                },
            },
            revisionId: null,
        }
    },
    beforeDestroy () {
        if (this.grid.sheetEl['historyLoadSheet']) this.grid.sheetEl['historyLoadSheet'].dispose()
        // for (var i = 0; i < this.grid.sheetId.length; i++) {
        //     loader.removeSheet(this.grid.sheetId[i]);
        // }
        this.grid = null;
    },
    methods: {
        async sheetLoad() {
            this.grid = {
                sheetEl: [],
                sheetId: [],
                data: [],
                options: {},
                focus: {
                    row: null,
                    col: null
                },
            },

            requestOptions.headers['Accept-Language'] = "ko";
            requestOptions.headers['Authorization'] = this.$cookies.get("Authorization");
            const url = '/sendApi/api/testMngt/qualityTestActpln/qualityTestActplnHist/list';
            
            let payload = {
                siteMstrId: this.$cookies.get('siteMstrId')
            };

            HistoryLoad.options.Events = {
                onRenderFirstFinish: this.dataLoad,
                onDblClick : this.dbclickSheetList
            }

            try {
                const { data } = await sendPostApi(url, payload);
                this.grid.data = data.datas.dlHist;

                loader.createSheet({
                    el: 'historyLoadTable',
                    id: 'historyLoadTable',
                    options: HistoryLoad.options,
                    data: this.grid.data,
                }).then((sheet) => {
                    // 생성된 시트객체를 페이지 공통 객체에 넣어두고 사용
                    this.grid.sheetEl['historyLoadSheet'] = sheet;
                    // 생성된 시트 id를 pageSheets 배열에 넣어둠
                    this.grid.sheetId.push(sheet.id);
                    // this.grid.sheetEl['historyLoadSheet'].bind('onDblClick', this.dbclickSheetList);
                });

               
            } catch (error) {
                error.response;
            }
        },
        dataLoad() {
             this.grid.sheetEl['historyLoadSheet'].loadSearchData({
                data: this.grid.data,
                append: false
            });
        },
        dbclickSheetList() {
            this.selectHistory();
            this.$root.$emit('bv::hide::modal', 'HistoryLoad');
        },
        selectHistory() {
            let dataItem = {
                siteMstrId: this.grid.sheetEl['historyLoadSheet'].getFocusedRow().siteMstrId,
                revisionId: this.grid.sheetEl['historyLoadSheet'].getFocusedRow().revisionId,
            }
            this.$emit('selectHistory', dataItem);
        },
        closePopup() {
            this.$root.$emit('bv::hide::modal', 'HistoryLoad');
        },
        removeSheet() {
            // console.log('removeSheet');
            if (this.grid.sheetEl['historyLoadSheet']) this.grid.sheetEl['historyLoadSheet'].dispose()
            // for (var i = 0; i < this.grid.sheetId.length; i++) {
            //     loader.removeSheet(this.grid.sheetId[i]);
            // }
            this.grid = null;
        },
    },
}
</script>

<style>

</style>