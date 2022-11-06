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
                <div style="width: 450px;margin-left: 130px">
                </div>
            </div>
        <!--添加服务项-->
        <Modal
            class="modalTop"
            v-model= "addService"
            title="添加服务项"
        >
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="120" style="width: 400px">
                <FormItem label="名称：" prop="name">
                    <AutoComplete class="fixed"
                                  v-model="formValidate.name"
                                  @on-select="changesearch"
                                  placeholder="请输入"
                                  @on-search="search"
                    >
                        <div class="demo-auto-complete-item " v-for="item in dataService" >
                            <div class="demo-auto-complete-group">
                                <span style="color:gray;">{{ item.title }}</span>
                            </div>
                            <Option v-for="option in item.columns"  :value="option.name" :key="option.id">
                                <span class="demo-auto-complete-title">{{ option.name}}</span>
                            </Option>
                        </div>
                    </AutoComplete>
                </FormItem>
                <FormItem label="编号：" prop="no">
                    <Input v-model="formValidate.no" disabled  placeholder=""></Input>
                </FormItem>
                <FormItem label="计费单位：" prop="price_unit">
                    <Input v-if="type == 'onclick'" disabled v-model="formValidate.price_unit" disabled :maxlength=30 placeholder="请输入计费单位"></Input>
                    <Input v-if="type == 'input'" v-model="formValidate.price_unit"  :maxlength=30 placeholder="请输入计费单位"></Input>
                </FormItem>
                <FormItem label="规格：" prop="specifications">
                    <Input v-if="type == 'onclick'" disabled v-model="formValidate.specifications" disabled placeholder="请输入规格"></Input>
                    <Input v-if="type == 'input'" v-model="formValidate.specifications"   placeholder="请输入规格"></Input>
                </FormItem>
                <FormItem label="计价方式：" prop="pricing_method">
                    <Select v-if="type == 'onclick'" disabled v-model="formValidate.pricing_method" style="width:200px" class="fixed">
                        <Option  v-for="item in pricingMethod" :value="item.value" :key="item.value">{{ item.label }}</Option >
                    </Select>
                    <Select v-if="type == 'input'" v-model="formValidate.pricing_method" style="width:200px" class="fixed">
                        <Option v-for="item in pricingMethod" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                    <Poptip trigger="hover" title="提示">
                        <div class="api" slot="content">
                            <P>单独：指计算总价时不管选中多少个工单，总价都是直接相加</p>
                            <p>工单间互斥单独：指计算总价时若选中多个工单，则总价上同样的服务项的这项费用只算一个，不累加</p>
                            <p>总价折算加：指计算总价时按照用户在后台定义好的规则合算总价</p>
                        </div>
                        <Icon type="help-circled" size="20"></Icon>
                    </Poptip>
                </FormItem>
                <FormItem label="最小计价数：" prop="min_count">
                    <InputNumber v-if="type == 'onclick'" disabled :max="10" :min="1" v-model="formValidate.min_count"></InputNumber>
                    <InputNumber v-if="type == 'input'" :max="10" :min="1" v-model="formValidate.min_count"></InputNumber>
                </FormItem>
                <FormItem label="必须包含：" prop="state">
                    <RadioGroup v-model="formValidate.state">
                        <Radio label="0">
                            <span>是</span>
                        </Radio>
                        <Radio label="1">
                            <span>否</span>
                        </Radio>
                    </RadioGroup>
                    <Poptip trigger="hover" title="提示">
                        <div class="api" slot="content">
                            <P>必须包含的服务项为服务的基础入服务项，申请服务时必须包含</p>
                        </div>
                        <Icon type="help-circled" size="20" ></Icon>
                    </Poptip>
                    <FormItem>
                        <Button type="primary" @click="handleSubmit('formValidate')">确定</Button>
                        <Button type="ghost" @click="cancel()" style="margin-left: 8px">取消</Button>
                    </FormItem>
                </FormItem>
            </Form>
            <div slot="footer"></div>
        </Modal>
        <!--编辑服务项-->
        <Modal
            class="modalTop"
            v-model= "editService"
            title="编辑服务项"
        >
            <Form ref="formValidate2" :model="formValidate2" :rules="ruleValidate2" :label-width="120" style="width: 400px">
                <FormItem label="名称：" prop="name">
                    <Input v-model="formValidate2.name"  placeholder=""></Input>
                </FormItem>
                <FormItem label="编号：" prop="no">
                    <Input v-model="formValidate2.no" disabled  placeholder=""></Input>
                </FormItem>
                <FormItem label="计费单位：" prop="price_unit">
                    <Input  v-model="formValidate2.price_unit"  :maxlength=30 placeholder="请输入计费单位"></Input>
                </FormItem>
                <FormItem label="规格：" prop="specifications">
                    <Input  v-model="formValidate2.specifications"   placeholder="请输入规格"></Input>
                </FormItem>
                <FormItem label="计价方式：" prop="pricing_method">
                    <Select  v-model="formValidate2.pricing_method" style="width:200px" class="fixed">
                        <Option  v-for="item in pricingMethod" :value="item.value" :key="item.value">{{ item.label }}</Option >
                    </Select>
                    <Poptip trigger="hover" title="提示">
                        <div class="api" slot="content">
                            <P>单独：指计算总价时不管选中多少个工单，总价都是直接相加</p>
                            <p>工单间互斥单独：指计算总价时若选中多个工单，则总价上同样的服务项的这项费用只算一个，不累加</p>
                            <p>总价折算加：指计算总价时按照用户在后台定义好的规则合算总价</p>
                        </div>
                        <Icon type="help-circled" size="20"></Icon>
                    </Poptip>
                </FormItem>
                <FormItem label="最小计价数：" prop="min_count">
                    <InputNumber :max="10" :min="1" v-model="formValidate.min_count"></InputNumber>
                </FormItem>
                <FormItem label="必须包含：" prop="state">
                    <RadioGroup v-model="formValidate2.state">
                        <Radio label="0">
                            <span>是</span>
                        </Radio>
                        <Radio label="1">
                            <span>否</span>
                        </Radio>
                    </RadioGroup>

                    <FormItem>
                        <Button type="primary" @click="handleSubmit2('formValidate2')">修改</Button>
                        <Button type="ghost" @click="cancel2()" style="margin-left: 8px">取消</Button>
                    </FormItem>
                </FormItem>
            </Form>
            <div slot="footer"></div>
        </Modal>
    </div>
