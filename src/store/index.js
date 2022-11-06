import Vue from 'vue'
import Vuex from 'vuex'
import loginUser from './modules/login_user'
import * as actions from './actions'
import mutations from './mutations'
import * as getters from './getters'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
    plugins: [
        createPersistedState({
            storage: window.localStorage,
            paths: ['config', 'token', 'loginUser']
        })
    ],
    state: {
        config: '',
        token: ''
    },
    mutations,
    actions,
    getters,
    modules: {
        loginUser
    }
})
