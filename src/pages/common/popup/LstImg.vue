<!-- LstFile.vue -->
<template>
    <div class="lst_img">
        <div class="button_box">
            <div class="fr" v-show="copyable">
                <button type="button" class="btn btn_sm btn_darkgray" @click="openCopyPop">품질사진 불러오기</button>
            </div>
            <h3 
                v-show="countable"
            >
                첨부파일 {{files.length+lstFileRst.length}}개
            </h3>
        </div>
        <!-- <ul>
            <li v-for="(mngrFileRst, mIndex) in lstFileRst" v-bind:key="mIndex">
                <a href="javascript:void(0);">
                    <i class="ico_file file_p_red">{{mngrFileRst.orgFileName}}</i>
                    <button type="button" class="delete" @click="removeInsertedFile(mIndex)"></button>
                </a>
            </li>
            <li v-for="(file, index) in files" :key="index+'|'">
                <a href="javascript:void(0);">
                    <i class="ico_file file_p_red">{{ file.name }}</i>
                    <button type="button" @click="removeFile(index)" class="delete"></button>
                </a>
            </li>
        </ul> -->
        <ul>
            <li v-for="(mngrFileRst, mIndex) in lstFileRst" v-bind:key="mngrFileRst.sysFileName" :style="setStyle">
                <button type="button" v-if="uploadable" class="delete" @click="removeInsertedFile(mIndex)"></button>
                <!-- <div class="img_wrap" v-if="mngrFileRst.fileQltArcvId != null && mngrFileRst.fileQltArcvId != ''">
                    <p 
                        class="img_area"
                        @click="download(mngrFileRst)"
                    >
                        <img :src="'/sendApi/api/fileCall/getMtMngtImgFile/'+mngrFileRst.fileQltArcvId">
                    </p>
                </div> -->
                <div class="img_wrap" v-if="imageUrl(mngrFileRst)">
                    <p
                        class="img_area"
                        @click="download(mngrFileRst)"
                    >
                        <img :src="imageUrl(mngrFileRst)" />
                    </p>
                </div>
                <a href="javascript:void(0);" @click="download(mngrFileRst)">
                    <i class="ico_file" :class="fn_getFileIcons(mngrFileRst.orgFileName)">{{mngrFileRst.orgFileName}}</i>
                </a>
            </li>
            <li v-for="(cFile, cIndex) in copiedFiles" :key="`c-${cIndex}`" :style="setStyle">
                <button type="button"  @click="removeFile(cIndex,'copy')" class="delete"></button>
                <div class="img_wrap" @click="download(cFile)">
                    <p class="img_area">
                        <img :src="imageUrl(cFile)">
                    </p>
                </div>
                <a href="javascript:void(0);" @click="download(cFile)">
                    <i class="ico_file" :class="fn_getFileIcons(cFile.orgFileName)">{{ cFile.orgFileName }}</i>
                </a>
            </li>
            <li v-for="(file, fIndex) in files" :key="`f-${fIndex}`" :style="setStyle">
                <button type="button"  @click="removeFile(fIndex,'new')" class="delete"></button>
                <div class="img_wrap" @click="downloadFileObj(file)">
                    <p class="img_area">
                        <img :src="getObjectUrl(file)">
                    </p>
                </div>
                <a href="javascript:void(0);" @click="downloadFileObj(file)">
                    <i class="ico_file" :class="fn_getFileIcons(file.name)">{{ file.name }}</i>
                </a>
            </li>
        </ul>
        <div 
            v-show="uploadable"
            class="file_upload_container"
            :style="componentStyle"
        > 
            <div class="file_upload">
                <!-- <input id="input_copy2" class="upload_name form_control" value="" accept="image/*" placeholder="여기로 파일을 끌어놓으세요." @dragleave="fileDragOut" @dragover="fileDragIn" @drop="handleFileDrop" v-bind:style="{ 'background-color': color }">
                <input type="file" id="input_upload_copy2" class="upload_hidden" name="file-input" multiple="True" @change="handleFileInput">
                <label for="input_upload_copy2" class="btn btn_sm btn_darkgray btn_addimg">이미지 첨부</label> -->
                <input 
                    id="input_copy2" 
                    class="upload_name form_control icon_image" 
                    :class="isActive ? 'on' : ''" 
                    value="" 
                    :accept="!allShowable && ( acceptExtn && acceptExtn.length > 0) ? acceptExtn.map(itm => `.${itm.replaceAll('.','')}`).join(', ') : 'image/*'"
                    :placeholder="_placeholder" 
                    @dragleave="fileDragOut" 
                    @dragover="fileDragIn" 
                    @drop="handleFileDrop"
                    @click="handleClickTrigger"
                />
                <!-- accept="image/*" -->
                <input 
                    type="file" 
                    id="input_upload_copy2" 
                    class="upload_hidden" 
                    name="file-input2" 
                    :accept="!allShowable && ( acceptExtn && acceptExtn.length > 0) ? acceptExtn.map(itm => `.${itm.replaceAll('.','')}`).join(', ') : 'image/*'"
                    :multiple="limitFileCount ? limitFileCount > 1 : true" 
                    @change="handleFileInput"
                />
            </div>
        </div>
        <QltyPicturePop :ref-id="fileType" @file-copied="fileCopied" :popup-style="popupStyle" @pop-closed="popClosed"/>
    </div>
