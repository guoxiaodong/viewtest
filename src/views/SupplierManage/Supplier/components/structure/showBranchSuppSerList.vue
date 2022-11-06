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
                    <Button type="primary" v-html="pri_btn_name" @click="addBranchSer()"></Button>
                    <Button type="ghost" @click="delbatch()">批量删除</Button>
                </div>
            </dataTable>
        </div>
        <!--添加服务-->
        <addBranchService ref="addBranchService"></addBranchService>
        <!--修改服务-->
        <editBranchService ref="editBranchService"></editBranchService>
        <!--删除服务-->
        <delBranchService ref="delBranchService" :title="delOneTitle"></delBranchService>
        <!--批量删除供应商服务-->
        <delBranchService ref="delBranchServices" :title="delManyTitle"></delBranchService>
        <!--查看服务-->
        <!-- <showBranchService ref="showBranchService"></showBranchService> -->
    </div>
</template>
<script>
    import {setTableItem} from '@/util/setDIVtitle'
    import dataTable from '@/components/dataTable.vue'
    import addBranchService from '../structure/addBranchService.vue'
    import editBranchService from '../structure/editBranchService.vue'
    import delBranchService from '../structure/delBranchService.vue'
    // import showContractSer from '../contract/showContractSer.vue'
    import SupplierManageHttp from 'server/http/supplierManage'
    require('static/css/datatable.css')
    export default {
        components: {
            dataTable, addBranchService, editBranchService, delBranchService
        },
        created () {
            this.$emit('updateActiveName', '1')
            this.tableTitle()
        },
        data () {
            return {
                delOneTitle: '删除分支服务',
                delManyTitle: '批量删除分支服务',
                tablename: '供应商服务列表',
                pri_btn_name: '新增',
                hasbtn: true,
                select_ids: '',
                url: SupplierManageHttp.map.getbranchServiceList + '/' + this.$route.params.sid,
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
                                        src: params.row.imgurl
                                    }
                                }),
                                h('span', {
                                    style: {
                                        display: 'block',
                                        cursor: 'pointer',
                                        fontSize: '15px',
                                        color: '#3399FF',
                                        textOverflow: 'ellipsis',
                                        whiteSpace: 'nowrap',
                                        overflow: 'hidden'
                                    },
                                    on: {
                                        click: () => {
                                            // this.showContractSer(params.row.serviceid)
                                        }
                                    }
                                }, params.row.title + '(' + params.row.no + ')'),
                                h('span', {
                                    style: {
                                        display: 'block',
                                        fontSize: '13px',
                                        height: '20px',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        whiteSpace: 'nowrap'
                                    }
                                }, params.row.intro)
                            ])
                        }
                    },
                    {
                        title: '服务级别',
                        width: '100',
                        sortable: true,
                        key: 'name'
                    },
                    {
                        title: '状态',
                        width: '90',
                        sortable: true,
                        key: 'statusname'
                    },
                    {
                        title: '服务质量',
                        width: '165',
                        sortable: true,
                        key: 'servicescore',
                        render: (h, params) => {
                            return h('Rate', {
                                props: {
                                    value: params.row.servicescore,
                                    disabled: true
                                }
                            })
                        }
                    },
                    {
                        title: '服务范围',
                        width: '150',
                        sortable: true,
                        key: 'placename'
                    },
                    {
                        title: '工单数',
                        sortable: true,
                        width: '100',
                        key: 'countorder'
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
                                            this.editBranchSer(params.row.id, params.row.servicebranchid)
                                        }
                                    }
                                }, '编辑'),
                                h('a', {
                                    style: {
                                        color: '#D0021B'
                                    },
                                    on: {
                                        click: () => {
                                            this.delBranchService(params.row.id)
                                        }
                                    }
                                }, '删除')
                            ])
                        }
                    }
                ],
                data: [],
                EditData: {}
            }
        },
        methods: {
            // table加title
            tableTitle () {
                setTimeout(
                    setTableItem, 2000
                )
            },
            // 合同内供应商服务
            addBranchSer () {
                this.$refs.addBranchService.open()
            },
            editBranchSer (id, servicebranchid) {
                this.$refs.editBranchService.open(id, servicebranchid)
            },
            delBranchService (id) {
                this.$refs.delBranchService.open(id)
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
                    this.$refs.delBranchServices.open(this.select_ids)
                } else {
                    this.$Message.error('请选择要删除的分支服务')
                }
            },
            // 查看合同
            // showContractSer (serviceid) {
            //     this.$refs.showContractSer.open(serviceid)
            // },
            // 刷新表格
            refresh () {
                this.$refs.datatable.refresh(this.url)
            }
        }
    }
</script>
