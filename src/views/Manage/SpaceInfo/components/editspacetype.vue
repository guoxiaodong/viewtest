<template>
    <Modal v-model="add" title="编辑">
        <Form ref="formInline" :model="formInline" :rules="ruleInline" :label-width="100">
            <FormItem prop="spacetypename" label="空间类型：">
                <Input type="text" v-model="formInline.spacetypename" placeholder="请输入"></Input>
            </FormItem>
            <FormItem class="formbtns">
                <Button type="ghost" @click="cancelSubmit()">取&emsp;消</Button>
                <Button type="primary" @click="handleSubmit('formInline')" :disabled='confirmDis'>确&emsp;定</Button>
            </FormItem>
        </Form>
        <span slot="footer"></span>
    </Modal>
</template>
<script>
    import SpaceInfoHttp from 'server/http/spaceinfo'
    export default {
        data () {
            return {
                add: false,
                confirmDis: false,
                submitCount: 0,
                id: '',
                formInline: {
                    spacetypename: ''
                },
                ruleInline: {
                    spacetypename: [
                        { required: true, message: '请输入空间类型', trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
            open (id) {
                this.id = id
                this.$refs['formInline'].resetFields()
                SpaceInfoHttp.getSpaceInfo(this.id).then((data) => {
                    this.formInline.spacetypename = data.data.name
                })
                this.add = true
                this.submitCount = 0
            },
            handleSubmit (name) {
                this.confirmDis = true
                this.submitCount ++
                this.$refs[name].validate((valid) => {
                    if (valid && this.submitCount == 1) {
                        SpaceInfoHttp.editSpace({id: this.id, spacetypename: this.formInline.spacetypename}).then(() => {
                            this.add = false
                            this.$Message.success('编辑成功')
                            this.$refs[name].resetFields()
                            this.$parent.refresh()
                            this.confirmDis = false
                        }).catch((error) => {
                            this.$Message.error(error)
                            this.confirmDis = false
                            this.submitCount = 0
                        })
                    } else {
                        // this.$Message.error('表单验证失败!')
                        this.confirmDis = false
                    }
                })
            },
            cancelSubmit () {
                this.add = false
            }
        }
    }
</script>
