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
        <template #default>
            <div class="login_wrap">
                <div class="login_detail">
                    <h2 :style="{background: `url(${require('@/assets/img/layout/logo.svg')}) no-repeat 0 0`, width: '212px'}" />
                    <h3>비밀번호 변경 안내</h3>
                    <div class="info_area">
                        <!-- step 1 -->
                        <div class="user_input" v-if="step === 1">
                            <input 
                                v-model="userId_"
                                class="form_control"
                                placeholder="아이디(ID)를 입력해주세요."
                                @keyup.enter="fn_certificate"
                            />
                            <button
                                type="button"
                                class="btn_login"
                                @click="fn_certificate"
                            >
                                {{'인증번호 전송'}}
                            </button>
                            <button
                                type="button"
                                class="btn_login white mt10"
                                @click="$bvModal.hide(refId)"
                            >
                                {{'취소'}}
                            </button>
                        </div>

                        <!-- step 2 -->
                        <div class="user_input" v-if="step === 2">
                            <input 
                                :value="userId_"
                                class="form_control"
                                placeholder="아이디(ID)를 입력해주세요."
                                disabled
                            />
                            <div class="input_number">
                                <input
                                    v-model="certification"
                                    type="text"
                                    class="form_control"
                                    placeholder="인증번호를 입력해주세요."
                                    @keyup.enter="fn_checkCertification"
                                />
                                <span class="time">
                                    {{ fn_formatTime(timer.count) }}
                                </span>
                            </div>
                            
                            <ul style="border-top: 1px solid #c8c8c8; text-align: left; padding: 20px 5px; font-size: 13px;">
                                <li>{{'인증번호가 발송되었습니다. 유효시간은 10분입니다.'}}</li>
                                <li>{{'인증번호 전송 후 10분 이내 비밀번호를 변경해주세요.'}}</li>
                            </ul>
                            

                            <button
                                type="button"
                                class="btn_login"
                                @click="fn_checkCertification"
                            >
                                {{'확인'}}
                            </button>
                            <button
                                type="button"
                                class="btn_login white mt10"
                                @click="$bvModal.hide(refId)"
                            >
                                {{'취소'}}
                            </button>
                        </div>
                        
                        <!-- step 3 -->
                        <div class="user_input" v-if="step === 3">
                            <input 
                                :value="userId_"
                                class="form_control"
                                placeholder="아이디(ID)를 입력해주세요."
                                disabled
                            />
                            <input 
                                v-model="newPw"
                                type="password"
                                class="form_control"
                                placeholder="새 비밀번호를 입력해주세요."
                                @keyup.enter="fn_changePassword"
                            />
                            <input
                                v-model="confirmPw"
                                type="password"
                                class="form_control"
                                placeholder="한번 더 새 비밀번호를 입력해주세요."
                                @keyup.enter="fn_changePassword"
                            />
                            <p class="txt_warning">* 3분 이내 비밀번호를 변경해주세요. <span class="time">{{fn_formatTime(timer.count)}}</span></p>
                            <button
                                type="button"
                                class="btn_login"
                                @click="fn_changePassword"
                            >
                                {{'확인'}}
                            </button>
                            <button
                                type="button"
                                class="btn_login white mt10"
                                @click="$bvModal.hide(refId)"
                            >
                                {{'취소'}}
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

import axios from 'axios'
import _ from 'lodash'

