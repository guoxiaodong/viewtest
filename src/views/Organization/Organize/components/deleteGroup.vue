<template>
    <Modal v-model="show" title="删除部门">
        <div class="">
            <div class="item">
                <Alert type="warning" show-icon>
                    部门删除时，若存在下级部门会将下级所有部门一同删除
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
    import GroupHttp from 'server/http/group'
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
                GroupHttp.del(this.id).then(() => {
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
