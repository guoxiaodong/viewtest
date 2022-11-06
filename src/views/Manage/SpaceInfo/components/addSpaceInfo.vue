<template>
    <Modal v-model="addobject" title="新增空间信息" @on-cancel="cancel('formInline')">
        <Form ref="formInline" :model="formInline" :rules="ruleInline" :label-width="120">
            <FormItem prop="space_name" label="名称：">
                <Input type="text" v-model="formInline.space_name" placeholder="请输入"></Input>
            </FormItem>
            <FormItem prop="space_shortname" label="名称缩写：">
                <Input type="text" v-model="formInline.space_shortname" placeholder="请输入"></Input>
            </FormItem>
            <FormItem prop="space_typeid" label="空间类型：">
                <Select v-model="formInline.space_typeid">
                   <Option v-for="item in spaceTypeList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                </Select>
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
                    callback(new Error('请输入名称'))
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
                spaceTypeList: [],
                formInline: {
                    space_name: '',
                    space_shortname: '',
                    space_typeid: ''
                },
                ruleInline: {
                    space_name: [
                        { required: true, validator: validateName, trigger: 'blur' }
                    ],
                    space_typeid: [
                        { required: true, type: 'number', message: '请选择空间类型', trigger: 'change' }
                    ]
                }
            }
        },
        methods: {
            open (node) {
                this.id = node.id
                this.level = node.level
                this.addobject = true
                this.submitCount = 0
                this.typeList()
            },
            typeList () {
                SpaceInfoHttp.getAllSpaceType().then((data) => {
                    this.spaceTypeList = data.data
                })
            },
            handleSubmit (name) {
                this.confirmDis = true
                this.submitCount ++
                this.$refs[name].validate((valid) => {
                    if (valid && this.submitCount == 1) {
                        this.confirmDis = true
                        SpaceInfoHttp.addPlace({name: this.formInline.space_name, shortname: this.formInline.space_shortname, type_id: this.formInline.space_typeid, fid: this.id, level: this.level + 1}).then((res) => {
                            this.confirmDis = false
                            this.addobject = false
                            this.$Message.success('提交成功!')
                            this.$refs[name].resetFields()
                            this.$parent.addSpaceNode(res)
                            // this.$parent.list()
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
