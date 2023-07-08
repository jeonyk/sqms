<template>
    <section id="ExtCheckScheduleSheet" class="tab_contents">
        <Breadcrumb :currentPath="$route.fullPath" />
        <div class="tab_area">
            <div class="inner">
                <FullCalendar
                    class="calendar_schedule "
                    :key="'extrnlChck'"
                    :class="{'schedule_test': true}"
                    event-type="link"
                    :unique-key="'extrnlChckId'"
                    :day-max-events="2"
                    :events="events"
                    @changed="fn_changed"
                    @click-event="fn_clickEvent"
                />
            </div>
        </div>
    </section>
</template>

<script>
import FullCalendar from '@component/common/FullCalendar.vue'
import Breadcrumb from '@/pages/common/frame/Breadcrumb.vue'

import axios from 'axios'
// import _ from 'lodash'

export default {
    name: 'ExtCheckScheduleSheet',
    components: {
        FullCalendar,
        Breadcrumb
    },
    mounted: function () {
        this.fn_fetchAdvancedInfo()
        
    },
    methods: {
        fn_fetchData: function (searchDt, type = 'dayGridMonth') {
            
            // console.log(type === 'dayGridMonth')
            const url       = type === 'dayGridMonth'
                                ? '/sendApi/api/extrnlChck/extrnlChckMnbySchdul/list'
                                : '/sendApi/api/extrnlChck/extrnlChckWeekSchdul/list'
            const payload   = {
                searchDt: searchDt,
                // chckPlanBgnde: this.$moment(searchDt, 'YYYYMMDD').add(-7, 'days').format('YYYYMMDD'),
                // chckPlanEndde: this.$moment(searchDt, 'YYYYMMDD').add(14, 'days').format('YYYYMMDD'),                
                chckPlanBgnde: this.$moment(searchDt, 'YYYYMMDD').format('YYYYMMDD'),
                chckPlanEndde: this.$moment(searchDt, 'YYYYMMDD').add(7, 'days').format('YYYYMMDD'),                
                searchMonth: String(searchDt).substring(0,6)
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
                    // console.log(response)
                    this.events = type === 'dayGridMonth'
                                    ? response.data.dlMnbySchdul
                                    : response.data.dlWeekSchdul

                    this.events.forEach(item => {
                        item.title      = item.chckKndNm 
                                            ? `[${item.chckKndNm}] / ${item.extrnlInsttNm}` 
                                            : `[${this.advancedInfo.chckKnd.find(inner => inner.codeVal === item.chckKnd)?.codeNameKr}] / ${item.extrnlInsttNm}`
                        // item.title      = item.chckKndNm
                        // item.start      = item.chckPlanBgnde + 'T00:00'
                        // item.end        = item.chckPlanEndde + 'T23:59'
                        item.start      =  type === 'dayGridMonth'
                                            ? item.chckPlanBgnde + 'T00:00'
                                            : item.chckPlanBgnde
                        item.end        =  type === 'dayGridMonth'
                                            ? item.chckPlanEndde + 'T23:59'
                                            : this.$moment(item.chckPlanEndde, 'YYYY-MM-DD').add(1, 'days').format('YYYY-MM-DD')
                        // item.place      = 

                        item.manager    = item.insctrNmDtls
                        item.id         = item.extrnlChckId

                        item.type       = type === 'dayGridMonth'
                                            ? undefined
                                            : item.baseTypeNm
                        item.description= item.projectNm

                        item.className  = item.hedofcSportRequstYn === 'Y' ? 'blue' : null
                    })
                })
                .catch(error => {
                    console.error(error)
                })
        },
        fn_changed: function (payload) {
            // console.log(payload)
            this.fn_fetchData(payload.date, payload.type)
        },
        fn_clickEvent: function (payload) {
            this.$store.dispatch('setExtCheckExtrnlChckId', payload.event.id)
            // this.$store.dispatch('setExtCheckPoutDcsnDiv', event.row.poutDcsnDiv)
            window.open(this.$router.resolve({name: 'ExtCheckMngtAllSite'}).href, '_blank' )
        },
        fn_fetchAdvancedInfo: function () {
            const masterCode = {
                url: '/sendApi/api/common/masterCode/list',
                payload: {
                    siteMstrId: this.$cookies.get('siteMstrId'),
                },
            }
            const options = {
                headers: {
                    'Authorization': this.$cookies.get('Authorization'),
                    'Content-Type': 'application/json',
                    'Accept-Language': 'ko'
                }
            }

            axios
                .all([
                    axios.post(masterCode.url, {...masterCode.payload, groupCode: 'CHCK_KND'}, options),
                ])
                .then(axios.spread((...response) => {
                    this.advancedInfo.chckKnd       = response[0].data.data
                }))
                .then(() => {
                    this.fn_fetchData(this.$moment().format('YYYYMM01'))
                })
        }
    },
    data: function () {
        return {
            events: [],

            advancedInfo: {
                chckKnd: []
            }
        }
    }
}

</script>
