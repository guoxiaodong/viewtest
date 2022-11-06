import axios from 'axios'
import store from '@/store'
import * as types from '@/store/mutation-types'
import router from '@/router'
import {URL} from '@/config'
// axios 配置
axios.defaults.timeout = 10000
axios.defaults.baseURL = URL

// http request 拦截器
axios.interceptors.request.use(
    config => {
        if (store.state.token) {
            config.headers.Authorization = `Bearer ${store.state.token}`
        }
        return config
    },
    err => {
        return Promise.reject(err)
    })

// http response 拦截器
axios.interceptors.response.use(
    response => {
        return response
    },
    error => {
        if (error.response) {
            switch (error.response.status) {
            case 400:
            case 401:
                store.commit(types.LOGOUT)
                router.replace({
                    path: '/',
                    query: {redirect: router.currentRoute.fullPath}
                })
                break
            case 422:
                error.response.data.error = error.response.data.code
                break
            case 404:
                break
            case 500:
                if (typeof error.response.data == 'string') {
                    error.response.data = {error: '内部错误'}
                } else {
                    error.response.data.error = error.response.data.error ? error.response.data.error : '内部错误'
                }
                break
            }
        }
        return Promise.reject(error.response.data)
        // console.log(JSON.stringify(error));//console : Error: Request failed with status code 402
    }
)

export default axios
