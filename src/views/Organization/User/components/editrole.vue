
<template>
    <div>
        <div class="roleinfo" >
            <p>姓名：{{userinfo.name}}</p>
            <p>
                <span v-if="professions[0]">岗位：{{professions[0].name}}&emsp;&emsp;&emsp;&emsp;&emsp;</span>
                <span v-if="userinfo.group">部门：{{userinfo.group.name}}</span>
            </p>
    </div>
        <div class="trans">
            <template>
                <Transfer
                    :data="roles"
                    :target-keys="targetKeys"
                    :render-format="render"
                    :list-style="listStyle"
                    :titles="['未授权角色：', '已授权角色：']"
                    @on-change="handleChange"></Transfer>
            </template>
        </div>
        <div class="formbtns">
            <div class="item">
                <Button type="ghost" @click="cancelSubmit()">取&emsp;消</Button>
                <Button type="primary" @click="handleSubmit()">确&emsp;定</Button>
            </div>
        </div>
    </div>
</template>
<script>
    import UserHttp from 'server/http/user'
    require('static/css/transfer.css')
    export default {
        props: {
            Id: {
                type: Number,
                default () {
                    return 0
                }
            }
        },
        data () {
            return {
                userinfo: {
                    group: {},
                    profession: {}
                },
                roles: [],
                professionRoles: [],
                professions: [],
                data: {},
                targetKeys: [],
                listStyle: {
                    width: '47%',
                    height: '400px'
                }
            }
        },
        created () {
            UserHttp.userroles(this.Id).then((data) => {
                this.userinfo = data.userinfo
                this.roles = data.allrolers
                this.targetKeys = data.targetkeys
                this.professionRoles = data.professionRoles
                this.professions = data.professions
            })
        },
        methods: {
            render (item) {
                return item.label
            },
            handleChange (newTargetKeys, direction, moveKeys) {
                this.targetKeys = newTargetKeys
            },
            // 提交按钮
            handleSubmit () {
                this.data.userid = this.Id
                this.data.roles = this.targetKeys.filter(key => !this.professionRoles.includes(key))
                UserHttp.userrolesadd(this.data).then(() => {
                    this.$Message.success('修改成功')
                    this.$parent.close()
                }).catch((error) => {
                    this.$Message.error(error)
                    this.$parent.close()
                })
            },
            // 取消按钮
            cancelSubmit () {
                this.$parent.close()
            }
        }
    }
</script>
