<style>
    .tables .ivu-table-cell { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
    .itemTop { padding: 20px; font-size: 14px; color: #657180; }
    .itemTop .itemLine { padding: 5px 0; }
    .itemTop .itemLine .Txtwords { width: 70%; float: left; overflow: hidden; text-overflow:ellipsis; white-space: nowrap; }
    .downLoadName { float: left; width: 80%; overflow: hidden; text-overflow:ellipsis; white-space: nowrap; }
    .itembg1 { height: 67px; background-color: #f5f7f9;  padding-top: 20px; }
    .itembg1 .itemTitle { height: 28px; border-bottom: 2px solid #D7DDE4; line-height: 28px;
                         font-size: 16px; color: #3399FF; }
    .itembg1 .itemTitle span { display: inline-block; height: 28px; border-bottom: 2px solid #3399FF}
    .itemStatus { position: absolute; right: -20px; top: 0; float: right; margin-top: 30%; width: 100px;
         height: 60px; background-color: #04B9B9; text-align: center; line-height: 60px; font-size: 24px;
         color: #FFFFFF;}
</style>
<template>
    <div>
        <div class="tables">
            <dataTable :pri_btn_name="pri_btn_name" :tablename="tablename" @on-selection-change="selectchange" :hasbtn="hasbtn" ref="datatable" searchName="请输入搜索内容" :columns="columns" :data="data" dataname="data" :url="url">
                <div class="t-head-bottom" slot="buttons">
                    <Alert type="warning" show-icon style="margin-top:20px;">已选择&nbsp;{{this.number}}&nbsp;个工单&emsp;&emsp;费用总计：￥{{this.money}}</Alert>
                </div>
            </dataTable>
        </div>
        <!--查看工单详情-->
        <showWorkOrder ref="showWorkOrder"></showWorkOrder>
    </div>
</template>
<script>
    import {setTableItem} from '@/util/setDIVtitle'
    import dataTable from '@/components/dataTable.vue'
    import SupplierManageHttp from 'server/http/supplierManage'
    import showWorkOrder from '../structure/showWorkOrderInfo.vue'
    require('static/css/datatable.css')
    export default {
        components: {
            dataTable, showWorkOrder
        },
        created () {
            this.$emit('updateActiveName', '2')
            this.tableTitle()
        },
        data () {
            return {
                delOneTitle: '删除供应商服务',
                delManyTitle: '批量删除供应商服务',
                tablename: '历史工单列表',
                pri_btn_name: '新增',
                hasbtn: true,
                number: '0',
                money: '0.00',
                url: SupplierManageHttp.map.getBranchWorkorder + '/' + this.$route.params.sid,
                columns: [
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: '工单编号',
                        key: 'workorderid'
                    },
                    {
                        title: '工单标题',
                        key: 'workordername'
                    },
                    {
                        title: '供应商服务',
                        width: '150',
                        sortable: true,
                        key: 'title'
                    },
                    {
                        title: '地点',
                        sortable: true,
                        key: 'place'
                    },
                    {
                        title: '状态',
                        width: '90',
                        sortable: true,
                        key: 'status_name'
                    },
                    {
                        title: '时间',
                        width: '200',
                        sortable: true,
                        key: 'updated_at'
                    },
                    {
                        title: '操作',
                        width: 90,
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
                                            this.showWorkOrder(params.row.id)
                                        }
                                    }
                                }, '查看')
                            ])
                        }
                    }
                ],
                data: []
            }
        },
        methods: {
            // table加title
            tableTitle () {
                setTimeout(
                    setTableItem, 3000
                )
            },
            selectchange (selection) {
                let ids = []
                for (let v of selection) {
                    ids.push(v.id)
                }
                this.select_ids = ids.join(',')
                if (this.select_ids == '') {
                    this.number = '0'
                    this.money = '0.00'
                } else {
                    SupplierManageHttp.getHistoryWorkOrderNum(this.select_ids).then((data) => {
                        this.number = data.workOrderCount
                        this.money = data.Money
                    })
                }
            },
            // 查看工单
            showWorkOrder (id) {
                this.$refs.showWorkOrder.open(id)
            },
            // 刷新表格
            refresh () {
                this.$refs.datatable.refresh(this.url)
            }
        }
    }
</script>
