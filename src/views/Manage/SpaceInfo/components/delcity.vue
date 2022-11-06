<template>
    <Modal v-model="show" title="删除城市">
        <div class="">
            <div class="item">
                <Alert type="warning" show-icon>
                    删除时，若存在下级会将下级所有空间信息一同删除
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
    import SpaceInfoHttp from 'server/http/spaceinfo'
    export default {
        data () {
            return {
                show: false,
                id: ''
            }
        },
        methods: {
            open (node) {
                this.id = node.id
                this.show = true
            },
            cancel () {
                this.show = false
            },
            delbtn () {
                SpaceInfoHttp.delPlace(this.id).then(() => {
                    this.$Message.success('删除成功')
                    this.$parent.list()
                    this.show = false
                }).catch((error) => {
                    this.$Message.error(error)
                    this.show = false
                })
            }
        }
    }
</script>
