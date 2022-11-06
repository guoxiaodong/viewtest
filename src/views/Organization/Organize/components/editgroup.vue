<template>
    <Modal v-model="editgroup" title="编辑部门">
        <Form ref="formInline" :model="formInline" :rules="ruleInline" :label-width="100">
            <FormItem prop="name" label="部门名称：">
                <Input type="text" v-model="formInline.name" placeholder="请输入"></Input>
            </FormItem>
            <FormItem class="formbtns">
                <Button type="ghost" @click="cancelSubmit()">取&emsp;消</Button>
                <Button type="primary" @click="handleSubmit('formInline')">确&emsp;定</Button>
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
                editgroup: false,
                formInline: {
                    name: '',
                    id: ''
                },
                ruleInline: {
                    name: [
                        { required: true, message: '请填写部门名', trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
            openeditmodal (node) {
                this.editgroup = true
                this.formInline.id = node.id
                this.formInline.pid = node.pid
                this.formInline.name = node.name
            },
            handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        GroupHttp.edit(this.formInline).then((res) => {
                            this.$Message.success('编辑成功!')
                            this.formInline.name = ''
                            this.$parent.editNode(res)
                        }).catch((error) => {
                            this.$Message.error(error)
                        })
                        this.editgroup = false
                    } else {
                        // this.$Message.error('表单验证失败!')
                    }
                })
            },
            cancelSubmit () {
                this.editgroup = false
                this.formInline.name = ''
            }
        }
    }
</script>
