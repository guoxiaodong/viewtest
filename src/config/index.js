/**
 * @file 配置文件，提供各种接口的域名、判断当前浏览器的系统，可新增
 * 注意！本地测试修改远程链接，不允许提交到git
 */

import getEnv from '@/util/getEnv'

const env = getEnv()

let api = ''

if (env === 'test') {
    // 本地测试只需修改这行代码
    api = 'http://veryid.chinacloudapp.cn:91/api'
} else if (env === 'veryid') {
    let port = window.location.port
    if (port == 98) {
        api = 'http://veryid.chinacloudapp.cn:91/api'
    } else if (port == 100) {
        api = 'http://veryid.chinacloudapp.cn:99/api'
    }
} else {
    api = 'https://' + window.location.host + '/api'
}
const URL = api
export {
    URL
}
