<template>
    <Modal v-model="addobject" title="编辑城市" @on-cancel="cancel('formInline')">
        <Form ref="formInline" :model="formInline" :rules="ruleInline" :label-width="100">
            <FormItem prop="city_name" label="城市名称：">
                <Input type="text" v-model="formInline.city_name" placeholder="请输入"></Input>
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
                    callback(new Error('请输入城市名称'))
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
                    city_name: ''
                },
                ruleInline: {
                    city_name: [
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
                this.getCityList(this.id)
            },
            getCityList (id) {
                SpaceInfoHttp.getPlaceInfo(this.id).then((data) => {
                    this.formInline.city_name = data.cityinfo.name
                })
            },
            handleSubmit (name) {
                this.confirmDis = true
                this.submitCount ++
                this.$refs[name].validate((valid) => {
                    if (valid && this.submitCount == 1) {
                        this.confirmDis = true
                        SpaceInfoHttp.putPlace({id: this.id, name: this.formInline.city_name, fid: 0, level: this.level}).then((res) => {
                            this.confirmDis = false
                            this.addobject = false
                            this.$Message.success('提交成功!')
                            this.confirmDis = false
                            this.$parent.list()
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
