<style>
   .formModal .ivu-modal .ivu-select-dropdown { position: fixed!important; }
</style>
<template>
    <Modal class="formModal" v-model="addobject" :styles="{width: '90%'}" title="编辑对象" @on-cancel="cancel('formDynamic')">
        <Form class="form" ref="formDynamic" :rules="ruleInline" :model="formDynamic" :label-width="110">
            <FormItem prop="objectname" label="名称：">
                <Input type="text" style="width: 100%;" v-model="formDynamic.objectname" placeholder="请输入名称"></Input>
            </FormItem>
            <ul>
                 <li v-for="(item, index) in formDynamic.items">
                    <FormItem :key="index" :label="'标准组 ' + (index + 1) + '：'"
                            :prop="'items[' + index + '].groupid'"
                            :rules="{type: 'integer', required: true, message: '请选择标准组', min: 1 }">
                        <Row>
                            <Col span="18">
                                <Select v-model="formDynamic.items[index].groupid" @on-change="groupChange" label-in-value>
                                    <Option v-for="item in manageGroup" :value="item.id" :key="item.id">{{ item.name }}</Option>
                                </Select>
                            </Col>
                            <Col span="4" offset="1">
                                <Button type="ghost" @click="groupRemove(index)" style="margin-left: 6px;">删除标准组</Button>
                            </Col>
                        </Row>
                    </FormItem>
                    <Row>
                        <Col span="24" offset="1">
                            <FormItem v-for="(v, k) in formDynamic.items[index].standards"
                                    :key="index + '-' + k" :label="'标准项 ' + (index + 1) + '.' + (k + 1) + '：'"
                                    :prop="'items[' + index + '].standards[' + k + '].value'"
                                    :rules="{type: 'string', required: true, message: '请填写标准项'}">
                                <Row>
                                <Col span="17">
                                    <Select v-model="formDynamic.items[index].standards[k].value" not-found-text="" filterable remote :remote-method="(v) => {searchStandard(v, index)}">
                                        <Option v-for="(item, key) in standars" :value="item" :key="key">{{ item }}</Option>
                                    </Select>
                                </Col>
                                <Col span="4" offset="1">
                                    <Button type="ghost" @click="standardRemove(index, k)">删除标准项</Button>
                                </Col>
                                </Row>
                            </FormItem>
                        </Col>
                    </Row>
                    <FormItem>
                        <Row>
                            <Col offset="1" span="12">
                                <Button type="primary" long @click="addOption(index)" icon="plus-round" style="width: 160px; margin-left: 6px;">新增标准项</Button>
                            </Col>
                        </Row>
                    </FormItem>
                </li>
            </ul>
            <FormItem v-if="createGroupStatus" style="padding-right: 120px;">
                <Row>
                    <Col span="6">&nbsp;</Col>
                    <Col span="12">
                        <Button type="primary" long @click="addGroup" icon="plus-round">新增标准组</Button>
                    </Col>
                    <Col span="6">&nbsp;</Col>
                </Row>
            </FormItem>
            <FormItem class="formbtns">
                <Button type="ghost" @click="handleReset('formDynamic')">取&emsp;消</Button>
                <Button type="primary" @click="handleSubmit('formDynamic')" :disabled="confirmDis">确&emsp;定</Button>
            </FormItem>
        </Form>
        <span slot="footer"></span>
    </Modal>
