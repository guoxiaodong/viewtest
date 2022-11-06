<template>
    <Modal v-model="addTreeNode" title='s' @on-cancel="cancel()">
        <Form ref="formInline" :model="formInline" :rules="ruleValidate">
            <FormItem class="addTreeNode">
                <FormItem prop="typeName" label="类别：">
                    <Input type="text" v-model="formInline.typeName" placeholder="请输入"  @on-change="checkHttp()"></Input>
                    <label id="check-word"></label>
                </FormItem>

            </FormItem>
        </Form>
        <span slot="footer">
            <Button type="ghost" @click="close()">取&emsp;消</Button>
                <Button type="primary" @click="submit('formInline')" :disabled='confirmDis'>确&emsp;定</Button>
        </span>
    </Modal>
</template>
<script>
    import $ from 'jquery'
    import materialBasicHttp from 'server/http/materialBasic'
    export default {
        components: {
        },
        data () {
            const validateName = (rule, value, callback) => {
                if ($.trim(this.formInline.typeName) == '') {
                    callback(new Error('请输入有效内容'))
                }
                callback()
            }
            return {
                node: {},
                type: '',
                formInline: {
                    typeName: ''
                },
                ruleValidate: {
                    typeName: [
                        { required: true, message: '请填写物料分类名', trigger: 'blur' },
                        { validator: validateName, trigger: 'blur' }
                    ]
                },
                addTreeNode: false,
                confirmDis: false
            }
        },
        methods: {
            open (type, node) {
                $('.ivu-modal-header-inner').html(type)
                this.type = type
                this.node = node
                if (type == '修改') {
                    this.formInline.typeName = node.name
                }
                this.addTreeNode = true
            },
            close () {
                this.addTreeNode = false
                this.$refs.formInline.resetFields()
            },
            // 模态框关闭
            cancel () {
                this.addTreeNode = false
                this.$refs.formInline.resetFields()
            },
            submit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.confirmDis = true
                        var data = {
                            materieltypename: this.formInline.typeName
                        }
                        if (this.type == '新建') {
                            materialBasicHttp.addMaterialType(this.node.id, data).then((res) => {
                                this.confirmDis = false
                                this.addTreeNode = false
                                this.$emit('treeInt')
                            }).catch(() => {
                                this.confirmDis = false
                            })
                        } else if (this.type == '修改') {
                            data = {
                                id: this.node.id,
                                materieltypename: this.formInline.typeName
                            }
                            materialBasicHttp.editMaterialType(data).then((res) => {
                                this.confirmDis = false
                                this.addTreeNode = false
                                this.$emit('treeInt')
                            }).catch(() => {
                                this.confirmDis = false
                            })
                        }
                    } else {
                    }
                })
            },
            checkHttp () {
                $('.addTreeNode input').css('border-color', '#dddee1')
                $('#check-word').html('')
                $('#check-word').css('color', '#dddee1')
                this.confirmDis = true
                var data = {
                    materieltypename: this.formInline.typeName
                }
                if (this.type == '新建') {
                    var id = this.node.id
                } else if (this.type == '修改') {
                    id = this.node.getParentNode().id
                }
                materialBasicHttp.checkAdd(id, data).then((res) => {
                    if (res == -1) {
                        $('#check-word').html('')
                        this.confirmDis = false
                    }
                    if (res == 0) {
                        $('.addTreeNode input').css('border-color', 'red')
                        $('#check-word').html('已存在的分类，请勿重复添加')
                        $('#check-word').css('color', 'red')
                        this.confirmDis = true
                    }
                    if (res == 1) {
                        $('.addTreeNode input').css('border-color', 'yellow')
                        $('#check-word').html('已存在的分类，确定将此类别标为物料')
                        $('#check-word').css('color', 'yellow')
                        this.confirmDis = false
                    }
                }).catch(() => {
                    this.confirmDis = true
                })
            }
        },
        watch: {
            addTreeNode (v) {
                if (v === false) {
                    this.formInline.typeName = ''
                    $('#check-word').html('')
                }
            }
        }
    }
</script>
