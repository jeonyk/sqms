//import 'es6-promise/auto';
import '@babel/polyfill';
import Vue from 'vue';
import Vuex from 'vuex'
import App from './App.vue';
import store from "./store/"
import router from "./router/router";
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import vueMoment from 'vue-moment';
import momentTimezone from 'moment-timezone';
import VueSignature from "vue-signature-pad"

// import VueAxios from 'vue-axios'
// import { axios } from '@plugin/apis/instance'
import axios from '@plugin/apis/instance'

import VueCookies from 'vue-cookies';
import VueSession from 'vue-session'
import Print from 'vue-print-nb';

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import './assets/scss/_index.scss'
import { i18n } from "@/plugin/i18n/i18n";
import SQMSGrid from '@/pages/common/grid/SQMSGrid'
import PopAlert from '@/pages/common/popup/PopAlert'

import axiosInterceptor from "@/plugin/apis/instance";
import VueFriendlyIframe from 'vue-friendly-iframe'

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(vueMoment, {
  moment: momentTimezone
})
momentTimezone.tz.setDefault('Asia/Seoul')
momentTimezone.locale('ko')

//Vue.prototype.$api = axios
// Vue.use(axios)
// Vue.use(VueAxios, axios)

Vue.use(Vuex)
Vue.use(VueCookies)
Vue.use(Print)
Vue.use(VueSession, {
  persist: true
})
Vue.use(VueSignature)
Vue.use(VueFriendlyIframe)

//Vue.use(axiosInterceptor);
Vue.prototype.axios = axiosInterceptor;

Vue.component('sqms-grid', SQMSGrid)
Vue.component('pop-alert', PopAlert)
// Vue.component('vue-friendly-iframe', VueFriendlyIframe)

Vue.config.productionTip = false

//쿠키의 만료일 (글로벌 세팅) 7일
Vue.$cookies.config("7d");


new Vue({
  store,
  router,
  i18n,
  // VueAxios,
  render: h => h(App),
}).$mount('#app')
