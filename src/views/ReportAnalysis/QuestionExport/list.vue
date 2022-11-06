<style>
    .question .ivu-table-header{
        margin-top: 9px!important;
    }
</style>
<template>
    <div class=" question">
        <div class="datatable">
            <dataTableChoose v-on:on-data-change="getData" :tablename="tablename"  :hasbtn="hasbtn" ref="datatable"  :columns="columns" :data="data" dataname="data" :url="url">
                 </dataTableChoose>
        </div>
        <questionExportDetails ref="questionExportDetails"></questionExportDetails>
    </div>
</template>
<script>
    import $ from 'jquery'
    import dataTableChoose from '@/components/dataTableChoose.vue'
    require('static/css/datatable.css')
    require('static/css/modal.css')
    import resize from '@/mixins/resize'
    import QuestionHttp from 'server/http/workOrder'
    import questionExportDetails from './components/questionDetails.vue'
    export default {
        components: {
            dataTableChoose,
            questionExportDetails
        },
        created () {
            this.$emit('updateActive', '2-2')
        },
        mounted () {
            // 问题导出页面隐藏控件
            $('.workorder-datepicker').remove()
            $('.time-choose label').remove()
        },
        data () {
            return {
                tablename: '问题导出',
                hasbtn: true,
                url: QuestionHttp.map.questionList,
                select_ids: '',
                details: false,
                columns: [
                    {
                        title: '问题编号',
                        width: 100,
                        key: 'issueid'
                    },
                    {
                        title: '标题',
                        width: 90,
                        key: 'title'
                    },
                    {
                        title: '状态',
                        width: 80,
                        key: 'status_name'
                    },
                    {
                        title: '紧急程度',
                        width: 100,
                        key: 'serious_name'
                    },
                    {
                        title: '楼宇',
                        width: 90,
                        key: 'building_name'
                    },
                    {
                        title: '空间地点',
                        width: 100,
                        key: 'space_name'
                    },
                    {
                        title: '管理对象',
                        width: 100,
                        key: 'object_name'
                    },
                    {
                        title: '负责人',
                        width: 100,
                        key: 'owner_name'
                    },
                    {
                        title: '描述',
                        width: 100,
                        key: 'description'
                    },
                    {
                        title: '登记时间',
                        width: 110,
                        key: 'created_at'
                    },
                    {
                        title: '操作',
                        width: 90,
                        key: 'solution',
                        render: (h, params) => {
                            return h('div', [
                                h('a', {
                                    style: {
                                        marginRight: '20px',
                                        color: '#3399FF'
                                    },
                                    on: {
                                        click: () => {
                                            this.$refs.questionExportDetails.open(params.row.id)
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
                    var mydiv = '<th class="totalNum" style="background-color: transparent" colspan="10">' + '总计：' + data.recordsFiltered + ' | 未完成：' + data.nofinish + ' | 挂起：' + data.abnormal + '</th> '
                    $('table').eq(0).before(mydiv)
                    $('.question div.ivu-table-header').css('cssText', 'margin-top:-31px!important')
                } else {
                    mydiv = '<th class="totalNum" style="background-color: transparent" colspan="10">' + '总计：' + data.recordsFiltered + ' | 未完成：' + data.nofinish + ' | 挂起：' + data.abnormal + '</th> '
                    $('th.totalNum').remove()
                    $('table').eq(0).before(mydiv)
                }
            }
        }
    }
</script>
