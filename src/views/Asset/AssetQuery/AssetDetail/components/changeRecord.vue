<style>
</style>
<template>
    <div>
        <div class="flex m-b-10">
            <div>
                <Input placeholder="请输入" icon="search" v-model="filterCondition.search" @on-change="refresh()"></Input>
            </div>
            <div class="flex-1"></div>
            <div>
                时间：<DatePicker :value="filterCondition.time" format="yyyy/MM/dd" type="daterange"
                               placement="bottom-end" placeholder="请选择"  @on-change="changeTime($event)" style="width: 200px"></DatePicker>
            </div>
        </div>
        <baseTable ref="baseTable" :params="filterCondition" :columns="columns" dataname="tableData" :url="dataUrl">
        </baseTable>
    </div>
</template>
<script>
    import baseTable from '../../../commonComponents/baseTable.vue'
    import AssetManageRoute from '@/server/route/assetManage'
    
    export default {
        components: {
            baseTable
        },
        data () {
            return {
                filterCondition: {
                    sSearch: '',
                    asset_id: this.$route.params.id,
                    startday: '',
                    endday: ''
                },
                dataUrl: AssetManageRoute.assetchangelist, // 获取列表接口
                columns: [
                    {
                        type: 'index',
                        title: '序号',
                        width: 80,
                        align: 'center'
                    },
                    {
                        title: '变更编号',
                        key: 'aa',
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
                        title: '原始值',
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
                                    style: {
                                        color: '#657180'
                                    }
                                }, params.row.updated_at)
                            }
                        }
                    },
                    {
                        title: '新值',
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
                        title: '变更人',
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
                    }
                ]
            }
        },
        methods: {
            active () {
                this.refresh()
            },
            refresh () {
                this.$refs.baseTable.list()
            },
            changeTime (e) {
                if (e.length) {
                    this.filterCondition.startday = e[0]
                    this.filterCondition.endday = e[1]
                    this.refresh()
                }
            }
        }
    }
</script>
