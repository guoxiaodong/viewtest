<template>
    <div class="">
        <div class="datatable">
            <dataTable :pri_btn_name="pri_btn_name" :tablename="tablename" @on-selection-change="selectchange" :hasbtn="hasbtn" ref="datatable" searchName="请输入搜索内容" :columns="columns" :data="data" dataname="data" :url="url">
                 <div class="t-head-bottom" slot="buttons">
                     <Button type="primary" v-html="pri_btn_name" @click="add()"></Button>
                     <!--<Button type="ghost" @click="delbatch()">批量删除</Button>-->
                 </div>
            </dataTable>
        </div>

        <!--新增-->
        <adduser ref="adduser"></adduser>

        <!--操作编辑-->
        <edituser ref="edituser"></edituser>
        <!--<Modal v-model="edituser" title="编辑用户" :styles="{width: '80%'}">
            <edituser v-if="edituser"></edituser>
            <span slot="footer"></span>
        </Modal>-->

        <!--批量删除-->
        <Modal v-model="demodals" title="批量删除用户">
            <demodal></demodal>
            <div class="formbtns">
                <div class="item">
                    <Button type="ghost" @click="allcancel()">取&emsp;消</Button>
                    <Button type="primary" @click="alldelete()">确&emsp;定</Button>
                </div>
            </div>
            <span slot="footer"></span>
        </Modal>

        <!--角色授权编辑-->
        <Modal v-model="editrole" title="角色授权" :styles="{width: '80%'}">
            <editrole v-if="editrole" :Id="eid"></editrole>
            <span slot="footer"></span>
        </Modal>

        <!--删除-->
        <Modal v-model="demodal" title="删除用户">
            <demodal></demodal>
            <div class="formbtns">
                <div class="item">
                    <Button type="ghost" @click="cancel()">取&emsp;消</Button>
                    <Button type="primary" @click="delebtn()">确&emsp;定</Button>
                </div>
            </div>
            <span slot="footer"></span>
        </Modal>

        <loading ref="loading"></loading>
    </div>
</template>
<script>
    import dataTable from '@/components/dataTable.vue'
    import loading from '@/components/loading.vue'
    import adduser from './components/adduser.vue'
    import editrole from './components/editrole.vue'
    import edituser from './components/edituser.vue'
    import demodal from './components/demodal.vue'
    require('static/css/datatable.css')
    require('static/css/modal.css')
    import UserHttp from 'server/http/common'
    export default {
        components: {
            dataTable, adduser, editrole, edituser, demodal, loading
        },
        created () {
            this.$emit('updateActive', '1-2')
        },
        data () {
            return {
                eid: 0,
                tablename: '用户管理',
                pri_btn_name: '新建',
                hasbtn: true,
                url: UserHttp.map.users,
                loading: false,
                adduser: false,
                demodals: false,
                editrole: false,
                edituser: false,
                demodal: false,
                value: '',
                columns: [
                    {
                        type: 'selection',
                        width: 65,
                        align: 'center'
                    },
                    {
                        title: '姓名',
                        width: 90,
                        key: 'username'
                    },
                    {
                        title: '登录账号(手机号)',
                        key: 'phone',
                        render: (h, params) => {
                            return h('span', {
                                style: {
                                    fontFamily: 'Arial, Helvetica, sans-serif'
                                }
                            }, params.row.phone)
                        }
                    },
                    {
                        title: '岗位',
                        key: 'professionsname',
                        sortable: true
                    },
                    {
                        title: '部门',
                        key: 'groupname',
                        sortable: true,
                        render: (h, params) => {
                            if (!params.row.groupname) {
                                return h('span', {
                                    style: {
                                        color: '#D0021B'
                                    }
                                }, '暂无')
                            } else {
                                return h('span', {
                                    style: {
                                        color: '#657180'
                                    }
                                }, params.row.groupname)
                            }
                        }
                    },
                    {
                        title: '聘用状态',
                        key: 'entry_fso',
                        width: '80',
                        sortable: true,
                        render: (h, params) => {
                            if (params.row.entry_fso == 1) {
                                return h('span', {
                                    style: {
                                        color: '#14AA64'
                                    }
                                }, '在职')
                            } else {
                                return h('span', {
                                    style: {
                                        color: '#9EA7B4'
                                    }
                                }, '离职')
                            }
                        }
                    },
                    {
                        title: '创建时间',
                        width: 180,
                        sortable: true,
                        key: 'created_at',
                        render: (h, params) => {
                            return h('span', {
                                style: {
                                    fontFamily: 'Arial, Helvetica, sans-serif'
                                }
                            }, params.row.created_at)
                        }
                    },
                    {
                        title: '角色授权',
                        width: 80,
                        key: 'role',
                        render: (h, params) => {
                            return h('a', {
                                style: {
                                    color: '#3399FF'
                                },
                                on: {
                                    click: () => {
                                        this.redit(params.row.id)
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
                                            this.edit(params.row.id)
                                        }
                                    }
                                }, '编辑')
                                /*
                                h('a', {
                                    style: {
                                        color: '#D0021B'
                                    },
                                    on: {
                                        click: () => {
                                            this.remove(params.index) // 测试
                                            // this.remove(params.row.id) 调用数据备用
                                        }
                                    }
                                }, '删除')
                                */
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
                this.$refs.adduser.open()
                this.$refs.adduser.showPic()
                // console.log()
                // this.showPic()
            },
            // 操作->编辑
            edit (id) {
                this.$refs.loading.init(id)
                this.$refs.edituser.init(id)
            },
            // 角色授权
            redit (id) {
                this.eid = id
                this.editrole = true
            },
            // 操作->删除
            remove (index) {
                this.demodal = true
            },
            // 选择删除
            selectchange () {
                // do something
            },
            // 批量删除
            delbatch () {
                this.demodals = true
            },
            allcancel () {
                this.demodals = false
            },
            alldelete () {
                // do something
                alert('删除成功')
                this.demodals = false
                // self.$refs.datatable.$emit('refresh', self.url) 删除成功，刷新列表
            },
            cancel () {
                this.demodal = false
            },
            delebtn () {
                // do something
                alert('删除成功')
                this.demodal = false
                // self.$refs.datatable.$emit('refresh', self.url) 删除成功，刷新列表
            },
            refresh () {
                this.$refs.datatable.refresh(this.url)
            },
            // 取消对话框
            addclose () {
                this.$refs.datatable.$emit('refresh', self.url)
            },
            // 关闭loading
            loadingclose () {
                this.$refs.loading.loadingclose()
            }
        }
    }
</script>
