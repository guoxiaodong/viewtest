<style>
.internalQuery .ivu-steps-horizontal{
        margin-left: 25%;
        width: 65%;
}
</style>
<template>
    <div class="internalService-stepOne">
        <div  class="internalQuery" style="padding-top: 50px;padding-bottom: 70px">
            <Steps :current="1">
                <Step title="步骤一" content="填写基本信息"></Step>
                <Step title="步骤二" content="添加供应商服务"></Step>
            </Steps>
        <div class="innerbtns" style="top:0">
            <Row>
                <Button type="primary" @click="add()">+ 新增</Button>
                <Button type="ghost" @click="remove()">批量删除</Button>
            </Row>
        </div>
        <dataTableChoose
            v-on:on-data-change=""
            ref="datatableTwo"
            @on-selection-change="selectTable"
            :columns="columns"
            :data="data"
            dataname="data"
            :ifsearch=false
            :choosetime= false
            :int= false
            :url="url"
            :id="thisId"
        >
        </dataTableChoose>
            <div slot="footer">
                <Button type="ghost" @click="cancelStep()" style="margin-left: 350px">上一步</Button>
                <Button type="primary" @click="nextStep" style="margin-left: 150px">完成</Button>

            </div>
        </div>
        <!--编辑服务项-->
        <Modal
            v-model= "editService"
            title="添加供应商服务"
        >
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="120" style="width: 400px">
                <FormItem label="名称：" prop="supplierservice_id">
                    <Select v-model="formValidate.supplierservice_id"  multiple  filterable class="fixed">
                        <OptionGroup v-for="(item, key) in supplierService" :key=item.id :label=item.name >
                            <Option v-for="(val,key) in item.service" :value="val.id" :key="val.id">
                                {{ val.name }}
                            </Option>
                        </OptionGroup>
                    </Select>
                </FormItem>
                    <FormItem>
                        <Button type="primary" @click="handleSubmit('formValidate')">确定</Button>
                        <Button type="ghost" @click="cancel()" style="margin-left: 8px">取消</Button>
                    </FormItem>
                </FormItem>
            </Form>
            <div slot="footer"></div>
        </Modal>
    </div>
</template>
<script>
    //    import $ from 'jquery'
    import dataTableChoose from '@/components/dataTableChoose.vue'
    require('static/css/datatable.css')
    require('static/css/modal.css')
    import ServiceHttp from 'server/http/service'
    import {paramInstring} from '@/util/paramInstring'
    export default {
        components: {
            dataTableChoose
        },
        created () {
        },
        mounted () {
        },
        data () {
            return {
                id: '',
                thisId: '',
                editId: '',
                editService: false,
                supplierService: [],
                selectItem: [],
                tablename: '供应商服务',
                url: ServiceHttp.map.getlistsupplier,
                columns: [
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: '名称/编号/简介',
                        width: '',
                        key: 'title',
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('div', params.row.title + '(' + params.row.no + ')'),
                                h('strong', params.row.intro)
                            ])
                        }
                    },
                    {
                        title: '价格',
                        width: '',
                        key: 'price'
                    },
                    {
                        title: '供应商数量',
                        width: '',
                        key: 'suppliercounts',
                        align: 'center'
                    },
                    {
                        title: '状态',
                        width: '',
                        key: 'status_name'
                    },
                    {
                        title: '业务范围',
                        width: '',
                        key: 'supplierArea'
                    },
                    {
                        title: '操作',
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
                    supplierservice_id: []
                },
                ruleValidate: {
                    supplierservice_id: [
                        { required: true, type: 'array', message: '请选择供应商服务', trigger: 'change' }
                    ]
                }
            }
        },
        mixins: [ ],
        methods: {
            open (id) {
                this.thisId = '&id=' + id
                this.id = id
                this.refresh()
            },
            refresh () {
                this.$refs.datatableTwo.refresh(this.url)
            },
            cancel () {
                this.editService = false
            },
            selectTable (selection) {
                this.selectItem = selection
            },
            add () {
                this.editId = null
                this.editService = true
                var data = {
                    id: this.id
                }
                ServiceHttp.getItemSupplierService(data).then((data) => {
                    this.supplierService = data
                })
            },
            handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.submit()
                    } else {
                    }
                })
            },
            submit () {
                if (this.editId) {
                    var data = {
                        indrooservice_id: this.id,
                        id: this.editId,
                        supplierservice_id: paramInstring(this.formValidate.supplierservice_id)
                    }
                    ServiceHttp.editInternalService(data).then((data) => {
                        this.refresh()
                        this.editService = false
                    })
                } else {
                    data = {
                        id: this.id,
                        supplierservice_id: paramInstring(this.formValidate.supplierservice_id)
                    }
                    ServiceHttp.addSupplier(data).then((data) => {
                        this.refresh()
                        this.editService = false
                    })
                }
            },
            edit (id) {
                this.editId = id
                var data1 = {
                    service_id: this.id,
                    supplierservice_id: id
                }
                ServiceHttp.getItemSupplierService(data1).then((data) => {
                    this.supplierService = data
                })
                this.formValidate.supplierservice_id = []
                this.formValidate.supplierservice_id.push(id)
                this.editService = true
            },
            remove (id = null) {
                if (id) {
                    var data = {
                        supplierservice_id: id,
                        service_id: this.id
                    }
                } else {
                    var tempid = ''
                    for (var i in this.selectItem) {
                        tempid += this.selectItem[i].id + ','
                    }
                    tempid = tempid.substr(0, tempid.length - 1)
                    data = {
                        supplierservice_id: tempid,
                        service_id: this.id
                    }
                }
                this.$Modal.confirm({
                    title: '',
                    content: '确定删除吗？',
                    onOk: () => {
                        ServiceHttp.removeinternalSupplier(data).then((data) => {
                            this.refresh()
                        })
                    }
                })
            },
            nextStep () {
                this.$emit('show', 3, this.id)
            },
            cancelStep () {
                this.$emit('show', 1, this.id)
            }
        },
        watch: {
            editService (v) {
                if (v === false) {
                    this.$refs['formValidate'].resetFields()
                    this.formValidate = {
                        supplierservice_id: []
                    }
                    this.supplierService = []
                }
            }
        }
    }
</script>
