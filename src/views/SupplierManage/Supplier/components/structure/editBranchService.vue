<style>
   .formModal .ivu-modal .ivu-select-dropdown { position: fixed!important; }
</style>
<template>
    <Modal class="formModal" v-model="addModal" title="编辑服务信息" :styles="{width: '90%'}" @on-cancel="cancel('formInline')">
        <Form ref="formInline" :model="formInline" :rules="ruleInline" :label-width="120">
            <FormItem prop="service_ids" label="供应商服务：">
                <!-- <Select v-model="formInline.service_ids" @on-change="changeOption">
                    <Option v-for="item in this.SupplierSerList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                </Select> -->
                <Select v-model="formInline.service_ids" @on-change="changeOption">
                    <OptionGroup v-for="(item, key) in serSelect" :label="item.name" :key="item.id">
                        <Option v-for="item1 in item.service" :value="item1.id" :key="item1.id">{{ item1.name }}</Option>
                    </OptionGroup>
                </Select>
            </FormItem>
            <FormItem prop="servicelevel" label="提供服务级别：">
                <Select v-model="formInline.servicelevel" multiple>
                    <Option v-for="item in this.ServiceLevelList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                </Select>
            </FormItem>
            <FormItem label="正常提供：" prop="servicestatus">
                <RadioGroup v-model="formInline.servicestatus">
                    <Radio label="1">是</Radio>
                    <Radio label="0">否</Radio>
                </RadioGroup>
            </FormItem>
            <FormItem class="formbtns">
                <Button type="ghost" @click="handleReset('formInline')">取&emsp;消</Button>
                <Button type="primary" @click="handleSubmit('formInline')" :disabled='confirmDis'>确&emsp;定</Button>
            </FormItem>
        </Form>
        <span slot="footer"></span>
    </Modal>
</template>
<script>
    import SupplierManageHttp from 'server/http/supplierManage'
    require('static/css/modal.css')
    export default {
        components: {
        },
        created () {
        },
        data () {
            // const validateName = (rule, value, callback) => {
            //     if (value.replace(/\s+/g, '') == '') {
            //         callback(new Error('请输入供应商服务'))
            //     } else {
            //         callback()
            //     }
            // }
            return {
                siteSel: false,
                addModal: false,
                confirmDis: false,
                serSelect: [],
                SupplierSerList: [],
                ServiceLevelList: [],
                id: '',
                formInline: {
                    supplierbranch_service_id: '',
                    supplierbranch_id: '',
                    service_ids: '',
                    servicelevel: [],
                    servicestatus: ''
                },
                ruleInline: {
                    service_ids: [
                        { required: true, type: 'number', message: '请选择供应商服务！', trigger: 'change' }
                    ],
                    servicelevel: [
                        { required: true, type: 'array', message: '请选择服务级别！', trigger: 'change' }
                    ],
                    servicestatus: [
                        { required: true, message: '请选择提供方式!', trigger: 'change' }
                    ]
                }
            }
        },
        methods: {
            open (id, servicebranchid) {
                this.id = id
                this.formInline.supplierbranch_service_id = servicebranchid
                this.getSerSelectList()
                this.getBranchServiceInfo()
                this.addModal = true
            },
            // 获取分支服务供应商下拉选项
            getSerSelectList () {
                SupplierManageHttp.getSerInfoList().then((data) => {
                    this.serSelect = data.SupplierServiceList
                })
            },
            // getBranchSelectSupp () {
            //     SupplierManageHttp.getBranchSelectSupp(this.$route.params.sid).then((data) => {
            //         this.SupplierSerList = data
            //     })
            // },
            // 获取分支服务级别下拉选项
            changeOption (value) {
                SupplierManageHttp.getBranchSelectLevel(value).then((data) => {
                    this.ServiceLevelList = data
                })
            },
            // 获取分支服务修改信息
            getBranchServiceInfo () {
                SupplierManageHttp.getBranchServiceInfo(this.$route.params.sid, this.id).then((data) => {
                    this.formInline.service_ids = data.service_id
                    let arrInt = data.servicelevel.split(',')
                    for (let v of arrInt) {
                        this.formInline.servicelevel.push(parseInt(v))
                    }
                    this.formInline.servicestatus = data.servicestatus
                })
            },
            handleSubmit (formInline) {
                this.confirmDis = true
                this.submitCount ++
                this.$refs[formInline].validate((valid) => {
                    if (valid) {
                        let v = this.formInline
                        SupplierManageHttp.putBranchService({supplierbranch_service_id: v.supplierbranch_service_id, supplierbranch_id: parseInt(this.$route.params.sid), service_ids: v.service_ids, servicelevel: v.servicelevel.toString(), servicestatus: parseInt(v.servicestatus)}).then((res) => {
                            this.confirmDis = false
                            this.addModal = false
                            this.$Message.success('提交成功!')
                            this.$parent.refresh()
                            this.$parent.$parent.getBranchInfo()
                            this.$parent.tableTitle()
                            this.cancel(formInline)
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
            handleReset (formInline) {
                this.cancel(formInline)
            },
            cancel (formInline) {
                this.$refs['formInline'].resetFields()
                this.formInline.service_ids = ''
                this.formInline.servicelevel = []
                this.addModal = false
            }
        }
    }
</script>
