// 传值参数处理，表单数据插入为字符串
// paramInstring([传入数组型参数])
var paramInstring = function (data) {
    var tempItem = ''
    for (var k in data) {
        tempItem += data[k] + ','
    }
    tempItem = tempItem.substr(0, tempItem.length - 1)
    return tempItem
}
export {paramInstring}
