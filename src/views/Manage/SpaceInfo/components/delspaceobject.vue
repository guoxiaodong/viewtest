<template>
    <Modal v-model="show" title="删除空间对象">
        <div class="">
            <div class="item">
                <Alert type="warning" show-icon>
                    <template slot="desc">
                        你确定要删除空间管理对象吗？
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
                spaceid: '',
                objectid: ''
            }
        },
        methods: {
            open (spaceid, id) {
                this.spaceid = spaceid
                this.objectid = id
                this.show = true
            },
            cancel () {
                this.show = false
            },
            delbtn () {
                SpaceInfoHttp.delSpaceObject({space_id: this.spaceid, object_id: this.objectid}).then(() => {
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
