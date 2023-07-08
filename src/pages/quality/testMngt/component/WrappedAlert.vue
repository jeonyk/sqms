<template>
    <section 
        id="wrapped-alert"
    >
        <b-modal
            :ref="refId"
            :title="title"
            size="sm"
            footer-bg-variant="transparent"
            @shown="$refs[`${refId}_ok`].focus()"
        >
            <template>
                <div class="pop_container">
                    <div class="message_table">
                        <p class="msg">
                            {{ message }}
                        </p>
                    </div>
                </div>
            </template>
            <template #modal-footer>
                <b-button 
                    :ref="`${refId}_ok`"
                    class="btn btn_lg btn_outline btn_blue"
                    @click="clickConfirm"
                    @keyup.enter="clickConfirm"
                    @keyup.space="clickConfirm"
                >
                    {{ buttonName.confirm }}
                </b-button>
                <b-button 
                    v-if="useCancelButton"
                    class="btn btn_lg btn_outline btn_darkgray"
                    @click="clickCancel"
                >
                    {{ buttonName.cancel }}
                </b-button>
                
            </template>
        </b-modal>


    </section>
</template>


<script>

export default {
    name: 'WrappedAlert',
    components: {
    },
    props: {
        title: {
            type: String,
            default: '알림'
        },
        isShow: {
            type: Boolean,
            default: false
        },
        message: {
            type: String,
            default: ''
        },
        useCancelButton: {
            type: Boolean,
            default: false
        },
        buttonName: {
            type: Object,
            default : () => {
                return {
                    confirm: '확인',
                    cancel : '닫기'
                }
            }
        },
        refId: {
            type: String,
            default: 'wrappedAlert'
        },
        purpose : {
            type: String,
            default: ''
        }
    },
    watch: {
        isShow: {
            handler (newValue) {
                if (newValue) {
                    this.$refs[this.refId].show()
                } else {
                    this.$refs[this.refId].hide()
                }
            },
        }
    },
    methods: {
        clickConfirm () {
            this.$emit('click-confirm', this.purpose)
        },
        clickCancel () {
            this.$emit('click-cancel', this.purpose)
        },
        toggleShow () {
            this.isShow = !this.isShow
        }
    },
    data () {
        return {
            
        }
    }
}

</script>
