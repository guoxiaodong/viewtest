export default {
    supplierCata: '/Service/supplierservicecontents', // 供应商服务目录树图
    internalCata: '/Service/indoorservicelist', // 内部服务目录树图
    checkServiceCataname: '/Service/testservicetype', // 检查服务分类名称重复
    checkServiceGroup: '/Service/testservicegroup/{0}', // 验证服务组名是否存存在
    addServiceClass: '/Service/addsupplierservicegrouptype', // 添加供应商服务类
    addServiceGroup: '/Service/addservicegroup', // 添加供应商服务组
    addInternalClass: '/Service/addindoorservicegrouptype', // 添加内部服务分类
    //
    //
    supplierremoveCheck: '/Service/testservicetypedel', // 供应商一级目录删除验证（服务组分类）
    cataRemoveCheck: '/Service/testservicetypegroupdel', // 其他删除验证（服务组）
    removeCataClass: '/Service/servicetypedel', // 目录一级删除（服务组分类）
    removeCataGroup: '/Service/servicetypegroupdel', // 目录二级删除（服务组）
    //
    //
    cataDetail: '/Service/servicelistinfo/{0}', // 服务目录详情
    cataDetailModify: '/Service/servicelistinfoup/{0}', // 服务目录详情修改
    changeNode: '/Service/putservicetype', // 节点拖拽
    //
    //
    testservicename: '/Service/testservicename', // 新建服务名称查重
    // 供应商服务
    supplierStepOne: '/Service/addsupplierservice',
    supplierStepThree: '/Service/addservicelevels',
    supplierStepFour: '/Service/addsupplier',
    finances: '/finances', // 财务接口
    object: '/object', // 所属对象
    getservicecolumns: '/Service/getservicecolumns', // 第二步查询服务项
    addServiceItem: '/Service/addsupplierservicecolumns', // 第二步增加服务项
    editServiceItem: '/Service/putsupplierservicecolumn', // 第二步修改服务项
    removeServiceItem: '/Service/delsupplierservicecolumn', // 第二步删除服务项
    // 第三步
    getLevelslist: '/Service/getlevelslist', // 查询等级
    addLevelItem: '/Service/addservicelevels', // 增加服务等级
    getEditLevel: '/Service/getlevelsinfo/{0}', // 获取编辑
    editLevel: '/Service/putlevel', // 提交编辑
    removeLevel: '/Service/dellevel', // 删除等级
    checkname: '/Service/testservicelevelname', // 新建查重
    // 第四步
    getSupplierService: '/Service/getsupplierlist', // 获取供应商列表
    getSupplierItem: '/Service/suppliers', // 获取供应商
    getLevels: '/Service/levels', // 获取等级
    getbranchs: '/Service/branchs', // 获取分支
    submitSupplier: '/Service/addsupplier', // 提交新建
    removeSupplier: '/Service/supplierlistdel', // 删除供应商
    getEditSupplier: '/Service/putsupplierlist', // 获取编辑
    submitEdit: '/Service/putsupplier', // 提交修改
    // 修改供应商
    // 内部服务
    // 第一步
    interWorktype: '/Service/worktype', // 工单类型
    getServicePlace: '/space/all/format', // 获取服务范围
    submitInternal: '/Service/addindoorservice', // 新建内部
    checkNameInetrnal: '/Service/testindoorservicename', // 新增名称查重
    // 第二步
    getlistsupplier: '/Service/supplierservicelist', // 查询供应商服务列表
    addSupplier: '/Service/addinsuprelate', // 添加
    getItemSupplierService: '/Service/supplierservices', // 获取备选
    removeinternalSupplier: '/Service/supplierservicedel', // 删除
    editInternalService: '/Service/putinsuprelate', // 编辑
    //
    //
    //
    // 列表
    removeList: '/Service/servicedel', // 删除
    serviceStart: '/Service/servicestart', // 启用
    serviceStop: '/Service/servicestop', // 停用
    getSupplierPlace: '/Service/getsupplierservicesite', // 供应商地点
    getInternalPlace: '/Service/getindoorservicesite', // 内部地点
    interDetail: '/Service/getindoorserviceup', // 编辑修改内部服务
    interEdit: '/Service/indoorserviceup/{0}', // 修改内部信息
    supplierDetail: '/Service/getsupplierservices', // 编辑修改供应商服务
    supplierEdit: '/Service/addsupplierservice', // 修改供应商服务
    // 图标
    getIcon: '/Service/defaulitimages' // 获取图标url
}
