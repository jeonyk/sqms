<template>
    <div class="wrap">
      <!-- <router-view/> -->
        <div class="lnb_container on">
            <div class="tab_contents">
                <div class="tab_area">
                    <div class="inner type2">
                        <h2 class="sub_title">심의 위원회 작성
                            <div class="fr" v-if="noDataYn">
                                <button type="button" class="btn btn_md btn_outline btn_darkgray" @click="fn_save()"  :class="{disabled: finlCmpltYn === 'Y'}">저장</button>
                                <button type="button" class="btn btn_md btn_outline btn_gray" @click="$router.push({name: 'ExtCheckMngtSheet'})">이전</button>
                            </div>
                            <div class="fr" v-else>
                                <button type="button" class="btn btn_md btn_outline btn_darkgray" @click="fn_save()" v-if="editYn" :class="{disabled: finlCmpltYn === 'Y'}">저장</button>
                                <button type="button" class="btn btn_md btn_outline btn_darkgray" @click="editYn = true" v-else :class="{disabled: finlCmpltYn === 'Y'}">수정</button>
                                <button type="button" class="btn btn_md btn_outline btn_gray" @click="fn_getDcsnDlbrt()" v-if="editYn">취소</button>
                                <button type="button" class="btn btn_md btn_outline btn_gray" @click="$router.push({name: 'ExtCheckMngtSheet'})" v-else>이전</button>
                            </div>
                        </h2>
                        
                        <div class="button_box">
                            <strong>1. 심의 위원회</strong>
                        </div>

                        <div class="table_normal_list table_write">
                            <table>
                                <caption class="sr_only"></caption>
                                <colgroup>
                                    <col width="15%">
                                    <col width="*">
                                </colgroup>
                                <tbody>   
                                    <tr>
                                        <th><span :class="{emp_red : editYn}">심의 위원회</span></th>
                                        <td v-if="editYn">
                                            <input type="text" id="" class="form_control" v-model="dlbrt.resultDlbrtCmit" maxlength="100" >
                                        </td>
                                        <td v-else>
                                            {{dlbrt.resultDlbrtCmit}}
                                        </td>
                                    </tr>
                                    <tr>
                                        <th><span :class="{emp_red : editYn}">내용</span></th>
                                        <td v-if="editYn">
                                            <textarea class="form_control" v-model="dlbrt.resultDlbrtCmitCn" maxlength="1000" />
                                        </td>
                                        <td v-else>
                                            {{dlbrt.resultDlbrtCmitCn}}
                                        </td>
                                    </tr>
                                    
                                </tbody>
                            </table>
                        </div>

                        <p class="table_message mt20">※ 심의 위원회 관련 자료를 등록하여 주세요.</p>
                        <LstFile    
                            v-bind:lst-file-rst="lstFileRst"
                            v-bind:files="files"
                            v-bind:second-remove-file-id="secondRemoveFileId"
                            v-on:file-changed="fileChanged"
                            v-on:file-removed="fileRemoved"
                            :uploadable="editYn"
                            :downloadable="!editYn"
                            :limit-total-file-size="1024*1024*300"
                            :accept-extn="['pdf', 'ppt', 'pptx', 'xls', 'xlsx', 'doc', 'docx', 'hwp', 'hwpx', 'png', 'gif', 'jpeg', 'jpg', 'bmp', 'txt']"
                            ref="LstFile"
                        /> 
                            <!-- :limit-file-count="20" -->
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import LstFile from '@/pages/common/popup/LstFile'
    import { sendPostApi, sendFileApi , requestFileOptions, requestOptions } from '@/apis/common'
    import { commonFn } from '@/script/commonFn.js'
    import MsgBoxMixins  from '@plugin/mixin/MsgBox.mixins.js'
    import { mapGetters } from 'vuex'

    export default {
        name: 'extrnlChckDlbrtCmit',
        mixins: [MsgBoxMixins],
        computed: {
            ...mapGetters({
                extrnlChckId: 'getExtCheckExtrnlChckId',
            }),
        },
        components: {
            LstFile
        },
        data() {
            return {
                footerBg: 'transparent',
                currentTab: 0, // 기본 current 값 지정 
                tabs: ['My site', 'All sites'],     // tab name
                dlbrt : {                           // 심의위원회 
                    resultDlbrtCmit : '',           // 심의위원회명
                    resultDlbrtCmitCn : '',         // 심의 내용
                    dlbrtFileConnectId : '',        // 심의 첨부파일 ID 
                },
                //파일 추가
                fileConnectId: 0,
                tempFileLst : [],                           //등록된 파일 데이터
                tempFiles : [],                             //등록되지않은 파일 임시데이터
                totalCnt:0,
                totalSize:0,
                bytes:"KB",

                editYn : true,    // 수정 여부
                noDataYn : false, // 기존 데이터 여부 

                lstFileRst : [],          // 파일 리스트   
                files : [],               // 파일 변경 리스트(등록)
                secondRemoveFileId : [],  // 파일 아이디 (삭제)

                finlCmpltYn: 'N',           // 최종완료여부
            }
        },
        mounted() {
            this.fn_getDcsnDlbrt()
        },
        methods: {
            fileChanged(payload) {
                this.files = payload
            },
            fileRemoved(id) {
                this.secondRemoveFileId = id
            },
            async fn_getDcsnDlbrt(){  // 심의위원회 조회
                let url = '/sendApi/api/extrnlChck/extrnlExtrnlChckDcsnDlbrt/View'
                let payload = {
                    extrnlChckId : this.extrnlChckId
                }
                this.lstFileRst = []            // 파일 초기화
                this.files = []                 // 파일 변경 리스트(등록)
                this.secondRemoveFileId = []    // 파일 아이디 (삭제)
                let data = {...this.dlbrt}

                await sendPostApi(url, payload).then((result) => {
                    if(result.status == '200'){
                        data = {...result.data.dmChckDcsnDlbrt}       // 심의위원회 상세정보
                        let files = result.data.dlChckDcsnDlbrtFile  // 심의위원회 첨부파일
                        
                        this.noDataYn = data.resultDlbrtCmit ? false : true   // 기존 데이터 여부

                        if(!this.noDataYn){
                            this.lstFileRst = files
                            this.dlbrt = {...data}
                            this.editYn = false
                        }
                        this.finlCmpltYn = data.finlCmpltYn ? data.finlCmpltYn : 'N'
                    }
                })
            },
            async fn_save(){   // 심의위원회 등록 / 수정
                if(commonFn.methods.isEmpty(this.dlbrt.resultDlbrtCmit)){
                    this.alert("심의 위원회를 입력해주세요")
                    return
                }
                if(commonFn.methods.isEmpty(this.dlbrt.resultDlbrtCmitCn)){
                    this.alert("심의 내용을 입력해주세요")
                    return
                }
                this.confirm('저장하시겠습니까?', async() => {
                    this.dlbrt.dlbrtFileConnectId = 'DLB_'+this.extrnlChckId    // 심의위원회 첨부파일 ID

                    let url = '/sendApi/api/extrnlChck/extrnlExtrnlChckDcsnDlbrt/change'
                    let payload = {
                        'dmChckDcsnDlbrt' : {   // 심의위원회 등록
                            ...this.dlbrt,
                            'extrnlChckId' : this.extrnlChckId,
                            'resultDlbrtCmitYn' : 'Y'  // 등록 여부
                        },   
                    }
                    try {
                        await sendPostApi(url, payload).then(async(result) => {
                            if(result.status == '200'){    
                                //파일 수정 여부 체크
                                if((this.files && this.files.length > 0) || (this.secondRemoveFileId && this.secondRemoveFileId.length > 0)){
                                    let resultData = true;
                                    //파일 추가
                                    if(this.files && this.files.length > 0){
                                        requestFileOptions.headers['Authorization'] = this.$cookies.get("Authorization")
                                        const subResponse = await sendFileApi(this.dlbrt.dlbrtFileConnectId, "ExtCheck", this.files)
                                        if(subResponse.status == '200'){
                                        }
                                        else{
                                            resultData = false;
                                        }
                                    }
                                    //파일 삭제
                                    if(this.secondRemoveFileId && this.secondRemoveFileId.length > 0){
                                        let url = '/sendApi/api/file/fileUnUse';
                                        
                                        let payload = {
                                            fileType : "ExtCheck",
                                            fileChkEduArcvIds : this.secondRemoveFileId,
                                        };

                                        requestOptions.headers['Accept-Language'] = "ko";
                                        requestOptions.headers['Authorization'] = this.$cookies.get("Authorization")

                                        const subResponse = await sendPostApi(url, payload)
                                        if(subResponse.status == '200'){
                                        }
                                        else{
                                            resultData = false;
                                        }
                                    }

                                    if(resultData){
                                        this.alert('저장되었습니다.');
                                        //상세화면 노출
                                        this.fn_getDcsnDlbrt();

                                        // set-keepAlive Activated 
                                        this.$store.dispatch('tabInfo/setSavePage', this.$route.name)
                                        
                                    }
                                    else{
                                        this.alert('파일등록 및 삭제를 실패했습니다.');            
                                    }
                                }else{
                                        this.alert('저장되었습니다.');
                                        this.fn_getDcsnDlbrt();

                                        // set-keepAlive Activated 
                                        this.$store.dispatch('tabInfo/setSavePage', this.$route.name)
                                }
                            }
                        })
                    } catch (error) {
                        this.alert("오류로 인해 저장되지 않았습니다.")
                    }
                })
            }
            
        }
    }
</script>