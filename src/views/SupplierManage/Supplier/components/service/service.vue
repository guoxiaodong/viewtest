<style>
    .tables .ivu-table-cell{ overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
</style>
<template>
    <div class="tables">
        <dataTable :pri_btn_name="pri_btn_name" :tablename="tablename" @on-selection-change="selectchange" :hasbtn="hasbtn" ref="datatable" searchName="请输入搜索内容" :columns="columns" :data="data" dataname="data" :url="url">
            <div class="t-head-bottom" slot="buttons">
                <Button type="primary" v-html="pri_btn_name" @click="addService()"></Button>
                <Button type="ghost" @click="delbatch()">批量删除</Button>
            </div>
        </dataTable>
        <!--添加服务-->
        <addService ref="addService"></addService>
        <!--编辑服务-->
        <editService ref="editService"></editService>
        <!--删除服务-->
        <delService ref="delOneService" :title="delTitle"></delService>
        <!--批量删除服务-->
        <delService ref="delManyService" :title="delManyTitle"></delService>
    </div>
</template>
<script>
    import {setTableItem} from '@/util/setDIVtitle'
    import dataTable from '@/components/dataTable.vue'
    import SupplierManageHttp from 'server/http/supplierManage'
    import addService from '../service/addService.vue'
    import editService from '../service/editService.vue'
    import delService from '../service/delService.vue'
    require('static/css/datatable.css')
    export default {
        components: {
            dataTable, addService, editService, delService
        },
        created () {
            this.$emit('updateActive', '7-1')
            this.$emit('updateActiveName', '2')
            this.tableTitle()
        },
        data () {
            return {
                social: [],
                social1: [],
                tablename: '服务列表',
                pri_btn_name: '新增',
                delTitle: '删除服务',
                delManyTitle: '批量删除服务',
                hasbtn: true,
                url: SupplierManageHttp.map.getAllSerList + '/' + this.$route.params.id,
                id: '',
                downList: [],
                status: '',
                select_ids: '',
                columns: [
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: '名称/编号/简介',
                        render: (h, params) => {
                            return h('div', [
                                h('img', {
                                    style: {
                                        float: 'left',
                                        width: '40px',
                                        height: '40px',
                                        marginRight: '10px'
                                    },
                                    attrs: {
                                        src: params.row.imagesurl
                                    }
                                }),
                                h('span', {
                                    style: {
                                        display: 'block',
                                        cursor: 'pointer',
                                        fontSize: '15px',
                                        color: '#3399FF',
                                        height: '20px',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        whiteSpace: 'nowrap'
                                    },
                                    on: {
                                        click: () => {
                                            this.showInfo(params.index)
                                        }
                                    }
                                }, params.row.title + params.row.no),
                                h('span', {
                                    style: {
                                        display: 'block'
                                    }
                                }, params.row.intro)
                            ])
                        }
                    },
                    {
                        title: '服务等级',
                        sortable: true,
                        width: 120,
                        key: 'servicelevel'
                    },
                    {
                        title: '状态',
                        sortable: true,
                        width: 90,
                        key: 'servicestatus'
                    },
                    {
                        title: '有合同',
                        sortable: true,
                        width: 95,
                        key: 'is_hascontracts'
                    },
                    {
                        title: '服务质量',
                        sortable: true,
                        width: 165,
                        key: 'servicequality',
                        render: (h, params) => {
                            return h('Rate', {
                                props: {
                                    value: params.row.servicequality,
                                    disabled: true
                                }
                            })
                        }
                    },
                    {
                        title: '提供服务的分支',
                        sortable: true,
                        width: 150,
                        key: 'brancename'
                    },
                    {
                        title: '工单数',
                        sortable: true,
                        width: 95,
                        key: 'workorderscount'
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
                                            this.editSer(params.row.id, params.row.servicelevelid, params.row.branceid)
                                        }
                                    }
                                }, '编辑'),
                                h('a', {
                                    style: {
                                        color: '#D0021B'
                                    },
                                    on: {
                                        click: () => {
                                            this.removeSer(params.row.id)
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
            // table加title
            tableTitle () {
                setTimeout(
                    setTableItem, 3000
                )
            },
            // 添加
            addService () {
                this.$refs.addService.open()
            },
            // 编辑
            editSer (id, servicelevelid, branceid) {
                this.$refs.editService.open(id, servicelevelid, branceid)
            },
            //  删除
            removeSer (id) {
                this.$refs.delOneService.open(id)
            },
            selectchange (selection) {
                let ids = []
                for (let v of selection) {
                    ids.push(v.id)
                }
                this.select_ids = ids.join(',')
            },
            delbatch () {
                if (this.select_ids.length != 0) {
                    this.$refs.delManyService.open(this.select_ids)
                } else {
                    this.$Message.error('请选择要删除的服务')
                }
            },
            // 刷新表格
            refresh () {
                this.$refs.datatable.refresh(this.url)
            }
        }
    }
</script>
