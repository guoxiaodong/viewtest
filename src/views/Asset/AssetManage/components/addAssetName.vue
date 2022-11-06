<style>
    .addForm label.ivu-form-item-label{
        white-space: nowrap;
    }
</style>
<template>
    <div>
        <Modal  v-model="addItem" title='' @on-cancel="cancel()">
            <p slot="header" style="text-align:left">
                <span>ss</span>
            </p>
            <div class="addForm">
                <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
                    <FormItem label="名称：" prop="name">
                        <Input v-model="formValidate.name" :maxlength="40" placeholder="请输入物料名称"></Input>
                    </FormItem>
                    <FormItem label="规格：" prop="specification">
                        <Input v-model="formValidate.specification"  :maxlength="100" placeholder="请输入规格"></Input>
                    </FormItem>
                    <FormItem label="品牌：" prop="brand">
                        <Input v-model="formValidate.brand" :maxlength= "40" placeholder="请输入品牌"></Input>
                    </FormItem>
                    <FormItem label="计量单位：" prop="unit">
                        <Input v-model="formValidate.unit" :maxlength= "20" placeholder="请输入计量单位"></Input>
                    </FormItem>
                    <FormItem label="资产识别码：" prop="code" >
                        <Input v-model="formValidate.code" :maxlength= "4" placeholder="请输入资产识别码"></Input>
                        <label style="color:#cccccc">说明：用于该类别下资产的统一编号</label>
                    </FormItem>
                </Form>
            </div>
            <span slot="footer">
            <Button type="ghost" @click="close()">取&emsp;消</Button>
            <Button type="primary" :loading="loading" @click="handleSubmit('formValidate')" >
                 <span v-if="!loading">确&emsp;定</span>
                 <span v-else>处理中..</span>
            </Button>
        </span>
        </Modal>
    </div>
</template>
<script>
    import $ from 'jquery'
    import assetBasicHttp from 'server/http/assetManage'
    export default {
        components: {
        },
        data () {
            const validateName = (rule, value, callback) => {
                var re = /^[0-9a-zA-Z]*$/g
                if (!re.test(value)) {
                    callback(new Error('请输入数字和字母组合'))
                } else {
                    callback()
                }
            }
            return {
                loading: false,
                formValidate: {
                    name: '',
                    specification: '',
                    brand: '',
                    unit: '',
                    order: '',
                    code: ''
                },
                ruleValidate: {
                    name: [
                        { required: true, message: '必填!', trigger: 'blur' }
                    ],
                    specification: [
                        { required: true, message: '必填!', trigger: 'blur' }
                    ],
                    brand: [
                        { required: true, message: '必填!', trigger: 'blur' }
                    ],
                    unit: [
                        { required: true, message: '必填!', trigger: 'blur' }
                    ],
                    code: [
                        { required: true, message: '必填!', trigger: 'blur' },
                        {validator: validateName}
                    ]
                },
                addItem: false,
                id: '',
                type: ''
            }
        },
        methods: {
            open (type, params) {
                console.log(params)
                $('.ivu-modal-header p span').html(type)
                this.type = type
                this.id = params.id
                this.addItem = true
                this.formValidate.name = params.name
                this.formValidate.specification = params.specification
                this.formValidate.brand = params.brand
                this.formValidate.unit = params.unit
                this.formValidate.code = params.code
            },
            close () {
                this.addItem = false
                this.$refs.formValidate.resetFields()
            },
            // 模态框关闭
            cancel () {
                this.addItem = false
                this.$refs.formValidate.resetFields()
            },
            handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        var data = {
                            id: this.id,
                            name: this.formValidate.name,
                            specification: this.formValidate.specification,
                            brand: this.formValidate.brand,
                            unit: this.formValidate.unit,
                            code: this.formValidate.code
                        }
                        this.loading = true
                        if (this.type == '新增') {
                            assetBasicHttp.addAssetItem(data).then((res) => {
                                this.addItem = false
                                this.$emit('tableInt')
                            }).catch(() => {
                                this.$Message.error('提交失败，请检查网络')
                                this.addItem = false
                            })
                        } else if (this.type == '修改') {
                            assetBasicHttp.editAssetItem(this.id, data).then((res) => {
                                this.addItem = false
                                this.$emit('tableInt')
                            }).catch(() => {
                                this.$Message.error('提交失败，请检查网络')
                                this.addItem = false
                            })
                        }
                    }
                })
            }
        },
        watch: {
            addItem (v) {
                if (v === false) {
                    this.formValidate = {
                        name: '',
                        specification: '',
                        brand: '',
                        unit: '',
                        code: ''
                    }
                    this.loading = false
                }
            }
        }
    }
</script>
