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
                <DatePicker type="date" :clearable=false :options="options1" v-model="formInline.starttime" placeholder="请选择" style="width: 100%;"></DatePicker>
            </FormItem>
            <FormItem prop="endtime" label="失效日期">
                <DatePicker type="date" :clearable=false :options="options1" v-model="formInline.endtime" placeholder="请选择" style="width: 100%;"></DatePicker>
            </FormItem>
            <FormItem prop="status" label="状态">
                <RadioGroup v-model="formInline.status">
                    <Radio label="1">正常</Radio>
                    <Radio label="0">暂停使用</Radio>
                </RadioGroup>
            </FormItem>
            <FormItem class="flowbtns">
                <Button type="ghost" @click="handleReset('formInline')">取&emsp;消</Button>
                <Button type="primary" @click="handleSubmit('formInline')">确&emsp;定</Button>
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
            // 获取流程配置信息
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
            // 获取流程详情
            ProcessManageHttp.showFlowInfo(this.$route.params.id).then((data) => {
                this.formInline.id = this.$route.params.id
                this.formInline.no = data.no
                this.formInline.name = data.name
                this.formInline.starttime = data.starttime
                this.formInline.endtime = data.endtime
                this.formInline.status = data.status
                this.formInline.auto_next = data.auto_next
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
                // if (data.f02 != null) {
                //     this.formInline.f02 = data.f02
                // }
                // if (data.f03 != null) {
                //     this.formInline.f03 = data.f03
                // }
                // if (data.f04 != null) {
                //     this.formInline.f04 = data.f04
                // }
                // if (data.f05 != null) {
                //     this.formInline.f05 = data.f05
                // }
                // if (data.f06 != null) {
                //     this.formInline.f06 = data.f06
                // }
            })
        },
        data () {
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
                    id: '',
                    no: '',
                    name: '',
                    starttime: '',
                    endtime: '',
                    status: ''
                },
                ruleInline: {
                    name: [
                        { required: true, message: '请输入流程名称', trigger: 'blur' }
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
            handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        ProcessManageHttp.putFLowInfo(this.formInline).then((data) => {
                            this.$Message.success('创建成功')
                            setTimeout(() => {
                                location.href = '/#/processmanage/creatlink/' + this.$route.params.id
                            }, 500)
                        })
                    } else {
                        // this.$Message.error('Fail!')
                    }
                })
            },
            handleReset (name) {
                location.href = '/#/processmanage/creatlink/' + this.$route.params.id
            }
        }
    }
</script>
