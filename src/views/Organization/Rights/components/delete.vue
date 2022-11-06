<template>
    <Modal v-model="show" title="删除权限">
        <div class="">
            <div class="item">
                <Alert type="warning" show-icon>
                    删除权限将影响到用户使用
                    <template slot="desc">
                        你还要继续吗？
                    </template>
                </Alert>
            </div>
        </div>
        <div class="formbtns">
            <div class="item">
                <Button type="ghost" @click="cancel()">取&emsp;消</Button>
                <Button type="primary" @click="delbtn()">确&emsp;定</Button>
            </div>
        </div>
        <span slot="footer"></span>
    </Modal>

</template>
<script>
    import PermissionHttp from 'server/http/permission'
    export default {
        data () {
            return {
                show: false,
                id: ''
            }
        },
        methods: {
            init (id) {
                this.id = id
                this.show = true
            },
            cancel () {
                this.show = false
            },
            delbtn () {
                PermissionHttp.del(this.id).then(() => {
                    this.$parent.delCheckedNodes()
                    this.$Message.success('删除成功')
                    this.show = false
                }).catch((error) => {
                    this.$Message.error(error)
                    this.show = false
                })
            }
        }
    }
</script>
