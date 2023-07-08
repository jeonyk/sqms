<template>
   <div class="wrap">
        <!-- <router-view/> -->
        <div class="lnb_container on">
            <div class="tab_contents">
                <h2 class="sub_title">
                    자료실 수정
                    <div class="fr">
                        <button type="button" class="btn btn_md btn_darkgray btn_outline" v-on:click='sendServerFile'>수정</button>
                        <button type="button" class="btn btn_md btn_darkgray btn_outline">취소</button>
                    </div>
                </h2>
 
                <div class="inner pt10">
                    <div class="table_normal_list table_write mt0">
                    <table>
                        <caption class="sr_only">제목</caption>
                        <colgroup>
                            <col width="160">
                            <col width="*">
                            <col width="160">
                            <col width="*">
                        </colgroup>
                        <tbody>
                            <tr>
                                <th>등록자</th>
                                <td class="">이현대</td>
                                <th>등록일</th>
                                <td class="">2021-11-27</td>
                            </tr>
                            <tr>
                                <th>제목</th>
                                <td colspan="3">
                                <input type="text" class="form_control">
                                </td>
                            </tr>
                            <tr>
                                <th>내용</th>
                                <td colspan="3" rowspan="2">
                                <textarea name="" id="" class="form_control"></textarea>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    </div>
                    <!--
                    <div class="lst_file">
                        <h3>첨부파일 0개 (0.0MB)</h3>
                        <ul>
                            
                            <li><a href="javascript:void(0);"><i class="ico_file file_p_red">인증서.pdf (3.1MB)</i><button type="button" class="delete"></button></a></li>
                            <li><a href="javascript:void(0);"><i class="ico_file file_p_red">사업자등록증.pdf (3.1MB)</i><button type="button" class="delete"></button></a></li>
                       
                        </ul>
                    </div>
                    -->
                    <LstFile 
                        @file-changed="fileChanged"
                    />
                </div>
            </div>
        </div>
   </div>
</template>

<script>
    import LstFile from '@/pages/common/popup/LstFile.vue';
    import { sendFileApi, requestFileOptions } from '../../../apis/common';
    //import axios from 'axios';
    export default {
        name: 'FileTest',
        components: {
            LstFile
        },
        data() {
            return {
                footerBg: 'transparent'
                , files: []
                , fileConnectId : 0
                , fileType : ''
            }
        },
        methods: {
            sendServerFile : async function() {
                requestFileOptions.headers['Authorization'] = this.$cookies.get("Authorization");
                const res_data = await sendFileApi(this.fileConnectId, "QualityImage", this.files).then((result) => {
                    return result.data;
                }).catch((e) => {
                    console.error(e.response.data);
                    //return e.response.data;
                });
                // console.log(res_data);
            },
            fileChanged(payload) {
                this.files = payload
            }
            /*, 
            upload: async function(fileConnectId, fileType){
                if(fileConnectId > 0 && fileType != '') {
                    const formData = new FormData();
                    formData.append("fileConnectId", fileConnectId);
                    formData.append("fileType", fileType);
                    this.files.forEach((file) => formData.append("file", file));
                    console.log(formData);    
                    await axios.post("/sendApi/api/fileUp/qualityImage", formData, {
                        headers: {
                            "Authorization" : this.$cookies.get("Authorization")
                            , "Content-Type": "multipart/form-data",
                        },
                    }).then((res) => console.log(res));
                }
            }
            */
        }
    }
</script>