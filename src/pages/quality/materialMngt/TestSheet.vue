<template>
  <section class="tab_contents">
      <LstFile
        :files="files"
        @file-changed="(payload) => {files = payload}"
        uploadable
      />
      <button
        @click="fn_upload"
      >
        Upload
      </button> -->

      <b-button
        @click="$store.dispatch('etc/setLoading', true)"
      >
        loading..
      </b-button>

      <DatePicker
        v-model="date"
        foramt="YYYYMMDD"
        :clearable="false"
      />
      

      <!-- <LstFile
        :files="files"
        @file-changed="(payload) => {files = payload}"
        uploadable
      />
      <button
        @click="fn_upload"

      >
        Upload
      </button> -->

      <!-- <vue-friendly-iframe src="" @load="fn_onLoad"></vue-friendly-iframe> -->


      <!-- <table>
        <thead>
          <th v-for="(item, index) in refine[0]" :key="index">
            {{ item.standHo + '호'}}
          </th>
        </thead>
        <tbody>
          <tr v-for="(item, index) in refine" :key="index" :value="index"> 
            <template v-for="(inItem, inIdx) in item">
                <td>
                    <label class="input_check pop_notext">
                        <input type="checkbox" id="" name="">
                        <span class="label_text"></span>
                    </label>
                </td>
                <td>{{`${inItem.standDong}동 ${inItem.addrFloor}층  ${inItem.standHo}호`}}</td>
            </template>
          </tr>
        </tbody>
      </table> -->

      <!-- <Datepicker
        ref="date"
        v-model="date"
        type="time"
      /> -->

      <!-- <DatePicker
        ref="date"
        v-model="date"
      />

      <b-button
        @click="fn_click"
      >
        date
      </b-button>

      <input type="text"/> -->


  </section>
</template>


<script>
import LstFile from '@/pages/common/popup/LstFile'
import DatePicker from '@component/common/DatePicker.vue'

import _ from 'lodash'
import axios from 'axios'

import MsgBoxMixins  from '@plugin/mixin/MsgBox.mixins.js'


export default {
  name: "TestSheet",
  mixins: [MsgBoxMixins],
  components: {
    LstFile,
    DatePicker,
  },
  computed: {
    
  },
  mounted () {
    const except = [
      'aa',
      'bb',
      'cc'
    ]

    const url = 'Bsqbbwe'

    const samples = !except.some(item => {
      console.log(item)
      return url.includes(item)
    })

    console.log(samples)
  },
  
  methods: {
    fn_sample (payload) {
      console.log(payload)
    },
    fn_changedChecked (obj) {

      if (obj.checked) {
        this.aprvUser.unshift(obj)
      } else {
        this.aprvUser.splice(this.aprvUser.findIndex((o) => o.k === obj.k),1)
      }
    },
    fn_click (event) {
      console.log(this.$refs.date)
      console.log(this.$refs.date2)
      this.$refs.date.focus()
    },
    fn_upload () {
      const url = '/sendApi/api/fileUp/fileUploads'
      const options = {
                headers: {
                    'Authorization': this.$cookies.get('Authorization'),
                    'Content-Type': 'application/json',
                    'Accept-Language': 'ko'
                }
            }

      const formData = new FormData()
      formData.append('fileConnectId', 'EXCK_')
      formData.append('fileType', 'ExtCheck')
      this.files.forEach(file => formData.append('file', file))
       axios.post(url, formData, options)
                .then(response => {
                    console.log(response)
                })
                .catch(error => {
                    console.error(error)
                })


    },
    fn_loaded () {
      console.log('onloaded')
    },
    fn_fetchExtCheckInfo () {
      const url = '/sendApi/api/extrnlChck/extrnlChckInf/list'
      const payload = {
        siteMstrId: this.$cookies.get('siteMstrId'),
        searchType: 'MY',
      }
      const options = {
          headers: {
              'Authorization': this.$cookies.get('Authorization'),
              'Content-Type': 'application/json',
              'Accept-Language': 'ko'
          }
      }
      
      axios.post(url, payload, options)
        .then(res => {
          console.log(res)
        })
        .catch(err => {
          console.error(err)
        })

    },
    fn_getSiteInfo: function () {
            // const url = '/sendApi/api/siteInfo/popup/project/list'
            const url = '/sendApi/api/siteInfo/view'
            // const url = '/sendApi/api/siteInfo/detail'
            const payload = {
                siteMstrId: this.$cookies.get('siteMstrId')
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
                    console.log(response)

                })
                .catch(error => {
                    console.error(error)
                })
        },
  },
  data() {
    return {
      date: null,
      date2: null,

      numberSample: null,

      refine: [],
      files: [],

      data: [],

      aprvUser: [],
      sample1: [
        {
          k: 11,
          v: 11,
        },
        {
          k: 12,
          v: 12,
        },
        {
          k: 13,
          v: 13,
        },
        {
          k: 14,
          v: 14,
        },
      ],
      sample2: [
        {
          k: 21,
          v: 21,
        },
        {
          k: 22,
          v: 22,
        },
        {
          k: 23,
          v: 23,
        },
        {
          k: 24,
          v: 24,
        },
      ],

    }
  },
}
</script>
