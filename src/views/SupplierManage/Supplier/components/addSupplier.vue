<style>
</style>
<template>
    <Modal v-model="addModal" title="添加供应商" :styles="{width: '90%'}" @on-cancel="cancel('formInline')">
        <Form ref="formInline" :model="formInline" :rules="ruleInline" :label-width="130">
            <FormItem prop="no" label="供应商编号：">
                <Input type="text" disabled v-model="formInline.no" placeholder="请输入"></Input>
            </FormItem>
            <FormItem label="供应商名称：" prop="name">
                <Input type="text" v-model="formInline.name" placeholder="请输入合同名称"></Input>
            </FormItem>
            <FormItem label="地址：" prop="address">
                <Cascader v-model="formInline.address" :data="data" change-on-select ></Cascader>
            </FormItem>
            <Input style="display:none" v-model="address" placeholder="请填写"></Input>
            <FormItem label="详细地址：" prop="addressdetail">
                <Input type="text" v-model="formInline.addressdetail" placeholder="请输入详细地址"></Input>
            </FormItem>
            <FormItem label="邮箱：" prop="email">
                <Input v-model="formInline.email" placeholder="请输入邮箱地址"></Input>
            </FormItem>
            <Row v-for="(item, index) in formInline.contact" :key="index">
                <Col span="9">
                    <FormItem
                        :label="'联系人 ' + (index + 1) + '：'"
                        :prop="'contact.' + index + '.name'"
                        :rules="{required: true, type: 'string', message: '联系人不能为空', trigger: 'blur'}">
                        <Input type="text" v-model="item.name" placeholder="请输入姓名"></Input>
                    </FormItem>
                </Col>
                <Col span="9">
                    <FormItem
                        :label="'联系人电话 ' + (index + 1) + '：'"
                        :prop="'contact.' + index + '.tel'"
                        :rules="{required: true, type: 'string', pattern: /^1[0-9]{10}$/, message: '请输入正确的手机号码', trigger: 'blur'}">
                        <Input type="text" v-model="item.tel" placeholder="请输入手机号码"></Input>
                    </FormItem>
                </Col>
                <Col span="4" offset="1">
                    <Button type="ghost" @click="handleRemove(index)">删除此联系人信息</Button>
                </Col>
            </Row>
            <FormItem>
                <Row>
                    <Col span="9">
                        <Button type="primary" long @click="handleAdd" icon="plus-round">新增联系人信息</Button>
                    </Col>
                </Row>
            </FormItem>
            <FormItem label="合作状态：" prop="cooperatestatus_id">
                <RadioGroup v-model="formInline.cooperatestatus_id">
                    <Radio v-for="(item, index) in coopList" :label="item.id" :key="item.id" style="margin-right: 20px;">{{item.name}}</Radio>
                </RadioGroup>
            </FormItem>
            <FormItem label="合同状态：" prop="contractstatus_id">
                <RadioGroup v-model="formInline.contractstatus_id">
                    <Radio v-for="(item, index) in contractList" :label="item.id" :key="item.id" style="margin-right: 20px;">{{item.name}}</Radio>
                </RadioGroup>
            </FormItem>
            <FormItem label="LOGO：" prop="logo">
                <p style="position: absolute; z-index: 999; top: 80px;left: 1px;height:32px; background-color: #F5F7F9; width: 128px; text-align: center; font-size: 14px; color: #657180;">点此上传LOGO</p>
                <uploadImg v-model="formInline.logo" @handleUp="handleUpSuccess" @handleRemove="handleUpRemove"></uploadImg>
            </FormItem>
            <FormItem label="备注：" prop="intro">
                <Input v-model="formInline.intro" type="textarea" :autosize="{minRows: 2,maxRows: 10}" placeholder="请填写备注"></Input>
            </FormItem>
            <FormItem class="formbtns">
                <Button type="ghost" @click="cancelSubmit('formInline')">取&emsp;消</Button>
                <Button type="primary" @click="handleSubmit('formInline')" :disabled="confirmDis">确&emsp;定</Button>
            </FormItem>
        </Form>
        <span slot="footer"></span>
    </Modal>
