<style>
   .formModal .ivu-modal .ivu-select-dropdown { position: fixed!important; }
</style>
<template>
    <Modal class="formModal" v-model="add" :styles="{width: '90%'}" title="新增标准组" @on-cancel="cancel('formDynamic')">
        <Form ref="formDynamic" :rules="ruleInline" :model="formDynamic" :label-width="120">
            <FormItem label="标准组名称：" prop="standardname">
               <Input v-model="formDynamic.standardname" placeholder="请输入标准组名称"></Input>
               <!-- :rules="{type: 'string', required: true, message: '请输入标准组名称'}" -->
            </FormItem>
            <FormItem label="工单类型：" prop="type" :rules="{type: 'number', required: true, message: '请选择工单类型', trigger: 'change'}">
               <Select v-model="formDynamic.type">
                  <Option v-for="item in typeList" :value="item.id" :key="item.id">{{ item.name }}</Option>
               </Select>
            </FormItem>
            <FormItem
                    v-for="(item, index) in formDynamic.items"
                    :key="index"
                    :label="'标准项 ' + (index + 1) + '：'"
                    :prop="'items.' + index + '.value'"
                    :rules="{type: 'string', required: true, message: '标准项不能为空'}">
                <Row>
                    <Col span="18">
                        <Select
                            v-model="formDynamic.items[index].value"
                            filterable
                            remote
                            not-found-text = ""
                            :remote-method="(v) => {searchStandard(v, index)}"
                            :loading="loading1">
                            <Option v-for="(item, key) in standars" :value="item" :key="key">{{item}}</Option>
                        </Select>
                    </Col>
                    <Col span="4" offset="1">
                        <Button type="ghost" @click="handleRemove(index)">删除标准项</Button>
                    </Col>
                </Row>
            </FormItem>
            <FormItem>
                <Row>
                    <Col span="6">
                        <Button type="primary" long @click="handleAdd" icon="plus-round">添加标准项</Button>
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
    import PostHttp from 'server/http/post'
    import ManageObjectHttp from 'server/http/manageobject'
    export default {
        data () {
            const validateName = (rule, value, callback) => {
                if (value.replace(/\s+/g, '') == '') {
                    callback(new Error('请输入标准组名称'))
                } else {
                    callback()
                }
            }
            return {
                add: false,
                confirmDis: false,
                submitCount: 0,
                typeList: [],
                loading1: false,
                groupNumber: 1,
                standars: [],
                formDynamic: {
                    standardname: '',
                    type: '',
                    items: []
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
                this.add = true
                this.getWorkType()
                this.submitCount = 0
            },
            // 获取工单类型
            getWorkType () {
                PostHttp.workType().then((data) => {
                    this.typeList = data.data
                })
            },
            handleSubmit (formDynamic) {
                this.confirmDis = true
                this.submitCount ++
                this.$refs[formDynamic].validate((valid) => {
                    if (valid && this.submitCount == 1) {
                        ManageObjectHttp.addStandard({standardname: this.formDynamic.standardname, worktypeid: this.formDynamic.type, standards: JSON.stringify(this.formDynamic.items)}).then((data) => {
                            this.add = false
                            this.$parent.refresh(this.url)
                            this.$Message.success('添加成功!')
                            this.allcancel(formDynamic)
                            this.confirmDis = false
                        })
                    } else {
                        // this.$Message.error('必填项不能为空!')
                        this.confirmDis = false
                        this.submitCount = 0
                    }
                })
            },
            handleAdd (index) {
                this.groupNumber ++
                this.formDynamic.items.push({
                    value: ''
                })
            },
            handleRemove (index) {
                this.groupNumber --
                this.formDynamic.items.splice(index, 1)
            },
            searchStandard (v, index) {
                this.search = v
                setTimeout(() => {
                    if (this.search != v) {
                        return
                    }
                    let groupid = this.formDynamic.items[index].groupid
                    this.standars = []
                    ManageObjectHttp.searchStandard(groupid, v).then((data) => {
                        this.standars = data.data
                    })
                }, 100)
            },
            allcancel (formDynamic) {
                this.$refs[formDynamic].resetFields()
                this.formDynamic = {
                    items: []
                }
                this.add = false
            },
            handleReset (formDynamic) {
                this.allcancel(formDynamic)
            },
            // 关闭模态框
            cancel (formDynamic) {
                this.allcancel(formDynamic)
            }
        }
    }
</script>
