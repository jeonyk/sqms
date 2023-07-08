<template>
    <div>
        <div class="lookup_box multi_line">
            <table>
                <caption class="sr_only"></caption>
                <colgroup>
                    <col width="4%">
                    <col width="18%">
                    <col width="3%">
                    <col width="18%">
                    <col width="6%">
                    <col width="18%">
                    <col width="*">
                </colgroup>
                <tbody>
                    <tr>
                        <th>분류코드</th>   
                        <td>
                            <select class="form_control size_md" v-model="search.groupCode">
                                <option value="" > {{ '전체' }} </option>
                                <option v-for="item in groupTypeCombo" :key="item.groupCode" :value="item.groupCode">{{ item.groupCode }}</option>
                            </select>
                        </td>
                        <th>코드</th>   
                        <td>
                            <input type="text" class="form_control size_lg" placeholder="" v-model="search.codeVal" @keyup.enter="getData">
                        </td>
                        <th>코드명(국문)</th>
                        <td>
                            <input type="text" class="form_control size_lg" placeholder="" v-model="search.codeNameKr" @keyup.enter="getData">
                        </td>
                        <td class="ar">
                            <button type="button" class="btn_reset" @click="resetFilter">초기화</button>
                            <button type="button" class="btn btn_sm btn_darkblue btn_radius btn_search" @click="getData()">검색</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div class="inner">
            <div class="button_box">
                <span class="total">총 <b>{{menuGrid.data.length}}</b> 건</span> 
                <div class="fr">
                    <button type="button" class="btn btn_sm btn_darkgray" @click="goWrite">등록</button>
                </div>
            </div>
<!-- 
            <div class="table_normal_list ac">
                <table class="">
                    <caption class="sr_only">제목</caption>
                    <colgroup>
                        <col width="5%">
                        <col width="13%">
                        <col width="13%">
                        <col width="*">
                        <col width="13%">
                        <col width="13%">
                        <col width="13%">
                        <col width="13%">
                    </colgroup>
                    <thead>
                        <tr>
                            <th>NO</th>
                            <th>분류코드</th>
                            <th>코드</th>
                            <th>코드명(KR)</th>
                            <th>정렬순서</th>
                            <th>등록일</th>
                            <th>사용여부</th>
                            <th>비고</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>0001</td>
                            <td></td>
                            <td>구분</td>
                            <td>1</td>
                            <td>yyyy-mm-dd</td>
                            <td>Y</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>1</td>
                            <td>0001</td>
                            <td></td>
                            <td>공종</td>
                            <td>1</td>
                            <td>yyyy-mm-dd</td>
                            <td>Y</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>1</td>
                            <td>0001</td>
                            <td></td>
                            <td>종별</td>
                            <td>1</td>
                            <td>yyyy-mm-dd</td>
                            <td>Y</td>
                            <td></td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="board_paging">
                <ul>
                    <li class="paging_first"><a href="javascript:void(0);">paging_first</a></li>
                    <li class="active"><a href="javascript:void(0);">1</a></li>
                    <li><a href="javascript:void(1);">2</a></li>
                    <li><a href="javascript:void(0);">3</a></li>
                    <li><a href="javascript:void(0);">4</a></li>
                    <li><a href="javascript:void(0);">5</a></li>
                    <li><a href="javascript:void(0);">6</a></li>
                    <li><a href="javascript:void(0);">7</a></li>
                    <li><a href="javascript:void(0);">8</a></li>
                    <li><a href="javascript:void(0);">9</a></li>
                    <li><a href="javascript:void(0);">10</a></li>
                    <li class="paging_last"><a href="javascript:void(0);">paging_last</a></li>
                </ul>
            </div> -->
            
            <div class="ib_wrap mt0" style="height: calc(100vh - 320px)">
                <div id="ibsheet_code1Depth" class="ibsheet_table" style="height: 100%;"></div>
            </div>
        </div> 

    </div>
</template>

