<template>
    <b-modal
        :id="refId"
        v-bind:title="title"
        hide-backdrop
        no-close-on-backdrop
        static
        size="lg"
        footer-bg-variant="transparent"
        @shown="showPop"
        @hidden="close"
        >
        <div class="pop_container" v-if="title=='사진 업로드'">
            <LstImg
                v-bind:lst-file-rst="lstImgRst"
                v-bind:files="img"
                @file-changed="imageChanged"
                @copied-file-changed="copiedImageChanged"
                @file-removed="imageRemoved"
                :file-type="'crckPopupQltyPicturePop'"
                :copied-file-ids="copiedFileIds"
                :copied-files="copiedFiles"
                :set-style="'margin: 0 5px 5px 0;'"
            />
        </div>
        <div class="pop_container" v-else>
            <div class="lst_img">
                <ul>
                    <li v-for="(mngrImgRst, mIndex) in lstImgRst" v-bind:key="mIndex">
                        <div class="img_wrap" v-if="mngrImgRst.fileQltArcvId != null && mngrImgRst.fileQltArcvId != ''">
                        <p 
                            class="img_area"
                            @click="download(mngrImgRst)"
                        >
                            <img :src="'/sendApi/api/fileCall/getMtMngtImgFile/'+mngrImgRst.fileQltArcvId">
                        </p>
                        </div>
                        <a href="javascript:void(0);" @click="download(mngrImgRst)">
                            <i class="ico_file" :class="fn_getFileIcons(mngrImgRst.orgFileName)">{{mngrImgRst.orgFileName}}</i>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
        <template #modal-footer>
            <b-button v-if="title=='사진 업로드'"
            class="btn btn_lg btn_outline btn_blue"
            @click="saveImageChk"
            >
            등록
            </b-button>
            <b-button
            class="btn btn_lg btn_outline btn_darkgray"
            @click="$bvModal.hide(refId)"
            >
            닫기
            </b-button>
        </template>
        <!-- @file-removed="imageRemoved" -->
    </b-modal>
</template>

