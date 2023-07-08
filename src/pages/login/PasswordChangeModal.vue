
<template>
    <b-modal
        :ref="refId"
        :id="refId"
        :title="modalTitle"

        hide-footer
        no-close-on-backdrop
        no-close-on-esc
        size="md"
        footer-bg-variant="transparent"

        @shown="fn_onModal"
        @hidden="fn_hiddenModal"
    >
        <!-- modal-class="login_wrap" -->
        <template #default>
            <div class="login_wrap">
                <div class="login_detail">
                    <h2 :style="{background: `url(${require('@/assets/img/layout/logo.svg')}) no-repeat 0 0`, width: '212px'}" />
                    <h3>비밀번호 변경 안내</h3>
                    <div class="info_area">
                        <div class="user_input">
                            <input 
                                v-model="userId"
                                type="text" 
                                class="form_control" 
                                disabled 
                            />
                            <input 
                                v-model="currentPw"
                                type="password" 
                                class="form_control"
                                :maxlength="max" 
                                placeholder="현재 비밀번호"
                                @keyup.enter="fn_changePassword"
                            />
                            <input 
                                v-model="newPw"
                                type="password" 
                                class="form_control" 
                                :maxlength="max"
                                placeholder="새 비밀번호"
                                @keyup="fn_validate"
                                @keyup.enter="fn_changePassword"
                            />
                            <input 
                                v-model="confirmPw"
                                type="password"
                                class="form_control"
                                :maxlength="max"
                                placeholder="새 비밀번호 확인" 
                                @keyup="fn_validate"
                                @keyup.enter="fn_changePassword"
                            />
                                <!-- @keyup.prevent="fn_validate" -->
                            <p v-show="validation.show" class="txt_warning" > {{ validation.msg }} </p>

                            <button 
                                type="button" 
                                class="btn_login"
                                @click="fn_changePassword"
                            >
                                {{'비밀번호 변경'}}
                            </button>
                        </div>

                        <ul class="lst_help">
                            <li>{{'비밀번호는 3개월마다 변경해야 합니다.'}}</li>
                            <li>{{'비밀번호는 적어도 하나의 영문자, 숫자, 특수문자를 포함해야 합니다.'}}</li>
                            <li>{{'비밀번호는 최소 8자 이상 20자 이내의 글자수로 구성되어야 합니다.'}}</li>
                        </ul>
                    </div>
                    <p class="copy">COPYRIGHTⓒ HYUNDAI ENGINEERING CO.,LTD. ALL RIGHTS RESERVED.</p>
                </div>
            </div>
        </template>

    </b-modal>
    
</template>

<script>
import MsgBoxMixins  from '@plugin/mixin/MsgBox.mixins.js'
import { mapGetters } from 'vuex'

import axios from 'axios'
import _ from 'lodash'

export default {
    name: 'PasswordChangeModal',
    mixins: [MsgBoxMixins],
    props: {
        refId: {
            type: String,
            default: 'PasswordChangeModal',
        },
        modalTitle: {
            type: String,
            default: '비밀번호 변경 안내'
        },
    },
    computed: {
        ...mapGetters({
            userId:     'auth/getUserId',
            userNm:     'auth/getUserNm',
            tradeId:    'auth/getTradeId',
            tradeType:  'auth/getTradeType',
        })
    },
    methods: {
        fn_onModal: function () {
        },
        fn_hiddenModal: function () {
            this.currentPw  = ''
            this.newPw      = ''
            this.confirmPw  = ''

            this.validation.show = false
        },
        fn_validate: function () {
            if (this.newPw !== this.confirmPw) {
                this.validation.show = true
                this.validation.msg  = '비밀번호가 일치하지 않습니다.'
            } else {
                this.validation.show = false
                this.validation.msg  = ''
            }
        },
        fn_changePassword: function () {
            if (_.isEmpty(this.currentPw)) {
                this.alert('현재 비밀번호를 입력해주세요.')
                return
            }
            if (_.isEmpty(this.newPw)) {
                this.alert('새 비밀번호를 입력해주세요.')
                return
            }
            if (_.isEmpty(this.confirmPw)) {
                this.alert('새 비밀번호 확인을 입력해주세요.')
                return
            }

            const regex = new RegExp(`^(?=.*?[a-zA-Z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{${this.min},${this.max}}$`)
            if (!regex.test(this.newPw) || this.newPw !== this.confirmPw ) {
                this.alert('비밀번호 생성 규칙 또는 새 비밀번호 정보가 일치하지 않습니다.')
                return
            }

            const url = '/sendApi/api/adminPtnr/tradeUserPw/change'
            const payload = {
                userId:     this.userId,
                userNm:     this.userNm,
                tradeId:    this.tradeId,
                tradeType:  this.tradeType,
                /** password */
                oldPw:      this.currentPw,
                pw:         this.newPw,
            }
            const options = {
                headers: {
                    'Authorization': this.$cookies.get('Authorization'),
                    'Content-Type': 'application/json',
                    'Accept-Language': 'ko'
                },
            }

            axios.post(url, payload, options)
                .then(response => {
                    if (response.status === 200) {
                        switch(response.data.result) {
                            case 0: 
                                this.alert('비밀번호 변경이 완료되었습니다.', () => {
                                    this.$bvModal.hide(this.refId)
                                    this.$router.push({
                                        name: 'Main',
                                    })
                                })
                                break
                            case 3:
                                this.alert('등록된 협력사가 없습니다.')
                                break
                            case 4:
                                this.alert('등록된 협력사 직원이 없습니다.')
                                break
                            case 6:
                                this.alert('현재 비밀번호가 일치하지 않습니다.')
                                break
                            default: 
                                throw new Error('fn_changePassword')
                        }
                    } else {
                        throw new Error('fn_changePassword')
                    }
                })
                .catch(error => {
                    console.error(error)
                    this.alert('비밀번호 변경에 실패했습니다.')
                })
        },
    },
    data: function () {
        return {
            /** advanced */
            min: 8,
            max: 20,


            /** password */
            currentPw:  '',
            newPw:      '',
            confirmPw:  '',

            /** ui */
            validation: {
                show:   true,
                msg:    '',
            }
        }
    }
}
</script>
