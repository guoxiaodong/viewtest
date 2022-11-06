export default {
    // 空间信息
    addPlace: '/webmanageplace/add', // 添加地点
    getAllSpaceType: '/webmanage/allspacetype', // 获取空间类型
    getPlaceInfo: '/webmanageplace/info/{0}', // 获取修改地点信息
    putPlace: '/webmanageplace/put', // 修改地点
    delPlace: '/webmanageplace/delete/{0}', // 删除地点
    // 空间内管理对象
    getSpaceObjectList: '/webmanage/spaceobjectlist', // 获取管理对象列表
    getSpaceObjectInfo: '/webmanage/spaceobjectinfo/{0}', // 获取选中空间对象
    putSpaceObject: '/webmanage/putspaceobject', // 修改空间管理对象
    delSpaceObject: '/webmanage/delspaceobject', // 删除空间管理对象
    // 空间类型
    getSpaceList: '/webmanage/spacetypelist', // 获取空间列表
    addSpace: '/webmanage/spacetypeadd', // 添加空间
    getSpaceInfo: '/webmanage/spacetypeinfo/{0}', // 获取空间修改信息
    editSpace: '/webmanage/putspacetype', // 编辑空间
    delSpaceType: '/webmanage/delspacetype' // 删除空间
}
