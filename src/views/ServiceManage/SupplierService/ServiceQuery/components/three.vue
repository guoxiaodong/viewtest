<style>

</style>
<template>
    <div class="serviceQuery-stepOne">
            <div class="innerbtns">
                <Row>
                    <Button type="primary" @click="add()">+ 新增</Button>
                    <Button type="ghost" @click="remove()">批量删除</Button>
                </Row>
            </div>
            <dataTableChoose
                v-on:on-data-change=""
                ref="datatableThree"
                @on-selection-change="selectTable"
                :columns="columns"
                :data="data"
                dataname="data"
                :ifsearch= false
                :choosetime= false
                :int= false
                :id="'&id=' + this.id"
                :url="url">

            </dataTableChoose>
            <div slot="footer">
                <div style="width: 450px;margin-left: 130px">
                </div>
            </div>
        <!--增加等级指标-->
        <Modal
            class="modalTop"
            v-model= "addLevelsItem"
            title="等级指标定义"
            width="700"
            :closable="false" :mask-closable="false" :loading="true"
        >
            <Form ref="formValidate" :model="formValidate" :rules="ruleInline" :label-width="120" style="width: 700px">
                <FormItem label="等级名称：" prop="name">
                    <Input v-model="formValidate.name" :maxlength="30" placeholder="请输入"></Input>
                </FormItem>
                <ul>
                    <li v-for="(item, index) in formValidate.group">
                        <FormItem :key="index" :label="'指标组名称' + '：'"
                                  :prop="'group[' + index + '].name'"
                                  :rules="{required: true, message: '请填入指标组名称'}">
                            <Row>
                                <Col span="18">
                                <Input v-model="formValidate.group[index].name"  :maxlength="40" placeholder="请输入"></Input>
                                </Col>
                                <Col span="4" offset="1">
                                <Button type="ghost" @click="groupRemove(index)" style="margin-left: 6px;">删除指标组</Button>
                                </Col>
                            </Row>
                        </FormItem>
                        <Row>
                            <Col span="24" >
                            <FormItem v-for="(v, k) in formValidate.group[index].standards"
                                      :key="index + '-' + k" label="指标名称："
                                      :prop="'group[' + index + '].standards[' + k + '].name'"
                                      :rules="{type: 'string', required: true, message: '请填写指标项'}">
                                <Row>
                                    <Col span="12">
                                    <Input v-model="formValidate.group[index].standards[k].name"  :maxlength="40" :ref="'standard_' + index + '_' + k" placeholder="请输入"></Input>
                                    </Col>
                                    <Col span="6" offset="1">
                                    权重：<InputNumber :max="100" :min="1" v-model="formValidate.group[index].standards[k].weight"></InputNumber>
                                    </Col>
                                    <Col span="4" offset="1">
                                    <Button type="ghost" @click="standardRemove(index, k)">删除指标项</Button>
                                    </Col>
                                </Row>
                            </FormItem>
                            </Col>
                        </Row>
                        <FormItem>
                            <Row>
                                <Col offset="1" span="12">
                                <Button type="primary" long @click="addOption(index)" icon="plus-round" style="width: 160px; margin-left: 6px;">新增指标项</Button>
                                </Col>
                            </Row>
                        </FormItem>
                    </li>
                </ul>
                <FormItem>
                    <Row>
                        <Col offset="1" span="12" >
                        <Button type="primary" long @click="addGroup" icon="plus-round" style="width: 250px; margin-left: 6px;">新增指标组</Button>
                        </Col>
                    </Row>
                </FormItem>
                <FormItem>
                    <Col offset="1" span="24" style="padding-left: 25%">
                    <Button type="primary" @click="handleSubmit('formValidate')">确定</Button>
                    <Button type="ghost" @click="cancel()" style="margin-left: 8px">取消</Button>
                    </Col>
                </FormItem>
            </Form>
            <div slot="footer"></div>
        </Modal>
    </div>
