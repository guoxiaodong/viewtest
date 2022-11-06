<template>
    <Modal v-model="addrights" title="新增权限" @on-cancel="cancel()">
        <rightForm ref='rightFrom' :form-inline='formInline'></rightForm>
        <Form>
            <FormItem class="formbtns">
                <Button type="ghost" @click="close()">取&emsp;消</Button>
                <Button type="primary" @click="submit()" :disabled="confirmDis">确&emsp;定</Button>
            </FormItem>
        </Form>
        <span slot="footer"></span>
    </Modal>
</template>
<script>
    import rightForm from './rightForm'
    import ztree from '@/mixins/ztree'
    export default {
        components: {
            rightForm
        },
        mixins: [
            ztree
        ],
        data () {
            return {
                formInline: {
                    name: '',
                    identify: '',
                    pid: '',
                    pname: ''
                },
                addrights: false,
                confirmDis: false
            }
        },
        methods: {
            open (node) {
                this.addrights = true
                this.formInline.pid = node.id
                this.formInline.pname = node.id ? this.getFullParentNodeName(node) + ' / ' + node.name : node.name
            },
            close () {
                this.$refs.rightFrom.close()
                this.addrights = false
            },
            // 模态框关闭
            cancel () {
                this.$refs.rightFrom.close()
            },
            submit () {
                this.confirmDis = true
                this.$refs.rightFrom.submit().then((res) => {
                    this.$parent.addNode(res)
                    this.confirmDis = false
                    this.addrights = false
                }).catch(() => {
                    this.confirmDis = false
                })
            }
        },
        watch: {
            addrights (v) {
                if (v === false) {
                    this.formInline.name = ''
                    this.formInline.identify = ''
                    this.formInline.pid = ''
                    this.formInline.pname = ''
                }
            }
        }
    }
</script>
