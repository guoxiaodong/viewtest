<style>
    .tables .ivu-table-cell { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
    .btnsGroup { position: absolute; right: 460px; top: 7px; z-index: 99; }
    /* .btnsGroup.ivu-radio-group-button .ivu-radio-wrapper ,
    .btnsGroup.ivu-radio-group-button .ivu-radio-wrapper:first-child { border: none; }
    .btnsGroup.ivu-radio-group-button .ivu-radio-wrapper-checked { box-shadow: none } */
</style>
<template>
    <div class="tables">
        <div class="datatable PMtable" style="position: relative">
            <RadioGroup v-model="button" @on-change="changeGroupName" type="button" class="btnsGroup">
                <Radio label="0">全部</Radio>
                <Radio label="1">正常</Radio>
                <Radio label="2">过期</Radio>
            </RadioGroup>
            <dataTable :pri_btn_name="pri_btn_name" :tablename="tablename" @on-selection-change="selectchange" :hasbtn="hasbtn" ref="datatable" searchName="请输入搜索内容" :columns="columns" :data="data" dataname="data" :url="url">
                <div class="t-head-bottom" slot="buttons">
                    <Button type="primary" v-html="pri_btn_name" @click="addContract()"></Button>
                    <Button type="ghost" @click="delbatch()">批量删除</Button>
                </div>
            </dataTable>
        </div>
        <!--添加合同-->
        <addContract ref="addContract"></addContract>
        <!--删除合同-->
        <delContract ref="delContract" :title="delTitle"></delContract>
        <!--批量删除合同-->
        <delContract ref="delManyContract" :title="delManyTitle"></delContract>
    </div>
</template>
<script>
    import {setTableItem} from '@/util/setDIVtitle'
    import dataTable from '@/components/dataTable.vue'
    import SupplierManageHttp from 'server/http/supplierManage'
    import addContract from '../contract/addContract.vue'
    import delContract from '../contract/delContract.vue'
    require('static/css/datatable.css')
    export default {
        components: {
            dataTable, addContract, delContract
        },
        created () {
            this.$emit('updateActiveName', '3')
            this.tableTitle()
        },
        data () {
            return {
                s: '',
                tablename: '合同列表',
                pri_btn_name: '新增',
                delTitle: '删除合同',
                delManyTitle: '批量删除合同',
                hasbtn: true,
                button: '0',
                select_ids: '',
                url: SupplierManageHttp.map.getContractList + '/' + this.$route.params.id + '/0',
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
                        key: 'name',
                        render: (h, params) => {
                            return h('span', {
                                style: {
                                    color: '#3399FF',
                                    cursor: 'pointer'
                                },
                                on: {
                                    click: () => {
                                        this.show(params.row.id)
                                    }
                                }
                            }, params.row.name)
                        }
                    },
                    {
                        title: '服务范围',
                        sortable: true,
                        key: 'site_name'
                    },
                    {
                        title: '状态',
                        sortable: true,
                        width: 140,
                        render: (h, params) => {
                            if (params.row.status == 1) {
                                return h('span', {
                                    style: {
                                        color: '#14AA64'
                                    }
                                }, '正常')
                            } else {
                                return h('span', {
                                    style: {
                                        color: '#9EA7B4'
                                    }
                                }, '过期')
                            }
                        }
                    },
                    {
                        title: '有效期',
                        sortable: true,
                        render: (h, params) => {
                            return h('span', params.row.effecttime.slice(0, 10) + '-' + params.row.invalidtime.slice(0, 10))
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
                                            this.show(params.row.id)
                                        }
                                    }
                                }, '查看'),
                                h('a', {
                                    style: {
                                        color: '#D0021B'
                                    },
                                    on: {
                                        click: () => {
                                            this.removeContract(params.row.id)
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
                    setTableItem, 2000
                )
            },
            // 合同筛选
            changeGroupName (label) {
                if (label == 1) {
                    this.url = SupplierManageHttp.map.getContractList + '/' + this.$route.params.id + '/1'
                    this.$refs.datatable.refresh(this.url)
                } else if (label == 2) {
                    this.url = SupplierManageHttp.map.getContractList + '/' + this.$route.params.id + '/2'
                    this.$refs.datatable.refresh(this.url)
                } else {
                    this.url = this.url = SupplierManageHttp.map.getContractList + '/' + this.$route.params.id + '/0'
                    this.$refs.datatable.refresh(this.url)
                }
            },
            // 添加合同
            addContract () {
                this.$refs.addContract.open()
            },
            // 删除合同
            removeContract (id) {
                this.$refs.delContract.open(id)
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
                    this.$refs.delManyContract.open(this.select_ids)
                } else {
                    this.$Message.error('请选择要删除的合同')
                }
            },
            // 查看合同
            show (id) {
                this.$route.params.sid = id
                location.href = '/#/suppliermanage/contract/showcontract/' + this.$route.params.id + '/' + this.$route.params.sid
            },
            // 刷新表格
            refresh () {
                this.$refs.datatable.refresh(this.url)
            }
            // addclose () {
            //     this.$refs.datatable.$emit('refresh', this.url)
            // }
        }
    }
</script>
