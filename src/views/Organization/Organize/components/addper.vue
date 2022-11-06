<template>
        <div>
            <dataTable
                @on-selection-change="selectchange"
                ref="datatable"
                searchName="请输入搜索内容"
                :columns="columns"
                :data="data"
                dataname="data"
                :url="url">
            </dataTable>
            <div class="formbtns">
                <div class="item">
                    <Button type="ghost" @click="cancelSubmit()">取&emsp;消</Button>
                    <Button type="primary" @click="handleSubmit()">确&emsp;定</Button>
                </div>
            </div>
       </div>
</template>
<script>
    import dataTable from '@/components/dataTable.vue'
    require('static/css/datatable.css')
    import GroupHttp from 'server/http/group'
    export default {
        components: {
            dataTable
        },
        props: {
            Id: Number
        },
        created () {
            this.url = GroupHttp.map.exgroupuserlist + '/' + this.Id
        },
        data () {
            return {
                select_ids: '',
                addper: false,
                url: GroupHttp.map.exgroupuserlist + '/0',
                columns: [
                    {
                        type: 'selection',
                        width: 70,
                        align: 'center'
                    },
                    {
                        title: '姓名',
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
                        key: 'professionsname'
                    },
                    {
                        title: '部门',
                        key: 'groupname',
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
                        width: 100,
                        key: 'states',
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
                    }
                ],
                data: []
            }
        },
        methods: {
            // 批量添加
            selectchange (selection) {
                let ids = []
                for (let v of selection) {
                    ids.push(v.id)
                }
                this.select_ids = ids.join(',')
            },
            handleSubmit () {
                if (this.select_ids.length != 0) {
                    var data = {}
                    data.users_id = this.select_ids
                    GroupHttp.addGroupUser(data, this.Id).then(() => {
                        this.$Message.success('添加成功!')
                        this.$parent.close()
                        this.$parent.$parent.refresh(this.Id)
                    }).catch((error) => {
                        this.$Message.error(error)
                        this.show = false
                    })
                } else {
                    // this.$Message.error('请选择要添加的用户')
                }
            },
            cancelSubmit () {
                this.$parent.close()
            }
        }
    }
</script>
