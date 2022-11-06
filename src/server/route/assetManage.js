export default {
    /** 资产目录
   */
    // 资产树形图
    assettype: '/assetdirectory', // 获取资产分类树形图内容
    checkAssettype: '/validateobjectunique', // 验证添加资产分类
    addAssettype: '/addobjectassettype', // 添加资产分类
    removeAssettype: '/delobjectasset/{0}', // 删除资产分类
    checkRemoveAssettype: '/validateobjectasset', // 验证删除资产分类
    editAsset: '', // 修改资产分类名称
    // 资产列表
    checkAssetItem: '/validatedelasset/{0}', // 验证删除资产信息
    removeAssetItem: '/delasset/{0}', // 删除资产信息
    addAssetItem: '/addassettype', // 添加资产信息
    editAssetItem: '/assettypeupdate/{0}', // 修改资产信息
    assetList: '/assetlist', // 获取资产列表
    /*
    *
    *资产查询
    *
    *
    */
    //  各个接口
    getAssetsClass: '/assetsclass', // 分类列表
    colProp: '/asset/index-properties', // 资产列属性
    getAssetFilter: '/asset/filter-properties', // 筛选属性
    getAssetCondition: '/asset/property-condition', // 筛选条件
    maintenanceInfo: '/assetworklist', // 维护信息列表
    asseteventlist: '/asseteventlist', // 事件列表
    assetDetail: '/asset/{0}', // 资产详情
    getplanfilter: '/getplanfilter', // 获取管理计划筛选条件
    assetplanlist: '/assetplanlist', // 管理计划列表
    futureplan: '/futureplan', // 获取近期计划

    assetchangelist: 'assetchangelist', // 资产详情页，变更记录
    checkworkorder: 'checkworkorder', // 资产详情页，盘点记录
    asset: '/asset', // post新增资产登记
    getSpaceAll: '/space/all', // 获取所有空间，用于新增登记资产时存放地点选择
    getAssetProperties: '/asset/assetproperties/{0}', // 根据规格id获取新增登记资产的自定义字段
    getAssetRecord: '/asset/asset-record', // 资产记录列表
    getAssetList: 'asset' // 资产查询列表
}