</template>
<script>
    import ManageObjectHttp from 'server/http/manageobject'
    export default {
        data () {
            const validateName = (rule, value, callback) => {
                if (value.replace(/\s+/g, '') == '') {
                    callback(new Error('请填写对象名称'))
                } else {
                    callback()
                }
            }
            return {
                addobject: false,
                confirmDis: false,
                submitCount: 0,
                manageGroup: [],
                groupMaxNumber: 0,
                groupNumber: 0,
                createGroupStatus: true,
                standars: [],
                search: '',
                id: '',
                typeid: '',
                formDynamic: {
                    id: 0,
                    objectname: '',
                    typeid: 0,
                    group: [],
                    items: []
                },
                ruleInline: {
                    objectname: [
                        { required: true, validator: validateName, trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
            open (typeid, id) {
                this.id = id
                this.typeid = typeid
                this.addobject = true
                this.submitCount = 0
                this.formDynamic.typeid = typeid
                this.formDynamic.id = id
                // 标准组
                ManageObjectHttp.getGroup().then((data) => {
                    this.manageGroup = data.data
                    this.groupMaxNumber = this.manageGroup.length
                })
                // 获取管理对象信息
                this.getObjectList()
            },
            getObjectList (id) {
                this.formDynamic.items = []
                ManageObjectHttp.getObjectInfo(this.id).then((data) => {
                    this.formDynamic.objectname = data.objectinfo.name
                    for (let groups of data.standardgroup) {
                        this.formDynamic.items.push({groupid: groups.id, standards: []})
                        let index = this.formDynamic.items.length - 1
                        for (let standardslist of groups.standards) {
                            this.formDynamic.items[index].standards.push({value: standardslist.description})
                        }
                    }
                })
            },
            handleSubmit (name) {
                this.confirmDis = true
                this.submitCount ++
                this.$refs[name].validate((valid) => {
                    if (valid && this.submitCount == 1) {
                        ManageObjectHttp.putObject(this.formDynamic).then((data) => {
                            this.$Message.success('修改成功!')
                            this.$parent.refresh()
                            // setTimeout(() => {
                            //     this.cancel()
                            // }, 500)
                            this.confirmDis = false
                            this.cancel(name)
                        }).catch((error) => {
                            this.$Message.error(error)
                            this.submitCount = 0
                            this.confirmDis = false
                        })
                    } else {
                        this.submitCount = 0
                        this.confirmDis = false
                    }
                })
            },
            handleReset (name) {
                this.cancel(name)
                this.confirmDis = false
                this.submitCount = 0
            },
            addGroup () {
                // if (this.groupNumber > this.groupMaxNumber) {
                //     this.$Message.error('标准项组已全选')
                //     return
                // }

                this.groupNumber ++

                // if (this.groupNumber == this.groupMaxNumber) {
                //     this.createGroupStatus = false
                // }
                this.formDynamic.items.push({
                    groupid: 0,
                    standards: [
                        {
                            value: ''
                        }
                    ]
                })
            },
            addOption (index) {
                // ManageObjectHttp.getGroupInfo(this.pid).then((data) => {
                //     this.groupInfo = data.data
                // })
                this.formDynamic.items[index].standards.push({
                    value: ''
                })
            },
            groupChange (v) {
                // this.formDynamic.group = []
                // for (let item of this.formDynamic.items) {
                //     this.formDynamic.group.push(item.groupid)
                // }
                //
                // var nary = this.formDynamic.group.sort()
                // for (let i = 0; i < nary.length; i++) {
                //     if (nary[i] == nary[i + 1]) {
                //         this.$Message.error('标准项组已选择')
                //         break
                //     }
                // }
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
                }, 1000)
            },
            standardRemove (index, k) {
                if (this.formDynamic.items[index].standards.length == 1) {
                    this.$Message.error('每个标准组下请至少保留一个标准项!')
                } else {
                    this.formDynamic.items[index].standards.splice(k, 1)
                }
            },
            groupRemove (index) {
                if (!this.createGroupStatus) {
                    this.createGroupStatus = true
                }
                this.groupNumber --
                this.formDynamic.items.splice(index, 1)
            },
            // 模态框关闭
            cancel (formDynamic) {
                this.$refs[formDynamic].resetFields()
                this.formDynamic = {
                    objectname: '',
                    typeid: 0,
                    group: [],
                    items: []
                }
                this.addobject = false
            }
        }
    }
</script>
