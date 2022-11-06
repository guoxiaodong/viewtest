<template>
    <Modal v-model="show" title="删除">
        <div class="">
            <div class="item">
                <Alert type="warning" show-icon>
                    删除此管理对象将影响到所有授权此管理对象的用户
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
    import ManageObjectHttp from 'server/http/manageobject'
    export default {
        data () {
            return {
                show: false,
                id: ''
            }
        },
        methods: {
            open (id) {
                this.id = id
                this.show = true
            },
            cancel () {
                this.show = false
            },
            delbtn () {
                ManageObjectHttp.delobject(this.id).then(() => {
                    this.$Message.success('删除成功')
                    this.show = false
                    this.$parent.refresh(this.url)
                }).catch((error) => {
                    this.$Message.error(error)
                    this.show = false
                })
            }
        }
    }
</script>
