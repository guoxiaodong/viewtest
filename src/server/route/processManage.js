export default {
    // 基本信息
    getFlowConfig: '/workorder-flow/config', // 获取流程配置信息
    getFlowList: '/workorder-flow',  // 获取流程列表,创建流程,编辑流程
    showFlowInfo: '/workorder-flow/{0}', // 获取流程详情,删除流程
    checkFlowName: '/workorder-flow/name-exist', // 检查流程名称
    // 环节
    getLinkConfig: '/workorder-link/config', // 获取环节配置信息
    getLinkStatus: '/workorder-status', // 获取环节中工单状态
    getLinkList: '/workorder-link/list', // 获取环节列表
    getFormTemplate: '/formtemplate', // 获取表单模板
    putLink: '/workorder-link', // 创建环节，编辑环节
    getLinkInfo: '/workorder-link/{0}', // 获取环节详情,删除环节
    getLinkAction: '/workorder-action', // 获取按钮功能
    checkLinkName: '/workorder-link/name-exist', // 检查环节名称
    // 流程图
    getFlowChart: '/workorder-flow/chart?flow_id={0}'
}
