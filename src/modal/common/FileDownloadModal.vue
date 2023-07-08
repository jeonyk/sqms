<template>
    <b-modal
        :ref="refId"
        :id="refId"
        :title="modalTitle"
        
        size="md"
        footer-bg-variant="transparent"
        no-close-on-esc
        no-close-on-backdrop

        @shown="fn_onModal"
    >
        <!-- static -->
        <!-- @hidden="fn_offModal" -->
        <template #default>
            <div class="pop_container">
                <LstFile
                    :lst-file-rst="fileRegistered"
                    :uploadable="uploadable"
                    downloadable
                />
            </div>
        </template>
        <template #modal-footer="{ hide }">
            <b-button class="btn btn_md btn_outline btn_gray" @click="hide('forget')"> {{ '닫기' }} </b-button>
        </template>
    </b-modal>
</template>

<script>
import LstFile from '@/pages/common/popup/LstFile'
import axios from 'axios'

export default {
    name: 'FileDownloadModal',
    props: {
        refId: {
            type: String,
            default: 'FileDownloadModal'
        },
        modalTitle: {
            type: String,
            default: '파일'
        },

        //
        fileConnectId: {
            type: String,
            require: true,
        },
        fileType: {
            type: String,
            // require: true,
        },
        fileSubType: {
            type: String,
            default: undefined
        },

        // ui
        uploadable: {
            type: Boolean,
            default: false,
        },

    },
    components: {
        LstFile,
    },
    methods: {
        fn_onModal: function () {
            this.fileRegistered = []
            this.fn_getFiles()
        },
        fn_offModal: function () {

        },
        fn_getFiles: function () {
            const url = '/sendApi/api/file/upFileList'
            const paylaod = {
                fileConnectId: this.fileConnectId,
                fileType:      this.fileType,
                fileSubType:   this.fileSubType,
            }
            const options = {
                headers: {
                    'Authorization': this.$cookies.get('Authorization'),
                    'Content-Type': 'application/json',
                    'Accept-Language': 'ko'
                }
            }

            axios.post(url, paylaod, options)
                .then(response => {
                    this.fileRegistered = response.data.data
                })
                .catch(() => {
                    this.fileRegistered = []
                })
        }
    },
    data: function () {
        return {
            fileRegistered: []
        }
    }
}
</script>
