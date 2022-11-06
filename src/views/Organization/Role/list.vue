<template>
    <div class="">
        <div class="datatable">
            <dataTable :pri_btn_name="pri_btn_name" :tablename="tablename"  @on-selection-change="selectchange" :hasbtn="hasbtn" ref="datatable" searchName="请输入搜索内容" :columns="columns" :data="data" dataname="data" :url="url">
                 <div class="t-head-bottom" slot="buttons">
                     <Button type="primary" v-html="pri_btn_name" @click="add()"></Button>
                     <Button type="ghost" @click="delbatch()">批量删除</Button>
                 </div>
            </dataTable>
        </div>
        <!--新增-->
        <addrole ref="addrole"></addrole>


        <!--权限编辑-->
        <funcedit ref="funcedit"></funcedit>

        <!--空间编辑-->
        <spaceedit ref="spaceedit"></spaceedit>

        <!--空间编辑-->

        <!-- <objectedit ref="objectedit"></objectedit> -->

        <!--操作编辑-->
        <showedit ref="showedit"></showedit>

        <!--操作删除-->
        <deleteRole ref="deleteOne" :title="deleteOneTitle"></deleteRole>

        <!--批量删除-->
        <deleteRole ref="deleteMany" :title="deleteManyTitle"></deleteRole>
    </div>
</template>
<script>
    import dataTable from '@/components/dataTable.vue'
    import addrole from './components/addrole.vue'
    import spaceedit from './components/spaceedit.vue'
    // import objectedit from './components/objectedit.vue'
    import showedit from './components/showedit.vue'
    import deleteRole from './components/delete'
    import funcedit from './components/funcedit'
    require('static/css/datatable.css')
    require('static/css/modal.css')
    import resize from '@/mixins/resize'
    import RoleHttp from 'server/http/role'

    export default {
        components: {
            dataTable, addrole, spaceedit, showedit, deleteRole, funcedit
        },
        created () {
            this.$emit('updateActive', '1-1')
        },
        data () {
            return {
                tablename: '角色管理',
                pri_btn_name: '新增',
                deleteOneTitle: '删除角色',
                deleteManyTitle: '批量删除角色',
                hasbtn: true,
                url: RoleHttp.map.roles,
                select_ids: '',
                columns: [
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: '角色名',
                        width: 130,
                        key: 'name'
                    },
                    {
                        title: '描述',
                        key: 'description'
                    },
                    {
                        title: '成员（人）',
                        width: 140,
                        key: 'user_number',
                        sortable: 'custom',
                        render: (h, params) => {
                            return h('span', {
                                style: {
                                    fontFamily: 'Arial, Helvetica, sans-serif',
                                    color: '#657180'
                                }
                            }, params.row.user_number)
                        }
                    },
                    // {
                    //     title: '管理对象',
                    //     width: 100,
                    //     key: 'obj',
                    //     render: (h, params) => {
                    //         return h('a', {
                    //             style: {
                    //                 color: '#3399FF'
                    //             },
                    //             on: {
                    //                 click: () => {
                    //                     this.editObj(params.row)
                    //                 }
                    //             }
                    //         }, '编辑')
                    //     }
                    // },
                    {
                        title: '功能权限',
                        width: 100,
                        key: 'func',
                        render: (h, params) => {
                            return h('a', {
                                style: {
                                    color: '#3399FF'
                                },
                                on: {
                                    click: () => {
                                        this.fedit(params.row)
                                    }
                                }
                            }, '编辑')
                        }
                    },
                    {
                        title: '空间权限',
                        width: 100,
                        key: 'space',
                        render: (h, params) => {
                            return h('a', {
                                style: {
                                    color: '#3399FF'
                                },
                                on: {
                                    click: () => {
                                        this.sedit(params.row)
                                    }
                                }
                            }, '编辑')
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
        mixins: [ resize ],
        mounted () {
            document.getElementById('modalfixh').style.height = (document.body.clientHeight - 440) + 'px'
            document.getElementById('modalfixh1').style.height = (document.body.clientHeight - 440) + 'px'
            document.getElementById('fixlisth').style.height = (document.body.clientHeight - 440) + 'px'
            document.getElementById('fixlisth1').style.height = (document.body.clientHeight - 440) + 'px'
        },
        methods: {
            // 新增
            add () {
                // this.addrole = true
                this.$refs.addrole.open()
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
                    this.$refs.deleteMany.init(this.select_ids)
                } else {
                    this.$Message.error('请选择要删除角色')
                }
                // this.$refs.deleteMany.init(this.select_ids)
            },
            // 功能权限
            fedit (row) {
                this.$refs.funcedit.open(row)
            },
            // 空间权限
            sedit (row) {
                // sedit (id)
                this.$refs.spaceedit.open(row)
            },
            // 管理对象
            // editObj (row) {
            //     this.$refs.objectedit.open(row)
            // },
            // 操作->编辑
            edit (row) {
                this.$refs.showedit.init(row)
            },
            // 操作->删除
            remove (id) {
                this.$refs.deleteOne.init(id)
            },
            refresh () {
                this.select_ids = ''
                this.$refs.datatable.refresh(this.url)
            },
            onResize () {
                document.getElementById('modalfixh').style.height = (document.body.clientHeight - 440) + 'px'
                document.getElementById('modalfixh1').style.height = (document.body.clientHeight - 440) + 'px'
                document.getElementById('fixlisth').style.height = (document.body.clientHeight - 440) + 'px'
                document.getElementById('fixlisth1').style.height = (document.body.clientHeight - 440) + 'px'
                // document.getElementById('modalfixh2').style.height = (document.body.clientHeight - 440) + 'px'
                // document.getElementById('fixlisth2').style.height = (document.body.clientHeight - 440) + 'px'
            }
        }
    }
</script>
