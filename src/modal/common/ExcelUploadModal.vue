<template>
    <b-modal
        :ref="refId"
        :id="refId"
        :title="modalTitle"

        :dialog-class="['upload_excel']"

        size="lg"
        footer-bg-variant="transparent"

        @shown="fn_onModal"
    >
        <!-- <template #default>
            <div class="pop_container">
                <b-form-file
                    :ref="`${refId}_fileInput`"
                    v-model="file"
                    :state="Boolean(file)"
                    accept=".xls, .xlsx, .csv"
                    placeholder="Choose a file or drop it here.."
                    drop-placeholder="Choose a file or drop it here.."
                    size="md"
                    plain
                    style="height: 36px;"
                />
            </div>
        </template> -->

        <template #default>
            <div class="pop_container">
                <h2 class="subject">안내사항</h2>
                <div class="lookup_box multi_line align_center">
                    <ul class="lst_help">
                        <!-- <li>양식 파일을 <span class="warning">다운로드</span>하여 작업해주세요.</li> -->
                        <li>양식 파일을 다운로드하여 작업해주세요.</li>
                        <li>엑셀파일만 업로드 가능합니다.</li>
                        <li>첫번째 시트의 데이터가 업로드 됩니다. [시트명: Sheet1]</li>
                        <li>빈 데이터가 있거나 잘못된 데이터가 있는 행은 추가되지 않습니다.</li>
                        <li>최대 1,000개(행)까지 업로드 가능합니다.</li>
                        <li>데이터 추가 후 IB Sheet 상단의 저장 버튼을 눌러야 데이터가 반영됩니다.</li>
                    </ul>
                </div>

                <h2 class="subject mt30">업로드 파일 선택</h2>
                <div class="lookup_box multi_line align_center">
                    <div class="file_box">
                        <div class="files">
                            <input 
                                v-model="fileName" 
                                class="upload_name form_control" 
                                disabled="disabled" 
                                placeholder="파일을 선택해주세요"
                            /> 
                            <label 
                                for="ex_filename" 
                                class="btn btn_sm btn_darkgray btn_addfile"
                            >
                                찾아보기
                            </label> 
                            <input 
                                :ref="`${refId}_fileInput`"
                                type="file" 
                                id="ex_filename" 
                                @change.prevent="fn_fileSelected" 
                                class="upload_hidden"
                                accept=".xls, .xlsx, .csv"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </template>

        <template #modal-footer="{ hide }">
            <b-button class="btn btn_md btn_outline btn_darkblue" v-if="mode=='SHEET'" @click="fn_import"> {{ '등록' }} </b-button>
            <b-button class="btn btn_md btn_outline btn_darkblue" v-if="mode=='CHECK'" @click="fn_importCheck"> {{ '등록' }} </b-button>
            <b-button class="btn btn_md btn_outline btn_gray" @click="hide('forget')"> {{ '닫기' }} </b-button>
        </template>
    </b-modal>
    
</template>

<script>
// import LstFile from '@/pages/common/popup/LstFile'
import MsgBoxMixins  from '@plugin/mixin/MsgBox.mixins.js'
import VueCookies from 'vue-cookies';
import axios from 'axios'

