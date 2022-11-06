<template>
    <Modal v-model="addobject" title="新增层" @on-cancel="cancel('formInline')">
        <Form ref="formInline" :model="formInline" :rules="ruleInline" :label-width="120">
            <FormItem prop="tier_name" label="层名称：">
                <Input type="text" v-model="formInline.tier_name" placeholder="请输入"></Input>
            </FormItem>
            <FormItem prop="tier_shortname" label="层名称缩写：">
                <Input type="text" v-model="formInline.tier_shortname" placeholder="请输入"></Input>
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
    import SpaceInfoHttp from 'server/http/spaceinfo'
    export default {
        data () {
            const validateName = (rule, value, callback) => {
                if (value.replace(/\s+/g, '') == '') {
                    callback(new Error('请输入层名称'))
                } else {
                    callback()
                }
            }
            return {
                addobject: false,
                submitCount: 0,
                confirmDis: false,
                id: '',
                level: '',
                formInline: {
                    tier_name: '',
                    tier_shortname: ''
                },
                ruleInline: {
                    tier_name: [
                        { required: true, validator: validateName, trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
            open (node) {
                console.log(node)
                this.id = node.id
                this.level = node.level
                this.addobject = true
                this.submitCount = 0
            },
            handleSubmit (name) {
                this.confirmDis = true
                this.submitCount ++
                this.$refs[name].validate((valid) => {
                    if (valid && this.submitCount == 1) {
                        this.confirmDis = true
                        SpaceInfoHttp.addPlace({name: this.formInline.tier_name, shortname: this.formInline.tier_shortname, fid: this.id, level: this.level}).then((res) => {
                            this.confirmDis = false
                            this.addobject = false
                            this.$Message.success('提交成功!')
                            this.$refs[name].resetFields()
                            this.$parent.addTierNode(res)
                        }).catch((error) => {
                            this.confirmDis = false
                            this.submitCount = 0
                            this.$Message.error(error)
                        })
                    } else {
                        this.confirmDis = false
                        this.submitCount = 0
                    }
                })
            },
            cancelSubmit (formInline) {
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
