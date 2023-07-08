<template>
    <section id="DynamicQueryExcution" class="tab_contents">
        <div class="tab_area">
            <div class="inner">
                <h2 class="sub_title mb10"> Query Excution </h2>

                <div class="button_box">
                    <div class="fl">
                        <select
                            v-model="queryType"
                            class="form_control"
                        >
                            <option value="select"> SELECT </option>
                            <option value="insert"> INSERT </option>
                            <option value="update"> UPDATE </option>
                        </select>
                    </div>


                    <div class="fl pl20">

                        <button
                            type="button"
                            class="btn_reset"
                            @click="fn_reset"
                        >
                            Reset
                        </button>

                        <button
                            type="button"
                            class="btn btn_md btn_darkgray"
                            @click="fn_excute"
                        >
                            <b-icon icon="code-slash" />
                            Excute
                        </button>

                        <button
                            type="button"
                            class="btn btn_md btn_darkgray"
                            @click="fn_download"
                        >
                            <b-icon icon="download" />
                            Download
                        </button>
                    </div>
                </div>

                <div class="body">
                    <span class="label_text"> Query </span>
                    <b-form-textarea
                        v-model="query"
                        size="lg"
                        rows="10"
                        @keyup.ctrl.enter="fn_excute"
                        @keyup.alt.enter="fn_excute"
                    />
                        <!-- @keyup.shift.enter="fn_excute" -->
                    
                    <span class="label_text"> Result </span>
                    <b-form-textarea
                        v-model="result"
                        size="lg"
                        rows="10"
                        disabled
                    />

                    <div class="move_box" v-show="queryType === 'select'">
                            <div class="data_tit" style="height:28px"></div>
                            <!-- ibsheet -->
                            <div class="ib_wrap">
                                <div id="resultTestSheet" class="ibsheet_table" ref="resultTestSheet" :style="{'height': '487px'}"></div>
                            </div>
                        </div>
                    </div>
            </div>
        </div>
    </section>
</template>

<script>
import loader from '@ibsheet/loader'
import { requestOptions, sendPostApi }  from '../../apis/common'

export default {
    name: 'DynamicQueryExcution',
    methods: {

        fn_reset: function () {
            this.queryType  = 'select'
            this.query      = ''
            this.result     = ''
        },

        fn_excute: async function () {
            
            this.result = "";
            
            let param = {
                query: this.query,
            }
            const requestOptions = {
                headers: {
                    'Authorization': this.$cookies.get('Authorization'),
                    'Content-Type': 'application/json',
                    'Accept-Language': 'ko'
                }
            }

            let url = '/sendApi/api/xxxx/' + this.queryType;
            // 쿠키에 토큰 값 넣기(accessToken)
            try {
                const resData = await sendPostApi(url, param);
                console.log(resData);
                this.result = resData.data.resultData;

                if(this.queryType == "select"){
                    this.initializeGrid(this.result);
                }


            } catch (error) {
                console.error(error);
            }

        },
        fn_download: function () {
            // firstData 기준
            const seperator = '|'

            if (!this.result || this.result.length === 0) {
                return
            }

            const keys = Object.keys(this.result[0])

            let blobData = []
            blobData.push(keys.join(seperator))

            this.result.forEach(item => {
                blobData.push(keys.map(key => item[key]).join(seperator))
            })

            const blob = new Blob([blobData.join('\r\n')], {type: 'text/plain'})

            const objectUrl = window.URL.createObjectURL(blob)
            const link = document.createElement('a')

            link.style.cssText = 'display:none'
            link.href = objectUrl
            link.setAttribute('download', 'data.txt')

            if (typeof link.download === 'undefined') {
                link.setAttribute('target', '_blank')
            }

            document.body.appendChild(link)
            link.click()
            link.remove()
            window.URL.revokeObjectURL(objectUrl)

        },

        initializeGrid(sheetData){

            let shhetOptions = new Object();

            shhetOptions.Cfg = {
                NoVScroll: 0,
            } 

            let colInfo = [];

            if(sheetData != null && sheetData.length > 0){
                let keyInfo = Object.keys(sheetData[0]);                
                
     
                let noObj = { Name: 'SEQ', Header: [{ Value: 'NO' }], RelWidth: 5, CanEdit: 0 };
                colInfo.push(noObj);

                for(let i = 0; i < keyInfo.length; i++){
                    let obj = { Name: keyInfo[i], Header: [{ Value: keyInfo[i] }], CanEdit: 0, RelWidth: 15 }
                    colInfo.push(obj);
                }
                shhetOptions.Cols = colInfo;
            }
            loader.createSheet({    // IBSheet loaded
                el: 'resultTestSheet',
                data: sheetData,
                options: shhetOptions
            }).then((sheet) => {
                this.grid.resultTestSheet = sheet;
            });
        }

    },
    data: function () {
        return {
            // type
            queryType: 'select',
            
            query: '',
            result: '',

            grid: { // ibsheet
                resultTestSheet: [],
                option: [],
            },
        }
    }

}
</script>
