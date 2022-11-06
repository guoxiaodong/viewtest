<template>
    <div>
        <div class="t-head-bottom m-l-40">
            <Button type="primary" v-html="pri_btn_name" @click="add()"></Button>
            <Button type="ghost" @click="delbatch()">批量删除</Button>
        </div>
        <div class="datatable">
            <dataTable :ifsearch="ifsearch" :pri_btn_name="pri_btn_name" :tablename="tablename"  @on-selection-change="selectchange" :hasbtn="hasbtn" ref="datatable" searchName="请输入搜索内容" :columns="columns" :data="data" dataname="data" :url="url">
            </dataTable>
        </div>
        <!--新建-->
        <addstandard ref="addstandard"></addstandard>
        <!--编辑-->
        <editstandard ref="editstandard"></editstandard>
        <!--删除-->
        <delstandard ref="delstandard" :title="deleteOneTitle"></delstandard>
        <!--批量删除-->
        <delstandard ref="delmanystandard" :title="deleteManyTitle"></delstandard>
    </div>
</template>
<script>
import dataTable from '@/components/dataTable.vue'
require('static/css/datatable.css')
require('static/css/modal.css')
import ManageObjectHttp from 'server/http/manageobject'
import addstandard from '../components/addstandard.vue'
import editstandard from '../components/editstandard.vue'
import delstandard from '../components/delstandard.vue'
export default {
    components: {
        dataTable, addstandard, delstandard, editstandard
    },
    created () {
        this.$emit('updateActiveName', '2')
    },
    data () {
        return {
            ifsearch: false,
            tablename: '',
            pri_btn_name: '新建',
            deleteOneTitle: '删除标准组',
            deleteManyTitle: '批量删除标准组',
            hasbtn: false,
            url: ManageObjectHttp.map.getStandardlist,
            select_ids: '',
            columns: [
                {
                    type: 'selection',
                    width: 120,
                    align: 'center'
                },
                {
                    title: '序号',
                    width: 120,
                    align: 'center',
                    render: (h, params) => {
                        return (this.page - 1) * this.pageSize + (params.index + 1)
                    }
                },
                {
                    title: '岗位职责',
                    key: 'name'
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
                                        this.edit(params.row)
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
        // 新增
        add () {
            this.$refs.addstandard.open()
        },
        // 编辑
        edit (id) {
            this.$refs.editstandard.open(id)
        },
        // 多选
        selectchange (selection) {
            let ids = []
            for (let v of selection) {
                ids.push(v.id)
            }
            this.select_ids = ids.join(',')
        },
        // 批量删除
        delbatch () {
            if (this.select_ids.length != 0) {
                this.$refs.delmanystandard.open(this.select_ids)
            } else {
                this.$Message.error('请选择要删除的标准组')
            }
            // this.$refs.deleteMany.init(this.select_ids)
        },
        // 操作->删除
        remove (id) {
            this.$refs.delstandard.open(id)
        },
        refresh () {
            this.select_ids = ''
            this.$refs.datatable.refresh(this.url)
        },
        setDataTablePage (page, pageSize) {
            this.page = page
            this.pageSize = pageSize
        }
    }
}
</script>
