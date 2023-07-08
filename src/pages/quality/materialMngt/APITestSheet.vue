<template>
    <section class="tab_contents">
        API 테스트 페이지입니다. 결과값은 console 화면 참조해주세요

        <div class="inner">
            <div class="button_box">
                <button
                    type="button"
                    class="btn btn_sm btn_darkgray"
                    @click="docNumSettList()"
                >
                    DocNumSettList
                </button>
                <button
                    type="button"
                    class="btn btn_sm btn_darkgray"
                    @click="selectDocNumSeq()"
                >
                    SelectDocNumSeq
                </button>
                <button
                    type="button"
                    class="btn btn_sm btn_darkgray"
                    @click="docNumSettwrite()"
                >
                    DocNumSettwrite
                </button>
            </div>

        </div>
        
    </section>
</template>

<script>
import axios from 'axios'

export default {
    name: 'APITestSheet',
    async mounted () {
        // await this.docNumSettList()
        // await this.selectDocNumSeq()
        // await this.docNumSettwrite()
    },
    methods: {
        async axiosPost (url, payload, options) {
            return await axios.post(url, payload, {
                ...this.options,
                options
            })
        },
        getPayload () {
            return {
                siteMstrId: this.$cookies.get('siteMstrId'),
                codeType: 'TEST',
                codeDtlType: 'SITE',
                gjmcd: 'MNCD_0000000004',
                gjscd: 'MDCD_0000000001',
                numyy: '2022',
            }
        },
        async docNumSettList () {
            const url = '/sendApi/api/docNum/docNumSettList'
            
            const response = await this.axiosPost(url, this.getPayload(), {
                headers: {
                        'Authorization': this.$cookies.get('Authorization')
                    }
            })

            console.log('@@@@@@@ ===> /api/docNum/docNumSettList')
            console.log(response.data.datas.dlDocNum)
            console.log(response.data.datas.dlDocHist)
        },
        async selectDocNumSeq () {
            const url = '/sendApi/api/docNum/selectDocNumSeq'

            const response = await this.axiosPost(url, this.getPayload(), {
                headers: {
                        'Authorization': this.$cookies.get('Authorization')
                    }
            })

            console.log('@@@@@@@ ===> /api/docNum/selectDocNumSeq')
            console.log(response)
        },
        async docNumSettwrite () {
            const url = '/sendApi/api/docNum/docNumSettwrite'

            const response = await this.axiosPost(url, this.getPayload(), {
                headers: {
                        'Authorization': this.$cookies.get('Authorization')
                    }
            })

            console.log('@@@@@@@ ===> /api/docNum/docNumSettwrite')
            console.log(response)
        }

    },
    data () {
        return {
            options: {
                headers: {
                    "Content-Type": "application/json;",
                    "Accept-Language": "ko",
                }
            },
        }
    }
}

</script>
