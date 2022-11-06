import $ from 'jquery'
    // 表格内容加入title,以便鼠标悬停显示全部内容
function setTableItem () {
    $('tbody.ivu-table-tbody span').each(function () {
        var tempDiv = this
        if ($(tempDiv).attr('class') !== 'ivu-checkbox') {
            tempDiv.setAttribute('title', tempDiv.innerHTML)
        }
    })
}
export {setTableItem}
