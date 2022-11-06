<template>
    <Modal v-model="show" :title="title">
        <div class="">
            <div class="item">
                <Alert type="warning" show-icon>
                    删除合同之后将无法恢复
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
            open (id) {
                this.id = id
                this.show = true
            },
            cancel () {
                this.show = false
            },
            delbtn () {
                SupplierManageHttp.delContract(this.id).then(() => {
                    this.$Message.success('删除成功')
                    this.show = false
                    this.$parent.refresh()
                    this.$parent.$parent.contractNum()
                    this.$parent.tableTitle()
                }).catch((error) => {
                    this.$Message.error(error)
                    this.show = false
                })
            }
        }
    }
</script>
