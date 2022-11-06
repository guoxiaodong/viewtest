<style>

</style>
<template>
    <div class="serviceQuery-stepFour">
            <div class="innerbtns">
                <Row>
                    <Button type="primary" @click="add()">+ 新增</Button>
                    <Button type="ghost" @click="remove()">批量删除</Button>
                </Row>
            </div>
            <dataTableChoose
                v-on:on-data-change=""
                ref="datatable"
                @on-selection-change="selectTable"
                :columns="columns"
                :data="data"
                dataname="data"
                :ifsearch = false
                :choosetime= false
                :int= true
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
            v-model= "addSupplierService"
            title="编辑服务信息"
            width="700"
            :closable="false" :mask-closable="false" :loading="true"
        >
            <Form ref="formValidate" :model="formValidate" :rules="ruleInline" :label-width="120" style="width: 700px">
                <FormItem label="供应商：" prop="name">
                    <Select  v-model="formValidate.name" filterable style="width:411px">
                        <Option v-for="item in supplierList" :value="item.id" :key="item.name" :label="item.name">
                            <span>{{ item.name }}</span>
                            <span style="color:#ccc;margin-left: 55px"><Rate allow-half disabled v-model="item.servicequlity"></Rate></span>
                            <span v-if="item.groom == '推荐'" style="border:1px solid red; color:red;margin-left: 30px">推荐</span>
                            <span v-if="item.contact" style="border:1px solid blueviolet;color:blueviolet;margin-left: 30px">合同</span>
                        </Option>
                    </Select>
                </FormItem>
                <ul>
                    <li v-for="(item, index) in formValidate.group">
                        <FormItem :key="index"
                                  label="提供服务分支："
                                  :prop="'group[' + index + '].supplierbranch_id'"
                                  :rules="{required: true, type:'array', message: '请选择服务分支名称'}">
                            <Row>
                                <Col span="18">
                                <Select class="fixed" v-model="formValidate.group[index].supplierbranch_id" filterable multiple>
                                    <Option v-for="item in branchs" :value="item.id" :key="item.name">{{ item.name }}</Option>
                                </Select>

                                </Col>
                                <Col span="4" offset="1">
                                <Button type="ghost" @click="groupRemove(index)" style="margin-left: 6px;">删除供应配置</Button>
                                </Col>
                            </Row>
                        </FormItem>
                        <FormItem :key="index"
                                  label="服务级别："
                                  :prop="'group[' + index + '].servicelevel'"
                                  :rules="{required: true, type:'array', message: '请选择服务级别'}">
                            <Row>
                                <Col span="18">
                                <Select class="fixed" v-model="formValidate.group[index].servicelevel" filterable multiple>
                                    <Option v-for="item in levels" :value="item.id" :key="item.name">{{ item.name }}</Option>
                                </Select>
                                </Col>
                            </Row>
                        </FormItem>
                    </li>
                </ul>
                <FormItem>
                    <Row>
                        <Col offset="1" span="12" >
                        <Button type="primary" long @click="addGroup" icon="plus-round" style="width: 250px; margin-left: 6px;">新增供应配置</Button>
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
            <div slot="footer">
            </div>
        </Modal>
    </div>
