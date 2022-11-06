// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import iView from 'iview'
import App from './App'
import _ from 'lodash'
import router from './router'
import store from './store'
import Babelpolyfill from 'babel-polyfill'
import 'iview/dist/styles/iview.css'
import * as types from './store/mutation-types'
import axios from './util/http'
import $ from 'jquery'

Vue.use(Babelpolyfill)
Vue.use(iView)
Vue.config.productionTip = false
Vue.prototype.axios = axios
Vue.prototype._ = _
Vue.prototype.$ = Vue.prototype.jQuery = $
/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    types,
    template: '<App/>',
    components: { App }
})
