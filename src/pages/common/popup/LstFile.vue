<!-- LstFile.vue -->
<template>
    <div class="lst_file">
        <h3>첨부파일 {{files.length+lstFileRst.length}}개 ({{fileViewSize}})</h3>
        <ul>
            <li v-for="(mngrFileRst, mIndex) in lstFileRst" v-bind:key="mngrFileRst.sysFileName">
                <a href="javascript:void(0);">
                    <i 
                        class="ico_file"
                        :class="fn_getFileIcons(mngrFileRst.orgFileName)"
                        @click="download(mngrFileRst)"
                    >
                        {{mngrFileRst.orgFileName}}
                    </i>
                    <button type="button" v-if="uploadable" class="delete" @click="removeInsertedFile(mIndex)"></button>
                </a>
            </li>
            <li v-for="(file, index) in files" :key="index">
                <a href="javascript:void(0);">
                    <i class="ico_file" :class="fn_getFileIcons(file.name)" @click="downloadFileObj(file)">{{ file.name }}</i>
                    <button  type="button" @click="removeFile(index)" class="delete"></button>
                </a>
            </li>
        </ul>
        <div 
            v-show="uploadable"
            class="file_upload_container"
        > 
            <div class="file_upload">
                <!-- <input id="input_copy" class="upload_name form_control" value="" placeholder="여기로 파일을 끌어놓으세요." @dragleave="fileDragOut" @dragover="fileDragIn" @drop="handleFileDrop" v-bind:style="{ 'background-color': color }">
                <input type="file" id="input_upload_copy" class="upload_hidden" name="file-input" multiple="True" @change="handleFileInput">
                <label for="input_upload_copy" class="btn btn_sm btn_darkgray btn_addfile">파일 첨부</label> -->

                <input 
                    id="input_copy" 
                    class="upload_name form_control" 
                    :class="isActive ? 'on' : ''" 
                    value="" 
                    :accept="!allShowable && ( acceptExtn && acceptExtn.length > 0) ? acceptExtn.map(itm => `.${itm.replaceAll('.','')}`).join(', ') : null"
                    :placeholder="_placeholder"
                    @dragleave="fileDragOut" 
                    @dragover="fileDragIn" 
                    @drop="handleFileDrop"
                    @click="handleClickTrigger"
                />
                <input 
                    type="file" 
                    id="input_upload_copy" 
                    class="upload_hidden" 
                    name="file-input" 
                    :accept="!allShowable && ( acceptExtn && acceptExtn.length > 0) ? acceptExtn.map(itm => `.${itm.replaceAll('.','')}`).join(', ') : null"
                    :multiple="limitFileCount ? limitFileCount > 1 : true" 
                    @change="handleFileInput"
                />
            </div>
        </div>
    </div>
</template>
<script>

import axios from 'axios'
import MsgBoxMixins  from '@plugin/mixin/MsgBox.mixins.js'
import authCheckMixns  from '@plugin/mixin/AuthCheck.js'
import commonUtilMixins from '@plugin/mixin/CommonUtil.js'

