<template>
    <section id="AuthGroupTypeSheet">

      <!-- <router-view/> -->
        <div class="lookup_box multi_line">
            <table>
                <caption class="sr_only"></caption>
                <colgroup>
                    <col width="4%">
                    <col width="25%">
                    <col width="*">
                </colgroup>
                <tbody>
                    <tr>
                        <th>그룹유형</th>   
                        <td>
                            <input type="text" v-model="search.groupTypeNm" class="form_control" placeholder="">
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
            <div class="button_box">
                <h2>권한 그룹</h2>
                <div class="fr">
                    <button type="button" class="btn btn_sm btn_darkgray" @click="showAddView()">추가</button>
                    <button type="button" class="btn btn_sm btn_gray" @click="checkDel()">삭제</button>
                </div>
            </div>

            <!-- ibsheet -->
            <div class="ib_wrap" style="height: calc(100vh - 320px)">
                <div id="ibsheet_authTypeSheet" class="ibsheet_table p_empty" style="height: 100%"></div>
            </div>
        </div>

    <!--그룹유형 추가 팝업 -->
    <b-modal id="AuthorityType" title="권한유형 추가" size="lg" hide-backdrop :footer-bg-variant="footerBg">
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
                                <th class="ac">권한그룹 이름</th>   
                                <td>
                                    <input type="text" v-model="datainfo.groupTypeNm" class="form_control" placeholder="입력해주세요">
                                </td>
                            </tr>     
                        </tbody>
                    </table>
                </div>
            </div>
        </template>
        <template #modal-footer="{ hide }">
            <b-button class="btn btn_md btn_outline btn_darkgray" @click="saveValidate()">추가</b-button>
            <b-button class="btn btn_md btn_outline btn_gray" @click="hide('forget')">닫기</b-button>
        </template>
    </b-modal>

    </section>
</template>

<script>
import loader from '@ibsheet/loader';
import MsgBoxMixins  from '@plugin/mixin/MsgBox.mixins.js';
import { AuthGroupTypeSheet } from '@/pages/common/data/AuthGroupList'  
import { sendPostApi, requestOptions } from '@/apis/common';

    export default {
        name: 'AuthGroupTypeSheet',
        mixins: [MsgBoxMixins],
        components: {
        },
        data() {
            return {
                footerBg: 'transparent',
                search : {
                    groupTypeNm : ''
                },
                datainfo : {
                    groupTypeNm : ''
                },
                authGrid : {
                    data : null,
                    options : {},
                },
                deleteIds : [],
            }
        },
        mounted() {
            this.initGrid();
        },
        beforeDestroy() {
        },
        methods: {
            initGrid : function () {
                let data = AuthGroupTypeSheet.data;
                let options = AuthGroupTypeSheet.options;

                // 클릭 Event
                options.Events = {
                    onRenderFirstFinish : (event) => {
                        this.searchData();
                    },
                }

                loader.createSheet({
                    el: 'ibsheet_authTypeSheet',
                    data: data,
                    options: options,
                }).then((sheet) => {
                    this.authGrid.data = sheet
                });
            },
            /* 조회 */
            searchData : async function () {
                let url = '/sendApi/api/myWork/authGroupMngt/authGroupType/list';
                let param = {
                        ...this.search
                    }

                await sendPostApi(url, param)
                        .then((data) => {
                            this.authGrid.data.loadSearchData({
                                data: data.data.datas.dlAuthGroup,
                            });
                        });
            },
            clearSearchData : function() {
                this.search.groupTypeNm = '';
            },
            showAddView : function() {
                this.datainfo.groupTypeNm = '';
                this.$root.$emit('bv::show::modal', 'AuthorityType');
            },
            saveValidate : function() {
                if( this.datainfo.groupTypeNm === '' ) {
                    this.alert("권한그룹명이 입력되지 않았습니다.");
                    return;
                }
                this.confirm("추가 하시겠습니까?", this.saveData, "");
            },
            saveData : async function() {
                let url = '/sendApi/api/myWork/authGroupMngt/authGroupType/write';
                let param = {
                        ...this.datainfo
                    }

                await sendPostApi(url, param)
                        .then((data) => {
                            this.alert("추가 되었습니다.", this.searchData);
                            this.$root.$emit('bv::hide::modal', 'AuthorityType');
                        });
            },
            checkDel : function() {
                let sheet = this.authGrid.data;
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
                        row['groupAuthInfoId'] = rows[x].groupAuthInfoId;
                        this.deleteIds.push(row);
                    }

                    if(this.deleteIds.length > 0) {
                        this.confirm('삭제하시겠습니까?', this.deleteSave);
                    }
                }
            },
            deleteSave : async function() {
                let url = '/sendApi/api/myWork/authGroupMngt/authGroupType/unuse';

                await sendPostApi(url, this.deleteIds)
                        .then((data) => {
                            this.alert("삭제 되었습니다.", this.searchData);
                        });
            }
        },
        
   }
</script>