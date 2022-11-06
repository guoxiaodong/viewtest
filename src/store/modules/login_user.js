import * as types from '../mutation-types'
import axios from 'axios'
import API from '@/api'
const loginUser = {
    state: {
        username: '',
        supplier_id: '',
        loginFlag: 0,   // 登录标志，0：未登录操作/登录失败，1：登录成功
        error: '',       // 登录失败后的错误信息
        role: ''  // 角色
    },
    mutations: {
        [types.LOGIN_FLAG] (state, flag) {
            state.loginFlag = flag
        },
        [types.LOGIN_ERROR] (state, msg) {
            state.error = msg
        },
        [types.LOGIN_USER_NAME] (state, name) {
            state.username = name
        },
        [types.SUPPLIER_ID] (state, supplierid) {
            state.supplier_id = supplierid
        },
        [types.LOGIN_ROLE] (state, role) {
            state.role = role
        },
        [types.LOGOUT] (state) {
            state.loginFlag = 0
            state.error = ''
        }
    },
    actions: {
        login ({commit, state, rootState}, data) {
            return new Promise(function (resolve, reject) {
                axios.post(API.LOGIN, data).then(function (response) {
                    if (response.status === 200) {
                        sessionStorage.setItem('userId', response.data.user.id)
                        commit(types.LOGIN_USER_NAME, response.data.user.phone)
                        commit(types.SUPPLIER_ID, response.data.user.supplier_id)
                        commit(types.LOGIN_FLAG, 1)
                        commit(types.SET_TOKEN, response.data.token)
                    } else {
                        commit(types.LOGIN_FLAG, 0)
                        commit(types.LOGIN_ERROR, response.data.err)
                    }
                    resolve()
                }).catch(function (error) {
                    reject(error.error)
                })
            })
        }
    }
}
export default loginUser
