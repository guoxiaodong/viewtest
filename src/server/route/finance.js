export default {
    financePost: '/finance',
    financePut: '/finance',
    finances: '/finances',
    financeCheckName: '/finance-check/name',
    financeCheckNo: '/finance-check/no',
    financeDelete: '/finance/{0}',
    getSpace: '/budget/places',
    getDetail: '/finance/{0}', // 科目（组）详情
    yearFinanceByPlace: '/budget/s/year/{0}/{1}', // 预算设置中点击左侧地点，获取右侧数据,
    monthFinanceByPlace: '/budget/s/permonth/{0}/{1}', // 预算设置中点击左侧地点，获取右侧数据,
    budgetSDate: '/budget/s/date', // 预算设置中最右下角图表
    budgetById: '/budget/{id}', //  弹出预算编辑的模态框时获取数据
    budgetByMonthPlace: '/budget/{0}/{1}', // 获取预算详情，用于弹出框编辑
    budgetSave: '/budget', // 预算设置中，预算编辑的保存
    budgetWebtips: '/budget/s/webtips', // 预算概览最上面的图表数据和中间tab数据
    budgetSMonth: '/budget/s/month', // 预算概览最下面图表，按年统计的数据
    budgetPlaceLevel: '/budget/s/placeLevel', // 地图图表数据获取
    budgetSFinancesYear: '/budget/s/finances/{0}', // 预算概览页面饼图数据
    budgetSBuildingRank: '/budget/s/building-rank', // 排行列表
    budgetSNotSettledWorkorders: '/budget/s/notsettled-workorders', // 预算调整左侧 未完成工单列表
    supplierLists: '/supplier/lists', // 供应商列表
    budgetSBuildingWorkorder: '/budget/s/building-workorder', // 预算调整图表
    budgetColors: '/budget/colors', // 工单状态颜色获取
    bWOSettleAccountTime: '/budget/workorder/settle-account-time' // 设置结算时间
}
