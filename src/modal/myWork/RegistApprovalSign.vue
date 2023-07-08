<template>
    <b-modal
        :ref="refId"
        :id="refId"
        :title="modalTitle"

        size="lg"
        no-close-on-backdrop
        no-close-on-esc
        static
        footer-bg-variant="transparent"
        @shown="fn_onModal"
    >
        <template #default>
            <div class="pop_container">
                <div class="lst_tabs">
                    <ul>
                        <li
                            v-for="(tab, index) in tabs.list"
                            :key="index"
                            :class="{active: tabs.current === index}"
                            @click="tabs.current = index"
                        >
                            <a href="javascript:void(0);">{{tab.value}}</a>
                        </li>
                    </ul>
                </div>
                <div class="tab_area" v-show="tabs.current === 0" style="height:550px; ">
                    <vue-signature-pad
                        :ref="`${refId}_signaturePad`" 
                        :id="`${refId}_signaturePad`" 
                        width="100%" 
                        height="500px"
                        :custom-style="{border:'1px solid rgba(0, 0, 0, 0.2)'}"
                        :options="{minWidth: 5, maxWidth: 5 , onBegin: () => {$refs[`${refId}_signaturePad`].resizeCanvas()} }"
                    />
                    <div class="button_box fr">
                        <button type="button" class="btn btn_md btn_outline btn_darkgray" @click="fn_clickClear"> {{'지우기'}} </button>
                    </div>
                </div>
                <div class="tab_area" v-show="tabs.current === 1" style="height:550px;">
                    <LstImg
                        :files="img.files"
                        @file-changed="(payload) => {img.files = payload.file, img.copiedFileIds = payload.copyIds}"
                        :limit-file-count="1"
                        :accept-extn="['.png']"
                        :limit-file-size="1024*1024*300"
                        downloadable
                        :uploadable="img.files.length === 0"
                        :copyable="false"
                        :file-type="'registApprovalSignQltyPicturePop'"
                    />
                        <!-- :placeholder="`배경이 없는 png파일 업로드해주세요`" -->
                    <span><strong>※ 배경이 없는 png파일로 업로드해주세요.</strong></span>
                </div>
            </div>
        </template>
        <template #modal-footer="{ hide }">
            <b-button class="btn btn_md btn_outline btn_darkgray" @click="fn_clickSave">{{'저장'}}</b-button>
            <b-button class="btn btn_md btn_outline btn_gray" @click="hide('forget')">{{'취소'}}</b-button>
        </template>
    </b-modal>
</template>

<script>
import MsgBoxMixins  from '@plugin/mixin/MsgBox.mixins.js'
import LstImg from '@/pages/common/popup/LstImg'
import VueSignaturePad from 'vue-signature-pad'
import axios from 'axios'
import { mapGetters } from 'vuex'

export default {
    name: 'RegistApprovalSign',
    mixins: [MsgBoxMixins],
    props: {
        refId: {
            type: String,
            default: 'RegistApprovalSign'
        },
        modalTitle: {
            type: String,
            default: '전자서명 등록'
        },
    },
    components: {
        VueSignaturePad,
        LstImg, 
    },
    computed: {
        ...mapGetters({
            userId: 'auth/getUserId'
        })
    },
    
    methods: {
        fn_onModal: function () {
            // console.log('onModal')
            // this.$refs[`${this.refId}_signaturePad`].openSignaturePad()
        },
        fn_clickSave: function () {
            
            // console.log('save')
            if (this.tabs.current === 0) {
                const {isEmpty, data} = this.$refs[`${this.refId}_signaturePad`].saveSignature()
    
                // console.log(isEmpty)
                // console.log(data)

                if (!isEmpty) {
                    fetch(data)
                        .then(res =>res.blob())
                        .then(blob => {
                            const file = new File([blob], this.userId + '.png',{ type: "image/png" })
                            // console.log(file)

                            // console.log(typeof file)
                            // console.log(file)

                            this.fn_setFile(this.userId, [file], 'SgnArcv', [], (fileSgnArcvId) => {
                                // console.log(response)
                                this.fileSgnArcvId = fileSgnArcvId
                                this.alert('저장되었습니다.', () => {
                                    this.$emit('callback', this.fileSgnArcvId)
                                    this.$bvModal.hide(this.refId)
                                    
                                })
                            })
                        })
                } else {
                    this.alert('서명이 등록되지 않았습니다.')
                }

            } else {
                this.fn_setFile(this.userId, this.img.files, 'SgnArcv', this.img.copiedFileIds, (fileSgnArcvId) => {
                    // console.log(response)
                    this.fileSgnArcvId = fileSgnArcvId
                    this.alert('저장되었습니다.', () => {
                        this.$emit('callback', this.fileSgnArcvId)
                        this.$bvModal.hide(this.refId)
                    })
                })
            }
        },
        fn_clickClear: function () {
            this.$refs[`${this.refId}_signaturePad`].clearSignature()
            // this.$refs[`${this.refId}_signaturePad`].clearCacheImages()
        },

        // api
        fn_setFile: function (fileConnectId, files, fileType, copiedFileIds, callback) {
            const url = '/sendApi/api/fileUp/fileUploads'

            const options = {
                headers: {
                    'Authorization': this.$cookies.get('Authorization'),
                    'Content-Type': 'application/json',
                    'Accept-Language': 'ko'
                }
            }
            const formData = new FormData()
            formData.append('fileConnectId', fileConnectId)
            formData.append('fileType', fileType)
            files.forEach(file => formData.append('file', file))
            
            if (copiedFileIds && copiedFileIds.length > 0) {
                formData.append("fileCopyIds", copiedFileIds.toString())
            };
            // formData.append('file', file)
            
            axios.post(url, formData, options)
                .then(response => {
                    if(response.status === 200 ) {
                        if (callback) return callback(response.data.data)
                    }
                })
                .catch(error => {
                    console.error(error)
                })
        },
        fn_registSign: function (_payload, callback) {
            const url = '/sendApi/api/approv/userSgnArcv/write'
            const payload = {
                ..._payload,

            }
            const options = {
                headers: {
                    'Authorization': this.$cookies.get('Authorization'),
                    'Content-Type': 'application/json',
                    'Accept-Language': 'ko'
                }
            }

            axios.post(url, payload, options)
                .then(response => {
                    if (response.status === 200) {
                        if (callback) callback(response)
                    }
                })
                .catch(error => {
                    console.error(error)
                })

        }
    },
    data: function () {
        return {
            tabs: {
                current: 0,
                list: [
                    {
                        key: 'DRAW',
                        value: '그리기'
                    },
                    {
                        key: 'UPLOAD',
                        value: '이미지파일'
                    }
                ]
            },

            img: {
                files: [],
                copiedFileIds:[],
            },
            fileSgnArcvId: null

        }
    }

}

</script>