export default {
    name: 'PasswordChangeExtModal',
    mixins: [MsgBoxMixins],
    props: {
        refId: {
            type: String,
            default: 'PasswordChangeExtModal',
        },
        modalTitle: {
            type: String,
            default: '비밀번호 변경 안내'
        },

        
        /** 최초 로그인용 */
        firstLogin: {
            type: Boolean,
            default: false,
        },
        userId: {
            type: String,
            default: '',
        },
        
    },
    methods: {
        fn_onModal: function () {
            // this.userId_ = this.firstLogin && _.isEmpty(this.userId) ? this.userId : ''
            this.fn_stopTimer()
            if (this.firstLogin) {
                this.fn_initialize(3)
                this.userId_ = `${this.userId}`
                this.fn_startTimer(60*3, () => {
                    this.alert('변경 유효시간이 지났습니다.', () => {
                        this.$bvModal.hide(this.refId)
                    })
                })
            }
        },
        fn_hiddenModal: function () {
            this.fn_stopTimer()
            this.fn_initialize()
        },
        fn_initialize: function (step = 1) {
            if (step !== 3) this.userId_ =  ''
            this.step           = step

            this.certification  = ''
            this.hidden         = ''

            this.newPw          = ''
            this.confirmPw      = ''

            this.timer.count    = 0
            this.timer.interval = null

        },
        fn_certificate: function () {

            if (_.isEmpty(this.userId_)) {
                this.alert('아이디를 입력해주세요.')
                return
            }
            
            const url = '/sendApi/api/login/checkPtnrExist'
            const payload = {
                userId: this.userId_
            }
            const options = {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept-Language': 'ko'
                },
            }

            axios.post(url, payload, options)
                .then(response => {
                    if (response.status === 200 && response.data?.existYn === 'Y') {
                        this.fn_getCertification()
                    } else {
                        throw new Error('fn_certificate')
                    }
                })
                .catch(() => {
                    this.alert('존재하지 않는 아이디입니다.')
                })
        },

        fn_getCertification: function () {


            this.fn_startTimer(60*10, () => {
                this.alert('인증번호 유효시간이 지났습니다. \n 다시 인증번호를 전송/입력 후 진행해주세요.', () => {
                    this.fn_initialize()
                })
            })

            const url = '/sendApi/api/login/cert/checkNum/write'
            const payload = {
                userId:     this.userId_,
                userType:   'PTNR',
                viewType:   'WEB',
                reqType:    'web',
            }
            const options = {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept-Language': 'ko'
                },
            }

            axios.post(url, payload, options)
                .then(response => {
                    if (response.status === 200 && response.data.data === '0000') {
                        this.hidden         = response.data.resultData.num
                        this.certification  = response.data.resultData.certNum

                        /** go next step */
                        this.step           = 2
                    } else {
                        throw new Error('fn_sendCertNumber')
                    }
                })
                .catch(error => {
                    console.error(error)
                })
        },

        fn_checkCertification: function () {
            if (_.isEmpty(this.certification)) {
                this.alert('인증번호를 입력해주세요')
                return
            }

            const url = '/sendApi/api/login/cert/checkNum/check'
            const payload = {
                userId:     this.userId_,
                num:        this.hidden,
                certNum:    this.certification
            }
            const options = {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept-Language': 'ko'
                },
            }

            axios.post(url, payload, options)
                .then(response => {
                    if (response.status === 200 && response.data.data === '0000') {

                        this.fn_startTimer(60*3, () => {
                            this.alert('변경 유효시간이 지났습니다.', () => {
                                this.fn_initialize()
                            })
                        })

                        /** go next step */
                        this.step = 3
                    } else {
                        throw new Error('certification_error')
                    }
                })
                .catch(() => {
                    this.alert('인증번호가 일치하지 않습니다.')
                })

        },
        fn_changePassword: function () {
            if (_.isEmpty(this.newPw)) {
                this.alert('새 비밀번호를 입력해주세요.')
                return
            }
            if (_.isEmpty(this.confirmPw)) {
                this.alert('새 비밀번호 확인을 입력해주세요.')
                return
            }
            if (this.newPw !== this.confirmPw ) {
                this.alert('새 비밀번호가 일치하지 않습니다.')
                return
            }

            const regex = new RegExp(`^(?=.*?[a-zA-Z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{${this.min},${this.max}}$`)
            if (!regex.test(this.newPw) ) {
                this.alert('비밀번호 구성 조건이 맞지 않습니다. 최소 8자 ~ 최대 20자, 영문자, 숫자, 특수문자를 하나 이상 포함해야 합니다.')
                return
            }

            const url = '/sendApi/api/login/tradeUserPw/change'
            const payload = {
                userId:         this.userId_,
                firstLoginYn:   this.firstLogin ? 'Y' : undefined,
                
                /** password */
                pw:             this.newPw,
            }
            const options = {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept-Language': 'ko'
                },
            }

            axios.post(url, payload, options)
                .then(response => {
                    if (response.status === 200) {
                        this.fn_stopTimer()

                        switch(response.data.result) {
                            case 0:
                                this.alert('비밀번호 변경이 완료되었습니다. \n변경된 비밀번호로 로그인 해주세요.', () => {
                                    if (this.firstLogin) this.$emit('callback', true)
                                    this.$bvModal.hide(this.refId)
                                })
                                break
                            default: 
                                throw new Error('fn_changePassword')
                        }

                    } else {
                        throw new Error('fn_changePassword')
                    }
                })
                .catch(() => {
                    this.alert('비밀번호 변경에 실패했습니다.')
                })

        },


        /** timer-method */
        fn_stopTimer: function (callback) {
            clearInterval(this.timer.interval)
            this.timer.count        = 0
            this.timer.interval     = null
            if (callback) return callback()
        },
        fn_startTimer: function (seconds, callback ) {
            this.fn_stopTimer()

            this.timer.count = seconds
            this.timer.interval = setInterval(() => {
                this.timer.count--
                if (this.timer.count <= 0) {
                    // console.log(this.timer.count)
                    this.fn_stopTimer((cb) => {
                        if(callback) return callback(cb)
                    })
                }
            }, 1000)
        },
        fn_formatTime: function (seconds) {
            return `${String(parseInt(seconds / 60)).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}`
        }
    },
    data: function () {
        return {
            /** 통합 */
            step: 1,
            timer: {
                interval: null,
                count: 0,
            },
            min: 8,
            max: 20,


            /** step: 1 */
            userId_: '',

            /** step: 2 */
            certification: '',
            hidden: '',

            /** step: 3 */
            newPw: '',
            confirmPw: '',

        }
    }
}
</script>




