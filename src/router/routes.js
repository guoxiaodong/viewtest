const routes = [
    {
        path: '/',
        component: (resolve) => require(['@/views/login.vue'], resolve)
    },
    {
        path: '/organization/role',
        meta: {
            title: '组织机构'
        },
        component: (resolve) => require(['@/views/index.vue'], resolve),
        children: [
            {
                path: '/organization/role',
                meta: {
                    title: '角色管理',
                    requireAuth: true
                },
                component: (resolve) => require(['@/views/Organization/Role/list.vue'], resolve)
            },
            {
                path: '/organization/user',
                meta: {
                    title: '用户管理',
                    requireAuth: true
                },
                component: (resolve) => require(['@/views/Organization/User/list.vue'], resolve)
            },
            {
                path: '/organization/rights',
                meta: {
                    title: '权限管理',
                    requireAuth: true
                },
                component: (resolve) => require(['@/views/Organization/Rights/list.vue'], resolve)
            },
            {
                path: '/organization/organize/list',
                meta: {
                    title: '组织机构',
                    requireAuth: true
                },
                component: (resolve) => require(['@/views/Organization/Organize/list.vue'], resolve),
                children: [
                    {
                        path: '/organization/organize/list/:id',
                        meta: {
                            name: 'organizelist',
                            title: '组织机构表',
                            requireAuth: true
                        },
                        component: (resolve) => require(['@/views/Organization/Organize/components/organizeList.vue'], resolve)
                    },
                    {
                        path: '/organization/organize/chart/:id',
                        meta: {
                            title: '组织机构图',
                            requireAuth: true
                        },
                        component: (resolve) => require(['@/views/Organization/Organize/components/organizeChart.vue'], resolve)
                    }
                ]
            },
            {
                path: '/organization/post',
                meta: {
                    title: '岗位管理',
                    requireAuth: true
                },
                component: (resolve) => require(['@/views/Organization/Post/list.vue'], resolve)
            }
        ]
    },
    // 配置管理
    {
        path: '/manage/object',
        meta: {
            title: '配置管理'
        },
        component: (resolve) => require(['@/views/index.vue'], resolve),
        children: [
            {
                path: '/manage/objects',
                meta: {
                    title: '管理对象',
                    requireAuth: true
                },
                component: (resolve) => require(['@/views/Manage/Object/list.vue'], resolve),
                children: [
                    {
                        path: '/manage/objects',
                        meta: {
                            title: '管理对象',
                            requireAuth: true
                        },
                        component: (resolve) => require(['@/views/Manage/Object/components/objectList.vue'], resolve)
                    },
                    {
                        path: '/manage/standard',
                        meta: {
                            title: '管理对象',
                            requireAuth: true
                        },
                        component: (resolve) => require(['@/views/Manage/Object/components/objectStandard.vue'], resolve)
                    }
                ]
            },
            {
                path: '/manage/spaceobjects',
                meta: {
                    title: '空间信息管理',
                    requireAuth: true
                },
                component: (resolve) => require(['@/views/Manage/SpaceInfo/list.vue'], resolve),
                children: [
                    {
                        path: '/manage/spaceobjects/',
                        meta: {
                            title: '空间及空间内对象',
                            requireAuth: true
                        },
                        component: (resolve) => require(['@/views/Manage/SpaceInfo/components/objectList.vue'], resolve)
                    },
                    {
                        path: '/manage/spacetype/',
                        meta: {
                            title: '空间类型',
                            requireAuth: true
                        },
                        component: (resolve) => require(['@/views/Manage/SpaceInfo/components/typelist.vue'], resolve)
                    }
                ]
            }
        ]
    },
    {
        path: '/ReportAnalysis/WorkOrder',
        meta: {
            title: '报表分析'
        },
        component: (resolve) => require(['@/views/index.vue'], resolve),
        children: [
            {
                path: '/ReportAnalysis/WorkOrder',
                meta: {
                    title: '工单',
                    requireAuth: true
                },
                component: (resolve) => require(['@/views/ReportAnalysis/WorkOrder/list.vue'], resolve)
            },
            {
                path: '/ReportAnalysis/QuestionExport',
                meta: {
                    title: '问题导出',
                    requireAuth: true
                },
                component: (resolve) => require(['@/views/ReportAnalysis/QuestionExport/list.vue'], resolve)
            }
        ]
    },
    {
        path: '/MaterialManage/BasicInfo',
        meta: {
            title: '物料管理'
        },
        component: (resolve) => require(['@/views/index.vue'], resolve),
        children: [
            {
                path: '/MaterialManage/BasicInfo',
                meta: {
                    title: '物料基本配置',
                    requireAuth: true
                },
                component: (resolve) => require(['@/views/MaterialManage/BasicInfo/list.vue'], resolve)
            },
            {
                path: '/MaterialManage/InventoryManage',
                meta: {
                    title: '出入库',
                    requireAuth: true
                },
                component: (resolve) => require(['@/views/MaterialManage/InventoryManage/list.vue'], resolve)
            }
        ]
    },
    {
        path: '/BudgetManage/SubjectSet',
        meta: {
            title: '预算管理'
        },
        component: (resolve) => require(['@/views/index.vue'], resolve),
        children: [
            /* {
                path: '/BudgetManage/BudgetManage',
                meta: {
                    title: '预算管理',
                    requireAuth: true
                },
                component: (resolve) => require(['@/views/BudgetManage/BudgetManage/list.vue'], resolve)
            }, */
            {
                path: '/BudgetManage/Overview',
                meta: {
                    title: '预算管理',
                    requireAuth: true
                },
                component: (resolve) => require(['@/views//BudgetManage/Overview/list.vue'], resolve)
            },
            {
                path: '/BudgetManage/Adjust',
                meta: {
                    title: '预算管理',
                    requireAuth: true
                },
                component: (resolve) => require(['@/views//BudgetManage/Adjust/list.vue'], resolve)
            },
            /* {
                path: '/BudgetManage/Budget',
                meta: {
                    title: '预算管理',
                    requireAuth: true
                },
                component: (resolve) => require(['@/views/BudgetManage/Budget/list.vue'], resolve)
            }, */
            {
                path: '/BudgetManage/SubjectSet',
                meta: {
                    title: '财务科目',
                    requireAuth: true
                },
                component: (resolve) => require(['@/views/BudgetManage/SubjectSet/list.vue'], resolve)
            },
            {
                path: '/BudgetManage/BudgetSet',
                meta: {
                    title: '预算设置',
                    requireAuth: true
                },
                component: (resolve) => require(['@/views/BudgetManage/BudgetSet/list.vue'], resolve)
            }
        ]
    },
    {
        path: '/ProcessManage/WorkOrders',
        meta: {
            title: '流程管理'
        },
        component: (resolve) => require(['@/views/index.vue'], resolve),
        children: [
            {
                path: '/processmanage/workorders',
                meta: {
                    title: '工单审批',
                    requireAuth: true
                },
                component: (resolve) => require(['@/views/ProcessManage/WorkOrders/list.vue'], resolve)
            },
            {
                path: '/processmanage/add',
                meta: {
                    title: '新增流程',
                    requireAuth: true
                },
                component: (resolve) => require(['@/views/ProcessManage/WorkOrders/components/add.vue'], resolve)
            },
            {
                path: '/processmanage/creatlinklist',
                meta: {
                    title: '新增环节列表',
                    requireAuth: true
                },
                component: (resolve) => require(['@/views/ProcessManage/WorkOrders/components/creatInfoList.vue'], resolve),
                children: [
                    {
                        path: '/processmanage/creatbasic/:id',
                        meta: {
                            title: '基本信息',
                            requireAuth: true
                        },
                        component: (resolve) => require(['@/views/ProcessManage/WorkOrders/components/creatBasic.vue'], resolve)
                    },
                    {
                        path: '/processmanage/creatlink/:id',
                        meta: {
                            title: '环节',
                            requireAuth: true
                        },
                        component: (resolve) => require(['@/views/ProcessManage/WorkOrders/components/creatLink.vue'], resolve)
                    }
                ]
            },
            {
                path: '/processmanage/addlinklist',
                meta: {
                    title: '新增环节',
                    requireAuth: true
                },
                component: (resolve) => require(['@/views/ProcessManage/WorkOrders/components/addLink.vue'], resolve),
                children: [
                    {
                        path: '/processmanage/addlinkbasic/:id',
                        meta: {
                            title: '基本信息',
                            requireAuth: true
                        },
                        component: (resolve) => require(['@/views/ProcessManage/WorkOrders/components/addLinkBasic.vue'], resolve)
                    },
                    {
                        path: '/processmanage/addlinkform/:id/:linkid',
                        meta: {
                            title: '表单模板',
                            requireAuth: true
                        },
                        component: (resolve) => require(['@/views/ProcessManage/WorkOrders/components/addLinkForm.vue'], resolve)
                    }
                ]
            },
            {
                path: '/processmanage/editlinklist',
                meta: {
                    title: '编辑环节',
                    requireAuth: true
                },
                component: (resolve) => require(['@/views/ProcessManage/WorkOrders/components/editLink.vue'], resolve),
                children: [
                    {
                        path: '/processmanage/editlinkbasic/:id/:linkid',
                        meta: {
                            title: '编辑基本信息',
                            requireAuth: true
                        },
                        component: (resolve) => require(['@/views/ProcessManage/WorkOrders/components/editLinkBasic.vue'], resolve)
                    },
                    {
                        path: '/processmanage/editlinkform/:id/:linkid',
                        meta: {
                            title: '编辑表单模板',
                            requireAuth: true
                        },
                        component: (resolve) => require(['@/views/ProcessManage/WorkOrders/components/editLinkForm.vue'], resolve)
                    }
                ]
            }
        ]
    },
    {
        path: '/ServiceManage/SupplierService/ServiceQuery',
        meta: {
            title: '服务管理'
        },
        component: (resolve) => require(['@/views/index.vue'], resolve),
        children: [
            {
                path: '/ServiceManage/SupplierService/ServiceQuery',
                meta: {
                    title: '供应商服务查询',
                    requireAuth: true
                },
                component: (resolve) => require(['@/views/ServiceManage/SupplierService/ServiceQuery/list.vue'], resolve)
            },
            {
                path: '/ServiceManage/SupplierService/SupplierCatalog',
                meta: {
                    title: '供应商服务目录',
                    requireAuth: true
                },
                component: (resolve) => require(['@/views/ServiceManage/SupplierService/SupplierCatalog/list.vue'], resolve)
            },
            {
                path: '/ServiceManage/InternalService/InternalQuery',
                meta: {
                    title: '内部服务查询',
                    requireAuth: true
                },
                component: (resolve) => require(['@/views/ServiceManage/InternalService/InternalQuery/list.vue'], resolve)
            },
            {
                path: '/ServiceManage/InternalService/InternalCatalog',
                meta: {
                    title: '内部服务目录',
                    requireAuth: true
                },
                component: (resolve) => require(['@/views/ServiceManage/InternalService/InternalCatalog/list.vue'], resolve)
            }
        ]
    },
    {
        path: '/SupplierManage/Supplier',
        meta: {
            title: '供应商管理'
        },
        component: (resolve) => require(['@/views/index.vue'], resolve),
        children: [
            {
                path: '/suppliermanage/supplier',
                meta: {
                    title: '供应商管理',
                    requireAuth: true
                },
                component: (resolve) => require(['@/views/SupplierManage/Supplier/list.vue'], resolve)
            },
            {
                path: '/suppliermanage/showinfo',
                meta: {
                    title: '供应商信息',
                    requireAuth: true
                },
                component: (resolve) => require(['@/views/SupplierManage/Supplier/components/showinfo.vue'], resolve),
                children: [
                    {
                        path: '/suppliermanage/basic/:id',
                        meta: {
                            title: '概况',
                            requireAuth: true
                        },
                        component: (resolve) => require(['@/views/SupplierManage/Supplier/components/basic/basic.vue'], resolve)
                    },
                    {
                        path: '/suppliermanage/service/:id',
                        meta: {
                            title: '服务',
                            requireAuth: true
                        },
                        component: (resolve) => require(['@/views/SupplierManage/Supplier/components/service/service.vue'], resolve)
                    },
                    {
                        path: '/suppliermanage/contract/:id',
                        meta: {
                            title: '合同',
                            requireAuth: true
                        },
                        component: (resolve) => require(['@/views/SupplierManage/Supplier/components/contract/contract.vue'], resolve)
                    },
                    {
                        path: '/suppliermanage/historywork/:id',
                        meta: {
                            title: '历史工单',
                            requireAuth: true
                        },
                        component: (resolve) => require(['@/views/SupplierManage/Supplier/components/historywork/historywork.vue'], resolve)
                    },
                    {
                        path: '/suppliermanage/structure/:id',
                        meta: {
                            title: '分支结构',
                            requireAuth: true
                        },
                        component: (resolve) => require(['@/views/SupplierManage/Supplier/components/structure/structure.vue'], resolve)
                    }
                ]
            },
            {
                path: '/suppliermanage/contract/showcontract/:id/:sid',
                meta: {
                    title: '查看合同',
                    requireAuth: true
                },
                component: (resolve) => require(['@/views/SupplierManage/Supplier/components/contract/showContract.vue'], resolve)
            },
            {
                path: '/suppliermanage/structure/showbranch/:id/:sid',
                meta: {
                    title: '查看分支结构',
                    requireAuth: true
                },
                component: (resolve) => require(['@/views/SupplierManage/Supplier/components/structure/showBranch.vue'], resolve),
                children: [
                    {
                        path: '/suppliermanage/structure/showBranchSuppList/:id/:sid',
                        meta: {
                            title: '分支结构-供应商服务',
                            requireAuth: true
                        },
                        component: (resolve) => require(['@/views/SupplierManage/Supplier/components/structure/showBranchSuppSerList.vue'], resolve)
                    },
                    {
                        path: '/suppliermanage/structure/showBranchWorkOrder/:id/:sid',
                        meta: {
                            title: '分支结构-供应商服务',
                            requireAuth: true
                        },
                        component: (resolve) => require(['@/views/SupplierManage/Supplier/components/structure/showBranchWorkOrderList.vue'], resolve)
                    }
                ]
            }
        ]
    },
    {
        path: '/Asset',
        meta: {
            title: '资产管理'
        },
        component: (resolve) => require(['@/views/index.vue'], resolve),
        children: [
            {
                path: '/Asset/AssetQuery',
                meta: {
                    title: '资产查询',
                    requireAuth: true
                },
                component: (resolve) => require(['@/views/Asset/AssetQuery/list.vue'], resolve)
            },
            {
                path: '/Asset/AssetQuery/AssetDetail/:id',
                meta: {
                    title: '资产详情',
                    requireAuth: true
                },
                component: (resolve) => require(['@/views/Asset/AssetQuery/AssetDetail/list.vue'], resolve)
            },
            {
                path: '/Asset/AssetManage',
                meta: {
                    title: '资产目录管理',
                    requireAuth: true
                },
                component: (resolve) => require(['@/views/Asset/AssetManage/list.vue'], resolve)
            }
        ]
    }

]
export default routes
