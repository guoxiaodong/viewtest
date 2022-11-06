<template>
    <Modal v-model="show" :title="title">
        <div class="">
            <div class="item">
                <Alert type="warning" show-icon>
                    <template slot="desc">
                        确定删除吗？
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
        props: {
            title: ''
        },
        data () {
            return {
                show: false,
                id: '',
                groupid: ''
            }
        },
        methods: {
            init (id, groupid) {
                this.id = id
                this.groupid = groupid
                this.show = true
            },
            cancel () {
                this.show = false
            },
            delbtn () {
                GroupHttp.deleteGroupUser(this.id).then(() => {
                    this.$Message.success('删除成功')
                    this.show = false
                    this.$parent.refresh(this.groupid)
                    console.log()
                }).catch((error) => {
                    this.$Message.error(error)
                    this.show = false
                })
            }
        }
    }
</script>
