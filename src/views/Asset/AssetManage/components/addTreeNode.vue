<template>
    <Modal v-model="addTreeNode" title='s' @on-cancel="cancel()">
        <Form ref="formInline" :model="formInline" :rules="ruleValidate">
            <FormItem class="addTreeNode">
                <FormItem prop="typeName" label="类别：" label-position="left" :label-width="100" style="margin-bottom: 30px">
                    <Input class="name" type="text"  style="width: 60%" v-model="formInline.typeName" placeholder="请输入"  @on-change="checkHttp()"></Input>
                   <div style="float:left;margin:0 0 -32px 100px" id="check-word"></div>
                </FormItem>
                <FormItem prop="code" label="资产识别码：" label-position="left" :label-width="100">
                    <Input type="text" style="width: 60%" v-model="formInline.code"  placeholder="请输入" ></Input>
                    <div style="color:#cccccc;margin-left: 100px">说明：用于该类别下资产的统一编号</div>
                </FormItem>

            </FormItem>
        </Form>
        <span slot="footer">
            <Button type="ghost" @click="close()">取&emsp;消</Button>
                <Button type="primary" @click="submit('formInline')" :disabled="confirmDis">确&emsp;定</Button>
        </span>
    </Modal>
</template>
<script>
    import $ from 'jquery'
    import assetBasicHttp from 'server/http/assetManage'
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
                    typeName: '',
                    code: ''
                },
                ruleValidate: {
                    typeName: [
                        { required: true, message: '请填写资产分类名', trigger: 'blur' },
                        { validator: validateName, trigger: 'blur' }
                    ]
                },
                addTreeNode: false,
                confirmDis: true
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
                        if (this.type == '新建') {
                            var data = {
                                id: this.node.id,
                                object_name: this.formInline.typeName,
                                code: this.formInline.code
                            }
                            assetBasicHttp.addAssetType(data).then((res) => {
                                this.confirmDis = false
                                this.addTreeNode = false
                                this.$emit('treeInt')
                            }).catch(() => {
                                this.confirmDis = false
                            })
                        } else if (this.type == '修改') {
//                            data = {
//                                id: this.node.id,
//                                materieltypename: this.formInline.typeName
//                            }
//                            assetBasicHttp.editAssetType(data).then((res) => {
//                                this.confirmDis = false
//                                this.addTreeNode = false
//                                this.$emit('treeInt')
//                            }).catch(() => {
//                                this.confirmDis = false
//                            })
                        }
                    } else {
                    }
                })
            },
            checkHttp () {
                $('.addTreeNode .name input').css('border-color', '#dddee1')
                $('#check-word').html('')
                $('#check-word').css('color', '#dddee1')
                this.confirmDis = true
                if (this.type == '新建') {
                    var data = {
                        object_name: this.formInline.typeName,
                        objecttype_id: this.node.id
                    }
                }
//                else if (this.type == '修改') {
//                    id = this.node.getParentNode().id
//                }
                assetBasicHttp.checkAdd(data).then((res) => {
                    if (res == -1) {
                        $('#check-word').html('')
                        this.confirmDis = false
                    }
                    if (res == 0) {
                        $('.addTreeNode .name input').css('border-color', 'red')
                        $('#check-word').html('已存在的分类，请勿重复添加')
                        $('#check-word').css('color', 'red')
                        this.confirmDis = true
                    }
                    if (res == 1) {
                        $('.addTreeNode .name input').css('border-color', 'yellow')
                        $('#check-word').html('已存在的分类，确定将此类别标为资产')
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
                    this.formInline.code = ''
                    $('#check-word').html('')
                    $('.addTreeNode .name input').css('border-color', '#dddee1')
                }
            }
        }
    }
</script>
