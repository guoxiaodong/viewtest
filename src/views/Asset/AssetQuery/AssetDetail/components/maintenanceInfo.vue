<style>
</style>
<template>
    <div>
        <div class="flex m-b-10">
            <div>
                <Input placeholder="请输入" icon="search" v-model="filterCondition.sSearch" @on-change="refresh()"></Input>
            </div>
            <div class="flex-1"></div>
            <div>
                时间：<DatePicker :value="tempTime" format="yyyy/MM/dd" type="daterange"
                               placement="bottom-end" placeholder="选择时间" @on-change="changeTime($event)" style="width: 200px"></DatePicker>
            </div>
        </div>
        <div class="sort-area">
            <filterItem v-if="filterData.priority.length" :isMulti=true :filterData="filterData.priority" :filterName="'优先级'" @filterCondition-change="conditionChange($event,'priority')"></filterItem>
            <filterItem v-if="filterData.source.length" :isMulti=true :filterData="filterData.source" :filterName="'来源'" @filterCondition-change="conditionChange($event,'source')"></filterItem>
            <filterItem v-if="filterData.status.length" :isMulti=true :filterData="filterData.status" :filterName="'状态'" @filterCondition-change="conditionChange($event,'status')"></filterItem>
        </div>
        <Alert show-icon class="no-margin">总计：{{requestData.price}}元
            <span v-if="checkedInfo.length">，选中{{checkedInfo.length}}项 ，共计{{calcChecked}}元</span>
        </Alert>
        <baseTable @on-selection-change="selectchange" ref="baseTable" :params="filterCondition" :columns="columns" requestdata="requestData" dataname="tableData" :url="dataUrl">
        </baseTable>
        <orderDetails ref="orderDetails"></orderDetails>
    </div>
</template>
<script>
    import baseTable from '../../../commonComponents/baseTable.vue'
    import filterItem from '@/components/filterItem.vue'
    import AssetManageRoute from '@/server/route/assetManage'
    import orderDetails from 'views/ReportAnalysis/WorkOrder/components/orderDetails.vue'
    
    export default {
        components: {
            baseTable, filterItem, orderDetails
        },
        data () {
            return {
                filterCondition: {
                    sSearch: '',
                    asset_id: this.$route.params.id,
                    priority: '',
                    source: '',
                    status: '',
                    startday: '',
                    endday: ''
                },
                filterData: {
                    priority: [],
                    source: [],
                    status: []
                },
                tempTime: [],
                dataUrl: AssetManageRoute.maintenanceInfo,
                tableData: [],
                requestData: {},
                checkedInfo: [], // 选中的数组
                columns: [
                    {
                        type: 'selection',
                        width: 30,
                        align: 'center'
                    },
                    {
                        title: '工单标题/编号',
                        width: '200',
                        render: (h, params) => {
                            if (!params.row.title) {
                                return h('span', {
                                    style: {
                                        color: '#D0021B'
                                    }
                                }, '暂无')
                            } else {
                                return h('div', [
                                    h('h5', {class: 'underline'}, params.row.title + '(' + params.row.workorderid + ')'),
                                    h('p', {}, params.row.description)
                                ])
                            }
                        }
                    },
                    {
                        title: '优先级',
                        align: 'center',
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
                        title: '来源',
                        align: 'center',
                        render: (h, params) => {
                            if (!params.row.source_id) {
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
                                }, params.row.source_name)
                            }
                        }
                    },
                    {
                        title: '状态',
                        align: 'center',
                        render: (h, params) => {
                            if (!params.row.status) {
                                return h('span', {
                                    style: {
                                        color: '#D0021B'
                                    }
                                }, '暂无')
                            } else {
                                return [
                                    h('span', {
                                        css: 'wo-status-' + params.row.status
                                    }),
                                    h('span', {
                                        style: {
                                            color: '#657180'
                                        }
                                    }, params.row.status_name)
                                ]
                            }
                        }
                    },
                    {
                        title: '金额',
                        align: 'center',
                        width: 80,
                        key: 'money',
                        sortable: true,
                        render: (h, params) => {
                            if (!params.row.money) {
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
                                }, params.row.money + '元')
                            }
                        }
                    },
                    {
                        title: '时间',
                        key: 'created_at',
                        width: 120,
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
                                        color: '#3399FF'
                                    },
                                    on: {
                                        click: () => {
                                            this.$refs.orderDetails.open(params.row.id)
                                        }
                                    }
                                }, '查看')
                            ])
                        }
                    }
                ]
            }
        },
        mounted () {
            this.loadSortType()
            this.refresh()
        },
        methods: {
            active () {
                this.refresh()
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
            selectchange (e) {
                this.checkedInfo = e
            },
            conditionChange (e, type) {
                let temp = []
                for (let i = 0; i < e.length; i++) {
                    temp.push(e[i].id)
                }
                this.filterCondition[type] = temp.join(',')
                this.refresh()
            },
            changeTime (e) {
                if (e.length) {
                    this.filterCondition.startday = e[0]
                    this.filterCondition.endday = e[1]
                    this.refresh()
                }
            },
            loadSortType () {
                console.log(this.globalConfig)
                if (this.globalConfig && this.globalConfig.PRIORITY) {
                    this.filterData.priority = Object.values(this.globalConfig.PRIORITY)
                }
                if (this.globalConfig && this.globalConfig.WOSOURC) {
                    this.filterData.source = Object.values(this.globalConfig.WOSOURCE)
                }
                if (this.globalConfig && this.globalConfig.WORKORDER_STATUS) {
                    for (let k in this.globalConfig.WORKORDER_STATUS) {
//                    this.filterData.status.push({id: k, name: this.globalConfig.WORKORDER_STATUS[k]})
                        this.filterData.status.push(this.globalConfig.WORKORDER_STATUS[k])
                    }
                }

//                this.axios.get('/config')
//                    .then(res => {
//                        let result = res.data
//                        this.filterData.priority = Object.values(result.PRIORITY)
//                        this.filterData.source = Object.values(result.WOSOURCE)
//                        for (let k in result.WORKORDER_STATUS) {
//                            this.filterData.status.push({id: k, name: result.WORKORDER_STATUS[k]})
//                        }
//                    })
//                    .catch(error => {
//                        this.$Message.error(error.error)
//                    })
            }
        },
        computed: {
            calcChecked: {
                get: function () {
                    let result = 0
                    for (let i = 0; i < this.checkedInfo.length; i++) {
                        result += Number(this.checkedInfo[i].money)
                    }
                    return result.toFixed(2)
                }
            }
        }
    }
</script>
