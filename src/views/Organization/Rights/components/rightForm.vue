<template>
    <Form ref="formInline" :model="formInline" :rules="ruleInline" :label-width="100" class="formr">
        <FormItem prop="name" label="名称：">
            <Input type="text" v-model="formInline.name" placeholder="请输入名称"></Input>
        </FormItem>
        <FormItem prop="identify" label="identify ：">
            <Input type="text" v-model="formInline.identify" placeholder="请输入identify"></Input>
        </FormItem>
        <FormItem prop="pid" label="父级权限：">
            <Input type="text" v-if="formInline.pname" v-model="formInline.pname" disabled></Input>
        </FormItem>
    </Form>
</template>
<script>
    import PermissionHttp from 'server/http/permission'
    export default {
        props: [
            'formInline'
        ],
        data () {
            return {
                ruleInline: {
                    name: [
                        { required: true, message: '名称不能为空', trigger: 'blur' }
                    ],
                    identify: [
                        { required: true, message: 'identify不能为空', trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
            submit () {
                return new Promise((resolve, reject) => {
                    this.$refs['formInline'].validate((valid) => {
                        if (valid) {
                            let httpPromise
                            if (!this.formInline.id) {
                                httpPromise = PermissionHttp.create(this.formInline)
                            } else {
                                httpPromise = PermissionHttp.put(this.formInline)
                            }

                            httpPromise.then((res) => {
                                this.$Message.success('提交成功!')
                                this.addrights = false
                                resolve(res)
                            }).catch((error) => {
                                this.$Message.error(error)
                                reject()
                            })
                        } else {
                            // this.$Message.error('表单验证失败!')
                            reject()
                        }
                    })
                })
            },
            close () {
                this.$refs['formInline'].resetFields()
            }
        }
    }
</script>
