<style>
    .PMtable .ivu-table-cell { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
</style>
<template>
    <div class="">
        <div class="t-head-bottom m-l-40">
            <Button type="primary" @click="addLink()">新&emsp;增</Button>
            <Button type="ghost" @click="delbatch()">批量删除</Button>
        </div>
        <div class="datatable PMtable">
            <dataTable :ifsearch="ifsearch" @on-selection-change="selectchange" ref="datatable" searchName="请输入搜索内容" :columns="columns" :data="data" dataname="data" :url="url">
            </dataTable>
        </div>
        <!--删除环节-->
        <delLink ref="delLink" :title="deltitle"></delLink>
        <!--批量删除环节-->
        <delLink ref="alldelLink" :title="alldeltitle"></delLink>
    </div>
</template>
<script>
    import {setTableItem} from '@/util/setDIVtitle'
    import dataTable from '@/components/dataTable.vue'
    import delLink from '../components/delLink.vue'
    require('static/css/datatable.css')
    import ProcessManageHttp from 'server/http/processManage'
    import CommonHttp from 'server/http/common'
    export default {
        components: {
            dataTable, delLink
        },
        created () {
            this.$emit('updateActiveName', '2')
            setTimeout(
                setTableItem, 2000
            )
            // 获取流程配置信息
            ProcessManageHttp.getLinkConfig().then((data) => {
                for (let v of data) {
                    if (v.summary == 1) {
                        this.columns.splice(3, 0, {title: v.name, sortable: true, key: v.field.toString()})
                    }
                }
            })
            // 获取工单状态
            CommonHttp.getConfig().then((data) => {
                this.wo_status = data['WORKORDER_STATUS']
            })
        },
        data () {
            return {
                ifsearch: false,
                deltitle: '删除环节',
                alldeltitle: '批量删除环节',
                url: ProcessManageHttp.map.getLinkList + '/' + this.$route.params.id,
                wo_status: [],
                select_ids: '',
                columns: [
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: '编号',
                        sortable: true,
                        key: 'no'
                    },
                    {
                        title: '名称',
                        sortable: true,
                        key: 'name'
                    },
                    {
                        title: '工单状态',
                        sortable: true,
                        key: 'wo_status',
                        render: (h, params) => {
                            for (let i = 0; i < this.wo_status.length; i++) {
                                if (this.wo_status[i].id == params.row.wo_status) {
                                    return h('span', this.wo_status[i].name)
                                }
                            }
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
                                            this.editLink(params.row.id)
                                        }
                                    }
                                }, '编辑'),
                                h('a', {
                                    style: {
                                        color: '#D0021B'
                                    },
                                    on: {
                                        click: () => {
                                            this.remove(params.row.id)
                                        }
                                    }
                                }, '删除')
                            ])
                        }
                    }
                ],
                data: []
            }
        },
        methods: {
            // 添加环节
            addLink () {
                location.href = '/#/processmanage/addlinkbasic/' + this.$route.params.id
            },
            // 编辑环节
            editLink (id) {
                this.$route.params.linkid = id
                location.href = '/#/processmanage/editlinkbasic/' + this.$route.params.id + '/' + this.$route.params.linkid
            },
            // 删除环节
            remove (id) {
                this.$refs.delLink.open(id)
            },
            // 批量删除环节
            selectchange (selection) {
                let ids = []
                for (let v of selection) {
                    ids.push(v.id)
                }
                this.select_ids = ids.join(',')
            },
            delbatch () {
                if (this.select_ids.length != 0) {
                    this.$refs.alldelLink.open(this.select_ids)
                } else {
                    this.$Message.error('请选择要删除的环节')
                }
            },
            refresh () {
                this.$refs.datatable.refresh(this.url)
            }
        }
    }
</script>
