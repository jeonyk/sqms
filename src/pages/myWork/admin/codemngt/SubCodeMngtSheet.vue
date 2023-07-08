<template>
    <div>
        <div class="lookup_box multi_line">
            <table>
                <caption class="sr_only"></caption>
                <colgroup>
                    <col width="5%">
                    <col width="15%">
                    <col width="3%">
                    <col width="15%">
                    <col width="3%">
                    <col width="15%">
                    <col width="7%">
                    <col width="*">
                </colgroup>
                <tbody>
                    <tr>
                        <th>공종 분류</th>
                        <td>
                            <select class="form_control size_md" v-model="search.codeType" @change="search.mainCodeId = ''; search.midCodeId = '';">
                                <option value="" > {{ '전체' }} </option>
                                <option v-for="item in codeTypeCombo" :key="item.codeTypeCd" :value="item.codeTypeCd">{{ item.codeTypeNm }}</option>
                            </select>
                        </td>
                        <th>대분류</th>
                        <td>
                            <select class="form_control size_md" v-model="search.mainCodeId" @change="search.midCodeId = '';">
                                <option value="" > {{ '전체' }} </option>
                                <option v-for="item in mainCodeCombo.filter(item => item.codeType === search.codeType)" :key="item.mainCodeId" :value="item.mainCodeId">{{ item.mainName }}</option>
                            </select>
                        </td>
                        <th>중분류</th>
                        <td>
                            <select class="form_control size_md" v-model="search.midCodeId">
                                <option value="" > {{ '전체' }} </option>
                                <option v-for="item in midCodeCombo.filter(item => item.mainCodeId === search.mainCodeId)" :key="item.midCodeId" :value="item.midCodeId">{{ item.midName }}</option>
                            </select>
                        </td>
                        <th>소분류 명(국문)</th>
                        <td>
                            <input type="text" v-model="search.subName" class="form_control size_lg" placeholder="" @keyup.enter="searchData">
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
                <div id="ibsheet_code3Depth" class="ibsheet_table" style="height: 100%;"></div>
            </div>

        </div>   <!-- // inner -->

    </div>
</template>

