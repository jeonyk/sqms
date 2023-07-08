<template>
    <section id="AuthGroupSheet">
        <div class="lookup_box multi_line">
            <table>
                <caption class="sr_only"></caption>
                <colgroup>
                    <col width="4%">
                    <col width="20%">
                    <col width="4%">
                    <col width="20%">
                    <col width="*">
                </colgroup>
                <tbody>
                    <tr>
                        <th>그룹유형</th>   
                        <td>
                            <select class="form_control w50" v-model="search.groupAuthInfoId">
                                <option value="" > {{ '전체' }} </option>
                                <option v-for="item in groupTypeCombo" :key="item.groupTypeNm" :value="item.groupAuthInfoId">{{ item.groupTypeNm }}</option>
                            </select>
                        </td>
                        <th>권한그룹</th>   
                        <td>
                            <input type="text" v-model="search.groupAuthNm" class="form_control size_lg" placeholder="">
                        </td>
                        <td class="ar">
                            <button type="button" class="btn_reset" @click="clearSearchData()">초기화</button>
                            <button type="button" class="btn btn_sm btn_darkblue btn_radius btn_search" @click="searchData()">검색</button>
                        </td>
                    </tr>
                </tbody>
            </table> 
        </div>

        <div class="inner">
            <div class="table_data">
                <div class="move_box w50">
                    <div class="move_box_inner">
                        <div class="data_tit">
                            권한그룹
                            <div class="fr">
                                <button type="button" class="btn btn_sm btn_darkgray" @click="showCreateView()">등록</button>
                                <button type="button" class="btn btn_sm btn_gray" @click="checkDel()">삭제</button>
                            </div>
                        </div>
                        <!-- ibsheet -->
                        <div class="ib_wrap" :style="{'height': 'calc(100vh - 320px)'}">
                            <div id="ibsheet_authGroup" class="ibsheet_table" style="height: 100%;"></div>
                        </div>
                    </div>
                </div>
                <div class="move_box w50">
                    <div class="move_box_inner">
                        <div class="data_tit">
                            권한 상세 설정
                            <div class="fr">
                                <button type="button" class="btn btn_sm btn_darkgray" @click="saveMenuValidata()" >저장</button>
                            </div>
                        </div>
                        <!-- ibsheet -->
                        <div class="ib_wrap" :style="{'height': 'calc(100vh - 320px)'}">
                            <div id="ibsheet_authMenu" class="ibsheet_table p_empty" style="height: 100%"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- 권한그룹 등록(추가) 팝업 -->
        <b-modal id="AuthorityGroup" title="권한그룹 추가" size="lg" hide-backdrop :footer-bg-variant="footerBg">
        <template #default>
            <div class="pop_container">
            <div class="table_normal_list table_write">
                <table>
                    <caption class="sr_only">권한그룹추가</caption>
                    <colgroup> 
                        <col width="185">
                        <col width="*">
                    </colgroup>
                    <tbody>
                        <tr>
                            <th class="ac">그룹유형 이름</th>   
                            <td>
                                <select class="form_control w50" v-model="dataInfo.groupAuthInfoId">
                                    <option value="" > {{ '선택' }} </option>
                                    <option v-for="item in groupTypeCombo" :key="item.groupTypeNm" :value="item.groupAuthInfoId">{{ item.groupTypeNm }}</option>
                                </select>
                            </td>
                        </tr>   
                        <tr>
                            <th class="ac">권한그룹 이름</th>   
                            <td>
                                <input type="text" v-model="dataInfo.groupAuthNm" class="form_control" placeholder="입력해주세요">
                            </td>
                        </tr>     
                    </tbody>
                </table>
            </div>
            </div>
        </template>
        <template #modal-footer="{ hide }">
            <b-button class="btn btn_md btn_outline btn_darkgray" @click="saveValidata()">추가</b-button>
            <b-button class="btn btn_md btn_outline btn_gray" @click="hide('forget')">닫기</b-button>
        </template>
        </b-modal>

    </section>
</template>

