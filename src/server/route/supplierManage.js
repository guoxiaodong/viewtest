export default {
    // 供应商列表相关接口
    getSupplierList: '/supplier/lists', // 获取供应商列表
    getListStatus: '/supplier/customstatus', // 获取合作状态、合同状态
    CheckSuppName: '/supplier/validatesupplier', // 检查供应商名称是否重复
    addSupp: '/supplier', // 添加供应商
    getSupplierInfo: '/supplier/info/{0}', // 获取供应商修改信息
    putSupplier: '/supplier', // 修改供应商
    delSupplier: '/supplier/{0}', // 删除供应商
    getAllSupplierList: '/supplier/servicesupplier', // 供应商服务筛选条件
    // 概况相关接口
    getOrderNum: '/supplier/orderreceiving/{0}', // 接单量
    getMainStore: '/supplier/serviceplace/{0}', // 获取主要门店
    getWorkOrderEchart: '/supplier/getpercent/{0}', // 获取工单类别占比echart数据
    getIndexEchart: '/supplier/getpower/{0}', // 获取供应商能力指数echart数据
    getBranchInfoEchart: '/supplier/getsupplierbranch/{0}', // 获取分支机构echart数据
    getBasicBranchEchart: '/supplier/getbranchordercount/{0}', // 获取分支机构工单数量echart数据
    // 服务相关接口
    getSerNum: '/supplierservice/supplierservicecount/{0}', // 获取服务数量
    getAllSerList: '/supplierservice/supplierservicelist', // 获取所有服务列表
    getSerInfoList: '/supplierservice/allservicelist', // 获取供应商服务下拉选项
    getBranchList: '/supplierservice/supplierbranceList/{0}', // 获取服务分支
    getSerLevel: '/supplierservice/servicelevellist/{0}', // 获取服务级别
    addSer: '/supplierservice/supplierserviceoperating', // 添加服务, 修改服务
    getSerInfo: '/supplierservice/supplieseviceinfo', // 获取修改服务信息
    delSer: '/supplierservice/supplierservicedelete', // 删除服务
    // 合同相关接口
    getContractCount: '/contract/contractcount/{0}', // 获取合同数量
    getContractList: '/contract/contractlist', // 获取合同列表
    ContractNameExsits: '/contract/contractnameexsits', // 验证合同名称是否重复
    addContract: '/contract/contractadd', // 添加合同
    delContract: '/contract/contractdelete/{0}', // 删除合同
    getContractInfo: '/contract/contractget/{0}', // 获取修改合同信息
    putContract: '/contract/contractput', // 修改合同
    getContractServiceList: '/contractservice/contractservicelist', // 合同内服务列表
    getSerSelect: '/contractservice/contractservice/{0}', // 获取合同内服务商下拉选项
    getSerSelectInfo: '/contractservice/contractserviceitems', // 获取合同内服务商下拉项对应数据
    addSerInfo: '/contractservice/contractserviceitemsoperating', // 合同内服务商添加、修改
    delContractSer: '/contractservice/contractservicedelete', // 删除合同内服务商
    // 历史工单相关接口
    getHistoryWorkOrderCount: '/supplierworkorder/workordercount/{0}', // 获取历史工单数
    getHistoryWorkOrderList: '/supplierworkorder/supplierworkorderlist', // 获取历史工单列表
    getHistoryWorkOrderNum: '/supplierworkorder/workordercountmoney/{0}', // 获取历史工单统计数
    getHistoryWorkOrderInfo: '/supplierworkorder/workorderinfo', // 获取历史工单信息
    getFilterList: '/supplierworkorder/filterlist/{0}', // 获取工单筛选条件
    getFilterInfo: '/supplierworkorder/filterlist', // 筛选联动
    // 分支机构相关接口
    getAllSer: '/supplier/serviceall', // 获取所有服务接口
    getAllSuppSer: '/supplier/servicesupplierbranch', // 获取所有供应商服务
    getAllplace: '/supplier/getbuilding', // 获取所有城市接口
    getBranchLists: 'supplierbranch/lists', // 获取分支列表
    CheckBranchName: '/supplierbranch/validatesupplierbranch', // 检查分支机构名称是否重复
    addBranchList: '/supplierbranch', // 添加分支列表, 修改分支
    getBranchInfo: '/supplierbranch/info/{0}', // 获取修改分支信息
    delBranch: '/supplierbranch/{0}', // 删除分支
    getbranchServiceList: '/supplierbranch/servicelist', // 获取分支服务列表
    addBranchService: '/supplierbranch/branchservice', // 添加分支服务
    getBranchSelectSupp: '/supplier/servicesupplierbranch', // 获取分支服务供应商下拉选项
    getBranchSelectLevel: '/supplier/servicelevel', // 获取分支服务级别下拉选项
    getBranchServiceInfo: '/supplierbranch/serviceinfo/{0}', // 获取修改分支服务信息
    putBranchService: '/supplierbranch/branchservice', // 修改分支服务
    delBranchService: '/supplierbranch/service/{0}', // 删除供应商分支服务
    getBranchWorkorder: '/supplierbranch/historywo' // 获取分支历史工单
}
