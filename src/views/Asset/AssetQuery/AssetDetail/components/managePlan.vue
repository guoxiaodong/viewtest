<style>
</style>
<template>
    <div>
        <div class="container" v-if="recentPlan.plan">
            <Row>
                <Col span="24"><p>编号：{{recentPlan.plan.planid}}</p></Col>
            </Row>
            <Row>
                <Col span="12"><p>计划实施时间：{{recentPlan.startTime}}</p></Col>
                <Col span="12"><p>制定人：{{recentPlan.people}}</p></Col>
            </Row>
            <Row>
                <Col span="12"><p>供应商：{{recentPlan.plan.supplier_name}}</p></Col>
                <Col span="12"><p>服务：{{recentPlan.plan.service_name}}</p></Col>
            </Row>
            <Row>
                <Col span="24"><p>空间地点：{{recentPlan.place}}</p></Col>
            </Row>
            <Row>
                <Col span="24"><p>描述：{{recentPlan.plan.note}}</p></Col>
            </Row>
            <hr>
        </div>
        <div class="sort-area">
            <filterItem v-if="filterData.priority.length" :isMulti=true :filterData="filterData.priority" :filterName="'优先级'" @filterCondition-change="conditionChange($event,'priority')"></filterItem>
            <filterItem v-if="filterData.period.length" :isMulti=true :filterData="filterData.period" :filterName="'周期'" @filterCondition-change="conditionChange($event,'source')"></filterItem>
            <filterItem v-if="filterData.supplier.length" :isMulti=true :filterData="filterData.supplier" :filterName="'供应商'" @filterCondition-change="conditionChange($event,'status')"></filterItem>
            <filterItem v-if="filterData.service.length" :isMulti=true :filterData="filterData.service" :filterName="'服务'" @filterCondition-change="conditionChange($event,'status')"></filterItem>
        </div>
        <div class="flex m-t-10 m-b-10">
            <div>
                <Button type="primary" @click="addPlan()">+ 新建</Button>
            </div>
            <div class="flex-1"></div>
            <div>
                <Input placeholder="请输入" icon="search" v-model="filterCondition.sSearch" @on-change="refresh()"></Input>
            </div>
        </div>
        <baseTable ref="baseTable" :params="filterCondition" :columns="columns" :data="tableData" dataname="tableData" :url="dataUrl">
        </baseTable>
        <planDetail ref="planDetail"></planDetail>
    </div>
