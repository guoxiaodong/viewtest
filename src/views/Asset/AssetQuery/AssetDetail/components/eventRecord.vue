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
                时间：<DatePicker :value="tempTime" format="yyyy/MM/dd" type="daterange"
                               placement="bottom-end" placeholder="请选择"  @on-change="changeTime($event)" style="width: 200px"></DatePicker>
            </div>
        </div>
        <div>
            <filterItem v-if="filterData.serious.length" :isMulti=true :filterData="filterData.serious" :filterName="'紧急程度'" @filterCondition-change="conditionChange($event,'serious')"></filterItem>
            <filterItem v-if="filterData.source.length" :isMulti=true :filterData="filterData.source" :filterName="'来源'" @filterCondition-change="conditionChange($event,'source')"></filterItem>
            <filterItem v-if="filterData.status.length" :isMulti=true :filterData="filterData.status" :filterName="'状态'" @filterCondition-change="conditionChange($event,'status')"></filterItem>
        </div>
        <baseTable ref="baseTable" :params="filterCondition" :columns="columns" dataname="tableData" :url="dataUrl">
        </baseTable>
        <detailInfo ref="detailInfo"></detailInfo>
    </div>
</template>
<script>
    import baseTable from '../../../commonComponents/baseTable.vue'
    import detailInfo from '../../../commonComponents/detailInfo.vue'
    import filterItem from '@/components/filterItem.vue'
    import AssetManageRoute from '@/server/route/assetManage'
    
    export default {
        components: {
            baseTable, filterItem, detailInfo
        },
        data () {
            return {
                filterCondition: {
                    sSearch: '',
                    asset_id: this.$route.params.id,
                    serious: '',
                    source: '',
                    status: '',
                    startday: '',
                    endday: ''
                },
                filterData: {
                    serious: [],
                    source: [],
                    status: [],
                    hasLoad: false
                },
                dataUrl: AssetManageRoute.asseteventlist, // 获取列表接口
                tempTime: [],
                tableData: [],
                columns: [
                    {
                        title: '事件标题/编号',
                        width: 300,
                        render: (h, params) => {
                            if (!params.row.title) {
                                return h('span', {
                                    style: {
                                        color: '#D0021B'
                                    }
                                }, '暂无')
                            } else {
                                return h('div', [
                                    h('h5', {class: 'underline'}, params.row.title),
                                    h('p', {}, params.row.description)
                                ])
                            }
                        }
                    },
                    {
                        title: '紧急程度',
                        align: 'center',
                        render: (h, params) => {
                            if (!params.row.serious) {
                                return h('span', {
                                    style: {
                                        color: '#D0021B'
                                    }
                                }, '暂无')
                            } else {
                                return h('span', {
                                    class: 'serious-' + params.row.serious
                                }, params.row.serious_name)
                            }
                        }
                    },
                    {
                        title: '来源',
                        align: 'center',
                        render: (h, params) => {
                            if (!params.row.source) {
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
                        title: '时间',
                        key: 'updated_at',
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
                ]
            }
        },
        methods: {
            active () {
                this.refresh()
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
                if (!this.filterData.hasLoad) {
                    this.axios.get('/config')
                        .then(res => {
                            let result = res.data
                            this.filterData.serious = Object.values(result.SERIOUS)
                            this.filterData.status = Object.values(result.EVENT_STATUS)
                            this.filterData.source = Object.values(result.WOSOURCE)
                            this.filterData.hasLoad = true
                        })
                        .catch(error => {
                            this.$Message.error(error.error)
                        })
                }
            },
            toDetail (e) {
                let params = {
                    event_id: e
                }
                this.$refs.detailInfo.open('事件', '', params)
            }
        }
    }
</script>
