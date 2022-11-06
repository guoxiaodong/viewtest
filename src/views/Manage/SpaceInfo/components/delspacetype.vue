<template>
    <Modal v-model="show" title="删除空间类型">
        <div class="">
            <div class="item">
                <Alert type="warning" show-icon>
                    <template slot="desc">
                        确定要删除此空间类型吗？
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
    import SpaceInfoHttp from 'server/http/spaceinfo'
    export default {
        data () {
            return {
                show: false
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
                SpaceInfoHttp.delSpaceType({id: this.id}).then(() => {
                    this.$Message.success('删除成功')
                    this.$parent.refresh()
                    this.show = false
                }).catch((error) => {
                    this.$Message.error(error)
                    this.show = false
                })
            }
        }
    }
</script>