<script>
import loader from '@ibsheet/loader';
import MsgBoxMixins  from '@plugin/mixin/MsgBox.mixins.js';
import { AuthGroupDetailSheet, AuthDetailMenuSheet } from '@/pages/common/data/AuthGroupList'  
import { sendPostApi, requestOptions } from '@/apis/common';

    export default {
        name: 'AuthGroupSheet',
        mixins: [MsgBoxMixins],
        components: {

        },
        data() {
            return {
                footerBg: 'transparent',
                groupTypeCombo : [],
                positionRow : 0,
                search : {
                    groupAuthInfoId:'',
                    groupAuthNm : ''
                },
                dataInfo : {
                    groupAuthInfoId : '',
                    groupAuthNm : ''
                },
                authGroupGrid : {
                    data : null,
                    options : {},
                },
                authMenuGrid : {
                    data : null,
                    options : {},
                },
                authMenuData : null ,
            }
        },
        created(){
            this.getGroupTypeCombo('N');
        },
        mounted() {
            this.initGrid();
        },
        beforeDestroy() {
        },
        methods: {
            initGrid : function () {
                let data    = AuthGroupDetailSheet.data;
                let options = AuthGroupDetailSheet.options;

                // 클릭 Event
                options.Events = {
                    onRenderFirstFinish : (event) => {
                        this.searchData();
                    },
                    onAfterClick : this.searchAuthDetailMenu
                }

                loader.createSheet({
                    el: 'ibsheet_authGroup',
                    data: data,
                    options: options,
                }).then((sheet) => {
                    this.authGroupGrid.data = sheet
                });

                let data2       = AuthDetailMenuSheet.data;
                let options2    = AuthDetailMenuSheet.options;

                loader.createSheet({
                    el: 'ibsheet_authMenu',
                    data: data2,
                    options: options2,
                }).then((sheet) => {
                    this.authMenuGrid.data = sheet
                });
            },
            /* 권한그룹 조회 */
            searchData : async function () {
                let url = '/sendApi/api/myWork/authGroupMngt/authGroup/list';
                let param = {
                        ...this.search
                    }

                await sendPostApi(url, param)
                        .then((data) => {
                            this.authGroupGrid.data.loadSearchData({
                                data: data.data.datas.dlAuthGroup,
                            });
                            this.authMenuGrid.data.loadSearchData({
                                data: null
                            });
                        });
            },
            searchAuthDetailMenu : async function (event) {
                if( event.col === 'chk' ){
                    return;
                }

                let goSearch = true;
                if( this.positionRow != event.row.HasIndex ) {
                    this.positionRow = event.row.HasIndex;
                    goSearch = false;
                }
                if( goSearch ) {
                    return;
                }

                let focusRow =  this.authGroupGrid.data.getFocusedRow();
                let url = '/sendApi/api/myWork/authGroupMngt/menuAuthSetup/list';
                let param = {
                        groupAuthDtlId : focusRow.groupAuthDtlId
                    }

                await sendPostApi(url, param)
                        .then((data) => {
                            // console.log("==> %o", data.data.datas.dlMenuAuth)
                            this.authMenuData = data.data.datas.dlMenuAuth;
                            const sample    = this.authMenuData
                                                .filter(lv1 => lv1.menuLevel == 1)
                                                .map(lv1 => {
                                                    lv1.Items   = this.authMenuData.filter(lv2 => lv2.menuLevel == 2 && lv2.upperMenuMngtId == lv1.menuMngtId)
                                                                    .map(lv2 => {
                                                                        lv2.Items = this.authMenuData.filter(lv3 => lv3.menuLevel == 3 && lv3.upperMenuMngtId == lv2.menuMngtId)
                                                                        return lv2
                                                                    })
                                                    return lv1
                                                });

                            this.authMenuGrid.data.loadSearchData({
                                data: sample
                            });
                        });
            },
            clearSearchData : function () {
                this.search.groupAuthInfoId = '';
                this.search.groupAuthNm = '';
                this.authMenuGrid.data.loadSearchData({
                    data: null
                });
            },
            showCreateView : function () {
                this.dataInfo.groupAuthInfoId = '';
                this.dataInfo.groupAuthNm = '';
                this.getGroupTypeCombo('Y');
            },
            getGroupTypeCombo : async function(viewSe) {
                let url = '/sendApi/api/myWork/authGroupMngt/authGroupType/list';
                let param = {}

                await sendPostApi(url, param)
                        .then((data) => {
                            this.groupTypeCombo = data.data.datas.dlAuthGroup
                            if(viewSe === 'Y'){
                                this.$root.$emit('bv::show::modal', 'AuthorityGroup');
                            }
                        });
            },
            saveValidata : function() {
                if( this.dataInfo.groupAuthInfoId === '' ) {
                    this.alert("그룹유형이 선택되지 않았습니다.");
                    return;
                }
                if( this.dataInfo.groupAuthNm === '' ) {
                    this.alert("권한그룹명이 입력되지 않았습니다.");
                    return;
                }
                this.confirm("등록 하시겠습니까?", this.saveData, "");
            },
            saveData : async function() {
                let url = '/sendApi/api/myWork/authGroupMngt/authGroup/write';
                let param = {
                        ...this.dataInfo
                    }

                await sendPostApi(url, param)
                        .then((data) => {
                            this.alert("등록 되었습니다.", this.searchData);
                            this.$root.$emit('bv::hide::modal', 'AuthorityGroup');
                        });
            },
            checkDel : function() {
                let sheet = this.authGroupGrid.data;
                let checkedRows = [];

                checkedRows = sheet.getRowsByChecked(sheet.options.Cols[0].Name);

                if(checkedRows.length === 0) {
                    this.alert('삭제할 행을 선택해주세요.');
                    return;
                } else {
                    sheet.deleteRows({rows : checkedRows })
                    this.deleteIds = [];
                    let rows = [];
                    rows = sheet.getDataRows();
                    for(let x = 0; x<rows.length; x++){
                        let row = {};
                        row['status'] = rows[x].Added?'Added':(rows[x].Deleted?'Deleted':(rows[x].Changed?'Changed':''));
                        row['groupAuthDtlId'] = rows[x].groupAuthDtlId;
                        this.deleteIds.push(row);
                    }

                    if(this.deleteIds.length > 0) {
                        this.confirm('권한그룹을 삭제하면 해당 권한그룹으로 지정된 사용자의 권한설정도 삭제됩니다.\n\n권한 그룹을 삭제 하시겠습니까?', this.deleteSave);
                    }
                }
            },
            deleteSave : async function() {
                let url = '/sendApi/api/myWork/authGroupMngt/authGroup/unuse';

                await sendPostApi(url, this.deleteIds)
                        .then((data) => {
                            // console.log("OK : %o", data);
                            // console.log("OK : %o", data.data.rCode);
                            // if ( data.data.rCode == '0000' ) { 
                                this.alert("삭제 되었습니다.", this.searchData);
                            // }
                        });
            },
            saveMenuValidata : function() {
                let rowData = this.authMenuGrid.data.getDataRows();
                // console.log(rowData.length)
                if ( rowData.length === 0 ) {
                    this.alert("저장 할 정보가 없습니다.");
                    return;
                }
                this.confirm("저장 하시겠습니까?", this.saveMenuData, "");
            },
            saveMenuData : async function() {
                const changedInfoToJson =  this.authMenuGrid.data.getSaveJson({
                    saveMode: 1
                });
                // console.log(changedInfoToJson);
                // payload 수정
                changedInfoToJson.data.forEach((item) => {
                    item.status = item.STATUS;
                });

                let url = '/sendApi/api/myWork/authGroupMngt/menuAuth/write';
                const payload = changedInfoToJson.data.reverse();
                let param = {
                    menuList : payload
                }

                await sendPostApi(url, param)
                        .then((data) => {
                            // console.log("OK : %o", data.data.rCode);
                            if ( data.data.rCode === '0000' ) {
                                this.alert("저장 되었습니다.");
                            }
                        });
            },
        },
        
   }
</script>