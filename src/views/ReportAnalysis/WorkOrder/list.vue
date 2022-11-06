<template>
    <div class="work-order">


        <div class="datatable">
            <dataTableChoose v-on:on-data-change="getData" :tablename="tablename"  :hasbtn="hasbtn" ref="datatable"  :columns="columns" :data="data" dataname="data" :url="url">
            </dataTableChoose>
        </div>
        <orderDetails ref="orderDetails"></orderDetails>
    </div>
</template>
<script>
    import $ from 'jquery'
    import dataTableChoose from '@/components/dataTableChoose.vue'
    require('static/css/datatable.css')
    require('static/css/modal.css')
    import resize from '@/mixins/resize'
    import WorkOrderHttp from 'server/http/workOrder'
    import orderDetails from './components/orderDetails.vue'
    export default {
        components: {
            dataTableChoose,
            orderDetails
        },
        created () {
            this.$emit('updateActive', '2-1')
        },
        data () {
            return {
                tablename: '工单查询',
                hasbtn: true,
                url: WorkOrderHttp.map.workList,
                select_ids: '',
                details: false,
                columns: [
                    {
                        title: '工单编号',
                        width: 100,
                        key: 'workorderid'
                    },
                    {
                        title: '标题',
                        width: 100,
                        key: 'title'
                    },
                    {
                        title: '状态',
                        width: 80,
                        key: 'status_name'
                    },
                    {
                        title: '工单类型',
                        width: 100,
                        key: 'wotype_name'
                    },
                    {
                        title: '管理对象',
                        width: 100,
                        key: 'objects_name'
                    },
                    {
                        title: '空间地点',
                        width: 100,
                        key: 'spaces_name'
                    },
                    {
                        title: '岗位',
                        width: 80,
                        key: 'professions_name'
                    },
                    {
                        title: '处理人',
                        width: 80,
                        key: 'operator'
                    },
                    {
                        title: '开始时间',
                        width: 100,
                        key: 'planstart'
                    },
                    {
                        title: '结束时间',
                        width: 100,
                        key: 'planfinish'
                    },
                    {
                        title: '操作',
                        width: 90,
                        key: 'id',
                        render: (h, params) => {
                            return h('div', [
                                h('a', {
                                    style: {
                                        marginRight: '20px',
                                        color: '#3399FF'
                                    },
                                    on: {
                                        click: () => {
                                            this.$refs.orderDetails.open(params.row.id)
                                        }
                                    }
                                }, '查看')])
                        }
                    }
                ],
                data: []
            }
        },
        mixins: [ resize ],
        methods: {
            refresh () {
                this.$refs.datatable.refresh(this.url)
            },
            getData: function (data) {
                if ($('th.totalNum').length == 0) {
                    var mydiv = '<th class="totalNum" style="background-color: transparent" colspan="10">' + '总计：' + data.recordsFiltered + ' | 未完成：' + data.nofinish + ' | 异常：' + data.abnormal + '</th> '
                    $('table').eq(0).before(mydiv)
                } else {
                    mydiv = '<th class="totalNum" style="background-color: transparent" colspan="10">' + '总计：' + data.recordsFiltered + ' | 未完成：' + data.nofinish + ' | 异常：' + data.abnormal + '</th> '
                    $('th.totalNum').remove()
                    $('table').eq(0).before(mydiv)
                }
            }
        }
    }
</script>