<script>
import loader from '@ibsheet/loader';
import MsgBoxMixins  from '@plugin/mixin/MsgBox.mixins.js';
import { menu3DepthSheet } from '@/pages/common/data/CodeMngtList'                              
import { sendPostApi, requestOptions } from '@/apis/common';

    export default {
        name: 'Code1DepthMngtSheet',
        mixins: [MsgBoxMixins],
        components: {

        },
        data() {
            return {
                categoryData : [],
                searchMainCombo : [],
                searchMidCombo : [],
                mainCombo : [],
                groupTypeCombo : [],
                search : {
                    groupCode : '',
                    codeVal : '',
                    codeNameKr : '',
                },
                menuGrid : {
                    data : [],
                    options : {
                        Cfg:{
                            CanEdit:0,
                            NoDataMessage:3,
                            NoVScroll: false,
                        },
                        Cols: [
                            { Name: 'SEQ', Header: [{ Value: '번호' }], RelWidth: 1, CanEdit: 0 },
                            { Name: 'groupCode', Header: [{ Value: '분류코드' }], RelWidth: 4, CanEdit: 0 },
                            { Name: 'codeVal', Header: [{ Value: '코드' }], RelWidth: 4, CanEdit: 0 },
                            { Name: 'codeNameKr', Header: [{ Value: '코드명(국문)' }], RelWidth: 4, CanEdit: 0 },
                            { Name: 'codeNameEn', Header: [{ Value: '코드명(영문)' }], RelWidth: 4, CanEdit: 0 },
                            { Name: 'sortOrder', Header: [{ Value: '정렬순서' }], RelWidth: 4, CanEdit: 0 },
                            { Name: 'regtDate', Header: [{ Value: '등록일' }], RelWidth: 4, CanEdit: 0, },
                            { Name: 'useYn', Header: [{ Value: '사용여부' }], Format:{'Y':'사용','N':'미사용'}, RelWidth: 4, CanEdit: 1 },
                            { Name: 'explanation', Header: [{ Value: '비고' }], RelWidth: 4, CanEdit: 1 },
                        ]
                    },
                    sheet:null,
                },
            }
        },
        created() {
            // console.log("===== created")
            this.getGroupTypeCombo();
            this.getData();
        },
        mounted() {
            // console.log("===== paramTab")
        },
        beforeDestroy() {
        },
        watch: {
            "search.mainCodeId": {
                handler () {
                    // console.log("change GO"+this.search.mainCodeId);
                    let comboList = null;
                    this.orgMidCombo.forEach(item => {
                        if (item.upperMenuMngtId === this.search.mainCodeId ){
                            
                        }
                    })
                    this.searchMidCombo = comboList;
                    // console.log("searchMidCombo === %o", this.searchMidCombo);
                }
            }
        },
        methods: {
			getGroupTypeCombo : async function () {
                requestOptions.headers['Accept-Language'] = "ko";
                requestOptions.headers['Authorization'] = this.$cookies.get("Authorization");
                let url = '/sendApi/api/common/masterGroupCode/list';
                let param = {};

                const rst = await sendPostApi(url, param);

                if( rst.status == 200 ){
                    this.groupTypeCombo = rst.data.data;
                }
            },
            getData : async function () {
                requestOptions.headers['Accept-Language'] = "ko";
                requestOptions.headers['Authorization'] = this.$cookies.get("Authorization");
                let url = '/sendApi/api/common/masterCode/list';
                let param = {
                    'useYn':'Y',
                };
                if(this.search.groupCode != '' && this.search.groupCode != null){
                    param['groupCode'] = this.search.groupCode;
                }
                if(this.search.codeVal != '' && this.search.codeVal != null){
                    param['codeVal'] = this.search.codeVal;
                }
                if(this.search.codeNameKr != '' && this.search.codeNameKr != null){
                    param['codeNameKr'] = this.search.codeNameKr;
                }

                let rst = await sendPostApi(url, param);
                if(rst.status == 200){
                    // console.log('data',rst.data.data);
                    this.menuGrid.data = rst.data.data;
                    this.menuGrid.options['Events'] = {
                        onClick:this.fnClick,
                    };
                }
                loader.createSheet({
                    el: 'ibsheet_code1Depth',
                    data: this.menuGrid.data,
                    options: this.menuGrid.options,
                }).then((sheet) => {
                    this.menuGrid.sheet = sheet
                });

            },
            resetFilter:function(){
                this.search = {
                    'groupCode':'',
                    'codeVal':'',
                    'codeNameKr':'',
                };
            },
            goWrite: function(){
                this.$router.push({
                    name : 'CodeMngtWrite',
                });
            },
            fnClick:function(evt){
                let param = {
                    'masterCodeId':evt.row.masterCodeId,
                };
                this.$router.push({
                    name : 'CodeMngtView',
                    params: param,
                });
            },
            setCategoryList : function (payload) {
                const options = {
                    mainData : this.mainCombo,
                    midData : this.midCombo,
                    seperator: '|',
                    ...payload
                }

                // console.log("return =================> %o", options)
                if(!(options.main && options.mid )) return
                // console.log("go =================> %o", options.mid)

                options.main.Enum       = `${options.seperator}${options.mainData.map(item => item['menuNmKr']).join(options.seperator)}`
                options.main.EnumKeys   = `${options.seperator}${options.mainData.map(item => item['menuMngtId']).join(options.seperator)}`

                options.main.clear = options.mid.Name
                options.mid.Related = options.main.Name
                
                options.mainData.forEach(item => {
                    options.mid[`EnumKeys${item['menuMngtId']}`]  = `${options.seperator}${options.midData.filter(miditem=> miditem.upperMenuMngtId === item.menuMngtId).map(inner => inner['menuMngtId']).join(options.seperator)}`
                    options.mid[`Enum${item['menuMngtId']}`]    = `${options.seperator}${options.midData.filter(miditem=> miditem.upperMenuMngtId === item.menuMngtId).map(inner => inner['menuNmKr']).join(options.seperator)}`
                });
                // options.mainData.forEach(item => {
                //     options.mid[`Enum${item['main'.concat(options.key)]}`] = `${options.seperator}${options.midData.filter(miditem=> miditem.mainCodeId === item.mainCodeId).map(inner => inner['mid'.concat(options.value)]).join(options.seperator)}`
                //     options.mid[`EnumKeys${item['main'.concat(options.key)]}`] = `${options.seperator}${options.midData.filter(miditem=> miditem.mainCodeId === item.mainCodeId).map(inner => inner['mid'.concat(options.key)]).join(options.seperator)}`
                // })
                // console.log("options.mid =================> %o", options.mid)
            },
            initSetGrid : function () {
                let menuData    = menu3DepthSheet.data;
                let menuOptions = this.menuGrid.options;

                // 클릭 Event
                menuOptions.Events = {
                    onRenderFirstFinish : (event) => {
                        this.searchData();
                    },
                    onBeforeChange : this.changeGrid,
                }

                this.setCategoryList({
                    main: menuOptions.Cols[0],
                    mid: menuOptions.Cols[1],
                })

                loader.createSheet({
                    el: 'ibsheet_code1Depth',
                    data: menuData,
                    options: menuOptions,
                }).then((sheet) => {
                    this.menuGrid.data = sheet
                });
            },
            changeGrid (event) {
                // console.log("changeGrid : %o", this.menuGrid)
                const arrName = [this.menuGrid.data.options.Cols[5].Name, this.menuGrid.data.options.Cols[6].Name];

                switch (event.col) {
                    case this.menuGrid.data.options.Cols[0].Name:    // mainCodeId 변경
                        event.row[this.menuGrid.data.options.Cols[1].Name] = '';
                        event.sheet.refreshRow(event.row);

                        this.setCategoryList({
                            main : this.menuGrid.data.options.Cols[0],
                            mid : this.menuGrid.data.options.Cols[1],
                        })
                    break;
                    case this.menuGrid.data.options.Cols[4].Name:    // 메뉴유형
                        if ( event.val === "MENU" ) {
                            event.row[this.menuGrid.data.options.Cols[5].Name] = ''
                            event.row[this.menuGrid.data.options.Cols[6].Name] = ''

                            for( let i = 0; i < arrName.length; i++) {
                                this.menuGrid.data.setAttribute(event.row, arrName[i], 'CanEdit', 0, 1);  // 잠김모드 변환
                            }
                        } else {

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
                                        
                                            // console.log('data == : %o', this.menuGrid.data.getDataRows());
                                            this.menuGrid.data.getDataRows().forEach(row => {
                                                if(row.menuType === 'MENU') {
                                                    this.menuGrid.data.setAttribute({row: row, col: this.menuGrid.data.options.Cols[5].Name, attr : 'CanEdit', val : '0' ,})
                                                    this.menuGrid.data.setAttribute({row: row, col: this.menuGrid.data.options.Cols[6].Name, attr : 'CanEdit', val : '0' ,})
                                                } else {
                                                    this.menuGrid.data.setAttribute({row: row, col: this.menuGrid.data.options.Cols[5].Name, attr : 'CanEdit', val : '1' ,})
                                                    this.menuGrid.data.setAttribute({row: row, col: this.menuGrid.data.options.Cols[6].Name, attr : 'CanEdit', val : '1' ,})
                                                }
                                                this.menuGrid.data.refreshRow(row)
                                            })
                                        });
                // console.log(data);
                // console.log('data: %o', data);

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

                this.menuGrid.data.addRows({
                    count : addIdx,
                    next : this.menuGrid.data.getFirstRow()
                });
                    // next : this.menuGrid.data.getFirstRow()
                
                let selectRow = this.menuGrid.data.getRowByIndex(addIdx);
                // console.log(selectRow);
                selectRow['menuType']   = 'VIEW';
                selectRow['menuLevel']  = '3';
                selectRow['useYn']      = 'Y';
                // selectRow['siteMstrId'] = this.siteMstrId;                
                this.menuGrid.data.setAttribute({row: this.menuGrid.data.getFirstRow(), col: this.menuGrid.data.options.Cols[5].Name, attr : 'CanEdit', val : '1' ,})
                this.menuGrid.data.setAttribute({row: this.menuGrid.data.getFirstRow(), col: this.menuGrid.data.options.Cols[6].Name, attr : 'CanEdit', val : '1' ,})
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
                } else {
                }
                this.confirm("저장 하시겠습니까?", this.clickSave, "");


            }
        },
        
   }
</script>