</template>
<script>
    //    import $ from 'jquery'
    import ServiceHttp from 'server/http/service'
    require('static/css/modal.css')
    import dataTableChoose from '@/components/dataTableChoose.vue'
    import {paramInstring} from '@/util/paramInstring'
    export default {
        components: {
            dataTableChoose
        },
        created () {
        },
        mounted () {
//            this.open()
        },
        data () {
            return {
                id: '',
                editId: '',
                levelGroupNum: 1,
                addSupplierService: false,
                selectItem: [],
                url: ServiceHttp.map.getSupplierService,
                supplierList: [],
                columns: [
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: '名称/编号/简介',
                        width: '',
                        key: 'name',
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('div', params.row.name + '(' + params.row.no + ')'),
                                h('strong', params.row.intro)
                            ])
                        }
                    },
                    {
                        title: '合同数量',
                        width: '',
                        align: 'center',
                        key: 'contractscount'
                    },
                    {
                        title: '服务质量',
                        width: '',
                        align: 'center',
                        key: 'servicequlity',
                        render: (h, params) => {
                            return h('div', [
                                h('Rate', {
                                    attrs: {
                                        'allow-half': true,
                                        'disabled': true,
                                        'value': params.row.servicequlity
                                    }
                                })
                            ])
                        }
                    },
                    {
                        title: '业务范围',
                        width: '',
                        align: 'center',
                        key: 'supplierArea'
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
                branchs: [],
                levels: [],
                formValidate: {
                    name: '',
                    group: [
                        {
                            supplierbranch_id: [],
                            servicelevel: []
                        }
                    ]
                },
                ruleInline: {
                    name: [
                        { required: true, type: 'number', message: '请选择供应商', trigger: 'change' }
                    ]
                }
            }
        },
        mixins: [ ],
        methods: {
            open (id) {
                this.id = id
                this.refresh()
                ServiceHttp.getSupplierItem().then((data) => {
                    this.supplierList = data
                })
                ServiceHttp.getbranchs().then((data) => {
                    this.branchs = data
                })
                ServiceHttp.getLevels().then((data) => {
                    this.levels = data
                })
            },
            add () {
                this.editId = null
                this.addSupplierService = true
            },
            addGroup () {
                this.levelGroupNum ++
                this.formValidate.group.push({
                    supplierbranch_id: [],
                    servicelevel: []
                })
            },
            groupRemove (index) {
                if (!this.createGroupStatus) {
                    this.createGroupStatus = true
                }
                console.log(this.levelGroupNum)
                if (this.levelGroupNum == 1) {
                    this.$Message.error('至少设置一组供应配置！')
                    return
                }
                this.levelGroupNum --
                this.formValidate.group.splice(index, 1)
            },
            submit (id = null) {
                if (!this.editId) {
                    var data = []
                    for (var i in this.formValidate.group) {
                        for (var j in this.formValidate.group[i].supplierbranch_id) {
                            paramInstring(this.formValidate.group[i].servicelevel[j])
                            var dataItem = {
                                service_id: this.id,
                                supplier_id: this.formValidate.name,
                                supplierbranch_id: this.formValidate.group[i].supplierbranch_id[j],
                                servicelevel: paramInstring(this.formValidate.group[i].servicelevel)
                            }
                            data.push(dataItem)
                        }
                    }
                    data = {
                        supplier: data
                    }
                    ServiceHttp.submitSupplier(data).then((data) => {
                        if (data == 0) {
                            this.addSupplierService = false
                            this.refresh()
                        }
                        if (data == 1) {
                            this.$Message.error('该供应商已经设置过！')
                        }
                    })
                } else {
                    var data2 = []
                    for (var i2 in this.formValidate.group) {
                        for (var j2 in this.formValidate.group[i2].supplierbranch_id) {
                            paramInstring(this.formValidate.group[i2].servicelevel[j2])
                            var dataItem2 = {
                                service_id: this.id,
                                supplier_id: this.formValidate.name,
                                supplierbranch_id: this.formValidate.group[i2].supplierbranch_id[j2],
                                servicelevel: paramInstring(this.formValidate.group[i2].servicelevel)
                            }
                            data2.push(dataItem2)
                        }
                    }
                    data2 = {
                        id: this.editId,
                        supplier: data2
                    }
                    ServiceHttp.submitEdit(data2).then((data) => {
                        this.addSupplierService = false
                        this.refresh()
                    })
                }
            },
            handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.submit()
                    } else {}
                })
            },
            selectTable (selection) {
                this.selectItem = []
                for (var i in selection) {
                    this.selectItem.push(selection[i].id)
                }
            },
            cancel () {
                this.addSupplierService = false
            },
            remove (id = null) {
                if (id) {
                    var data = {
                        service_id: this.id,
                        supplier_id: id
                    }
                } else {
                    data = {
                        service_id: this.id,
                        supplier_id: paramInstring(this.selectItem)
                    }
                }
                this.$Modal.confirm({
                    title: '',
                    content: '确定删除吗？',
                    onOk: () => {
                        ServiceHttp.removeSupplier(data).then((data) => {
                            this.refresh()
                        })
                    }
                })
            },
            edit (id) {
                this.editId = id
                var data = {
                    supplier_id: id,
                    service_id: this.id
                }
                ServiceHttp.getEditSupplier(data).then((data) => {
                    this.levelGroupNum = data.length
                    this.formValidate.name = data[0].supplier_id
                    this.formValidate.group = []
                    for (var i in data) {
                        var arr1 = []
                        var arr2 = []
                        arr1.push(data[i].supplierbranch_id)
                        arr2 = data[i].servicelevel.split(',')
                        for (var j in arr2) {
                            arr2[j] = parseInt(arr2[j])
                        }
                        console.log(arr2)
                        var tempItem = {
                            supplierbranch_id: arr1,
                            servicelevel: arr2
                        }
                        this.formValidate.group.push(tempItem)
                    }
                    this.addSupplierService = true
                })
            },
            refresh () {
                this.$refs.datatable.refresh(this.url)
            }
        },
        watch: {
            addSupplierService (v) {
                if (v === false) {
                    this.$refs['formValidate'].resetFields()
                    this.levelGroupNum = 1
                    this.formValidate = {
                        name: '',
                        group: [
                            {
                                supplierbranch_id: [],
                                servicelevel: []
                            }
                        ]
                    }
                }
            }
        }
    }
</script>
