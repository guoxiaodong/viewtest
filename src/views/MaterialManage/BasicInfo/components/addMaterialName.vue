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
                <Input v-model="formValidate.name" placeholder="请输入物料名称"></Input>
            </FormItem>
            <FormItem label="规格：" prop="specification">
                <Input v-model="formValidate.specification" placeholder="请输入规格"></Input>
            </FormItem>
            <FormItem label="品牌：" prop="brand">
                <Input v-model="formValidate.brand" placeholder="请输入品牌"></Input>
            </FormItem>
            <FormItem label="计量单位：" prop="unit">
                <Input v-model="formValidate.unit" placeholder="请输入计量单位"></Input>
                <label style="color:gray">用于出入库时的数量记录</label>
            </FormItem>
            <FormItem label="是否有序：" prop="order">
                <RadioGroup v-model="formValidate.order">
                    <Radio label="1">有序</Radio>
                    <Radio label="0">无序</Radio>
                </RadioGroup>
            </FormItem>
            <FormItem label="条码标识：" prop="rfid_sign" v-if="formValidate.order== 1">
                <Input v-model="formValidate.rfid_sign" placeholder="请输入"></Input>
            </FormItem>
        </Form>
        </div>
        <span slot="footer">
            <Button type="ghost" @click="close()">取&emsp;消</Button>
            <Button type="primary" @click="handleSubmit('formValidate')" >确&emsp;定</Button>
        </span>
    </Modal>
    </div>
</template>
<script>
    import $ from 'jquery'
    import materialBasicHttp from 'server/http/materialBasic'
    export default {
        components: {
        },
        data () {
            return {
                formValidate: {
                    name: '',
                    specification: '',
                    brand: '',
                    unit: '',
                    order: '',
                    rfid_sign: ''
                },
                ruleValidate: {
                    name: [
                        { required: true, message: '物料名为必填项', trigger: 'blur' }
                    ],
                    specification: [
                        { required: true, message: '规格为必填项', trigger: 'blur' }
                    ],
                    brand: [
                        { required: true, message: '品牌为必填项', trigger: 'blur' }
                    ],
                    unit: [
                        { required: true, message: '计量单位为必填项', trigger: 'blur' }
                    ],
                    rfid_sign: [
                        { required: false, message: '请输入识别码', trigger: 'blur' }
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
                this.formValidate.order = params.is_ordered || 1
                this.formValidate.rfid_sign = params.rfid_sign
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
                            is_ordered: this.formValidate.order,
                            rfid_sign: this.formValidate.rfid_sign
                        }
                        if (this.type == '新增') {
                            materialBasicHttp.addMaterialItem(data).then((res) => {
                                this.addItem = false
                                this.$emit('tableInt')
                            }).catch(() => {
                                alert('提交失败')
                                this.addItem = false
                            })
                        } else if (this.type == '修改') {
                            materialBasicHttp.editMaterialItem(data).then((res) => {
                                this.addItem = false
                                this.$emit('tableInt')
                            }).catch(() => {
                                alert('提交失败')
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
                        order: 0,
                        rfid_sign: ''
                    }
                }
            }
        }
    }
</script>