export default {
    name: 'ExcelUploadModal',
    mixins: [MsgBoxMixins],
    props: {
        refId: {
            type: String,
            default: 'ExcelUploadModal',
            require
        },
        modalTitle: {
            type: String,
            default: '엑셀 업로드'
        },

        // optional
        url: {
            type: String,
            default: ''
        },
        mode: {
            type: String,
            default: ''
        },
        fileType: {
            type: String,
            default: ''
        },
        columnLength: {
            type: String,
            default: ''
        },

        /** 허용 확장자 */
        acceptExtn: {
            type: Array,
            default: () => {
                return ['xls', 'xlsx', 'csv']
            }
        },
        /** 파일 최대사이즈 */
        limitFileSize: {
            type: Number,
            default: 1024*1024*300,
        },
        
    },
    components: {
        // LstFile,
    },
    methods: {
        fn_onModal: function () {
            this.file = null
            this.$refs[`${this.refId}_fileInput`].val = ''
        },
        fn_import: async function () {
            if(this.file == null){
                this.alert('선택된 파일이 없습니다.');
                return;
            }
            // console.log(this.file);
            const formData = new FormData();
            formData.append("fileType", this.fileType);
            if("SIBANG" == this.fileType) formData.append("checkLength", 4);
            else if("TEST1" == this.fileType) formData.append("checkLength", 2);
            else formData.append("checkLength", 2);
            formData.append("columnLength", this.columnLength);
            formData.append("excelMode", this.excelMode);
            formData.append("siteMstrId", VueCookies.get("siteMstrId"));
            formData.append("file", this.file);
            // console.log(formData);    
            await axios.post("/sendApi/api/fileUp/fileExcelUploads", formData, {
                headers: {
                    'Authorization': this.$cookies.get('Authorization'),
                    "Content-Type": "multipart/form-data;charset=UTF-8",
                    'Accept-Language': 'ko'
                },
            }).then(response => {
                if (response.status === 200 && response.data.data == '0000' && response.data.size > 0) {
                    // console.log(response.data.resultData);
                    this.$emit('import', response.data.resultData);
                    this.$bvModal.hide(this.refId)
                } else {
                    throw new Error('fn_import')
                }
            })
            .catch(error => {
                console.error(error)
                this.alert('업로드에 실패했습니다.')
                return;
            })
            /*
            axios.post(url, payload, options)
                .then(response => {
                    
                    if (response.status === 200) {
                        this.$emit('import', response.data)
                    } else {
                        throw new Error('fn_import')
                    }
                })
                .catch(error => {
                    console.error(error)
                    this.alert('업로드에 실패했습니다.')
                })
            */
        },
        fn_importCheck: async function () {
            if(this.file == null){
                this.alert('선택된 파일이 없습니다.');
                return;
            }
            // console.log(this.file);
            const formData = new FormData();
            formData.append("fileType", this.fileType);
            formData.append("columnLength", 3);
            formData.append("excelMode", this.excelMode);
            formData.append("file", this.file);
            // console.log(formData);    
            await axios.post("/sendApi/api/fileUp/fileExcelCheckUploads", formData, {
                headers: {
                    'Authorization': this.$cookies.get('Authorization'),
                    "Content-Type": "multipart/form-data;charset=UTF-8",
                    'Accept-Language': 'ko'
                },
            }).then(response => {
                if (response.status === 200 && response.data.data == '0000' && response.data.size > 0) {
                    // console.log(response.data.resultData);
                    this.$emit('import', response.data.resultData);
                } else {
                    throw new Error('fn_import')
                }
            })
            .catch(error => {
                console.error(error)
                this.alert('업로드에 실패했습니다.')
                return;
            })
        },
        fn_fileSelected: function (e) {            
            const extn          = e.target.files?.[0].name.trim().split('.').reverse()[0]
            // validate
            
            /** 허용 확장자 */
            if (this.acceptExtn.length > 0) {
                if (!this.acceptExtn.map(item => String(item).replace('.', '')).includes(extn)) {
                    this.alert(`파일은 '${this.acceptExtn.map(item => String(item).replace('.','')).join(',')}'만 허용합니다.`)
                    return
                }
            }
            /** 파일사이즈 */
            if (this.limitFileSize) {
                if ( Number(this.limitFileSize) < e.target.files?.[0].size) {
                    this.alert(`${this.fn_calculateFileSize(this.limitFileSize)}까지 등록가능합니다.`)
                    return 
                }
            }
            
            this.file           = e.target.files[0]
            this.fileName       = e.target.files[0].name
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
        
    },
    data: function () {
        return {
            file: null,
            fileName: null,
        }
    }
}
</script>
