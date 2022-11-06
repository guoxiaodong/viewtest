/**
 * @file 获取当前环境信息
 */

export default function getEnv () {
    const url = window.location.host
    let env = 'prd'
    if (/^(test-|localhost)/.test(url)) {
        env = 'test'
    } else if (/^veryid/.test(url)) {
        env = 'veryid'
    }
    return env
}
