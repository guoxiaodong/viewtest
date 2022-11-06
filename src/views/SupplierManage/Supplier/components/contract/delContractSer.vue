<template>
    <Modal v-model="show" :title="title">
        <div class="">
            <div class="item">
                <Alert type="warning" show-icon>
                    删除的服务商还可以在添加回来
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
    import SupplierManageHttp from 'server/http/supplierManage'
    require('static/css/modal.css')
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
            open (serviceid) {
                this.id = serviceid
                this.show = true
            },
            cancel () {
                this.show = false
            },
            delbtn () {
                SupplierManageHttp.delContractSer({contractid: this.$route.params.sid, serviceid: this.id}).then(() => {
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
