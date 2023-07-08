<template>
    <div class="tab_contents">
        <h2 class="sub_title">시험 상세
            <div class="fr">
                <button type="button" class="btn btn_md btn_outline btn_darkgray" @click="editList" v-if="testDetail.resultProgrsStatus === 'TTRG' || testDetail.resultProgrsStatus === 'RQPR'">수정</button>
                <button type="button" class="btn btn_md btn_outline btn_darkgray" @click="removeList" v-if="testDetail.resultProgrsStatus === 'TTRG' || testDetail.resultProgrsStatus === 'RQPR'">삭제</button>
                <button type="button" class="btn btn_md btn_outline btn_darkgray" @click="prevList">목록</button>
            </div>
        </h2>

        <div class="pl30 pr20">
            <div class="table_normal_list mt10">
                <table>
                    <caption class="sr_only"></caption>
                    <colgroup>
                        <col width="10%">
                        <col width="*">
                        <col width="12%">
                        <col width="*">
                        <col width="12%">
                        <col width="*">
                    </colgroup>
                    <tbody>
                        <!-- registInfo : {
                registDate: '',   // 등록일자 
                testInstt: '',  // 시험기관 
                testInsttName: '', // 시험기관명
                sploreCo: '',  // 시료개수
                sploreQy: '', // 시료량 
                apnrtCnstrctQy: '', // 아스콘 시공량
            }, -->
                        <tr>
                            <th>시험기관</th>
                            <td>{{ testDetail.testInsttName }}</td>
                            <th>등록일</th>
                            <td colspan="3">{{ $moment(testDetail.registDate).format('YYYY-MM-DD') }}</td>
                        </tr>
                        <tr>
                            <th>시료 개수</th>
                            <td>{{ testDetail.sploreCo }}</td>
                            <th>시료량</th>
                            <td>{{ testDetail.sploreQy }}</td>
                            <th>아스콘 시공량</th>
                            <td>{{ testDetail.apnrtCnstrctQy }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <div class="tab_area">
            <div class="inner">
                <div class="button_box"><strong>시험 종별 목록</strong></div>
                <!-- ibsheet -->
                <div class="ib_wrap">
                    <div id="testSubjectSheet" class="ibsheet_table" ref="testSubjectSheet"></div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
import loader from '@ibsheet/loader'
import { testDetail } from '@/pages/quality/testMngt/data/testData';
import { sendPostApi, requestOptions } from '@/apis/common';
import WrappedAlert from "@/pages/quality/testMngt/component/WrappedAlert";
import { mapGetters } from 'vuex';
import MsgBoxMixins  from '@plugin/mixin/MsgBox.mixins.js'

export default {
    name: 'TestResultMngtDetail',
    mixins: [MsgBoxMixins],
    computed: {
        ...mapGetters({
            checklist: 'testMngt/getTestMngtCheckList'
        })
    },
    data() {
        return {
            footerBg: 'transparent',

            grid: {
                testSubjectSheet : [],
                testSubjectData: [],
                testSubjectSheetOpt: {}
            },

            testDetail: {}, // 시험 상세

            popup: {
                title: '',
                isShow: false,
                message: '',
                useCancelButton: false,
                buttonName: {},
                refId: 'testResultMngtDetailAlert',
                purpose: '',
            },
        }
    },
    mounted () {
        this.initSheet();
    },
    beforeDestroy () {
        this.removeSheet();
    },
    methods: {
        initSheet() {   // createSheet 

            this.grid.testSubjectSheetOpt = _.cloneDeep(testDetail.options);
            this.grid.testSubjectSheetOpt.Cfg = {
                NoVScroll: 0,
                CanEdit: 0,
                DataMerge : 2,
            }
            this.grid.testSubjectSheetOpt.Events = {                
                onRenderFirstFinish : () => { 
                    this.getTestSubject(this.checklist);
                }
            };

            loader.createSheet({
                el: 'testSubjectSheet',
                data: [],
                options: this.grid.testSubjectSheetOpt
            }).then((sheet) => {
                this.grid.testSubjectSheet = sheet;
            });
        },
        async getTestSubject(param) {  // sheet data load
            let url = '/sendApi/api/testMngt/testResultMngt/testSubjectDetail/list';
            
            let payload = { 
                ...param,
            };

            try {
                const testReultDtl = await sendPostApi(url, payload);
                this.grid.testSubjectData = testReultDtl.data.datas.dlTestSubject;      // 시험 종별 목록
                this.testDetail = testReultDtl.data.datas.dmTestDetail;                 // 시험 상세
                
                this.grid.testSubjectSheet.loadSearchData({
                    data: this.grid.testSubjectData,
                    append: false
                });
            } catch (error) {
                console.log(error.response.data);
            }
            
        },
        removeSheet() { // sheet 객체 삭제
            if (this.grid.testSubjectSheet) {
                this.grid.testSubjectSheet.dispose();
                this.grid = null;
            }
        },
        formatDate(date) {  // date format 변경
            let today = new Date(date);
            let year = today.getFullYear();
            let month = ('0' + (today.getMonth() + 1)).slice(-2);
            let day = ('0' + today.getDate()).slice(-2);
            let dateString = year + '-' + month  + '-' + day;
            // let hours = ('0' + today.getHours()).slice(-2); 
            // let minutes = ('0' + today.getMinutes()).slice(-2);
            // let seconds = ('0' + today.getSeconds()).slice(-2); 
            // let timeString = hours + ':' + minutes  + ':' + seconds;
            return date !== null && date !== '' ? `${dateString}` : '';
        },

        /** list, edit, remove */
        prevList() {
            this.$router.push({ name: 'TestResultMngtSheet' });
        },
        editList() {
            this.$router.push({ name: 'TestResultMngtUpdate' })
        },
        removeList() {
            //this.openPopup('requestDelete');
            this.confirm("삭제하시겠습니까?", () => {
                this.removeResult();
            })
        },
        async removeResult(param) {  // remove result data
            requestOptions.headers['Authorization'] = this.$cookies.get("Authorization");
            let url = '/sendApi/api/testMngt/testResultMngt/testResultTestInfo/delete';
            let payload = { 
                ...param,
                siteMstrId: this.$cookies.get('siteMstrId'),
                testResultMngtSeq: this.testDetail.testResultMngtSeq,
                testType: this.testDetail.testType,
            };

            try {
                await sendPostApi(url, payload);
                //메세지 확인 후 이동
                this.alert("삭제되었습니다",() => {
                    this.$store.dispatch('tabInfo/setSavePage',this.$route.name);
                    this.$router.push({ name: 'TestResultMngtSheet' });
                });
            } catch (error) {
                console.log(error.response.data);
            }
        },
    },
    activated(){
            // keepAlive 재조회 처리
            if(this.$store.getters['tabInfo/getSavePage'].length > 0){
                
                //keepAlive 재조회 처리
                let menuid = this.$store.getters['tabInfo/getCurrentMenuId'];
                let url="/sendApi/api/programMngt/menuChildProgram/list"
                let reSearch = false;
                let param = {"menuMngtId":menuid}; 
                
                // sdave정보가 있는지 체크하여 처리
                sendPostApi(url, param).then((result) => {
                    // 하부 페이지 정보
                    for (let i = 0; i < result.data.dlprogram.length ; i++){
                        // 저장 페이지 정보와 비교
                        for(let j = 0; j < this.$store.getters['tabInfo/getSavePage'].length ; j++){
                            if(result.data.dlprogram[i].routerName == this.$store.getters['tabInfo/getSavePage'][j]){
                                this.$store.dispatch('tabInfo/reMoveSavePage', this.$store.getters['tabInfo/getSavePage'][j]);

                                reSearch = true;
                                break;
                            }
                        }

                        if(reSearch){
                            break;
                        }
                    }

                    if(reSearch){
                        this.$store.dispatch('tabInfo/setSavePage',this.$route.name);
                        this.getTestSubject(this.checklist);
                    }

                }).catch((e) => {
                    // console.log(e);
                    return e.response;
                });
            }
        },
}
</script>

<style>

</style>