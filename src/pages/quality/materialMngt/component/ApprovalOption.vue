<template>
    <section class="inner type2">
        <div class="button_box">
            <h2>결재방식 선택</h2>
            <div class="fr">
                <button
                    v-if="checkUser(userId, 'write')"
                    type="button"
                    class="btn btn_md btn_outline btn_darkgray"
                    @click="fn_save"
                >
                    적용
                </button>
            </div>
        </div>

        <div class="table_normal_list opt_payment">
            <table>
                <caption class="sr_only"></caption>
                <colgroup>
                    <col width="*">
                    <col width="*">
                    <col width="*">
                </colgroup>
                <tbody>
                    <tr>
                        <td
                            v-for="(item, index) in aprvOptnType.list"
                            :key="index"
                        >
                            <label
                                class="input_radio"
                                :for="`approvalMethod_${index}`"
                            >
                                <input
                                    type="radio"
                                    v-model="aprvOptnType.current"
                                    :id="`approvalMethod_${index}`"
                                    :value="item.key"
                                >
                                <span class="label_text"> 
                                    {{item.title}}
                                    <div class="info">

                                        <strong v-html="fn_toHtml(item.content)">  </strong>
                                    </div>
                                </span>
                            </label>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <p class="table_message ac">* 진행 중인 결재는 기존 옵션으로 진행됩니다. 변경된 결재옵션은 새로운 결재부터 적용됩니다.</p>

        <!-- <pop-alert
            pop-id="alert_approvalOptions"
            :msg="alert.msg"
            :btn-name="{first : '확인'}"
            @first-btn-fn="$bvModal.hide('alert_approvalOptions')"
        /> -->
    </section>
</template>

<script>
// import PopAlert from '@/pages/common/popup/PopAlert.vue'
import axios from 'axios'
import { mapGetters } from 'vuex'

import MsgBoxMixins  from '@plugin/mixin/MsgBox.mixins.js'
import authCheckMixns  from '@plugin/mixin/AuthCheck.js'

export default {
    name: 'ApprovalOption',
    mixins: [MsgBoxMixins, authCheckMixns],
    props: {
        codeType: {
            type: String,
            // default: ''
        },
    },
    components: {
        // PopAlert,
    },
    computed: {
        ...mapGetters({
            userId: 'auth/getUserId'
        })
    },
    mounted () {
        this.fn_get()
    },
    methods: {
        fn_toHtml: function (string) {
            return string.split('\n').join('<br>')
        },

        fn_get: function () {
            const url = '/sendApi/api/apvlOptn/approvalOption/view'
            const payload = {
                codeType: this.codeType,
                siteMstrId: this.$cookies.get('siteMstrId'),
                aprvOptnType: this.aprvOptnType.current,
            }
            const options = {
                headers: {
                    "Content-Type": "application/json;",
                    "Accept-Language": "ko",
                    "Authorization": this.$cookies.get("Authorization")
                }
            }
            
            axios.post(url, payload, options)
                .then(response => {
                    if(response.status === 200 && response.data?.data) {
                        this.aprvOptnType.current = response.data.data.aprvOptnType
                    }
                })
                .catch(error => {
                    console.error(error)
                    // throw new Error(error)
                })
        },
        fn_save: function () {
            const url = '/sendApi/api/apvlOptn/approvalOption/change'
            const payload = {
                codeType: this.codeType,
                siteMstrId: this.$cookies.get('siteMstrId'),
                aprvOptnType: this.aprvOptnType.current,
            }
            const options = {
                headers: {
                    "Content-Type": "application/json;",
                    "Accept-Language": "ko",
                    "Authorization": this.$cookies.get("Authorization")
                }
            }           

            axios.post(url, payload, options)
                .then(response => {
                    // this.alert.msg = response.status === 200 ? '저장에 성공하였습니다.' : '저장에 실패했습니다.'
                    // this.$bvModal.show('alert_approvalOptions')
                    if (response.status === 200 ) {
                        this.alert('결재옵션이 적용되었습니다.')
                    } else {
                        throw new Error('approvalOption')
                    }
                })
                .catch(error => {
                    console.error(error)
                    // throw new Error(error)
                    this.alert('저장에 실패했습니다.')
                })

            
        }
    },
    data () {
        return {
            aprvOptnType: {
                current: '',
                list: [
                    {
                        key: 'ALLON',
                        title: '온라인',
                        content: '전체 결재 라인\n 온라인 결재'
                    },
                    {
                        key: 'HAFON',
                        title: '50% 온라인',
                        content: 'HEC 내부만\n 온라인 결재'
                    },
                    {
                        key: 'OFFLN',
                        title: '오프라인',
                        content: '결재 서류 출력 후 결재\n 단, 결재완료 후\n 최종승인 처리 필요'
                    }
                ]
            },
            
            // alert: {
            //     msg: ''
            // }
        }
    }
}
</script>
