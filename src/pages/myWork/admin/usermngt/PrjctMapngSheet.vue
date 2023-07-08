<template>
    <div>
        <div class="lookup_box multi_line">
            <table>
                <caption class="sr_only"></caption>
                <colgroup>
                    <col width="4%">
                    <col width="25%">
                    <col width="6%">
                    <col width="25%">
                    <col width="*">
                </colgroup>
                <tbody>
                    <tr>
                        <th>프로젝트</th>   
                        <td>
                            <select class="form_control size_sm mr10" v-model="search.mngtType">
                                        <option value="" selected>전체</option>
                                        <option value="0">관리</option>
                                        <option value="1">비관리</option>
                                        <option value="2" >준공</option>
                                    </select>
                            <input type="text" v-model="search.projectNm" class="form_control size_lg" placeholder="입력해주세요" @keyup.enter="searchMapngData()">
                        </td>
                        <th>프로젝트 코드</th>
                        <td>
                            <input type="text" v-model="search.projectId" class="form_control size_lg" placeholder="입력해주세요" @keyup.enter="searchMapngData()">
                        </td>
                        <td class="ar">
                            <button type="button" class="btn_reset" @click="clearSearchData()">초기화</button>
                            <button type="button" class="btn btn_sm btn_darkblue btn_radius btn_search" @click="searchMapngData()">검색</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div class="inner">
            <div class="table_data">
                <div class="move_box w50">
                    <div class="move_box_inner">
                        <div class="data_tit">프로젝트</div>
                        <!-- ibsheet -->
                        <div class="ib_wrap" style="height: calc(100vh - 320px)">
                            <div id="ibsheet_prjct" class="ibsheet_table" style="height: 100%;"></div>
                        </div>
                    </div>
                </div>
                <div class="move_box w50">
                    <div class="move_box_inner">
                        <div class="data_tit">
                            프로젝트 매핑 사용자
                            <!-- <span class="total">총 <b>{{mapngUserCnt}}</b>명의 사용자</span> -->
                            <div class="fr">
                                <button type="button" class="btn btn_sm btn_darkgray" @click="fn_EmployeeSearch()">등록</button>
                                <button type="button" class="btn btn_sm btn_gray" @click="fn_delete()">삭제</button>
                            </div>
                        </div>
                        <!-- ibsheet -->
                        <div class="ib_wrap" style="height: calc(100vh - 320px)">
                            <div id="ibsheet_mapngUser" class="ibsheet_table" style="height: 100%;"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    <!-- 사원 검색 팝업 --> 
    <AdminEmployeeSearch @fn-multi-employee-choice="fn_MultiEmployeeChoice" :maxlength="9999" :headerCheck="1" :emitCloseYn="false" btnNm="등록" :site-mstr-id="selectRow.siteMstrId" pageNm="admin" refId="AdminEmployeeSearch" ref="AdminEmployeeSearch"/>
    </div>
</template>

