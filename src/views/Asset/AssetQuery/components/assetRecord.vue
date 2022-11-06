<style>
    .search-area {
        padding: 20px 0;
    }
    
    .block {
        padding: 10px 0;
    }
    .PMtable .ivu-table-cell { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
</style>
<template>
    <div>
        <div class="flex m-b-10">
            <div>
                <Button type="primary" @click="returnMain()">返回资产列表</Button>
            </div>
            <div class="flex-1"></div>
            <div>
                登记日期：<DatePicker :value="tempTime" format="yyyy/MM/dd" type="daterange"
                                 placement="bottom-end" placeholder="选择时间" @on-change="changeTime($event)" style="width: 200px"></DatePicker>
            </div>
        </div>
        <!--<baseTable ref="baseTable" :params="filterCondition" :columns="columns" :data="tableData" dataname="tableData" :url="dataUrl">-->
        <!--</baseTable>-->
        <Table :columns="recordColumns" :data="recordData"></Table>
        <!-- 模态框查看记录详情 -->
        <AssetRecordDetail ref="recordDetail"></AssetRecordDetail>
    </div>
</template>
<script>
    import baseTable from '../../commonComponents/baseTable.vue'
    import filterItem from '@/components/filterItem.vue'
    import AssetManageRoute from '@/server/route/assetManage'
    import AssetRecordDetail from './assetRecordDetail.vue'
    import AssetHttp from 'server/http/assetManage'
    export default {
        props: {
            main: String,
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
        components: {
            baseTable, filterItem, AssetRecordDetail
        },
        data () {
            return {
                recordColumns: [
                    {
                        title: '登记时间',
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
                recordData: [],
                tablename: '资产记录列表',
                dataUrl: AssetManageRoute.getAssetRecord, // 获取列表接口
                tempTime: [],
                tableData: [],
                timeoutFun: null,
                time: {
                    startday: '',
                    endday: ''
                },
                /**
                 *  type = 5 需要临时标记
                 * */
                columns: [
                    {
                        title: '登记时间',
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
                ]
            }
        },
        methods: {
            init () {
                console.log('this.time:', this.time)
                Promise.all([AssetHttp.getColProp(), AssetHttp.getAssetRecord(this.time)])
                    .then(([colData, recordList]) => {
                        console.log('colData:', colData)
                        console.log('recordList:', recordList)
                        let tempColumn = [] // 用于构造column
                        colData.forEach(col => {
                            // 构造table的columns
                            tempColumn.push(this.columnFacory(col))
                            recordList.data.forEach(record => {
                                // 构造table的data
                                var temp = record.specs.filter(spec => {
                                    return spec.property_key == col.key
                                })
                                record[col.key] = temp[0].text
                            })
                        })
                        this.recordData = recordList.data
                        // 将自定义列的表头合并
                        tempColumn.reverse()
                        for (let i = 0; i < tempColumn.length; i++) {
                            var temp = this.recordColumns.find(rcol => {
                                return rcol.key == tempColumn[i].key
                            })
                            if (!temp) {
                                this.recordColumns.unshift(tempColumn[i])
                            }
                            console.log('temp:', temp)
                        }
                    })
                    .catch(error => {
                        this.loading = false
                        this.$Message.error(error.error)
                    })

                //  加载列名
//                Promise.all([
//                    this.axios.get(AssetManageRoute.colProp)
//                ])
//                    .then(res => {
//                        this.loading = false
//                        //  处理业务逻辑赋值
//                        let result = res[0].data
//                        let tempColumn = []
//                        for (let i = 0; i < result.length; i++) {
//                            var t = this.columnFacory(result[i])
//                            tempColumn.push(t)
//                        }
//                        tempColumn.reverse()
//                        for (let i = 0; i < tempColumn.length; i++) {
//                            this.columns.unshift(tempColumn[i])
//                        }
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
            toDetail (id) {
                // 模态框 查看记录详情
//                this.$route.params.id = id
            },
            //  返回主目录
            returnMain () {
                this.target.tabsName = this.main
                this.target.refresh()
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
            },
            changeTime (e) {
                if (e.length) {
                    this.time.startday = e[0]
                    this.time.endday = e[1]
                    this.refresh()
                }
            }
        },
        computed: {
            filterCondition: {
                get: function () {
                    let temp = this._.cloneDeep(this.time)
                    Object.assign(temp, this.filterParams)
                    return temp
                }
            }
        }
    }
</script>
