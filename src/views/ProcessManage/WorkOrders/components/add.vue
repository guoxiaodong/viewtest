<style>
    .createForm { padding: 35px 0 0; }
    .createForm .ivu-form-item { padding: 0 210px; }
    .createForm.ivu-form .ivu-form-item-label { font-size: 14px; color: #464C5B; }
    .createForm .ivu-radio-wrapper { font-size: 14px; }
    .createForm .flowbtns.ivu-form-item { border-top: 1px solid #D7DDE4; padding: 30px 0; text-align: center; }
    .createForm .flowbtns.ivu-form-item button { margin: 0 10px; font-size: 14px; }
</style>
<template>
    <div class="">
        <div class="innerheader" style="margin-top: 20px;">
            新建流程
            <Button type="primary" @click="back" style="float: right; margin-top: 8px;">返回</Button>
        </div>
        <Form ref="formInline" :model="formInline" :rules="ruleInline" :label-width="100" class="createForm">
            <FormItem prop="no" label="流程编号">
                <Input type="text" disabled v-model="formInline.no" placeholder=""></Input>
            </FormItem>
            <FormItem prop="name" label="流程名称">
                <Input type="text" v-model="formInline.name" placeholder="请输入"></Input>
            </FormItem>
            <FormItem  v-for="(item, index) in formData" :label="item.name" :key="item.index">
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
            <FormItem prop="starttime" label="生效日期">
                <DatePicker type="date" :options="options1" v-model="formInline.starttime" placeholder="请选择" style="width: 100%;"></DatePicker>
            </FormItem>
            <FormItem prop="endtime" label="失效日期">
                <DatePicker type="date" :options="options1" v-model="formInline.endtime" placeholder="请选择" style="width: 100%;"></DatePicker>
            </FormItem>
            <FormItem prop="status" label="状态">
                <RadioGroup v-model="formInline.status">
                    <Radio label="1">正常</Radio>&emsp;
                    <Radio label="0">暂停使用</Radio>
                </RadioGroup>
            </FormItem>
            <FormItem class="flowbtns">
                <Button type="ghost" @click="handleReset('formInline')">重&emsp;置</Button>
                <Button type="primary" @click="handleSubmit('formInline')">创&emsp;建</Button>
            </FormItem>
        </Form>
    </div>
</template>
<script>
    import ProcessManageHttp from 'server/http/processManage'
    import Vue from 'vue'
    export default {
        mounted () {
            this.$emit('updateActive', '6-1')
            let dataTime = 'EWF' + (new Date()).valueOf().toString().substr(0, 12)
            this.formInline.no = dataTime
            ProcessManageHttp.getFlowConfig().then((data) => {
                data.forEach((v, k) => {
                    Vue.set(this.formInline, v.field, [])
                })
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
        },
        data () {
            const validateName = (rule, value, callback) => {
                if (value.replace(/\s+/g, '') == '') {
                    callback(new Error('请输入流程名称'))
                } else {
                    ProcessManageHttp.checkFlowName({name: value}).then((data) => {
                        if (data.result != false) {
                            callback(new Error('你输入的流程名称已存在,请重新输入！'))
                        } else {
                            callback()
                        }
                    })
                }
            }
            return {
                // s1: 单选下拉框
                // s2: 多选下拉框
                // s3: 下拉框组
                // s4: 多信息下拉框
                // s5: ztree下拉框
                // in1: 输入框
                formData: [],
                options: {
                    'f01': [],
                    'f02': [],
                    'f03': [],
                    'f04': [],
                    'f05': [],
                    'f06': []
                },
                cityList1: [],
                cityList2: [],
                formInline: {
                    no: '',
                    name: '',
                    starttime: '',
                    endtime: '',
                    status: ''
                },
                ruleInline: {
                    name: [
                        { required: true, validator: validateName, trigger: 'blur' }
                    ],
                    // name: [
                    //     { required: true, message: '请输入流程名称', trigger: 'blur' }
                    // ],
                    starttime: [
                        { required: true, type: 'date', message: '请选择生效时间', trigger: 'change' }
                    ],
                    endtime: [
                        { required: true, type: 'date', message: '请选择失效时间', trigger: 'change' }
                    ],
                    status: [
                        { required: true, message: '请选择状态', trigger: 'change' }
                    ]
                },
                options1: {
                    disabledDate (date) {
                        return date && date.valueOf() < Date.now() - 86400000
                    }
                }
            }
        },
        methods: {
            back () {
                location.href = '/#/processmanage/workorders'
            },
            handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        ProcessManageHttp.addFlowInfo(this.formInline).then((data) => {
                            this.$route.params.id = data.id
                            this.$Message.success('创建成功')
                            location.href = '/#/processmanage/creatlink/' + this.$route.params.id
                        })
                    } else {
                        // this.$Message.error('Fail!')
                    }
                })
            },
            handleReset (name) {
                this.formInline.name = ''
                this.formInline.starttime = ''
                this.formInline.endtime = ''
                this.formInline.status = ''
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
