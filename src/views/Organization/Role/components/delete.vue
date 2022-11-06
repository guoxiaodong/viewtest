<template>
    <Modal v-model="show" :title="title">
        <div class="">
            <div class="item">
                <Alert type="warning" show-icon>
                    删除岗位将影响到所有授权此岗位的用户
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
    import RoleHttp from 'server/http/role'
    export default {
        props: {
            title: ''
        },
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
                RoleHttp.delete(this.id).then(() => {
                    this.$Message.success('删除成功')
                    this.show = false
                    this.$parent.refresh()
                }).catch((error) => {
                    this.$Message.error(error)
                    this.show = false
                })
            }
        }
    }
</script>