</template>
<script>
    import SupplierManageHttp from 'server/http/supplierManage'
    import uploadImg from '@/components/uploadImg.vue'
    require('static/css/uploadimg.css')
    require('static/css/modal.css')
    import { URL } from '@/config/index'
    import area from 'static/js/area'
    export default {
        components: {
            uploadImg
        },
        created () {
            this.getDataTime()
        },
        computed: {
            address: {
                get: function () {
                    return this.formInline.address.join('/')
                },
                set: function (array) {
                    this.addressArray = array.split('/')
                }
            }
        },
        data () {
            const validateName = (rule, value, callback) => {
                if (value.replace(/\s+/g, '') == '') {
                    callback(new Error('请输入供应商名称'))
                } else {
                    SupplierManageHttp.CheckSuppName({name: value}).then((data) => {
                        if (data == 0) {
                            callback()
                        } else {
                            callback(new Error('你输入的供应商名称已存在,请重新输入！'))
                        }
                    })
                }
            }
            return {
                addModal: false,
                confirmDis: false,
                fileurl: '',
                arraySite: [],
                coopList: [],
                contractList: [],
                data: area,
                formInline: {
                    no: '',
                    name: '',
                    address: [],
                    addressdetail: '',
                    email: '',
                    contact: [
                        {
                            name: '',
                            tel: ''
                        }
                    ],
                    cooperatestatus_id: '',
                    contractstatus_id: '',
                    logo: '',
                    intro: ''
                },
                ruleInline: {
                    name: [
                        { required: true, validator: validateName, trigger: 'blur' },
                        { type: 'string', max: 30, message: '供应商名称不能超过30个字符', trigger: 'blur' }
                    ],
                    address: [
                        { required: true, type: 'array', message: '请选择地点', trigger: 'change' }
                    ],
                    addressdetail: [
                        { required: true, message: '请添加详细地址', trigger: 'change' }
                    ],
                    email: [
                        { required: true, message: '请输入邮箱地址', trigger: 'blur' },
                        { type: 'email', message: '邮箱地址格式不正确', trigger: 'blur' }
                    ],
                    cooperatestatus_id: [
                        { required: true, type: 'number', message: '请选择合作状态', trigger: 'change' }
                    ],
                    contractstatus_id: [
                        { required: true, type: 'number', message: '请选择合同状态', trigger: 'change' }
                    ],
                    logo: [
                        { required: true, message: '请上传LOGO', trigger: 'blur' }
                    ],
                    intro: [
                        { required: false, type: 'string', max: 255, message: '最多只能输入255个字符', trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
            open () {
                this.addModal = true
                this.getListStatus()
                this.fileurl = ''
                this.formInline.logo = ''
            },
            // 自动生成供应商编号
            getDataTime () {
                let number = ''
                for (var i = 0; i < 4; i++) {
                    number += Math.floor(Math.random() * 10)
                }
                let dataTime = 'EWFLF' + (new Date()).valueOf().toString().substr(0, 12) + number
                this.formInline.no = dataTime
            },
            // 联系人
            handleAdd () {
                this.index++
                this.formInline.contact.push({
                    name: '',
                    tel: ''
                })
            },
            handleRemove (index) {
                if (this.formInline.contact.length != 1) {
                    this.formInline.contact.splice(index, 1)
                } else {
                    this.$Message.error('最少添加一条联系人信息!')
                }
            },
            // 获取合作状态、合同状态
            getListStatus () {
                SupplierManageHttp.getListStatus().then((data) => {
                    this.coopList = data.cooperatestatus
                    this.contractList = data.contractstatus
                })
            },
            // 上传logo
            handleUpRemove () {
                this.fileurl = ''
                this.formInline.logo = ''
            },
            handleUpSuccess (url) {
                this.fileurl = url
                this.formInline.logo = url
            },
            // 提交
            handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        if (this.fileurl) {
                            this.formInline.logo = URL.replace(/api/, '') + 'uploads' + this.fileurl
                        }
                        this.confirmDis = true
                        let v = this.formInline
                        SupplierManageHttp.addSupp({no: v.no, name: v.name, address: v.address.toString(), addressdetail: v.addressdetail, email: v.email, contact: JSON.stringify(v.contact), cooperatestatus_id: v.cooperatestatus_id, contractstatus_id: v.contractstatus_id, logo: v.logo, intro: v.intro}).then((res) => {
                            this.confirmDis = false
                            this.addModal = false
                            this.$Message.success('提交成功!')
                            this.$parent.refresh()
                            this.$parent.tableTitle()
                            this.cancel(name)
                        }).catch((error) => {
                            this.confirmDis = false
                            this.$Message.error(error)
                        })
                    } else {
                        // this.$Message.error('表单验证失败!')
                        this.confirmDis = false
                    }
                })
            },
            cancelSubmit (formInline) {
                this.$refs['formInline'].resetFields()
                this.addModal = false
            },
            // 模态框关闭
            cancel (formInline) {
                this.$refs[formInline].resetFields()
            }
        }
    }
</script>
