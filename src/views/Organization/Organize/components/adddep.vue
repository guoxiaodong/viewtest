<template>
    <Modal v-model="adddep" title="新增部门" @on-cancel="cancel('formInline')">
        <Form ref="formInline" :model="formInline" :rules="ruleInline" :label-width="100">
            <FormItem prop="name" label="部门名称：">
                <Input type="text" v-model="formInline.name" placeholder="请输入"></Input>
            </FormItem>
            <FormItem class="formbtns">
                <Button type="ghost" @click="cancelSubmit()">取&emsp;消</Button>
                <Button type="primary" @click="handleSubmit('formInline')" :disabled="confirmDis">确&emsp;定</Button>
            </FormItem>
        </Form>
        <span slot="footer"></span>
    </Modal>
</template>
<script>
    import GroupHttp from 'server/http/group'
    export default {
        data () {
            return {
                adddep: false,
                confirmDis: false,
                formInline: {
                    name: '',
                    id: ''
                },
                ruleInline: {
                    name: [
                        { required: true, message: '请输入部门名称', trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
            openmodal (node) {
                console.log(node)
                this.adddep = true
                this.formInline.pid = node.id
                this.formInline.supplier_id = node.supplier_id
            },
            handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.confirmDis = true
                        GroupHttp.create(this.formInline).then((res) => {
                            this.$Message.success('提交成功!')
                            this.formInline.name = ''
                            this.$parent.addNode(res)
                            this.confirmDis = false
                            this.adddep = false
                        }).catch((error) => {
                            this.confirmDis = false
                            this.$Message.error(error)
                        })
                    } else {
                        // this.$Message.error('表单验证失败!')
                    }
                })
            },
            cancelSubmit () {
                this.$refs['formInline'].resetFields()
                this.adddep = false
            },
            // 模态框关闭
            cancel (formInline) {
                this.$refs[formInline].resetFields()
            }
        }
    }
</script>