<script>
import loader from '@ibsheet/loader';
import MsgBoxMixins  from '@plugin/mixin/MsgBox.mixins.js';
import UserSheet from '@/pages/myWork/admin/usermngt/UserSheet.vue'
import { PrjctMapng, PrjctMapngUser }  from '@/pages/common/data/UserMngtList'
import { sendPostApi, requestOptions } from '@/apis/common';
import  AdminEmployeeSearch from '@/pages/common/popup/MultiEmployeeSearch.vue' /* 협력사 직원 추가 팝업 */

    export default {
        name: 'PrjctMapngSheet',
        mixins: [MsgBoxMixins],
        components: {
            UserSheet,
            AdminEmployeeSearch,
        },
        data() {
            return {
                footerBg: 'transparent',
                positionChk : 0,
                prjctMapngGrid : {
                    data : null,
                    options : {},
                },
                mapngUserGrid : {
                    data : null,
                    options : {},
                },
                search : {
                    mngtType : '0',
                    projectNm : '',
                    projectId : '',
                },
                mapngUserCnt : 0,
                selectRow : {
                    'siteMstrId' : ''
                }
            }
        },
        mounted() {
            this.initGrid();
        },
        beforeDestroy() {
            if(this.prjctMapngGrid.data) loader.removeSheet(this.prjctMapngGrid.data)
            if(this.mapngUserGrid.data) loader.removeSheet(this.mapngUserGrid.data)
        },
        methods: {
            initGrid : function() {
                let data    = PrjctMapng.data;
                let options = PrjctMapng.options;

                // 그리드 이벤트
                options.Events = {
                    onRenderFirstFinish : () => {
                        this.searchMapngData();
                    },
                    onAfterClick : this.projectClick
                }

                loader.createSheet({
                    el: 'ibsheet_prjct',
                    data: data,
                    options: options,
                }).then((sheet) => {
                    this.prjctMapngGrid.data = sheet
                });

                let data2    = PrjctMapngUser.data;
                let options2 = PrjctMapngUser.options;

                // 그리드 이벤트
                options2.Events = {
                    onAfterClick : this.delChk,
                    onBeforeDataLoad : this.mapngUserDataLoad
                }

                loader.createSheet({
                    el: 'ibsheet_mapngUser',
                    data: data2,
                    options: options2,
                }).then((sheet) => {
                    this.mapngUserGrid.data = sheet
                });
            },

            /* 시트 데이터 로드 전 */
            mapngUserDataLoad : function(evt) {
                // 삭제 여부 확인
                for(var i=0;i<evt.data.length;i++){
                    if( evt.data[i]["delPosblYn"] == "N"){
                        // evt.data[i]["chkType"] = "";
                        evt.data[i]["chkCanEdit"] = 0;
                    } else {
                        // evt.data[i]["chkType"] = "Bool";
                        evt.data[i]["chkCanEdit"] = 1;
                    }
                } 
            },

            /* 초기화 */
            clearSearchData : function() {
                this.search.mngtType = '0';
                this.search.projectNm = '';
                this.search.projectId = '';
            },

            /* 프로젝트 조회 */
            searchMapngData : async function() {
                let url = '/sendApi/api/popup/project/list';
                let param = {
                    ...this.search
                };

                await sendPostApi(url, param).then((result) => {
                    if(typeof result.data.datas.resultList != 'undefined'){
                        let list = result.data.datas.resultList

                        list.forEach((item) => {
                            if( item.baseType == '4000' ) {
                                item.baseTypeName = "건축";
                            } else {
                                item.baseTypeName = "인프라";
                            }
                        });
                        
                        this.prjctMapngGrid.data.loadSearchData({
                            data : list
                        });

                        if(list.length > 0){
                            let firstId = list[0].siteMstrId
                            this.searchUserData(firstId)
                        }
                    }
                });
            },

            /* 매핑 사용자 조회 */
            async searchUserData (id) {
                let url = '/sendApi/api/myWork/userMngt/prjctUserMapng/list';
                let param = {
                        siteMstrId : id
                    }

                await sendPostApi(url, param).then((data) => {
                    this.mapngUserGrid.data.loadSearchData({
                        data: data.data.datas.dlPrjctMapng
                    });
                    this.mapngUserCnt = data.data.datas.dlPrjctMapng.length;
                });
            },

            /* 프로젝트 선택시 */
            projectClick(evt){
                if(evt.kind = 'Data'){
                    this.searchUserData(evt.row.siteMstrId) 
                }
            },

            /* 사용자 삭제 체크버튼 클릭시 */
            delChk : function(event) {
                if(event.col == 'chk'){
                    if( event.row.delPosblYn == 'N') {
                        this.alert("프로젝트 매핑 삭제 불가 사용자 입니다.")
                        event.row.chk = 0;
                        event.sheet.refreshRow(event.row);  // 반영
                    }
                }
            },

            fn_delete() {
                let checkedRows = this.mapngUserGrid.data.getRowsByChecked("chk");
                let siteMstrId = this.prjctMapngGrid.data.getFocusedRow().siteMstrId
                
                if(checkedRows.length === 0) {
                     return this.alert("사용자를 선택하세요.");
                }

                this.confirm("삭제 하시겠습니까?", async ()=>{
                    try {
                        let url = '/sendApi/api/myWork/userMngt/prjctUserMapng/unuse';
                        let param = checkedRows.map(item => {
                                        return {
                                            'userId' : item.userId,
                                            'siteMstrId' : item.siteMstrId
                                        } 
                                    })

                        await sendPostApi(url, param).then((data) => {
                            if(typeof data.data.rCode != 'undefined' && data.data.rCode == '0000'){
                                this.alert("삭제 되었습니다.", async ()=>{
                                    this.searchUserData(siteMstrId)
                                });
                            }
                        });     
                    } catch (error) {
                        
                    }
                })
            },
            saveDel : async function() {
                
            },
            
            /* 프로젝트 매핑 등록 사원 검색 */
            fn_EmployeeSearch(){
                var focusRow = this.prjctMapngGrid.data.getFocusedRow();
                this.selectRow.siteMstrId = focusRow.siteMstrId
                return this.$root.$emit('bv::show::modal', 'AdminEmployeeSearch')
            },

            /* 프로젝트 매핑 등록 사원 선택시 */
            fn_MultiEmployeeChoice(data){
                this.confirm('등록하시겠습니까?', async ()=>{
                    let siteMstrId = this.prjctMapngGrid.data.getFocusedRow().siteMstrId

                    let param = {
                        'siteMstrId' : siteMstrId,
                        'userPrjctList' : data.userIds
                    }
                    let url = '/sendApi/api/myWork/userMngt/prjctUserMapng/write'

                    await sendPostApi(url, param).then((rst) => {
                        if(typeof rst.data.count != 'undefined'){
                            if(rst.data.count > 0){
                                return this.alert('등록되었습니다.',()=>{
                                    this.$refs.AdminEmployeeSearch.emploName='';
                                    this.$refs.AdminEmployeeSearch.userIds = [];
                                    this.$refs.AdminEmployeeSearch.userNames = [];

                                    this.$root.$emit('bv::hide::modal', 'AdminEmployeeSearch')

                                    this.searchUserData(siteMstrId)
                                })
                            }else{
                                return this.alert('등록에 실패했습니다.')
                            }
                        }else{
                            return this.alert('등록에 실패했습니다.')
                        }
                    })
                })
                
            },
        },
        
   }
</script>