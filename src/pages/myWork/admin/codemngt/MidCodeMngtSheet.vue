<template>
    <div>
        <div class="lookup_box multi_line">
            <table>
                <caption class="sr_only"></caption>
                <colgroup>
                    <col width="5%">
                    <col width="20%">
                    <col width="3%">
                    <col width="25%">
                    <col width="7%">
                    <col width="*">
                </colgroup>
                <tbody>
                    <tr>
                        <th>공종 분류</th>
                        <td>
                            <select class="form_control size_md" v-model="search.codeType" @change="search.mainCodeId = ''">
                                <option value="" > {{ '전체' }} </option>
                                <option v-for="item in codeTypeCombo" :key="item.codeTypeCd" :value="item.codeTypeCd">{{ item.codeTypeNm }}</option>
                            </select>
                        </td>
                        <th>대분류</th>
                        <td>
                            <select class="form_control size_md" v-model="search.mainCodeId">
                                <option value="" > {{ '전체' }} </option>
                                <option v-for="item in mainCodeCombo.filter(item => item.codeType === search.codeType)" :key="item.mainCodeId" :value="item.mainCodeId">{{ item.mainName }}</option>
                            </select>
                        </td>
                        <th>중분류 명(국문)</th>
                        <td>
                            <input type="text" v-model="search.midName" class="form_control size_lg" placeholder="" @keyup.enter="searchData">
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
import { codeTypeComboList, midCodeSheet } from '@/pages/common/data/CodeMngtList'                              
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
                search :{
                    codeType : '',
                    mainCodeId : '',
                    midName : '',
                },
                midCodeGrid : {
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
                let url = '/sendApi/api/myWork/codeMngt/mainCodeMngt/list';
                let param = {};
                
                await sendPostApi(url, param)
                        .then((data) => {
                            this.mainCodeCombo   = data.data.datas.dlMainData;
                            // console.log('5===> getCategoryData : %o', this.mainCodeCombo)
                            this.initSetGrid();
                        });
            },
            setCategoryList : function (payload) {
                const options = {
                    orgCodeType : codeTypeComboList,
                    orgMainCode : this.mainCodeCombo,
                    seperator: '|',
                    ...payload
                }

                if(!(options.codeType && options.mainCode )) return

                options.codeType.Enum       = `${options.seperator}${options.orgCodeType.map(item => item['codeTypeNm']).join(options.seperator)}`
                options.codeType.EnumKeys   = `${options.seperator}${options.orgCodeType.map(item => item['codeTypeCd']).join(options.seperator)}`

                options.codeType.clear = options.mainCode.Name
                options.mainCode.Related = options.codeType.Name
                
                options.orgCodeType.forEach(item => {
                    options.mainCode[`Enum${item['codeTypeCd']}`]    = `${options.seperator}${options.orgMainCode.filter(miditem=> miditem.codeType === item.codeTypeCd).map(inner => inner['mainName']).join(options.seperator)}`
                    options.mainCode[`EnumKeys${item['codeTypeCd']}`]  = `${options.seperator}${options.orgMainCode.filter(miditem=> miditem.codeType === item.codeTypeCd).map(inner => inner['mainCodeId']).join(options.seperator)}`
                });
            },
            initSetGrid : function () {
                let midCodeData    = midCodeSheet.data;
                let midCodeOptions = midCodeSheet.options;

                // 클릭 Event
                midCodeOptions.Events = {
                    onRenderFirstFinish : (event) => {
                        this.searchData();
                    },
                    onAfterChange : this.changeGrid,
                }

                this.setCategoryList({
                    codeType : midCodeOptions.Cols[1],
                    mainCode : midCodeOptions.Cols[2],
                })

                loader.createSheet({
                    el: 'ibsheet_code3Depth',
                    data: midCodeData,
                    options: midCodeOptions,
                }).then((sheet) => {
                    this.midCodeGrid.data = sheet
                });
            },
            changeGrid : async function (event){
                switch (event.col) {
                    case this.midCodeGrid.data.options.Cols[1].Name:    // mainCodeId 변경
                        event.row[this.midCodeGrid.data.options.Cols[2].Name] = '';
                        event.sheet.refreshRow(event.row);

                        this.setCategoryList({
                            codeType : this.midCodeGrid.data.options.Cols[1],
                            mainCode : this.midCodeGrid.data.options.Cols[2],
                        })
                    break;
                }
            },
            searchData : async function (){
                let url = '/sendApi/api/myWork/codeMngt/midCodeMngt/list';
                let param = {
                        ...this.search
                    }

                const data  = await sendPostApi(url, param)
                                        .then((data) => {
                                            // console.log(data.data.datas.dlMidData)
                                            this.midCodeGrid.data.loadSearchData({
                                                data: data.data.datas.dlMidData,
                                            });
                                        });
            }, 
            searchClear  : function() {
                let clearSearchData = {
                        menuLevel : '3',
                        mainCodeId : '',
                        midCodeId : '',
                        menuNm : '',
                        menuCd : '',
                    }
                this.search = clearSearchData;
            },
            clickAddRows : function() {
                let addIdx = 1;

                this.midCodeGrid.data.addRows({
                    count : addIdx,
                    next : this.midCodeGrid.data.getFirstRow()
                });
                    // next : this.midCodeGrid.data.getFirstRow()
                
                let selectRow = this.midCodeGrid.data.getRowByIndex(addIdx);
                // console.log(selectRow);
                selectRow['useYn']      = 'Y';
                this.midCodeGrid.data.refreshRow(selectRow);

            },
            clickSave : async function() {

                const changedInfoToJson =  this.midCodeGrid.data.getSaveJson({
                    saveMode: 3
                });
                // console.log(changedInfoToJson);
                // payload 수정
                changedInfoToJson.data.forEach((item) => {
                    item.status = item.STATUS;
                });

                let url = '/sendApi/api/myWork/codeMngt/midCodeMngt/write';
                const payload = changedInfoToJson.data.reverse();
                let param = {
                    midCodeList : payload
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
                const changedInfoToJson =  this.midCodeGrid.data.getSaveJson({
                    saveMode: 3
                });
                
                if( changedInfoToJson.data.length === 0 ) {
                    this.alert("저장 할 정보가 없습니다.");
                    return;
                }

                this.midCodeGrid.data.getDataRows().forEach(row => {
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