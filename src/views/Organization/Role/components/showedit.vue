<template>
    <Modal v-model="show" title="编辑" >
        <Form ref="formedit" :model="formedit" :rules="ruleInline">
            <FormItem prop="name" label="名称：" :label-width="70">
                <Input type="text" v-model="formedit.name" placeholder="请输入名称"></Input>
            </FormItem>
            <FormItem prop="description" label="描述：" :label-width="70">
                <Input v-model="formedit.description" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入..."></Input>
            </FormItem>
            <FormItem class="formbtns">
                <Button type="ghost" @click="editcancelbtn()">取&emsp;消</Button>
                <Button type="primary" @click="handleSubmit('formedit')">确&emsp;定</Button>
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
                formedit: {
                    id: '',
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
            init (row) {
                this.formedit.id = row.id
                this.formedit.name = row.name
                this.formedit.description = row.description
                this.show = true
            },
            // 确定按钮
            handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        RoleHttp.edit(this.formedit).then(() => {
                            this.$Message.success('编辑成功')
                            this.show = false
                            this.$parent.refresh()
                        }).catch((error) => {
                            this.$Message.error(error)
                            this.show = false
                        })
                    }
                })
            },
            // 取消按钮
            editcancelbtn () {
                this.show = false
            }
        }
    }
</script>