<script>
import loader from '@ibsheet/loader';
import MsgBoxMixins  from '@plugin/mixin/MsgBox.mixins.js';
import { codeTypeComboList, subCodeSheet } from '@/pages/common/data/CodeMngtList'                              
import { sendPostApi, requestOptions } from '@/apis/common';

    export default {
        name: 'Code3DepthMngtSheet',
        mixins: [MsgBoxMixins],
        components: {

        },
        data() {
            return {
                codeTypeCombo : [],
                mainCodeCombo : [],
                midCodeCombo : [],
                search :{
                    codeType : '',
                    mainCodeId : '',
                    midCodeId : '',
                    subName : '',
                },
                subCodeGrid : {
                    data : null,
                    options : {},
                },
            }
        },
        created() {
            this.codeTypeCombo = codeTypeComboList;
            this.getCategoryData();
        },
        mounted() {
        },
        beforeDestroy() {
        },
        methods: {
            getCategoryData : async function () {
                requestOptions.headers['Accept-Language'] = "ko";
                requestOptions.headers['Authorization'] = this.$cookies.get("Authorization");
                let url = '/sendApi/api/common/cntrwkType/list';
                let param = { };
                
                const data = await sendPostApi(url, param);

                if( data.status === 200){
                    this.mainCodeCombo = data.data.dlMainCode;
                    this.midCodeCombo = data.data.dlMidCode;
                    // console.log('5===> getCategoryData : %o', this.mainCodeCombo)
                    this.initSetGrid();
                }
            },
            setCategoryList : function (payload) {
                const options = {
                    orgCodeType : codeTypeComboList,
                    orgMainCode : this.mainCodeCombo,
                    orgMidCode : this.midCodeCombo,
                    seperator: '|',
                    ...payload
                }

                if(!(options.codeType && options.mainCode )) return

                options.codeType.Enum       = `${options.seperator}${options.orgCodeType.map(item => item['codeTypeNm']).join(options.seperator)}`
                options.codeType.EnumKeys   = `${options.seperator}${options.orgCodeType.map(item => item['codeTypeCd']).join(options.seperator)}`

                options.codeType.clear = options.mainCode.Name
                options.mainCode.Related = options.codeType.Name
                
                options.orgCodeType.forEach(item => {
                    options.mainCode[`Enum${item['codeTypeCd']}`]    = `${options.seperator}${options.orgMainCode.filter(mainItem=> mainItem.codeType === item.codeTypeCd).map(inner => inner['mainName']).join(options.seperator)}`
                    options.mainCode[`EnumKeys${item['codeTypeCd']}`]  = `${options.seperator}${options.orgMainCode.filter(mainItem=> mainItem.codeType === item.codeTypeCd).map(inner => inner['mainCodeId']).join(options.seperator)}`
                });

                options.mainCode.clear = options.midCode.Name
                options.midCode.Related = options.mainCode.Name
                
                options.orgMainCode.forEach(item => {
                    options.midCode[`Enum${item['mainCodeId']}`]    = `${options.seperator}${options.orgMidCode.filter(midItem=> midItem.mainCodeId === item.mainCodeId).map(inner => inner['midName']).join(options.seperator)}`
                    options.midCode[`EnumKeys${item['mainCodeId']}`]  = `${options.seperator}${options.orgMidCode.filter(midItem=> midItem.mainCodeId === item.mainCodeId).map(inner => inner['midCodeId']).join(options.seperator)}`
                });

            },
            initSetGrid : function () {
                let subCodeData    = subCodeSheet.data;
                let subCodeOptions = subCodeSheet.options;

                // 클릭 Event
                subCodeOptions.Events = {
                    onRenderFirstFinish : (event) => {
                        this.searchData();
                    },
                    onAfterChange : this.changeGrid,
                }

                this.setCategoryList({
                    codeType : subCodeOptions.Cols[1],
                    mainCode : subCodeOptions.Cols[2],
                    midCode  : subCodeOptions.Cols[3],
                })

                loader.createSheet({
                    el: 'ibsheet_code3Depth',
                    data: subCodeData,
                    options: subCodeOptions,
                }).then((sheet) => {
                    this.subCodeGrid.data = sheet
                });
            },
            changeGrid : async function (event){
                switch (event.col) {
                    case this.subCodeGrid.data.options.Cols[1].Name:    // mainCodeId 변경
                        event.row[this.subCodeGrid.data.options.Cols[2].Name] = '';
                        event.sheet.refreshRow(event.row);

                        this.setCategoryList({
                            codeType : this.subCodeGrid.data.options.Cols[1],
                            mainCode : this.subCodeGrid.data.options.Cols[2],
                            midCode : this.subCodeGrid.data.options.Cols[3],
                        })
                    break;
                }
            },
            searchData : async function (){
                let url = '/sendApi/api/myWork/codeMngt/subCodeMngt/list';
                let param = {
                        ...this.search
                    }

                const data  = await sendPostApi(url, param)
                                        .then((data) => {
                                            // console.log(data.data.datas.dlSubData)
                                            this.subCodeGrid.data.loadSearchData({
                                                data: data.data.datas.dlSubData,
                                            });
                                        });
            }, 
            searchClear  : function() {
                let clearSearchData = {
                        codeType : '',
                        mainCodeId : '',
                        midCodeId : '',
                        subName : '',
                    }
                this.search = clearSearchData;
            },
            clickAddRows : function() {
                let addIdx = 1;

                this.subCodeGrid.data.addRows({
                    count : addIdx,
                    next : this.subCodeGrid.data.getFirstRow()
                });
                    // next : this.subCodeGrid.data.getFirstRow()
                
                let selectRow = this.subCodeGrid.data.getRowByIndex(addIdx);
                // console.log(selectRow);
                selectRow['useYn']      = 'Y';
                this.subCodeGrid.data.refreshRow(selectRow);

            },
            clickSave : async function() {

                const changedInfoToJson =  this.subCodeGrid.data.getSaveJson({
                    saveMode: 3
                });
                // console.log(changedInfoToJson);
                // payload 수정
                changedInfoToJson.data.forEach((item) => {
                    item.status = item.STATUS;
                });

                let url = '/sendApi/api/myWork/codeMngt/subCodeMngt/write';
                const payload = changedInfoToJson.data.reverse();
                let param = {
                    subCodeList : payload
                }
                // console.log("param ===== %o", param)

                const data  = await sendPostApi(url, param)
                                        .then((data) => {
                                            if( data.data.rCode == "9999") {
                                                this.alert("저장에 실패하였습니다.");
                                            } else {
                                                this.alert("저장되었습니다.", this.searchData);
                                            }
                                        });

            },
            clickValidate : function (){
                let chkVal = "";
                const changedInfoToJson =  this.subCodeGrid.data.getSaveJson({
                    saveMode: 3
                });
                
                if( changedInfoToJson.data.length === 0 ) {
                    this.alert("저장 할 정보가 없습니다.");
                    return;
                }

                changedInfoToJson.data.forEach(row => {
                    if( row.codeType === '' ) {
                        chkVal = 'CODETYPE';
                        return;
                    }
                    if( row.mainCodeId === '' ) {
                        chkVal = 'MAIN';
                        return;
                    }
                    if( row.midCodeId === '' ) {
                        chkVal = 'MID';
                        return;
                    }
                    if( row.subName === '' ) {
                        chkVal = 'NM';
                        return;
                    }
                })
            
                if(chkVal === 'CODETYPE') {
                    this.alert("공종분류가 선택되지 않은 라인이 존재 합니다.");
                    return;
                } else if(chkVal === 'MAIN') {
                    this.alert("대분류가 선택되지 않은 라인이 존재 합니다.");
                    return;
                } else if(chkVal === 'MID') {
                    this.alert("중분류가 선택되지 않은 라인이 존재 합니다.");
                    return;
                } else if(chkVal === 'NM') {
                    this.alert("소분류 명이 입력되지 않은 라인이 존재 합니다.");
                    return;
                }
                this.confirm("저장 하시겠습니까?", this.clickSave, "");

            }
        },
        
   }
</script>