<style>
    .createForm { padding: 35px 0 0; }
    .createForm .ivu-form-item { padding: 0 210px; }
    .createForm.ivu-form .ivu-form-item-label { font-size: 14px; color: #464C5B; }
    .createForm .flowbtns.ivu-form-item { border-top: 1px solid #D7DDE4; padding: 30px 0; text-align: center; }
    .createForm .flowbtns.ivu-form-item button { margin: 0 10px; font-size: 14px; }
</style>
<template>
    <Form ref="formInline" :model="formInline" :label-width="150" :rules="ruleInline" class="createForm">
        <FormItem prop="no" label="环节编号">
            <Input type="text" disabled v-model="formInline.no" placeholder="请输入环节名称"></Input>
        </FormItem>
        <FormItem prop="name" label="环节名称">
            <Input type="text" v-model="formInline.name" placeholder="请输入环节名称"></Input>
        </FormItem>
        <FormItem prop="wo_status" label="工单状态">
            <Select v-model="formInline.wo_status">
                <Option v-for="item in statusList" :value="item.id" :key="item.id">{{ item.name }}</Option>
            </Select>
        </FormItem>
        <FormItem v-for="(item, index) in formData" :label="item.name" :key="item.index">
            <!--多选下拉框-->
            <Select v-model="formInline[item.field]" multiple filterable v-if="item.filed_type == '1'">
               <Option v-for="item1 in options[item.field]" :value="item1.id + ',' + item1.name" :key="item1.id">{{ item1.name }}</Option>
            </Select>
            <!--下拉框组-->
            <Select v-model="formInline.field" multiple filterable v-else-if="item.type == 's3'">
                <OptionGroup label="Hot Cities">
                    <Option v-for="item1 in cityList1" :value="item1.value" :key="item1.value">{{ item1.label }}</Option>
                </OptionGroup>
                <OptionGroup label="Other Cities">
                    <Option v-for="item1 in cityList2" :value="item1.value" :key="item1.value">{{ item1.label }}</Option>
                </OptionGroup>
            </Select>
        </FormItem>
        <!-- <FormItem prop="remind" label="提醒">
            <CheckboxGroup v-model="formInline.remind">
                <Checkbox id="1">&nbsp;超时预提醒</Checkbox>
            </CheckboxGroup>
        </FormItem> -->
        <FormItem label="环节顺序">
            <Input v-model="formInline.order"></Input>
        </FormItem>
        <FormItem label="是否含追加按钮">
            <RadioGroup v-model="formInline.append_button">
                <Radio label="1">是</Radio>&emsp;
                <Radio label="0">否</Radio>
            </RadioGroup>
        </FormItem>
        <FormItem label="组内工单是否等待">
            <RadioGroup v-model="formInline.group_wait">
                <Radio label="1">是</Radio>&emsp;
                <Radio label="0">否</Radio>
            </RadioGroup>
        </FormItem>
        <FormItem class="flowbtns">
            <Button type="ghost" @click="handleReset">取&emsp;消</Button>
            <Button type="primary" @click="handleSubmit('formInline')">提&emsp;交</Button>
        </FormItem>
    </Form>
</template>
<script>
    import ProcessManageHttp from 'server/http/processManage'
    import Vue from 'vue'
    export default {
        mounted () {
            this.$emit('updateActiveName', '1')
            this.getDataTime()
            this.formInline.flow_id = this.$route.params.id
            this.formInline.id = this.$route.params.linkid
            // 根据配置文件显示信息
            ProcessManageHttp.getLinkConfig().then((data) => {
                for (let v of data) {
                    if (v.data !== null) {
                        ProcessManageHttp.getData(v.data).then((data) => {
                            this.options[v.field] = data.data
                        })
                    } else {
                        this.options[v.field] = [
                            {
                                id: 1,
                                name: 'aaaaa'
                            }
                        ]
                    }
                }
                this.formData = data
            })
            // 获取工单状态
            ProcessManageHttp.getLinkStatus().then((data) => {
                this.statusList = data
            })
            // 获取环节详情
            ProcessManageHttp.getLinkInfo(this.$route.params.linkid).then((data) => {
                this.formInline.no = data.no
                this.formInline.name = data.name
                this.formInline.wo_status = data.wo_status
                this.formInline.order = data.order
                this.formInline.append_button = data.append_button
                this.formInline.group_wait = data.group_wait
                for (let i = 1; i < 7; i++) {
                    if (data['f0' + i] != null) {
                        let decode = JSON.parse(data['f0' + i])
                        let numArr = []
                        for (let sv of decode) {
                            numArr.push(sv.id + ',' + sv.name)
                        }
                        let field = 'f0' + i
                        Vue.set(this.formInline, field, numArr)
                    }
                }
            })
        },
        data () {
            return {
                formData: [],
                statusList: [],
                options: {
                    'f01': [],
                    'f02': [],
                    'f03': [],
                    'f04': [],
                    'f05': [],
                    'f06': []
                },
                formInline: {
                    id: '',
                    flow_id: '',
                    no: '',
                    name: '',
                    wo_status: 0,
                    order: 20,
                    append_button: 0,
                    group_wait: 0
                },
                ruleInline: {
                    name: [
                        { required: true, message: '请输入环节名称', trigger: 'blur' }
                    ],
                    wo_status: [
                        { required: true, type: 'number', message: '请选择供应商状态', trigger: 'change' }
                    ]
                }
            }
        },
        methods: {
            getDataTime () {
                let dataTime = 'EWF' + (new Date()).valueOf().toString().substr(0, 12)
                this.formInline.no = dataTime
            },
            handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        ProcessManageHttp.addLinkForm(this.formInline).then((data) => {
                            this.$Message.success('创建成功')
                            setTimeout(() => {
                                this.cancel()
                                location.href = '/#/processmanage/editlinkform/' + this.$route.params.id + '/' + this.$route.params.linkid
                            }, 500)
                        }).catch((error) => {
                            this.$Message.error(error)
                        })
                    } else {
                        // this.$Message.error('Fail!')
                    }
                })
            },
            handleReset () {
                location.href = '/#/processmanage/creatlink/' + this.$route.params.id
            },
            // 清空表单
            cancel () {
                this.getDataTime()
                this.formInline.name = ''
                this.formInline.wo_status = ''
                this.formInline.f01 = []
                this.formInline.f02 = []
                this.formInline.f03 = []
                this.formInline.f04 = []
                this.formInline.f05 = []
                this.formInline.f06 = []
            }
        }
    }
</script>