</template>
<script>
    import baseTable from '../../../commonComponents/baseTable.vue'
    import planDetail from '../../../commonComponents/managePlanDetailInfo.vue'
    import AssetManageRoute from '@/server/route/assetManage'
    import filterItem from '@/components/filterItem.vue'
    
    export default {
        components: {
            baseTable, filterItem, planDetail
        },
        data () {
            return {
                filterCondition: {
                    sSearch: '', // 搜索关键字
                    asset_id: this.$route.params.id,
                    priority: '', // 优先级
                    period: '', // 周期
                    supplier: '', // 供应商
                    service: '' // 服务
                },
                filterData: {
                    priority: [],
                    period: [],
                    supplier: [],
                    service: [],
                    hasLoad: false
                },
                tablename: '管理计划',
                dataUrl: AssetManageRoute.assetplanlist, // 获取列表接口
                filterUrl: AssetManageRoute.getplanfilter,
                recentPlan: {}, // 最近的计划
                columns: [
                    {
//                        title: '计划标题/编号',
                        title: '编号',
                        width: '300',
                        render: (h, params) => {
                            if (!params.row.planid) {
                                return h('span', {
                                    style: {
                                        color: '#D0021B'
                                    }
                                }, '暂无')
                            } else {
                                return h('span', {
                                    style: {
                                        color: '#657180'
                                    }
                                }, params.row.planid)
                            }
                        }
                    },
                    {
                        title: '优先级',
                        render: (h, params) => {
                            if (!params.row.priority) {
                                return h('span', {
                                    style: {
                                        color: '#D0021B'
                                    }
                                }, '暂无')
                            } else {
                                return h('span', {
                                    class: 'priority-' + params.row.priority
                                }, params.row.priority_name)
                            }
                        }
                    },
                    {
                        title: '周期',
                        key: 'period',
                        sortable: true,
                        render: (h, params) => {
                            if (!params.row.cycle) {
                                return h('span', {
                                    style: {
                                        color: '#D0021B'
                                    }
                                }, '暂无')
                            } else {
                                return h('span', {
                                    style: {
                                        color: '#657180'
                                    }
                                }, params.row.cycle)
                            }
                        }
                    },
                    {
                        title: '供应商',
                        key: 'supplier',
                        sortable: true,
                        render: (h, params) => {
                            if (!params.row.supplier_id) {
                                return h('span', {
                                    style: {
                                        color: '#D0021B'
                                    }
                                }, '暂无')
                            } else {
                                return h('span', {
                                    style: {
                                        color: '#657180'
                                    }
                                }, params.row.supplier_name)
                            }
                        }
                    },
                    {
                        title: '服务',
                        sortable: true,
                        key: 'service',
                        render: (h, params) => {
                            if (!params.row.service_id) {
                                return h('span', {
                                    style: {
                                        color: '#D0021B'
                                    }
                                }, '暂无')
                            } else {
                                return h('span', {
                                    style: {
                                        color: '#657180'
                                    }
                                }, params.row.service_name)
                            }
                        }
                    },
                    {
                        title: '制定人',
                        key: 'updated_at',
                        render: (h, params) => {
                            if (!params.row.creator) {
                                return h('span', {
                                    style: {
                                        color: '#D0021B'
                                    }
                                }, '暂无')
                            } else {
                                return h('span', {
                                    style: {
                                        color: '#657180'
                                    }
                                }, params.row.creator)
                            }
                        }
                    },
                    {
                        title: '创建时间',
                        key: 'created_at',
                        width: 180,
                        sortable: true,
                        render: (h, params) => {
                            if (!params.row.created_at) {
                                return h('span', {
                                    style: {
                                        color: '#D0021B'
                                    }
                                }, '暂无')
                            } else {
                                return h('span', {
                                    style: {
                                        color: '#657180'
                                    }
                                }, params.row.created_at)
                            }
                        }
                    },
                    {
                        title: '操作',
                        width: 80,
                        key: 'action',
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('a', {
                                    style: {
                                        marginRight: '20px',
                                        color: '#3399FF'
                                    },
                                    on: {
                                        click: () => {
                                            this.toDetail(params.row.id)
                                        }
                                    }
                                }, '查看')
                            ])
                        }
                    }
                ],
                tableData: []
            }
        },
        created () {
        },
        methods: {
            active () {
                this.refresh()
                this.loadRecentPlan()
                this.loadSortType()
            },
            refresh () {
                let search = this.filterCondition.sSearch
                setTimeout(() => {
                    if (search !== this.filterCondition.sSearch) {
                        return
                    }
                    this.$refs.baseTable.list()
                }, 1000)
            },
            loadSortType () {
                if (!this.filterData.hasLoad) {
                    let params = {asset_id: this.$route.params.id}
                    this.axios.get(this.filterUrl, {params: params})
                        .then(res => {
                            let result = res.data
                            this.filterData.priority = Object.values(result.priority)
                            this.filterData.period = Object.values(result.period)
                            this.filterData.supplier = result.suppliers
                            this.filterData.service = result.services
                            this.filterData.hasLoad = true
                        })
                        .catch(error => {
                            this.$Message.error(error.error)
                        })
                }
            },
            loadRecentPlan () {
                let params = {asset_id: this.$route.params.id}
                this.axios.get(AssetManageRoute.futureplan, {params: params})
                    .then(res => {
                        this.recentPlan = res.data
                    })
                    .catch(error => {
                        this.$Message.error(error.error)
                    })
            },
            conditionChange (e, type) {
                let temp = []
                for (let i = 0; i < e.length; i++) {
                    temp.push(e[i].id)
                }
                this.filterCondition[type] = temp.join(',')
                this.refresh()
            },
            addPlan () {
                this.$refs.planDetail.open(1)
            }
        }
    }
</script>
