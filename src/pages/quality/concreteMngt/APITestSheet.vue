<template>
    <section class="tab_contents">
        API 테스트 페이지입니다. 결과값은 console 화면 참조해주세요

        <div class="inner">
            <div class="button_box">
                <button
                    type="button"
                    class="btn btn_sm btn_darkgray"
                    @click="testDeviceInfoList()"
                >
                    testDeviceInfoList
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
                lang: 'ko'
            }
        },
        async testDeviceInfoList () {
            const url = '/sendApi/api/siteInfo/popup/project/list'
            
            const response = await this.axiosPost(url, this.getPayload(), {
                headers: {
                        'Authorization': this.$cookies.get('Authorization')
                    }
            })

            console.log('@@@@@@@ ===> /sendApi/api/siteInfo/popup/project/list')
            console.log(response)
        },

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
