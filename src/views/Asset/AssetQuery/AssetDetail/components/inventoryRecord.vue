<style>
</style>
<template>
    <div>
        <div class="flex m-b-10">
            <div class="flex-1"></div>
            <div>
                <Input placeholder="请输入" icon="search" v-model="filterCondition.search" @on-change="refresh()"></Input>
            </div>
        </div>
        <baseTable ref="baseTable" :params="filterCondition" :columns="columns" :data="tableData" dataname="tableData" :url="dataUrl">
        </baseTable>
        <detailInfo ref="detailInfo"></detailInfo>
    </div>
</template>
<script>
    import baseTable from '../../../commonComponents/baseTable.vue'
    import detailInfo from '../../../commonComponents/detailInfo.vue'
    import AssetManageRoute from '@/server/route/assetManage'
    export default {
        components: {
            baseTable, detailInfo
        },
        data () {
            return {
                filterCondition: {
                    search: '',
                    asset_id: this.$route.params.id
                },
                tablename: '盘点记录',
                dataUrl: AssetManageRoute.checkworkorder, // 获取列表接口
                columns: [
                    {
                        title: '工单标题/编号',
                        key: 'titl',
                        width: '300',
                        render: (h, params) => {
                            if (!params.row.updated_at) {
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
                                }, params.row.updated_at)
                            }
                        }
                    },
                    {
                        title: '优先级',
                        key: 'priority',
                        render: (h, params) => {
                            if (!params.row.updated_at) {
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
                        key: 'updated_at',
                        sortable: true,
                        render: (h, params) => {
                            if (!params.row.updated_at) {
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
                                }, params.row.updated_at)
                            }
                        }
                    },
                    {
                        title: '状态',
                        key: 'updated_at',
                        sortable: true,
                        render: (h, params) => {
                            if (!params.row.updated_at) {
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
                        title: '处理人',
                        key: 'updated_at',
                        render: (h, params) => {
                            if (!params.row.updated_at) {
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
                                }, params.row.updated_at)
                            }
                        }
                    },
                    {
                        title: '结果',
                        key: 'updated_at',
                        render: (h, params) => {
                            if (!params.row.updated_at) {
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
                        title: '时间',
                        key: 'updated_at',
                        width: 180,
                        sortable: true,
                        render: (h, params) => {
                            if (!params.row.updated_at) {
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
                                }, params.row.updated_at)
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
        methods: {
            active () {
                console.log('排序')
                this.refresh()
            },
            refresh () {
                this.$refs.baseTable.list()
            },
            toDetail (e) {
                let params = {
                    event_id: e
                }
                this.$refs.detailInfo.open('盘点记录', '', params)
            }
        }
    }
</script>
