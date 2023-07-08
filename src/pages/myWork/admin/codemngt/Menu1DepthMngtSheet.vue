<template>
    <div>
        <div class="lookup_box multi_line">
            <table>
                <caption class="sr_only"></caption>
                <colgroup>
                    <col width="5%">
                    <col width="20%">
                    <col width="5%">
                    <col width="20%">
                    <col width="*">
                </colgroup>
                <tbody>
                    <tr>
                        <th>메뉴명</th>
                        <td>
                            <input type="text" v-model="search.searchNm" class="form_control size_lg" placeholder="" @keyup.enter="searchData">
                        </td>
                        <th>PAGE CODE</th>
                        <td>
                            <input type="text" v-model="search.searchCd" class="form_control size_lg" placeholder="" @keyup.enter="searchData">
                        </td>
                        <td class="ar">
                            <button type="button" class="btn_reset" @click="searchClear()">초기화</button>
                            <button type="button" class="btn btn_sm btn_darkblue btn_radius btn_search" @click="searchData()">검색</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div class="inner">
            <div class="button_box">
                <!-- <span class="total">총 <b>536</b> 건</span>  -->
                <div class="fr">
                    <button type="button" class="btn btn_sm btn_darkgray" @click="clickAddRows()">추가</button>
                    <button type="button" class="btn btn_sm btn_darkgray" @click="clickValidate()">저장</button>
                </div>
            </div>

            <!-- ibsheet -->
            <div class="ib_wrap mt0" style="height: calc(100vh - 320px)">
                <div id="ibsheet_menu1Depth" class="ibsheet_table" style="height: 100%;"></div>
            </div>            

        </div>   <!-- // inner -->

    </div>
</template>

