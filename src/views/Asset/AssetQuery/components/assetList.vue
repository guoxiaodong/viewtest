<style>
    .search-area {
        padding: 20px 0;
    }
    
    .block {
        padding: 10px 0;
    }
    
    .PMtable .ivu-table-cell {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
</style>
<template>
    <div>
        <div>
            <div class="m-b-10">
                <Button type="primary" @click="addAsset()">+ 登记</Button>
                <Button type="ghost" @click="delbatch()">批量删除</Button>
                <Button type="ghost" @click="toDetail(1)">详情</Button>
                <Button type="ghost" class="pull-right" @click="checkHistory()">查询登记记录</Button>
            </div>
            <!--<baseTable @on-selection-change="selectchange" ref="baseTable" :params="filterParams" :columns="columns"-->
                       <!--:data="tableData" dataname="tableData" :url="dataUrl">-->
            <!--</baseTable>-->
            <Table :columns="assetColumn" :data="assetData"></Table>
            <!--<Page :total="total" show-sizer show-elevator show-total :current="current" @on-change="change" @on-page-size-change="changesize" :page-size="pagesize"></Page>-->
        </div>
        <!-- 新增资产 -->
        <assetDetailInfo ref="assetDetailInfo"></assetDetailInfo>
    </div>
</template>
<script>
    import baseTable from '../../commonComponents/baseTable.vue'
    import filterItem from '@/components/filterItem.vue'
    // import AssetManageRoute from '@/server/route/assetManage'
    import AssetRecordDetail from './assetRecordDetail.vue'
    import assetDetailInfo from '../../commonComponents/assetDetailInfo.vue'
    import AssetHttp from 'server/http/assetManage'
    export default {
        props: {
            target: Object,
            filterParams: {
                type: Object,
                default () {
                    return {}
                }
            }
        },
        created () {
            this.init()
        },
        mounted () {
            // this.init()
        },
        components: {
            baseTable, filterItem, AssetRecordDetail, assetDetailInfo
        },
        data () {
            return {
                assetColumn: [
                    {
                        type: 'selection',
                        width: 30,
                        align: 'center'
                    },
                    {
                        title: '资产编号',
                        width: '120',
                        key: 'assetid',
                        render: (h, params) => {
                            return h('span', {
                                style: {
                                    color: '#657180'
                                }
                            }, params.row.assetid)
//                            if (!params.row.assetid) {
//                                return h('span', {
//                                    style: {
//                                        color: '#D0021B'
//                                    }
//                                }, '暂无')
//                            } else {
//                                return h('span', {
//                                    style: {
//                                        color: '#657180'
//                                    }
//                                }, params.row.assetid)
//                            }
                        }
                    },
                    {
                        title: '更新时间',
                        key: 'updated_at',
                        width: 120,
                        ellipsis: true,
                        sortable: true,
                        render: (h, params) => {
                            return h('span', {
                                style: {
                                    color: '#657180'
                                }
                            }, params.row.updated_at ? params.row.updated_at : '')
//                            if (!params.row.updated_at) {
//                                return h('span', {
//                                    style: {
//                                        color: '#D0021B'
//                                    }
//                                }, '暂无')
//                            } else {
//                                return h('span', {
//                                    style: {
//                                        color: '#657180'
//                                    }
//                                }, params.row.updated_at)
//                            }
                        }
                    },
                    {
                        title: '登记时间',
                        key: 'created_at',
                        width: 120,
                        ellipsis: true,
                        sortable: true,
                        render: (h, params) => {
                            return h('span', {
                                style: {
                                    color: '#657180'
                                }
                            }, params.row.created_at ? params.row.created_at : '')
//                            if (!params.row.created_at) {
//                                return h('span', {
//                                    style: {
//                                        color: '#D0021B'
//                                    }
//                                }, '暂无')
//                            } else {
//                                return h('span', {
//                                    style: {
//                                        color: '#657180'
//                                    }
//                                }, params.row.created_at)
//                            }
                        }
                    },
                    {
                        title: '操作',
                        width: 120,
                        key: 'action',
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
                                }, '编辑'),
                                h('a', {
                                    style: {
                                        color: '#D0021B'
                                    },
                                    on: {
                                        click: () => {
                                            this.remove(params.index)
                                        }
                                    }
                                }, '删除')
                            ])
                        }
                    }
                ],
                assetData: [],
                total: 0,
                tableData: [],
                select_ids: [], // 多选选中的结果
                timeoutFun: null,
                /**
                 *  type = 5 需要临时标记
                 * */
                tablename: '资产列表',
                dataUrl: 'asset', // 获取列表接口
                columns: [
                    {
                        type: 'selection',
                        width: 30,
                        align: 'center'
                    },
                    {
                        title: '资产编号',
                        width: '120',
                        key: 'assetid',
                        render: (h, params) => {
                            return h('span', {
                                style: {
                                    color: '#657180'
                                }
                            }, params.row.assetid)
//                            if (!params.row.assetid) {
//                                return h('span', {
//                                    style: {
//                                        color: '#D0021B'
//                                    }
//                                }, '暂无')
//                            } else {
//                                return h('span', {
//                                    style: {
//                                        color: '#657180'
//                                    }
//                                }, params.row.assetid)
//                            }
                        }
                    },
                    {
                        title: '更新时间',
                        key: 'updated_at',
                        width: 120,
                        ellipsis: true,
                        sortable: true,
                        render: (h, params) => {
                            return h('span', {
                                style: {
                                    color: '#657180'
                                }
                            }, params.row.updated_at ? params.row.updated_at : '')
//                            if (!params.row.updated_at) {
//                                return h('span', {
//                                    style: {
//                                        color: '#D0021B'
//                                    }
//                                }, '暂无')
//                            } else {
//                                return h('span', {
//                                    style: {
//                                        color: '#657180'
//                                    }
//                                }, params.row.updated_at)
//                            }
                        }
                    },
                    {
                        title: '登记时间',
                        key: 'created_at',
                        width: 120,
                        ellipsis: true,
                        sortable: true,
                        render: (h, params) => {
                            return h('span', {
                                style: {
                                    color: '#657180'
                                }
                            }, params.row.created_at ? params.row.created_at : '')
//                            if (!params.row.created_at) {
//                                return h('span', {
//                                    style: {
//                                        color: '#D0021B'
//                                    }
//                                }, '暂无')
//                            } else {
//                                return h('span', {
//                                    style: {
//                                        color: '#657180'
//                                    }
//                                }, params.row.created_at)
//                            }
                        }
                    },
                    {
                        title: '操作',
                        width: 120,
                        key: 'action',
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
                                }, '编辑'),
                                h('a', {
                                    style: {
                                        color: '#D0021B'
                                    },
                                    on: {
                                        click: () => {
                                            this.remove(params.index)
                                        }
                                    }
                                }, '删除')
                            ])
                        }
                    }
                ]
            }
        },
        methods: {
            init () {
                Promise.all([AssetHttp.getColProp(), AssetHttp.getAssetList()])
                    .then(([colData, assetList]) => {
                        let tempColumn = [] // 用于构造column
                        colData.forEach(col => {
                            // 构造table的columns
                            tempColumn.push(this.columnFacory(col))
                            assetList.data.forEach(asset => {
                                // 构造table的data
                                var temp = asset.specs.filter(spec => {
                                    return spec.property_key == col.key
                                })
                                asset[col.key] = temp[0].text
                            })
                        })
                        this.assetData = assetList.data
                        // 将自定义列的表头合并
                        tempColumn.reverse()
                        for (let i = 0; i < tempColumn.length; i++) {
                            var temp = this.assetColumn.find(acol => {
                                return acol.key == tempColumn[i].key
                            })
                            if (!temp) {
                                this.assetColumn.splice(2, 0, tempColumn[i])
                            }
                        }
                        this.total = assetList.recordsFiltered
                    })
                    .catch(error => {
                        this.$Message.error(error.error)
                    })
//                AssetHttp.getColProp()
//                    .then(result => {
//                        console.log('result:', result)
//                        //  处理业务逻辑赋值
//                        // let result = res[0].data
//                        let tempColumn = []
//                        for (let i = 0; i < result.length; i++) {
//                            tempColumn.push(this.columnFacory(result[i]))
//                        }
//                        tempColumn.reverse()
//                        for (let i = 0; i < tempColumn.length; i++) {
//                            this.columns.splice(2, 0, tempColumn[i])
//                            this.assetColumn.splice(2, 0, tempColumn[i])
//                        }
//                        console.log('this.columns:', this.columns)
//                    })
//                    .catch((error) => {
//                        this.loading = false
//                        this.$Message.error(error)
//                    })
//                AssetHttp.getAssetList()
//                    .then(data => {
//                        console.log('getAssetList:', data)
//                    })
//                    .catch(error => {
//                        console.log(error)
//                    })
                //  加载列名
//                Promise.all([
//                    this.axios.get(AssetManageRoute.colProp)
//                ])
//                    .then(res => {
//                        //  处理业务逻辑赋值
//                        let result = res[0].data
//                        let tempColumn = []
//                        for (let i = 0; i < result.length; i++) {
//                            tempColumn.push(this.columnFacory(result[i]))
//                        }
//                        tempColumn.reverse()
//                        for (let i = 0; i < tempColumn.length; i++) {
//                            this.columns.splice(2, 0, tempColumn[i])
//                        }
//                        console.log('this.columns:', this.columns)
//                    })
//                    .catch((error) => {
//                        this.loading = false
//                        this.$Message.error(error.error)
//                    })
            },
            refresh () {
                this.init()

//                if (!this.timeoutFun) {
//                    this.timeoutFun = setTimeout(() => {
//                        this.$refs.baseTable.refresh()
//                        clearTimeout(this.timeoutFun)
//                        this.timeoutFun = null
//                    }, 1000)
//                }
            },
            //  新增资产
            addAsset () {
                this.$refs.assetDetailInfo.open(1, '资产信息')
            },
            toDetail (id) {
                this.$route.params.id = id
                location.href = '/#/Asset/AssetQuery/AssetDetail/' + this.$route.params.id
            },
            // 多选记录
            selectchange (selection) {
                let ids = []
                for (let v of selection) {
                    ids.push(v.id)
                }
                this.select_ids = ids.join(',')
            },
            //  批量删除
            delbatch () {
                if (!this.select_ids) {
                    this.$refs.alldelFlow.open(this.select_ids)
                } else {
                    this.$Message.error('请选择要删除的资产')
                }
            },
            //  查看历史
            checkHistory () {
                this.target.tabsName = 'assetRecord'
                this.target.$refs.assetRecord.refresh()
            },
            //  构造column
            columnFacory (col) {
                let result = {}
                result.title = col.name
                result.key = col.key
                result.sortable = col.sortable
                result.render = (h, params) => {
                    if (!params.row[col.key]) {
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
                        }, params.row[col.key])
                    }
                }
                return result
            }
        }
    }
</script>
