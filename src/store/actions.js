import axios from 'axios'
import * as types from './mutation-types.js'
import API from '@/api'
export const ajaxConfig = ({ commit, state }) => {
    return new Promise(function (resolve, reject) {
        axios.get(API.VERYID_CONFIG + '?version=' + state.config.VERSION).then(function (response) {
            if (response.data.status === 1) {
                commit(types.SET_CONFIG, response.data.config)
            }
            resolve()
        })
        .catch(function (response) {
            reject()
        })
    })
}

export const initConfig = ({ dispatch, commit }) => {
    dispatch('ajaxConfig').then((config) => {
        // commit(types.SET_CONFIG, localStorage.valueOf())
    })
}