import _ from 'lodash'

   export default {
      name: "LstFile",
      mixins: [MsgBoxMixins, authCheckMixns, commonUtilMixins],
      data() {
         return {
            // color: '#f9f9f9',
            fileSize:0,
            fileViewSize:'0 MB',
            fileId : '',
            // fileType : '',
            mounted : false,

            isActive: false,
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
        /** upload 가능 여부 */
        uploadable: {
            type: Boolean,
            default: true
        },
        /** download 가능 여부 */
        downloadable: {
            type: Boolean,
            default: false
        },
        /** 검측 동영상(단일) 전용 */
        fileType: {
            type:String,
            default: ''
        },
        limitFileSizeStr: {
            type:String,
            default: ''
        },

        /** accept 제한 조건 해제 */
        allShowable: {
            type: Boolean,
            default: false,
        },
        // downloadKey: {
        //     type: String,
        //     default: ''
        // }
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
                    // ? `여기로 파일을 끌어놓으세요. 최대 ${this.limitTotalFileSize ? this.fn_calculateFileSize(this.limitTotalFileSize) : '300MB'} 제한`
                    ? '여기로 파일을 끌어놓으세요. 최대' + (this.limitTotalFileSize ? this.fn_calculateFileSize(this.limitTotalFileSize) : '300MB') + '제한'
                    : this.placeholder
            }
        }
      },
      watch: {
          files: {
            handler () {
                // console.log(this.files);
                this.$emit('file-changed', this.files)
                this.fileSizeRefresh();
            } ,
            deep: true
          },
          secondRemoveFileId:{
            handler () {
                // console.log(this.secondRemoveFileId);
                this.$emit('file-removed', this.secondRemoveFileId)
                this.fileSizeRefresh();
            } ,
            deep: true
          },
          lstFileRst: function(newValue){
            // if(this.mounted && newValue.length > 0){
            //     // console.log(this.lstFileRst);
            //     this.mounted = false;
            //     // if(this.lstFileRst[0].fileComArcvId != '' && this.lstFileRst[0].fileComArcvId != null){
            //     //     this.fileType = 'fileComArcvId';
            //     // }else if(this.lstFileRst[0].fileQltArcvId != '' && this.lstFileRst[0].fileQltArcvId != null){
            //     //     this.fileType = 'fileQltArcvId';
            //     // }else if(this.lstFileRst[0].fileChkEduArcvId != null && this.lstFileRst[0].fileChkEduArcvId != '' ) {
            //     //     this.fileType = 'fileChkEduArcvId'
            //     // }
            //     // console.log(this.fileType);
            //     this.fileSizeRefresh();
            // }

            if (newValue && newValue.length > 0) {
                this.fileSizeRefresh()
            }
          },
          uploadable: function () {
            this.fileSizeRefresh()
          }
      },
      created(){
        //   console.log(this.lstFileRst.length);
        //   console.log(this.files);
        //   console.log(this.secondRemoveFileId);
      },
      mounted(){
        this.fileSizeRefresh()
        this.mounted = true;
      },
      methods: {
            // file drag & drop event
            handleFileDrop(e) { // 파일 드래그시 리스트에 파일 추가
                e.preventDefault();
                let droppedFiles = e.dataTransfer.files;
                if(!droppedFiles) return;
                // this tip, convert FileList to array, credit: https://www.smashingmagazine.com/2018/01/drag-drop-file-uploader-vanilla-js/
                ([...droppedFiles]).forEach(f => {
                    if(this.fileCheck(f, this.files)) this.files.push(f);
                });
                // this.color="#f9f9f9";
                this.isActive = false
                this.fileSizeRefresh();
            },
            handleFileInput(e) { // 버튼 클릭시 리스트에 파일 추가
                e.preventDefault();
                let files = e.target.files;
                files = e.target.files;
                
                if(!files) return;

                if(this.fileType == 'InspectMngtCNST'){
                    if(this.files.length>0){
                        this.files.splice(0,this.files.length);
                    }
                    if(this.lstFileRst.length>0){
                        this.lstFileRst.splice(0,this.lstFileRst.length);
                    }
                }

                // this tip, convert FileList to array, credit: https://www.smashingmagazine.com/2018/01/drag-drop-file-uploader-vanilla-js/
                ([...files]).forEach(f => {
                    if(this.fileCheck(f, this.files)) this.files.push(f);
                });
                this.isActive = false
                this.fileSizeRefresh();
            },
            handleClickTrigger(e) { // input click trigger
                e.preventDefault();
                e.target.nextSibling.click();
            },
            removeInsertedFile(fIndex){ // 이미 등록된 리스트 파일삭제
                // console.log(this.lstFileRst[fIndex].fileComArcvId);

                const fileInfo = this.lstFileRst[fIndex]

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

                this.fileSizeRefresh();
                // console.log(this.secondRemoveFileId);
            },
            removeFile(fileKey){ // 리스트 파일삭제
                this.files.splice(fileKey, 1);
                this.fileSizeRefresh();
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
                        if(this.limitFileSizeStr != ''){
                            this.alert(this.limitFileSizeStr+'까지 등록가능합니다.')
                            return false
                        }
                        else{
                            // this.alert(`파일은 파일 당 ${this.fn_calculateFileSize(this.limitFileSize)}까지 등록가능합니다.`)
                            this.alert("파일은 파일 당 " + this.fn_calculateFileSize(this.limitFileSize) + "까지 등록가능합니다.")
                            return false
                        }
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

            fileSizeRefresh() {
                // console.log('dd');
                // this.fileSize = 0;
                // this.fileViewSize = '';
                // if(this.files.length == 0 && this.lstFileRst.length == 0) {
                //     console.log('end');
                //     this.fileViewSize = '0 MB';
                // }else {
                //     if(this.lstFileRst.length>0){
                //         let temp = [];
                //         for(var i = 0; i<this.lstFileRst.length; i++ ){
                //             console.log(this.fileType);
                //             if(typeof(this.secondRemoveFileId) != 'undefined' && (this.fileType == 'fileComArcvId')){
                //                 if(!this.secondRemoveFileId.includes(this.lstFileRst[i].fileComArcvId)){
                //                     temp.push(this.lstFileRst[i]);
                //                     this.fileSize += parseInt(this.lstFileRst[i].fileSize);
                //                 }
                //             }else if(typeof(this.secondRemoveFileId) != 'undefined' && (this.fileType == 'fileQltArcvId')){
                //                 console.log(this.secondRemoveFileId);
                //                 if(!this.secondRemoveFileId.includes(this.lstFileRst[i].fileQltArcvId)){
                //                     temp.push(this.lstFileRst[i]);
                //                     this.fileSize += parseInt(this.lstFileRst[i].fileSize);
                //                 }
                //             }
                //         }
                //     }
                //     this.files.forEach(data => {
                //         this.fileSize += data.size;
                //     });
                //     this.fileViewSize = this.formatBytes(this.fileSize, 2);
                // }

                this.fileSize = 0
                this.fileViewSize = 0

                if (this.files.length === 0 && this.lstFileRst.length === 0) {
                    this.fileViewSize = '0 MB'
                } else {

                    this.lstFileRst.forEach(item => {
                        if (typeof this.secondRemoveFileId !== 'undefined') {
                            const fileId = this.getFileId(item)
                            if (!this.secondRemoveFileId.includes(fileId)) {
                                this.fileSize += parseInt(item.fileSize)
                            }
                        }
                    })

                    this.files.forEach(item => {
                        this.fileSize += item.size
                    }) 
                    this.fileViewSize = this.formatBytes(this.fileSize, 2)
                }
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
                        'Content-Type': 'multipart/form-data; charset=utf-8;',
                    },
                    responseType: 'blob'
                }).then(response => {
                    if (response.status === 200 ) {
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
                        throw new Error('fileSingleDownload')
                    }
                    
                }).catch(() => {
                    // console.error('error ?: %o', error)
                    this.alert('다운로드에 실패했습니다.')
                    // throw new Error(error)
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
      }
   };
</script>