</template>
<script>
    //  import $ from 'jquery'
    import _ from 'lodash'
    import dataTableChoose from '@/components/dataTableChoose.vue'
    require('static/css/datatable.css')
    require('static/css/modal.css')
    import ServiceHttp from 'server/http/service'
    export default {
        components: {
            dataTableChoose
        },
        created () {
        },
        mounted () {
        },
        data () {
            const validatePass = (rule, value, callback) => {
                if (value) {
                    var data = {
                        title: value,
                        type: 'column'
                    }
                    ServiceHttp.testservicename(data).then((data) => {
                        if (data == 0) {
                            callback()
                        } else if (data == 1) {
                            callback(new Error('服务名已存在'))
                        }
                    })
                }
            }
            return {
                id: '',
                addService: false,
                editService: false,
                editId: '',
                ifsearch: '',
                type: 'onclick',
                selectItem: [],
                tablename: '供应商服务',
                url: '/Service/getsupplierservicecolumns',
                thisId: null,
                dataService: [],
                dataServiceAll: [],
                pricingMethod: [
                    {
                        value: '1',
                        label: '单独'
                    },
                    {
                        value: '2',
                        label: '工单间互斥单独'
                    },
                    {
                        value: '3',
                        label: '总价折算加'
                    }
                ],
                columns: [
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: '编号',
                        width: '',
                        key: 'no'
                    },
                    {
                        title: '名称',
                        width: '',
                        key: 'name'
                    },
                    {
                        title: '单位',
                        width: '',
                        key: 'price_unit'
                    },
                    {
                        title: '计价方式',
                        width: '',
                        key: 'pricing_method'
                    },
                    {
                        title: '最小计价数',
                        width: '',
                        key: 'min_count'
                    },
                    {
                        title: '必须包含',
                        width: '',
                        key: 'must_containt'
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
                                            this.edit(params.row)
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
                    state: 0,
                    pricing_method: 1,
                    min_count: 1.0
                },
                formValidate2: {
                    state: 0,
                    pricing_method: 1,
                    min_count: 1.0
                },
                ruleValidate: {
                    name: [
                        { required: true, message: '名称不能为空', trigger: 'change' }
                    ]
                },
                ruleValidate2: {
                    name: [
                        { required: true, message: '编号不能为空', trigger: 'change' },
                        { validator: validatePass, trigger: 'blur' }
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
            changesearch (value) {
            },
            edit (obj) {
                this.editId = obj.id
                this.editService = true
                this.formValidate2.name = obj.name
                this.formValidate2.no = obj.no
                this.formValidate2.price_unit = obj.price_unit
                this.formValidate2.pricing_method = obj.pricing_method
                this.formValidate2.min_count = obj.min_count
                this.formValidate2.state = obj.must_containt
                this.formValidate2.specifications = obj.specifications
            },
            handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.submit()
                    } else {
                    }
                })
            },
            handleSubmit2 (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        var data = {
                            id: this.editId,
                            name: this.formValidate2.name,
                            no: this.formValidate2.no,
                            price_unit: this.formValidate2.price_unit,
                            pricing_method: this.formValidate2.pricing_method,
                            min_count: this.formValidate2.min_count,
                            must_containt: this.formValidate2.state,
                            specifications: this.formValidate2.specifications
                        }
                        ServiceHttp.editServiceItem(data).then((data) => {
                            this.editService = false
                            this.refresh()
                        })
                    } else {
                    }
                })
            },
            add () {
                ServiceHttp.getservicecolumns().then((data) => {
                    for (var i in data) {
                        this.dataService.push(data[i])
                        this.dataServiceAll.push(data[i])
                    }
                })
                this.addService = true
            },
            search (value) {
                if (this.dataServiceAll.length == 0) {
                    this.find()
                } else {
                    this.dataService = []
                    this.dataService = _.cloneDeep(this.dataServiceAll)
                    if (!value) {
                        return
                    } else {
                        for (let i = this.dataService.length - 1; i >= 0; i--) {
                            for (let j = this.dataService[i].columns.length - 1; j >= 0; j--) {
                                var index = this.dataService[i].columns[j].name.indexOf(value)
                                if (index == -1) {
                                    this.dataService[i].columns.splice(j, 1)
                                }
                                if (this.dataService[i].columns.length == 0) {
                                    this.dataService.splice(i, 1)
                                }
                            }
                        }
                    }
                    this.find()
                }
            },
            cancel () {
                this.addService = false
            },
            cancel2 () {
                this.editService = false
            },
            remove (id = null) {
                if (id) {
                    var data = {
                        column_id: id,
                        service_id: this.id
                    }
                } else {
                    var tempid = ''
                    for (var i in this.selectItem) {
                        tempid += this.selectItem[i].id + ','
                    }
                    tempid = tempid.substr(0, tempid.length - 1)
                    data = {
                        column_id: tempid,
                        service_id: this.id
                    }
                }
                this.$Modal.confirm({
                    title: '',
                    content: '确定删除吗？',
                    onOk: () => {
                        ServiceHttp.removeServiceItem(data).then((data) => {
                            this.refresh()
                        })
                    }
                })
            },
            submit () {
                var data = {
                    id: this.id,
                    name: this.formValidate.name,
                    price_unit: this.formValidate.price_unit,
                    pricing_method: this.formValidate.pricing_method,
                    min_count: this.formValidate.min_count,
                    must_containt: this.formValidate.state,
                    type: this.type,
                    specifications: this.formValidate.specifications
                }
                ServiceHttp.addServiceItem(data).then((data) => {
                    this.addService = false
                    this.refresh()
                })
            },
            refresh () {
                this.$refs.datatableTwo.refresh(this.url)
            },
            // 查找是否存在数据
            find () {
                if (this.dataServiceAll.length == 0) {
                    this.formValidate.price_unit = ''
                    this.formValidate.pricing_method = 1
                    this.formValidate.no = ''
                    this.formValidate.min_count = 1.0
                    this.formValidate.state = 0
                    this.type = 'input'
                } else {
                    for (var i in this.dataServiceAll) {
                        for (var j in this.dataServiceAll[i].columns) {
                            if (this.dataServiceAll[i].columns[j].name == this.formValidate.name) {
                                var thisData = this.dataServiceAll[i].columns[j]
                                this.formValidate.price_unit = thisData.price_unit
                                this.formValidate.pricing_method = thisData.pricing_method
                                this.formValidate.no = thisData.no
                                this.formValidate.min_count = thisData.min_count
                                this.formValidate.state = thisData.must_containt
                                this.type = 'onclick'
                            } else {
                                this.formValidate.price_unit = ''
                                this.formValidate.pricing_method = 1
                                this.formValidate.no = ''
                                this.formValidate.min_count = 1.0
                                this.formValidate.state = 0
                                this.type = 'input'
                            }
                        }
                    }
                }
            },
            selectTable (selection) {
                this.selectItem = selection
            },
            nextStep () {
            },
            cancelStep () {
            }
        },
        watch: {
            addService (v) {
                if (v === false) {
                    this.dataService = []
                    this.$refs['formValidate'].resetFields()
                    this.formValidate = {
                        price_unit: '',
                        state: 0,
                        pricing_method: 1,
                        min_count: 1.0
                    }
                    this.dataService = []
                }
            },
            editService (v) {
                if (v === false) {
                    this.dataService = []
                    this.$refs['formValidate2'].resetFields()
                    this.formValidate = {
                        price_unit: '',
                        state: 0,
                        pricing_method: 1,
                        min_count: 1.0
                    }
                }
            }
        }
    }
</script>
