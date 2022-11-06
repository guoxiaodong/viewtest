<template>
    <div>
        <div class="datatable">
            <dataTable :ifsearch="ifsearch" :pri_btn_name="pri_btn_name" :tablename="tablename" :hasbtn="hasbtn" ref="datatable" searchName="请输入搜索内容" :columns="columns" :data="data" dataname="data" :url="url">
                <div class="t-head-bottom" slot="buttons" style="margin-top: -52px;">
                    <Button type="primary" v-html="pri_btn_name" @click="add()"></Button>
                </div>
            </dataTable>
        </div>
        <!--新建-->
        <add ref="addspace"></add>
        <!--编辑-->
        <editspacetype ref="editspace"></editspacetype>
        <!--删除-->
        <delspacetype ref="delspacetype"></delspacetype>
    </div>
</template>
<script>
import dataTable from '@/components/dataTable.vue'
require('static/css/datatable.css')
require('static/css/modal.css')
import SpaceInfoHttp from 'server/http/spaceinfo'
import Add from '../components/add.vue'
import delspacetype from '../components/delspacetype.vue'
import editspacetype from '../components/editspacetype.vue'
export default {
    components: {
        dataTable, Add, delspacetype, editspacetype
    },
    created () {
        this.$emit('updateActiveName', '2')
    },
    data () {
        return {
            ifsearch: true,
            tablename: '',
            pri_btn_name: '新建',
            deleteOneTitle: '删除角色',
            hasbtn: false,
            page: 1,
            pageSize: 10,
            url: SpaceInfoHttp.map.getSpaceList,
            select_ids: '',
            columns: [
                {
                    title: '序号',
                    width: 120,
                    align: 'center',
                    render: (h, params) => {
                        return (this.page - 1) * this.pageSize + (params.index + 1)
                    }
                },
                {
                    title: '空间类型',
                    key: 'name',
                    sortable: 'custom'
                },
                {
                    title: '空间个数',
                    key: 'spacecount',
                    sortable: true
                },
                {
                    title: '操作',
                    width: 120,
                    key: 'action',
                    render: (h, params) => {
                        if (params.row.spacecount == 0) {
                            return h('div', [
                                h('a', {
                                    style: {
                                        marginRight: '20px',
                                        color: '#3399FF'
                                    },
                                    on: {
                                        click: () => {
                                            this.edit(params.row.id)
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
                        } else {
                            return h('div', [
                                h('a', {
                                    style: {
                                        marginRight: '20px',
                                        color: '#3399FF'
                                    },
                                    on: {
                                        click: () => {
                                            this.edit(params.row.id)
                                        }
                                    }
                                }, '编辑')
                            ])
                        }
                    }
                }
            ],
            data: []
        }
    },
    methods: {
        // 新增
        add () {
            this.$refs.addspace.open()
        },
        // 编辑
        edit (id) {
            this.$refs.editspace.open(id)
        },
        // 删除
        remove (id) {
            this.$refs.delspacetype.open(id)
        },
        refresh () {
            this.$refs.datatable.refresh(this.url)
        },
        setDataTablePage (page, pageSize) {
            this.page = page
            this.pageSize = pageSize
        }
    }
}
</script>
