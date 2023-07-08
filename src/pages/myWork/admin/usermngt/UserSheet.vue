<template>
    <div>
        <div class="lookup_box multi_line">
            <table>
                <caption class="sr_only">제목</caption>
                <colgroup>
                    <col width="4%">
                    <col width="20%">
                    <col width="4%">
                    <col width="20%">
                    <col width="*">
                </colgroup>
                <tbody>
                    <tr>
                        <th>사원명</th>   
                        <td>
                            <input type="text" v-model="search.userNm" class="form_control size_lg" placeholder="입력해주세요" @keyup.enter="searchData()">
                        </td>
                        <th>부서명</th>
                        <td>
                            <input type="text" v-model="search.tradeNm" class="form_control size_lg" placeholder="입력해주세요" @keyup.enter="searchData()">
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
                <!-- <span class="total">총 <b>{{gridRowCnt}}</b>명의 사용자</span>  -->
                <div class="fr">
                    <button type="button" class="btn btn_sm btn_darkgray" @click="pwClear()">비밀번호 실패 초기화</button>
                    <button type="button" class="btn btn_sm btn_darkgray" @click="createUser()">등록</button>
                    <button type="button" class="btn btn_sm btn_gray" @click="deleteUser()">삭제</button>
                </div>
            </div>

            <!-- ibsheet -->
            <div class="ib_wrap mt0" style="height: calc(100vh - 320px)">
                <div id="ibsheet_user" class="ibsheet_table" style="height: 100%;"></div>
            </div>

        </div>   <!-- // inner -->

    </div>
</template>

<script>
import loader from '@ibsheet/loader';
import MsgBoxMixins  from '@plugin/mixin/MsgBox.mixins.js';
import { UserDataSheet } from '@/pages/common/data/UserMngtList'
import { sendPostApi, requestOptions } from '@/apis/common';

    // import EmployeeSearch from '../Modal/EmployeeSearch.vue' /* 사원 검색 팝업 */
    // import {ProjectMapping, ProjectMappingUser}  from '../data/MyworkList.js' /* 프로젝트 매핑 */
    // import EmployeeSearch2 from '../Modal/EmployeeSearch2.vue' /* 사원 검색 팝업 */

    export default {
        name: 'UserSheet',
        mixins: [MsgBoxMixins],
        components: {
        },
        data() {
            return {
                footerBg: 'transparent',
                userGrid : {
                    data : null,
                    options : {},
                },
                search : {
                    userNm : '',
                    tradeNm : ''
                },
                gridRowCnt : 0,

            }
        },
        mounted() {
            this.initGrid();
        },
        beforeDestroy() {
            if(this.userGrid.data) loader.removeSheet(this.userGrid.data)
        },
        methods: {
            initGrid : function() {
                let data    = UserDataSheet.data;
                let options = UserDataSheet.options;

                // 클릭 Event
                options.Events = {
                    onRenderFirstFinish : (event) => {
                        this.searchData();
                    },
                    ondblclick : this.detailUser
                }

                loader.createSheet({
                    el: 'ibsheet_user',
                    data: data,
                    options: options,
                }).then((sheet) => {
                    this.userGrid.data = sheet
                });
            },
            searchData : async function() {
                let url = '/sendApi/api/myWork/userMngt/userMngt/list';
                let param = {
                        ...this.search
                    }

                await sendPostApi(url, param)
                        .then((data) => {
                            this.gridRowCnt = data.data.datas.dlUser.length;
                            this.userGrid.data.loadSearchData({
                                data: data.data.datas.dlUser
                            });
                        });
            },
            clearSearchData : function() {
                this.search.userNm  = '';
                this.search.tradeNm = '';
            },
            goDetail : function( event ) {
                // checkbox 컬럼 더블클릭시 상세 이동 제외
                if( event.col === 'chk' ){
                    return;
                }

            },
            createUser : function() {
                this.$router.push({
                    name : 'UserWrite',
                    params : {
                        pageMode : 'C',
                        admUserMngtId : ''
                    }
                });
            },
            detailUser : function(evt) {
                this.$store.dispatch('myWork/setAdmin',{
                    admUserMngtId : evt.row.admUserMngtId,
                    userId : evt.row.userId
                });

                this.$router.push({
                    name : 'UserView',
                });
            },
            deleteUser : function() {
                const checkedRows = this.userGrid.data.getRowsByChecked("chk");

                if(checkedRows == [] || checkedRows.length == 0){
                    this.alert('삭제할 행을 선택해주세요.');
                    return;
                }

                this.confirm("사용자를 삭제 하시겠습니까?", async () =>{
                    let delIds = checkedRows.map(item => item.userId)  // 삭제 유저 ID

                    let url = '/sendApi/api/myWork/userMngt/userInfo/unuse';
                    let param = {
                        userList : delIds
                    }

                    try {
                        await sendPostApi(url, param).then((data) => {
                            if(typeof data.data.count != 'undefined' && data.data.count > 0){
                                this.alert("삭제 되었습니다.", ()=>{
                                    this.searchData()
                                });
                            }else{
                                return this.alert('삭제에 실패했습니다.');
                            }
                        });
                    } catch (error) {
                        return this.alert('삭제에 실패했습니다.');
                    } 
                })
            },
            pwClear : function() {
                const checkedRows = this.userGrid.data.getRowsByChecked("chk");

                if(checkedRows == [] || checkedRows.length == 0){
                    this.alert('행을 선택해주세요.');
                    return;
                }

                this.confirm("비밀번호 초기화를 하시겠습니까?", async () =>{
                    let delIds = checkedRows.map(item => item.userId)  // 유저 ID

                    let url = '/sendApi/api/myWork/userMngt/userDetail/pwClear';
                    let param = {
                        userList : delIds
                    }

                    try {
                        await sendPostApi(url, param).then((data) => {
                            // console.log(data)
                            if(typeof data.data.count != 'undefined' && data.data.count > 0){
                                this.alert("변경되었습니다.", ()=>{
                                    this.searchData()
                                });
                            }else{
                                return this.alert('변경에 실패했습니다.');
                            }
                        });
                    } catch (error) {
                        return this.alert('변경에 실패했습니다.');
                    } 
                })
            },
        },
   }
</script>