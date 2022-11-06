export default {
    // 管理对象
    getManageList: '/webmanage/objectlists', // 获取列表
    addManageType: '/webmanage/objecttypeadd', // 添加对象大类
    delManagetype: '/webmanage/delobjecttype/{0}', // 删除对象大类
    editManagetype: '/webmanage/putobjecttype', // 编辑对象大类
    addObject: '/webmanage/objectadd', // 添加管理对象
    getObjectInfo: '/webmanage/getobjectinfo/{0}', // 获取管理对象信息
    putObject: '/webmanage/putobject', // 修改管理对象
    delObject: '/webmanage/delobject/{0}', // 删除管理对象
    // 标准组
    getGroup: '/webmanage/getstandgroup', // 获取标准组
    getGroupInfo: '/webmanage/getstandsinfo/{0}', // 获取标准项信息
    getStandardlist: '/webmanage/standardgrouplist', // 获取标准组列表
    addStandard: '/webmanage/standardgroupadd', // 添加标准组
    getStandardInfo: '/webmanage/standardgrouplistInfo/{0}?page={1}', // 获修改标准组信息
    putStandard: '/webmanage/putstandardgroup', // 修改标准组
    delStandard: '/webmanage/delstandardgroup/{0}', // 删除标准组

    /**
     * 标准项
     */

    // 搜索标准项
    searchStandard: '/webmanage/getstandsvalue'
}