<script>
import loader from '@ibsheet/loader';
import MsgBoxMixins  from '@plugin/mixin/MsgBox.mixins.js';
import { menu1DepthSheet } from '@/pages/common/data/CodeMngtList'                              
import { sendPostApi, requestOptions } from '@/apis/common';

    export default {
        name: 'Menu1DepthMngtSheet',
        mixins: [MsgBoxMixins],
        components: {

        },
        data() {
            return {
                categoryData : [],
                mainCombo: [],
                midCombo: [],
                searchMainCombo: [],
                searchMidCombo: [],
                search :{
                    menuLevel : '1',
                    mainCodeId : '',
                    midCodeId : '',
                    menuNm : '',
                    menuCd : '',
                },
                menuGrid : {
                    data : null,
                    options : {},
                },
            }
        },
        created() {
            // console.log("===== created")
        },
        mounted() {
            // console.log("===== paramTab")
            this.initSetGrid();
        },
        beforeDestroy() {
        },
        watch: {
            "search.mainCodeId": {
                handler () {
                    this.searchMainCombo.forEach(item => {
                    })
                }
            }
        },
        methods: {
            initSetGrid : function () {
                let menuData    = menu1DepthSheet.data;
                let menuOptions = menu1DepthSheet.options;

                // 클릭 Event
                menuOptions.Events = {
                    onRenderFirstFinish : (event) => {
                        this.searchData();
                    },
                    onAfterChange : this.changeGrid,
                }

                loader.createSheet({
                    el: 'ibsheet_menu1Depth',
                    data: menuData,
                    options: menuOptions,
                }).then((sheet) => {
                    this.menuGrid.data = sheet
                });
            },
            changeGrid (event) {
                // console.log("%o", this.menuGrid)
                switch (event.col) {
                    case menu1DepthSheet.options.Cols[2].Name:    // 메뉴유형
                        // console.log(event.val)
                        if ( event.val === "MENU" ) {
                            event.row[menu1DepthSheet.options.Cols[3].Name] = ''
                            event.row[menu1DepthSheet.options.Cols[4].Name] = ''

                            const arrName = [menu1DepthSheet.options.Cols[3].Name, menu1DepthSheet.options.Cols[4].Name];

                            for( let i = 0; i < arrName.length; i++) {
                                this.menuGrid.data.setAttribute(event.row, arrName[i], 'CanEdit', 0, 1);  // 편집모드 변환
                            }
                        } else {
                            const arrName = [menu1DepthSheet.options.Cols[3].Name, menu1DepthSheet.options.Cols[4].Name];

                            for( let i = 0; i < arrName.length; i++) {
                                this.menuGrid.data.setAttribute(event.row, arrName[i], 'CanEdit', 1, 1);  // 편집모드 변환
                            }
                        }
                        event.sheet.refreshRow(event.row)
                    break;
                }
            },
            searchData : async function (){
                let url = '/sendApi/api/myWork/codeMngt/menuMngt/list';
                let param = {
                        ...this.search
                    }

                const data  = await sendPostApi(url, param)
                                        .then((data) => {
                                            this.menuGrid.data.loadSearchData({
                                                data: data.data.datas.dlMenuData,
                                            });
                                        
                                            const arrName = [, this.menuGrid.data.options.Cols[4].Name];

                                            // console.log('data == : %o', this.menuGrid.data.getDataRows());
                                            this.menuGrid.data.getDataRows().forEach(row => {
                                                this.menuGrid.data.setAttribute({row: row, col: this.menuGrid.data.options.Cols[3].Name, attr : 'CanEdit', val : '0' ,})
                                                this.menuGrid.data.setAttribute({row: row, col: this.menuGrid.data.options.Cols[4].Name, attr : 'CanEdit', val : '0' ,})
                                                this.menuGrid.data.refreshRow(row)
                                            })
                                        });
                // console.log(data);
                // console.log('data: %o', data);

            }, 
            searchClear  : function() {
                let clearSearchData = {
                        menuLevel : '2',
                        mainCodeId : '',
                        midCodeId : '',
                        menuNm : '',
                        menuCd : '',
                    }
                this.search = clearSearchData
            },
           clickAddRows : function() {
                // console.log("=========> %o", this.menuGrid.data.addRowsCount);
                let addIdx = 1;

                this.menuGrid.data.addRows({
                    count : addIdx,
                    next : this.menuGrid.data.getFirstRow()
                });
                
                let selectRow = this.menuGrid.data.getRowByIndex(addIdx);
                // console.log(selectRow);
                selectRow['menuType']   = 'MENU';
                selectRow['menuLevel']  = '1';
                selectRow['useYn']      = 'Y';
                // selectRow['siteMstrId'] = this.siteMstrId;                
                this.menuGrid.data.refreshRow(selectRow);

            },
            clickSave : async function() {

                const changedInfoToJson =  this.menuGrid.data.getSaveJson({
                    saveMode: 3
                });
                // console.log(changedInfoToJson);
                // payload 수정
                changedInfoToJson.data.forEach((item) => {
                    item.status = item.STATUS;
                });

                let url = '/sendApi/api/myWork/codeMngt/menuMngt/write';
                const payload = changedInfoToJson.data.reverse();
                let param = {
                    menuList : payload
                }
                // console.log("param ===== %o", param)

                const data  = await sendPostApi(url, param)
                                        .then((data) => {
                                            this.alert("저장되었습니다.", this.searchData);
                                        });

            },
            clickValidate : function (){
                let chkVal = "";
                const changedInfoToJson =  this.menuGrid.data.getSaveJson({
                    saveMode: 3
                });
                
                if( changedInfoToJson.data.length === 0 ) {
                    this.alert("저장 할 정보가 없습니다.");
                    return;
                }

                this.menuGrid.data.getDataRows().forEach(row => {
                    if( row.menuNmKr === '' ) {
                        chkVal = 'KR';
                        return;
                    }
                    if( row.menuNmEn === '' ) {
                        chkVal = 'EN';
                        return;
                    }
                    if ( row.menuType === 'VIEW' ) {
                        if( row.scrinUrl === '' ) {
                            chkVal = 'URL';
                            return;
                        }
                    }
                })
            
                if(chkVal === 'KR') {
                    this.alert("메뉴명이 입력되지 않았습니다.");
                    return;
                } else if(chkVal === 'EN') {
                    this.alert("메뉴영문명이 입력되지 않았습니다.");
                    return;
                } else if(chkVal === 'URL') {
                    this.alert("메뉴유형이 '화면'인 경우 '화면 URL'은 필수 입력 사항입니다.");
                    return;
                }
                this.confirm("저장 하시겠습니까?", this.clickSave, "");
            }
        },
        
   }
</script>