</template>
<script>
import MsgBoxMixins  from '@plugin/mixin/MsgBox.mixins.js'
import authCheckMixns  from '@plugin/mixin/AuthCheck.js'
import commonUtilMixins from '@plugin/mixin/CommonUtil.js'
import QltyPicturePop from '@/pages/common/popup/QltyPicturePop.vue'

import axios from 'axios'
import _ from 'lodash'

   export default {
      name: "LstImg",
      mixins: [MsgBoxMixins, authCheckMixns, commonUtilMixins],
      components: {
        QltyPicturePop,
      },
      data() {
         return {
            // color: '#f9f9f9',
            fileSize:0,
            fileViewSize:'0 MB',
            fileId : '',

            isActive: false,
            // copiedFileIds:[],
            // copiedFiles:[],
            popupStyle:'',      //품질사진 불러오기 팝업 스타일변경
            componentStyle:'',  //LstImg 스타일변경
         } 
      },
      props:  {
        files: { //신규등록하는 파일 리스트
            type: Array
            , default : () => {
                return [];
            }
        },
        lstFileRst: { //db에 등록된 리스트
            type: Array
            , default : () => {
                return [];
            }
        },
        copiedFileIds:{ //가져온 품질사진 id array
            type: Array
            , default : () => {
                return [];
            }
        },
        copiedFiles:{   //가져온 품질사진 files
            type: Array
            , default : () => {
                return [];
            }
        },
        secondRemoveFileId: { //db에 등록된 리스트 중 delete 용
            type: Array
            , default : () => {
                return [];
            }
        },

        /** 추가/제외 확장자 목록, 우선순위는 제외부터 확인합니다.*/
        /** Input에 제외할 확장자 리스트(Array 형식으로 넣어주세요) '.'여부 상관없습니다. */
        exceptExtn: {
            type: Array,
            default: () => {
                return []
            }
        },
        /** Input에 승인된 확장자 리스트 '.'여부 상관없습니다. */
        acceptExtn: {
            type: Array,
            default: () => {
                return []
            }
        },
        /** Limit-file-size : null - unlimited // byte 단위 */
        limitFileSize: {
            type: [Number, String],
            default: null,
            validator: function (value) {
                return Number(value) > 0
            }
        },
        /** limit-total-file-size: null -unlimited // byte 단위 */
        limitTotalFileSize: {
            type: [Number, String],
            default: null,
            validator: function (value) {
                return Number(value) > 0
            }
        },
        /** limit-file-count : null - unlimited */
        limitFileCount: {
            type: [Number, String],
            default: null,
            validator: function (value) {
                return Number(value) > 0
            }
        },
        /** limit-total-file-count : null -unlimited */
        limitTotalFileCount: {
            type: [Number, String],
            default: null,
            validator: function (value) {
                return Number(value) > 0
            },
        },

        // new updated props
        uploadable: {
            type: Boolean,
            default: true
        },
        downloadable: {
            type: Boolean,
            default: false
        },
        downloadKey: {
            type: String,
            default: ''
        },
        countable: {
            type: Boolean,
            default: false
        },

        /** accept 제한 조건 해제 */
        allShowable: {
            type: Boolean,
            default: false,
        },
        /** 품질사진 불러오기 버튼 유무 */
        copyable:{
            type: Boolean,
            default: true
        },
        /** 품질사진 팝업 id값 */
        fileType:{
            type: String,
            default: ''
        },
        /** 부모 component에서 가져오는 style값 */
        setStyle:{
            type: String,
            default: ''
        },

        /**품질사진 데이터 비우기 여부
         * 부모 컴포넌트에 copiedFiles가 bind되어있지않는 경우에만 사용하세요
         */
        resetCopyYn:{
            type: Boolean,
            default: false
        },

        // tempFileLst:{ //현장정보에서 등록한 품질관리자용 파일리스트 읽어들이는용
        //       type: Array
        //     , default : () => {
        //         return [];
        //     }
        // },


        /** Placeholder */
        placeholder: {
            Type: String,
            default: null,
        }
      }, 
      computed: {
        _placeholder: {
            get: function () {
                return _.isEmpty(this.placeholder) 
                    // ? `여기로 이미지 파일을 끌어놓으세요. 최대 ${this.limitTotalFileSize ? this.fn_calculateFileSize(this.limitTotalFileSize) : '300MB'} 제한`
                    ? '여기로 이미지 파일을 끌어놓으세요. 최대' + (this.limitTotalFileSize ? this.fn_calculateFileSize(this.limitTotalFileSize) : '300MB') + '제한'
                    : this.placeholder
            }
        }
      },
      watch: {
          files: {
            handler () {
                // console.log(this.files);
                let param ={
                    'file':this.files,
                    'copy':this.copiedFiles,
                    'copyIds':this.copiedFileIds,
                };
                console.log('watch:files',param);

                //품질사진, 파일탐색기에서 불러오는 파일 return
                this.$emit('file-changed', param)
            } ,
            deep: true,
          },
          copiedFiles:{
            handler () {
                let param ={
                    'copy':this.copiedFiles,
                    'copyIds':this.copiedFileIds,
                };

                // 품질사진만 return
                this.$emit('copied-File-changed', param)
            } ,
            deep: true,
          },
          secondRemoveFileId:{
            handler () {
                // console.log(this.secondRemoveFileId);
                this.$emit('file-removed', this.secondRemoveFileId)
                // this.fileSizeRefresh();
            } ,
            deep: true
          },
          resetCopyYn:function(){
            console.log('reset',this.copiedFileIds,this.copiedFiles);
            if(this.resetCopyYn&&(this.copiedFileIds != null && this.copiedFileIds.length != 0)){
                this.copiedFileIds.splice(0,this.copiedFileIds.length);
            }
            if(this.resetCopyYn&&(this.copiedFiles != null && this.copiedFiles.length != 0)){
                this.copiedFiles.splice(0,this.copiedFiles.length);
            }
            this.$emit('return-reset',true);
          }
        //   copiedFileIds: function(){
        //     console.log('here');
        //     if(this.copiedFileIds == null || this.copiedFileIds.length == 0 ){
        //         // console.log('here');
        //         this.copiedFiles = [];
        //     }
        //   }
        //   lstFileRst: function(newValue){
        //     if(this.mounted && newValue.length > 0){
        //         // console.log(this.lstFileRst);
        //         this.mounted = false;
        //         if(this.countable) this.fileSizeRefresh();
        //     }
        //   }
      },
      created(){
        //   console.log(this.lstFileRst.length);
        //   console.log(this.files);
        //   console.log(this.secondRemoveFileId);
        // this.fileSizeRefresh();
      },
      methods: {
            // file drag & drop event
            handleFileDrop(e) { // 파일 드래그시 리스트에 파일 추가
                e.preventDefault();
                let droppedFiles = e.dataTransfer.files;
                if(!droppedFiles) return;
                // this tip, convert FileList to array, credit: https://www.smashingmagazine.com/2018/01/drag-drop-file-uploader-vanilla-js/
                ([...droppedFiles]).forEach(f => {
                    // if(this.fileCheck(f, this.files)) this.files.push(f);
                    if(f.type.startsWith('image/')) {
                        if(this.fileCheck(f, this.files)) this.files.push(f);
                    }
                });
                // this.color="#f9f9f9";
                this.isActive = false
                // this.fileSizeRefresh();


                // e.preventDefault();
                // let droppedFiles = e.dataTransfer.files;
                // if(!droppedFiles) return;

                // ([...droppedFiles]).forEach(f => {
                //     if(this.fileCheck(f, this.files)) {
                //         this.files.push({})
                //     }
                // })

                // let num = -1;
                // for (let i = 0; i < droppedFiles.length; i++) {
                //     this.files = [
                //         ...this.files,
                //         //이미지 업로드
                //         {
                //             //실제 파일
                //             file: droppedFiles[i],
                //             //이미지 프리뷰
                //             preview: URL.createObjectURL(droppedFiles[i]),
                //             //삭제및 관리를 위한 number
                //             number: i + this.uploadImageIndex,
                //             //파일명
                //             filename: droppedFiles[i].name
                //         }
                //     ];
                //     num = i;
                // }
                // this.uploadImageIndex = this.uploadImageIndex + num + 1;
                // this.previewColor="#f9f9f9"
            },
            handleFileInput(e) { // 버튼 클릭시 리스트에 파일 추가
                e.preventDefault();
                let files = e.target.files;
                files = e.target.files;
                
                if(!files) return;

                // this tip, convert FileList to array, credit: https://www.smashingmagazine.com/2018/01/drag-drop-file-uploader-vanilla-js/
                ([...files]).forEach(f => {
                    if(f.type.startsWith('image/')) {
                        if(this.fileCheck(f, this.files)) this.files.push(f);
                    }
                });
                // this.fileSizeRefresh();

                // e.preventDefault();
                // let previewFiles = e.target.files;
                // if(!previewFiles) return;

                // let num = -1;
                // for (let i = 0; i < previewFiles.length; i++) {
                //     this.files = [
                //         ...this.files,
                //         //이미지 업로드
                //         {
                //             //실제 파일
                //             file: previewFiles[i],
                //             //이미지 프리뷰
                //             preview: URL.createObjectURL(previewFiles[i]),
                //             //삭제및 관리를 위한 number
                //             number: i + this.uploadImageIndex,
                //             //파일명
                //             filename: previewFiles[i].name
                //         }
                //     ];
                //     num = i;
                // }
                // this.uploadImageIndex = this.uploadImageIndex + num + 1;
            },
            handleClickTrigger(e) { // input click trigger
                e.preventDefault();
                e.target.nextSibling.click();
            },
            removeInsertedFile(fIndex){ // 이미 등록된 리스트 파일삭제
                // console.log(this.lstFileRst[fIndex].fileComArcvId);

                const fileInfo = this.lstFileRst[fIndex]
                // const fileId = fileInfo.fileId
                //     || fileInfo.fileChkBsArcvId 
                //     || fileInfo.fileChkEduArcvId
                //     || fileInfo.fileComArcvId
                //     || fileInfo.fileQltArcvId
                //     || fileInfo.fileQltImgArcvId


                const fileId = this.getFileId(fileInfo)

                if (fileId) {
                    this.secondRemoveFileId.push(fileId)
                    this.lstFileRst.splice(fIndex, 1)
                }
                
                /** 기존 방법 */
                // this.fileId = '';
                // if(this.lstFileRst[fIndex].fileComArcvId!=null && this.lstFileRst[fIndex].fileComArcvId!=''){
                //     this.fileId = this.lstFileRst[fIndex].fileComArcvId;
                // }else if(this.lstFileRst[fIndex].fileQltArcvId!=null && this.lstFileRst[fIndex].fileQltArcvId!=''){
                //     this.fileId = this.lstFileRst[fIndex].fileQltArcvId;
                // }
                // this.secondRemoveFileId.push(this.fileId);
                // this.lstFileRst.splice(fIndex,1);


                // this.fileSizeRefresh();
                // console.log(this.secondRemoveFileId);
            },
            removeFile(fileKey,type){ // 리스트 파일삭제
                if(type == 'new'){
                    this.files.splice(fileKey, 1);
                }else if(type == 'copy'){
                    this.copiedFiles.splice(fileKey, 1);
                    this.copiedFileIds.splice(fileKey,1);
                }
                // this.fileSizeRefresh();
            },
            fileDragIn(){ // 드래그 할 경우 bg 컬러 변경
                // this.color="#fff"
                this.isActive = true
            },
            fileDragOut(){ // 드래그 해제 할 경우 bg 컬러 변경
                // this.color="#f9f9f9"
                this.isActive = false
            },
            fileCheck(fileInput, fileData) {
                let result = true
                
                // AsIs checked
                // if(fileData.length == 0) return true
                // fileData.forEach(data => {
                //     if(fileInput.name == data.name && fileInput.size == data.size && fileInput.lastModified == data.lastModified) {
                //         return false
                //     }
                // });
                const validateCur   = fileData.some(data => {
                                            if (   fileInput.name == data.name 
                                                && fileInput.size == data.size 
                                                && fileInput.lastModified == data.lastModified) {
                                                return true
                                            }
                                        })
                // const validateRst   = this.lstFileRst.some(data => {
                //                                 if () 
                //                             })

                if (validateCur) return false

                // additional options check
                const extn = fileInput.name.split('.').reverse()[0]
                // exceptExtn
                if (this.exceptExtn.length > 0 ) {
                    if (this.exceptExtn.map(item => String(item).replace('.','').toLowerCase()).includes(extn)) {
                        // this.alert(`파일은 '${this.exceptExtn.map(item => String(item).replace('.','')).join(', ')}'은 허용하지 않습니다.`)
                        this.alert("파일은 '" + this.exceptExtn.map(item => String(item).replace('.','')).join(', ') + "'은 허용하지 않습니다.")
                        return false
                    }
                }
                // acceptExtn
                if (this.acceptExtn.length > 0) {
                    if (!this.acceptExtn.map(item => String(item).replace('.','').toLowerCase()).includes(extn)) {
                        // this.alert(`파일은 '${this.acceptExtn.map(item => String(item).replace('.','')).join(', ')}'만 허용합니다.`)
                        this.alert("파일은 '" + this.acceptExtn.map(item => String(item).replace('.','')).join(', ') + "'만 허용합니다.")
                        return false
                    }
                }
                // limitFileCount
                if (this.limitFileCount) {
                    if (Number(this.limitFileCount) <= fileData.length) {
                        // this.alert(`파일은 최대 ${this.limitFileCount}개까지 등록가능합니다.`)
                        this.alert("파일은 최대 " + this.limitFileCount + "개까지 등록가능합니다.")
                        return false
                    }
                }
                // limitTotalFileCount
                if (this.limitTotalFileCount) {
                    if (Number(this.limitTotalFileCount) <= (fileData.length + this.lstFileRst.length)) {
                        // this.alert(`파일은 총 ${this.limitTotalFileCount}개까지 등록가능합니다.`)
                        this.alert("파일은 총 " + this.limitTotalFileCount + "개까지 등록가능합니다.")
                        return false
                    }
                }
                // limitTotalFileSize
                if (this.limitTotalFileSize) {
                    if (Number(this.limitTotalFileSize) <= this.fileSize + fileInput.size) {
                        // this.alert(`파일은 최대 ${this.fn_calculateFileSize(this.limitTotalFileSize)}까지 등록가능합니다.`)
                        this.alert("파일은 최대 " + this.fn_calculateFileSize(this.limitTotalFileSize) + "까지 등록가능합니다.")
                        return false
                    }
                }
                //limitFileSize
                if (this.limitFileSize) {
                    if (Number(this.limitFileSize) < fileInput.size) {
                        // this.alert(`파일은 파일 당 ${this.fn_calculateFileSize(this.limitFileSize)}까지 등록가능합니다.`)
                        this.alert("파일은 파일 당 " + this.fn_calculateFileSize(this.limitFileSize) + "까지 등록가능합니다.")
                        return false
                    }
                }

                return result
            },
            formatBytes(bytes, decimals = 0) {
                if (bytes === 0) return '0 MB';
                const k = 1024;
                const dm = decimals < 0 ? 0 : decimals;
                const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
                const i = Math.floor(Math.log(bytes) / Math.log(k));
                return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
            },
            fn_calculateFileSize: function (bytes) {
                const _bytes = parseInt(bytes)
                const standard = ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB']
                const e = Math.floor(Math.log(_bytes)/Math.log(1024))

                if (e == "-Infinity") {
                    return `0 ${standard[0]}`
                } else {
                    return `${_bytes/Math.pow(1024, Math.floor(e)).toFixed(2)} ${standard[e]}`
                }
            },
            // fileSizeRefresh() {
            //     this.fileSize = 0;
            //     this.fileViewSize = '';
            //     if(this.files.length == 0 && this.lstFileRst.length == 0) {
            //         console.log('end');
            //         this.fileViewSize = '0 MB';
            //     }else {
            //         if(this.lstFileRst.length>0){
            //             let temp = [];
            //             for(var i = 0; i<this.lstFileRst.length; i++ ){
            //                 if(typeof(this.secondRemoveFileId) != 'undefined' && !this.secondRemoveFileId.includes(this.lstFileRst[i].fileComArcvId)){
            //                     temp.push(this.lstFileRst[i]);
            //                     this.fileSize += parseInt(this.lstFileRst[i].fileSize);
            //                 }
            //             }
            //         }
            //         this.files.forEach(data => {
            //             this.fileSize += data.size;
            //         });
            //         this.fileViewSize = this.formatBytes(this.fileSize, 2);
            //     }
            // },
            getObjectUrl(object) {
                return URL.createObjectURL(object)
            },
            imageUrl: function (fileInfo) {
                const defaultUrl = '/sendApi/api/fileCall'
                let addedUrl = ''

                if (fileInfo.fileQltImgArcvId) {
                    addedUrl = `/getQltImgFile/${fileInfo.fileQltImgArcvId}`
                }
                else if (fileInfo.fileComArcvId) {
                    addedUrl = `/getSiteInfoImgFile/${fileInfo.fileComArcvId}`
                }
                else if (fileInfo.fileQltArcvId) {
                    addedUrl = `/getMtMngtImgFile/${fileInfo.fileQltArcvId}`
                } 
                else if (fileInfo.fileChkEduArcvId) {
                    addedUrl = `/getSelfQltyChkImgFile/${fileInfo.fileChkEduArcvId}`
                } 
                else if (fileInfo.fileChkBsArcvId) {
                    addedUrl = `/getBsChkImgFile/${fileInfo.fileChkBsArcvId}`
                } 
                else {
                    return null
                }

                return defaultUrl + addedUrl
            },
            download: function(fileInfo) {
                // downloadable
                if(!this.downloadable) return
                if(!this.checkUser(this.$store.getters['auth/getUserId'], 'down')) {
                    this.alert('다운로드 권한이 없습니다.')
                    return
                }

                const fileId = this.getFileId(fileInfo)

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
                    if (response.status === 200) {
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
                    } else {
                        throw new Error('imgSingleDownload')
                    }
                }).catch(() => {
                    // console.error(error)
                    // throw new Error(error)
                    this.alert('다운로드에 실패했습니다.')
                })
            },
            downloadFileObj (fileObj) {

                if(!this.downloadable) return
                if(!this.checkUser(this.$store.getters['auth/getUserId'], 'down')) {
                    this.alert('다운로드 권한이 없습니다.')
                    return
                }

                if (typeof window.navigator.msSaveBlob !== 'undefined') {
                    window.navigator.msSaveOrOpenBlob(fileObj, fileObj.name)
                } else {
                    const link = document.createElement('a')
                    const objectUrl = encodeURIComponent(fileObj)
    
                    link.style.cssText = 'display:none'
                    link.href = objectUrl
                    link.setAttribute('download', fileObj.name)
    
                    if (typeof link.download === 'undefined') {
                        link.setAttribute('target', '_blank')
                    }
    
                    document.body.appendChild(link)
                    link.click()
                    link.remove()
                    window.URL.revokeObjectURL(objectUrl)

                }
            },
            getFileId (fileObj) {
                return fileObj.fileId
                    || fileObj.fileChkBsArcvId 
                    || fileObj.fileChkEduArcvId
                    || fileObj.fileComArcvId
                    || fileObj.fileQltArcvId
                    || fileObj.fileQltImgArcvId
            },
            openCopyPop:function(){ //품질사진 팝업 띄우기
                if(this.fileType.indexOf('Popup')>=0){
                    this.componentStyle = 'height:800px;';
                    this.popupStyle = 'height:700px;';
                }
                this.$root.$emit('bv::show::modal', this.fileType);
            },
            fileCopied:function(file){  //품질사진에서 등록버튼 클릭시 이벤트
                for(var i = 0 ; i<file.length; i++){
                    console.log(file[i].fileQltImgArcvId);
                    if(typeof(this.copiedFileIds) != 'undefined' && !this.copiedFileIds.includes(file[i].fileQltImgArcvId)){
                        this.copiedFiles.push(file[i]);
                        this.copiedFileIds.push(file[i].fileQltImgArcvId);
                    }
                }
                let param ={
                    'file':this.files,
                    'copy':this.copiedFiles,
                    'copyIds':this.copiedFileIds,
                };
                console.log('fileCopied',param);
                this.$emit('file-changed', param);
                this.$emit('copied-file-changed', param);
            },
            popClosed:function(){   //품질사진 팝업 닫을때 css 초기화
                this.popupStyle=''; 
                this.componentStyle='';
            }
      }
   };
</script>