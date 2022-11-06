/**
 * 获取配置信息对应的值
 * 数组格式如下：
    "copy_type":{
        "失败":1,
        "成功":2,
        "错误":3
    }
 */
export default function getConfValue (val, arrayData) {
    for (let v of Object.values(arrayData)) {
        if (v['id'] == val) {
            return v['name']
        }
    }
}
