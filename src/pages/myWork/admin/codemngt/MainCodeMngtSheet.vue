<template>
    <div>
        <div class="lookup_box multi_line">
            <table>
                <caption class="sr_only"></caption>
                <colgroup>
                    <col width="5%">
                    <col width="20%">
                    <col width="7%">
                    <col width="20%">
                    <col width="*">
                </colgroup>
                <tbody>
                    <tr>
                        <th>공종 분류</th>
                        <td>
                            <select class="form_control size_md" v-model="search.codeType">
                                <option value="" > {{ '전체' }} </option>
                                <option v-for="item in codeTypeCombo" :key="item.codeTypeCd" :value="item.codeTypeCd">{{ item.codeTypeNm }}</option>
                            </select>
                        </td>
                        <th>대분류 명(국문)</th>
                        <td>
                            <input type="text" v-model="search.mainName" class="form_control size_lg" placeholder="" @keyup.enter="searchData">
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
                <div id="ibsheet_mainCode" class="ibsheet_table" style="height: 100%;"></div>
            </div>

        </div>   <!-- // inner -->

    </div>
</template>

<script>
import loader from '@ibsheet/loader';
import MsgBoxMixins  from '@plugin/mixin/MsgBox.mixins.js';
import { codeTypeComboList, mainCodeSheet } from '@/pages/common/data/CodeMngtList'                              
import { sendPostApi, requestOptions } from '@/apis/common';

    export default {
        name: 'Code2DepthMngtSheet',
        mixins: [MsgBoxMixins],
        components: {

        },
        data() {
            return {
                codeTypeCombo : [],
                search :{
                    codeType : '',
                    mainName : '',
                },
                mainCodeGrid : {
                    data : null,
                    options : {},
                },
            }
        },
        created() {
            this.codeTypeCombo  = codeTypeComboList;
        },
        mounted() {
            // console.log("===== paramTab")
            this.initSetGrid();
        },
        beforeDestroy() {
        },
        watch: {
        },
        methods: {
            initSetGrid : function () {
                let menuData    = mainCodeSheet.data;
                let menuOptions = mainCodeSheet.options;

                // 공종분류
                menuOptions.Cols[1].Enum = `|${codeTypeComboList.map(item => item['codeTypeNm']).join('|')}`;
                menuOptions.Cols[1].EnumKeys = `|${codeTypeComboList.map(item => item['codeTypeCd']).join('|')}`;

                // 클릭 Event
                menuOptions.Events = {
                    onRenderFirstFinish : (event) => {
                        this.searchData();
                    },
                }

                loader.createSheet({
                    el: 'ibsheet_mainCode',
                    data: menuData,
                    options: menuOptions,
                }).then((sheet) => {
                    this.mainCodeGrid.data = sheet
                });
            },
            searchData : async function (){
                let url = '/sendApi/api/myWork/codeMngt/mainCodeMngt/list';
                let param = {
                        ...this.search
                    }

                const data  = await sendPostApi(url, param)
                                        .then((data) => {
                                            this.mainCodeGrid.data.loadSearchData({
                                                data: data.data.datas.dlMainData,
                                            });
                                        });
            }, 
            searchClear  : function() {
                let clearSearchData = {
                        codeType : '',
                        mainName : '',
                    }
                this.search = clearSearchData;
            },
            clickAddRows : function() {
                let addIdx = 1;

                this.mainCodeGrid.data.addRows({
                    count : addIdx,
                    next : this.mainCodeGrid.data.getFirstRow()
                });
                    // next : this.mainCodeGrid.data.getFirstRow()
                
                let selectRow = this.mainCodeGrid.data.getRowByIndex(addIdx);

                selectRow['useYn']      = 'Y';
                this.mainCodeGrid.data.refreshRow(selectRow);

            },
            clickSave : async function() {

                const changedInfoToJson =  this.mainCodeGrid.data.getSaveJson({
                    saveMode: 3
                });
                // console.log(changedInfoToJson);
                // payload 수정
                changedInfoToJson.data.forEach((item) => {
                    item.status = item.STATUS;
                });

                let url = '/sendApi/api/myWork/codeMngt/mainCodeMngt/write';
                const payload = changedInfoToJson.data.reverse();
                let param = {
                    mainCodeList : payload
                }
                // console.log("param ===== %o", param)

                const data  = await sendPostApi(url, param)
                                        .then((data) => {
                                            // console.log("data : %o", data);
                                            if( data.data.rCode == "9999") {
                                                this.alert("저장에 실패하였습니다.");
                                            } else {
                                                this.alert("저장되었습니다.", this.searchData);
                                            }
                                        });

            },
            clickValidate : function (){
                let chkVal = "";
                const changedInfoToJson =  this.mainCodeGrid.data.getSaveJson({
                    saveMode: 3
                });
                
                if( changedInfoToJson.data.length === 0 ) {
                    this.alert("저장 할 정보가 없습니다.");
                    return;
                }

                this.mainCodeGrid.data.getDataRows().forEach(row => {
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
                } else {
                }
                this.confirm("저장 하시겠습니까?", this.clickSave, "");


            }
        },
        
   }
</script>