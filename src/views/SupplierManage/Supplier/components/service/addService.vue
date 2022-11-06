<style>
   .formModal .ivu-modal .ivu-select-dropdown { position: fixed!important; }
</style>
<template>
    <Modal class="formModal" v-model="addModal" title="添加服务" :styles="{width: '90%'}" @on-cancel="cancel('formDynamic')">
        <Form ref="formDynamic" :rules="ruleInline" :model="formDynamic" :label-width="140">
            <FormItem label="供应商服务" prop="serviceid" :rules="{type: 'number', required: true, message: '请选择供应商服务', trigger: 'change'}">
               <Select v-model="formDynamic.serviceid" @on-change="changeOption">
                   <OptionGroup v-for="(item, key) in serSelect" :label="item.name" :key="item.id">
                       <Option v-for="item1 in item.service" :value="item1.id" :key="item1.id">{{ item1.name }}</Option>
                   </OptionGroup>
                </Select>
            </FormItem>
            <Row v-for="(item, index) in formDynamic.items" :key="item.id">
                <Col span="18">
                    <FormItem
                        :key="index"
                        :label="'提供服务分支 ' + (index + 1) + '：'"
                        :prop="'items.' + index + '.branch_id'"
                        :rules="{type: 'array', required: true, message: '请选择服务分支'}">
                        <Select v-model="formDynamic.items[index].branch_id" multiple>
                            <Option v-for="item in BranchList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                        </Select>
                    </FormItem>
                    <FormItem
                        :key="index"
                        :label="'服务级别 ' + (index + 1) + '：'"
                        :prop="'items.' + index + '.servicelevel'"
                        :rules="{type: 'array', required: true, message: '请选择服务级别'}">
                        <Select v-model="formDynamic.items[index].servicelevel" multiple>
                            <Option v-for="item in LevelList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                        </Select>
                        <Poptip style="position: absolute; right: -35px; top: 5px;" trigger="hover" placement="bottom" title="服务级别" content="通过选择供应商服务来获取服务级别下拉选项！">
                            <span class="helpInfo"></span>
                        </Poptip>
                    </FormItem>
                </Col>
                <Col span="4" offset="1">
                    <Button type="ghost" @click="handleRemove(index)">删除服务</Button>
                </Col>
            </Row>
            <FormItem>
                <Row>
                    <Col span="6">
                        <Button type="primary" long @click="handleAdd" icon="plus-round">添加供应商服务</Button>
                    </Col>
                </Row>
            </FormItem>
            <FormItem class="formbtns">
                <Button type="ghost" @click="handleReset('formDynamic')">取&emsp;消</Button>
                <Button type="primary" @click="handleSubmit('formDynamic')" :disabled='confirmDis'>确&emsp;定</Button>
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
            const validateName = (rule, value, callback) => {
                if (value.replace(/\s+/g, '') == '') {
                    callback(new Error('请输入供应商服务'))
                } else {
                    callback()
                }
            }
            return {
                siteSel: false,
                addModal: false,
                confirmDis: false,
                serSelect: [],
                BranchList: [],
                LevelList: [],
                formInfo: {},
                formDynamic: {
                    supplier_id: '',
                    serviceid: '',
                    items: [
                        {
                            branch_id: [],
                            servicelevel: []
                        }
                    ]
                },
                ruleInline: {
                    standardname: [
                        { required: true, validator: validateName, trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
            open () {
                this.addModal = true
                this.getSerSelectList()
                this.BranchListInfo()
            },
            // 获取供应商服务下拉选项
            getSerSelectList () {
                SupplierManageHttp.getSerInfoList().then((data) => {
                    this.serSelect = data.SupplierServiceList
                })
            },
            // 获取服务分支
            BranchListInfo () {
                SupplierManageHttp.getBranchList(this.$route.params.id).then((data) => {
                    this.BranchList = data.SupplierBranceList
                })
            },
            // 获取服务级别
            changeOption (value) {
                SupplierManageHttp.getSerLevel(value).then((data) => {
                    this.LevelList = data.ServiceLevelList
                })
            },
            handleAdd (index) {
                this.formDynamic.items.push({
                    branch_id: [],
                    servicelevel: []
                })
            },
            handleRemove (index) {
                if (this.formDynamic.items.length != 1) {
                    this.formDynamic.items.splice(index, 1)
                } else {
                    this.$Message.error('分支及级别最少保留一个！')
                }
            },
            handleSubmit (formDynamic) {
                this.formDynamic.supplier_id = this.$route.params.id
                this.confirmDis = true
                this.submitCount ++
                // this.formInfo = JSON.stringify(this.formDynamic)
                this.$refs[formDynamic].validate((valid) => {
                    if (valid) {
                        SupplierManageHttp.addSer(this.formDynamic).then((res) => {
                            this.confirmDis = false
                            this.addModal = false
                            this.$Message.success('提交成功!')
                            this.$parent.refresh()
                            this.cancel(formDynamic)
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
            handleReset (formDynamic) {
                this.cancel(formDynamic)
            },
            cancel (formDynamic) {
                this.$refs[formDynamic].resetFields()
                this.formDynamic = {
                    items: [
                        {
                            branch_id: [],
                            servicelevel: []
                        }
                    ]
                }
                this.addModal = false
            }
        }
    }
</script>