</template>
<script>
    //    import $ from 'jquery'
    import ServiceHttp from 'server/http/service'
    require('static/css/modal.css')
    import dataTableChoose from '@/components/dataTableChoose.vue'
    export default {
        components: {
            dataTableChoose
        },
        created () {
        },
        mounted () {
        },
        data () {
            const validateName = (rule, value, callback) => {
                if (value.replace(/\s+/g, '') == '') {
                    callback(new Error('请填写对象名称'))
                } else {
                    var data = {
                        name: value
                    }
                    ServiceHttp.checkname(data).then((data) => {
                        if (data == 1) {
                            callback('该名称已存在')
                        } else {
                            callback()
                        }
                    })
                }
            }
            return {
                id: '',
                ItemId: null,
                selectItem: [],
                addLevelsItem: false,
                editLevelsItem: false,
                ifsearch: '',
                tablename: '',
                url: ServiceHttp.map.getLevelslist,
                columns: [
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: '等级名称',
                        width: '',
                        key: 'name'
                    },
                    {
                        title: '操作',
                        align: 'center',
                        width: '',
                        key: 'actions',
                        render: (h, params) => {
                            return h('div', [
                                h('a', {
                                    style: {
                                        marginRight: '20px',
                                        color: '#3399FF'
                                    },
                                    on: {
                                        click: () => {
                                            this.edit(params.row.id)
                                        }
                                    }
                                }, '编辑'),
                                h('a', {
                                    style: {
                                        marginRight: '20px',
                                        color: '#3399FF'
                                    },
                                    on: {
                                        click: () => {
                                            this.remove(params.row.id)
                                        }
                                    }
                                }, '删除')
                            ])
                        }
                    }
                ],
                data: [],
                formValidate: {
                    name: '',
                    group: [
                        {
                            name: '',
                            standards: []
                        }
                    ]
                },
                levelGroupNum: 1,
                ruleInline: {
                    name: [
                        { required: true, validator: validateName, trigger: 'blur' }
                    ]
                }
            }
        },
        mixins: [ ],
        methods: {
            open (id) {
                this.id = id
                this.refresh()
            },
            add () {
                this.ItemId = null
                this.addLevelsItem = true
            },
            addGroup () {
                this.levelGroupNum ++
                this.formValidate.group.push({
                    name: '',
                    standards: [
                        {
                            name: '',
                            weight: 0
                        }
                    ]
                })
            },
            addOption (index) {
                this.formValidate.group[index].standards.push({
                    name: '',
                    weight: 0
                })
            },
            standardRemove (index, k) {
                if (this.formValidate.group[index].standards.length == 1) {
                    this.$Message.error('每个指标组下请至少添加一个指标项!')
                } else {
                    this.formValidate.group[index].standards.splice(k, 1)
                    this.formValidate.group[index].standards.forEach((v, key) => {
                    })
                }
            },
            groupRemove (index) {
                if (!this.createGroupStatus) {
                    this.createGroupStatus = true
                }
                this.groupNumber --
                this.formValidate.group.splice(index, 1)
            },
            handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.submit()
                    } else {}
                })
            },
            submit () {
                if (this.ItemId == null) {
                    var data = {
                        levelname: this.formValidate.name,
                        id: this.id,
                        standgroup: []
                    }
                    for (var i in this.formValidate.group) {
                        var num = 0
                        if (this.formValidate.group[i].standards.length == 0) {
                            this.$Message.error('每个指标组至少包含一个指标项')
                            return
                        }
                        for (var k in this.formValidate.group[i].standards) {
                            num += this.formValidate.group[i].standards[k].weight
                        }
                        if (num != 100) {
                            this.$Message.error('请确定每一个指标组的权重总和为100')
                            return
                        }
                        var temp = {}
                        temp[this.formValidate.group[i].name] = this.formValidate.group[i].standards
                        data.standgroup.push(temp)
                    }
                    ServiceHttp.addLevelItem(data).then((data) => {
                        this.addLevelsItem = false
                        this.refresh()
                    })
                } else {
                    data = {
                        levelname: this.formValidate.name,
                        id: this.ItemId,
                        standgroup: []
                    }
                    for (var j in this.formValidate.group) {
                        var num2 = 0
                        if (this.formValidate.group[j].standards.length == 0) {
                            this.$Message.error('每个指标组至少包含一个指标项')
                            return
                        }
                        for (var k2 in this.formValidate.group[j].standards) {
                            num2 += this.formValidate.group[j].standards[k2].weight
                        }
                        if (num2 != 100) {
                            this.$Message.error('请确定每一个指标组的权重总和为100')
                            return
                        }
                        var temp2 = {}
                        temp2[this.formValidate.group[j].name] = this.formValidate.group[j].standards
                        data.standgroup.push(temp2)
                    }
                    ServiceHttp.editLevel(data).then((data) => {
                        this.addLevelsItem = false
                        this.refresh()
                    })
                }
            },
            cancel () {
                this.addLevelsItem = false
            },
            refresh () {
                this.$refs.datatableThree.refresh(this.url)
            },
            edit (id) {
                this.ItemId = id
                ServiceHttp.getEditLevel(id).then((data) => {
                    this.formValidate.name = data.name
                    this.formValidate.group = data.standardgroup
                    this.addLevelsItem = true
                })
            },
            remove (id = null) {
                if (id) {
                    var data = {
                        id: id
                    }
                    this.$Modal.confirm({
                        title: '',
                        content: '确定删除吗？',
                        onOk: () => {
                            ServiceHttp.removeLevel(data).then((data) => {
                                this.refresh()
                            })
                        }
                    })
                } else {
                    var tempid = ''
                    for (var i in this.selectItem) {
                        tempid += this.selectItem[i].id + ','
                    }
                    tempid = tempid.substr(0, tempid.length - 1)
                    data = {
                        id: tempid
                    }
                    this.$Modal.confirm({
                        title: '',
                        content: '确定删除吗？',
                        onOk: () => {
                            ServiceHttp.removeLevel(data).then((data) => {
                                this.refresh()
                            })
                        }
                    })
                }
            },
            selectTable (selection) {
                this.selectItem = selection
            },
            nextStep () {
                this.$refs.stepFour.open(this.id)
            },
            cancelStep () {
            }
        },
        watch: {
            addLevelsItem (v) {
                if (v === false) {
                    this.$refs['formValidate'].resetFields()
                    this.formValidate = {
                        group: [
                            {
                                name: '',
                                standards: []
                            }
                        ]
                    }
                }
            }
        }
    }
</script>
