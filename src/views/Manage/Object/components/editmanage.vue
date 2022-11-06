<template>
    <Modal v-model="addobject" title="编辑对象大类" @on-cancel="cancel('formInline')">
        <Form ref="formInline" :model="formInline" :rules="ruleInline" :label-width="120">
            <FormItem prop="name" label="对象大类名称：">
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
    import ManageObjectHttp from 'server/http/manageobject'
    export default {
        data () {
            const validateName = (rule, value, callback) => {
                if (value.replace(/\s+/g, '') == '') {
                    callback(new Error('请输入对象大类名称'))
                } else {
                    callback()
                }
            }
            return {
                addobject: false,
                confirmDis: false,
                formInline: {
                    name: '',
                    id: ''
                },
                ruleInline: {
                    name: [
                        { required: true, validator: validateName, trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
            open (data) {
                console.log(data.id)
                this.formInline.id = data.id
                this.formInline.name = data.name
                this.addobject = true
            },
            handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.confirmDis = true
                        ManageObjectHttp.editManagetype({id: this.formInline.id, name: this.formInline.name}).then((res) => {
                            this.formInline.name = ''
                            this.confirmDis = false
                            this.addobject = false
                            this.$Message.success('提交成功!')
                            this.$parent.editNode(res)
                        }).catch((error) => {
                            this.confirmDis = false
                            this.$Message.error(error)
                        })
                    } else {
                        this.confirmDis = false
                        // this.$Message.error('表单验证失败!')
                    }
                })
            },
            cancelSubmit () {
                this.$refs['formInline'].resetFields()
                this.addobject = false
            },
            // 模态框关闭
            cancel (formInline) {
                this.$refs[formInline].resetFields()
            }
        }
    }
</script>