<script>
import LstImg from '@/pages/common/popup/LstImg'
import { sendPostApi, requestOptions } from '../../../apis/common';
import axios from 'axios'
import commonUtilMixins from '@plugin/mixin/CommonUtil.js'
import _ from 'lodash'

    export default{
        name: 'CrackPhotoWritePop',
        mixins: [commonUtilMixins],
        components:{
            LstImg,

        },
        data(){
            return{
                title :'',
                img: [],
                lstImgRst:[],
                secondRemoveImgId:[],
                copiedFileIds : [],
                copiedFiles:[],
            }    
        },
        props: {
            exFiles:{
                type : Object,
                default : function() {
                    return {}
                }
            },
            refId:{
                type:String,
                default:'CrackPhotoWritePop',
            }
        },
        methods: {
            showPop: async function(){
                this.title = '사진 업로드';
                if(this.exFiles && !this.exFiles.writeYn){
                    this.title = '사진 보기';
                }

                if((typeof(this.exFiles.lstImgRst)=='undefined'||this.exFiles.lstImgRst.length==0) && (typeof(this.exFiles.img)=='undefined'||this.exFiles.img.length==0) && (typeof(this.exFiles.copiedFileIds)=='undefined'||this.exFiles.copiedFileIds.length==0)){
                    let url = '/sendApi/api/file/upFileList';
                    let param = {
                        fileType : "CrackMngt",
                        fileConnectId : this.exFiles.fileConnectId,
                    };
                    requestOptions.headers['Accept-Language'] = "ko";
                    requestOptions.headers['Authorization'] = this.$cookies.get("Authorization");
                    const imgRst = await sendPostApi(url, param).then((result) => {
                        return result.data;
                    }).catch((e) => {
                        // console.log(e);
                        return e.response.data;
                    });
                    // console.log(imgRst.data);
                    this.lstImgRst = _.cloneDeep(imgRst.data);
                    // console.log('exFiles',this.exFiles);
                    this.copiedFileIds = _.cloneDeep(this.exFiles.copiedFileIds);
                    this.copiedFiles = _.cloneDeep(this.exFiles.copiedFiles);
                    this.img = _.cloneDeep(this.exFiles.img);
                    this.secondRemoveImgId = this.exFiles.secondRemoveImgId;
                    // console.log('copiedFileIds',this.copiedFileIds);
                    // console.log('copiedFiles',this.copiedFiles);
                }else{//파일리스트가 있을경우
                    this.lstImgRst = _.cloneDeep(this.exFiles.lstImgRst);
                    // console.log('exFiles',this.exFiles);
                    this.copiedFileIds = _.cloneDeep(this.exFiles.copiedFileIds);
                    this.copiedFiles = _.cloneDeep(this.exFiles.copiedFiles);
                    this.img = _.cloneDeep(this.exFiles.img);
                    this.secondRemoveImgId = this.exFiles.secondRemoveImgId;
                    // console.log('copiedFileIds',this.copiedFileIds);
                    // console.log('copiedFiles',this.copiedFiles);
                    // console.log(this.connectId);
                }
            },
            saveImageChk: async function(){
                this.saveImage();
            },
            saveImage: function(){
                let insertFile = {
                    'img':this.img,
                    'lstImgRst':this.lstImgRst,
                    'secondRemoveImgId':this.secondRemoveImgId,
                    'copiedFileIds':this.copiedFileIds,
                    'copiedFiles':this.copiedFiles,
                };
                // console.log(insertFile);

                this.$emit('file-insert',insertFile);
            },
            imageChanged(payload){
                this.img = payload.file;
                // this.copiedFileIds = payload.copyIds;
                // this.copiedFiles = payload.copy;
                // console.log('copiedFiles',this.copiedFiles);
                // this.img = payload;
            },
            copiedImageChanged(payload){
                this.copiedFileIds = payload.copyIds;
                this.copiedFiles = payload.copy;
                // console.log('copiedFiles',this.copiedFiles);
            },
            imageRemoved(id) {
                this.secondRemoveImgId=id;
                // console.log("fileRemoved"+this.secondRemoveImgId);
            },
            download: function(fileInfo) {
                // downloadable
                // console.log(this.downloadable);
                // if(!this.downloadable) return;

                const fileId = fileInfo.fileId
                    || fileInfo.fileChkBsArcvId 
                    || fileInfo.fileChkEduArcvId
                    || fileInfo.fileComArcvId
                    || fileInfo.fileQltArcvId
                    || fileInfo.fileQltImgArcvId

                const url = '/sendApi/api/file/singleFileDownload'

                const payload = {
                    fileId: fileId
                }

                axios.post(url, payload, {
                    headers: {
                        'Accept-Language': 'ko',
                        'Authorization': this.$cookies.get("Authorization"),
                    },
                    responseType: 'blob'
                }).then(response => {
                    const blob = new Blob([response.data])
                    const fileName = fileInfo.orgFileName

                    // Internet Explorer
                    if (typeof window.navigator.msSaveBlob !== 'undefined') {
                        window.navigator.msSaveOrOpenBlob(blob, fileName)
                    // Other Browsers
                    } else {
                        const objectUrl = window.URL.createObjectURL(blob);
                        const link = document.createElement('a')

                        link.style.cssText = 'display:none'
                        link.href = objectUrl
                        link.setAttribute('download', fileName)

                        if (typeof link.download === 'undefined') {
                            link.setAttribute('target', '_blank')
                        }

                        document.body.appendChild(link)
                        link.click()
                        link.remove()
                        window.URL.revokeObjectURL(objectUrl)

                    }
                }).catch(error => {
                    console.error(error)
                    throw new Error(error)
                })
            },
            close(){
                // 초기화
                this.lstImgRst = [];
                this.img = [];
                this.copiedFileIds = [];
                this.copiedFiles = [];
            }
        },
    }
</script>