import * as types from './mutation-types'
const mutations = {
    [types.SET_TOKEN] (state, token) {
        state.token = token
    },
    [types.SET_CONFIG] (state, config) {
        state.config = config
    }
}
export default mutations
