<template>
    <div class="">
        <div class="datatable">
            <dataTable :pri_btn_name="pri_btn_name" :tablename="tablename" @on-selection-change="selectchange" :hasbtn="hasbtn" ref="datatable" searchName="请输入搜索内容" :columns="columns" :data="data" dataname="data" :url="url">
                 <div class="t-head-bottom" slot="buttons">
                     <Button type="primary" v-html="pri_btn_name" @click="addModal()"></Button>
                     <Button type="ghost" @click="delbatch()">批量删除</Button>
                 </div>
            </dataTable>
        </div>
        <!--添加-->
        <add ref="add"></add>
        <!--批量删除-->
        <delpost ref="alldelpost" :title="alldeltitle"></delpost>
        <!--编辑-->
        <edit ref="editpost"></edit>
        <!--删除-->
        <delpost ref="delpost" :title="deltitle"></delpost>
    </div>
</template>
<script>
    import dataTable from '@/components/dataTable.vue'
    import add from './components/add.vue'
    import delpost from './components/delpost.vue'
    import edit from './components/edit.vue'
    require('static/css/datatable.css')
    require('static/css/modal.css')
    import PostHttp from 'server/http/post'
    export default {
        components: {
            dataTable, add, delpost, edit
        },
        created () {
            this.$emit('updateActive', '1-5')
        },
        data () {
            return {
                tablename: '岗位管理',
                pri_btn_name: '新建',
                deltitle: '删除岗位',
                alldeltitle: '批量删除岗位',
                hasbtn: true,
                url: PostHttp.map.post,
                value: '',
                select_ids: '',
                columns: [
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: '名称',
                        width: 130,
                        sortable: 'custom',
                        key: 'professionname'
                    },
                    {
                        title: '岗位职责',
                        key: 'description'
                    },
                    {
                        title: '成员（人）',
                        width: 140,
                        key: 'user_number',
                        sortable: true,
                        render: (h, params) => {
                            return h('span', {
                                style: {
                                    fontFamily: 'Arial, Helvetica, sans-serif',
                                    color: '#657180'
                                }
                            }, params.row.user_number)
                        }
                    },
                    {
                        title: '工单类型',
                        sortable: 'custom',
                        key: 'wotypename'
                    },
                    {
                        title: '排班',
                        key: 'work',
                        render: (h, params) => {
                            if (params.row.work == 1) {
                                return h('div', '是')
                            } else {
                                return h('div', '否')
                            }
                        }
                    },
                    {
                        title: '操作',
                        width: 120,
                        key: 'action',
                        render: (h, params) => {
                            if (params.row.delete_fso == 0) {
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
                    }
                ],
                data: []
            }
        },
        methods: {
            // 新建
            addModal () {
                this.$refs.add.open()
            },
            // 批量选择
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
                    this.$refs.alldelpost.open(this.select_ids)
                } else {
                    this.$Message.error('请选择要删除的岗位')
                }
            },
            // 编辑
            edit (id) {
                this.$refs.editpost.open(id)
            },
            // 删除
            remove (id) {
                this.$refs.delpost.open(id)
            },
            // 刷新列表
            refresh () {
                this.$refs.datatable.refresh(this.url)
            },
            // 取消对话框
            addclose () {
                this.$refs.datatable.$emit('refresh', self.url)
            }
        }
    }
</script>
