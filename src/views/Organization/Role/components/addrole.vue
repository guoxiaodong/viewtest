<template>
    <Modal v-model="show" title="新增" @on-cancel="cancel('formadd')">
        <Form ref="formadd" :model="formadd" :rules="ruleInline">
            <FormItem prop="name" label="名称：" :label-width="70">
                <Input type="text" v-model="formadd.name" placeholder="请输入名称"></Input>
            </FormItem>
            <FormItem prop="description" label="描述：" :label-width="70">
                <Input v-model="formadd.description" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入..."></Input>
            </FormItem>
            <FormItem class="formbtns">
                <Button type="ghost" @click="addcancelSubmit('formadd')">取&emsp;消</Button>
                <Button type="primary" @click="handleSubmit('formadd')" :disabled='confirmDis'>确&emsp;定</Button>
            </FormItem>
        </Form>
        <span slot="footer"></span>
    </Modal>
</template>
<script>
    import RoleHttp from 'server/http/role'

    export default {
        data () {
            return {
                show: false,
                confirmDis: false,
                submitCount: 0,
                formadd: {
                    name: '',
                    description: ''
                },
                ruleInline: {
                    name: [
                        { required: true, message: '请填写用户名', trigger: 'blur' }
                    ],
                    description: [
                        { required: true, message: '请填写描述', trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
            open () {
                this.show = true
                this.submitCount = 0
                this.formadd.name = ''
                this.formadd.description = ''
            },
            // 确定按钮
            handleSubmit (name) {
                this.confirmDis = true
                this.submitCount ++
                this.$refs[name].validate((valid) => {
                    if (valid && this.submitCount == 1) {
                        RoleHttp.create(this.formadd).then(() => {
                            this.$Message.success('创建成功')
                            this.$parent.refresh()
                            this.confirmDis = false
                            this.show = false
                        }).catch((error) => {
                            this.$Message.error(error)
                            this.confirmDis = false
                            this.submitCount = 0
                        })
                    } else {
                        this.confirmDis = false
                    }
                })
            },
            // 取消按钮
            addcancelSubmit (formadd) {
                this.$refs[formadd].resetFields()
                this.show = false
            },
            // 模态框关闭
            cancel (formadd) {
                this.$refs[formadd].resetFields()
            }
        }
    }
</script>
