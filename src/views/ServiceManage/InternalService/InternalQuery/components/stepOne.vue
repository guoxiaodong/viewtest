<style>
    .internalQuery .ivu-steps-horizontal{
        margin-left: 25%;
        width: 65%;
    }
    .chooseIcon span.ivu-radio{
        position: relative;
        top: 130px;
        left: 60px;
    }
    .internalQuery .ivu-form-item{
        width: 500px;
    }
    .ivu-modal .fixed div.ivu-select-dropdown{
        position: fixed!important;
    }
</style>
<template>
    <div class="internalService-stepOne">
        <div  class="internalQuery" >
            <Steps :current="0" style="padding-top: 50px;padding-bottom: 70px">
                <Step title="步骤一" content="填写基本信息"></Step>
                <Step title="步骤二" content="添加供应商服务"></Step>
            </Steps>
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="150" style="margin:25px 0 0 15px;padding-left: 16%;width: 650px">
                <FormItem label="编号：" prop="number" >
                    <Input v-model="formValidate.number" disabled  placeholder="请输入编号"></Input>
                </FormItem>
                <FormItem prop="images" label="服务形象图标 :" style="width: 100%">
                    <img v-bind:src="imgUrl + myImg" onerror="src='static/images/ic_original.png'" style="height: 60px; width: 60px" alt="" />
                    <a @click="chooseIcon">点击更换</a>
                </FormItem>
                <FormItem label="名称：" prop="title">
                    <Input v-model="formValidate.title" placeholder="请输入名称" :maxlength="30"></Input>
                </FormItem>
                <FormItem label="简介：" prop="intro">
                    <Input v-model="formValidate.intro" :maxlength="400" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入简介"></Input>
                </FormItem>
                <FormItem label="所属分类：" prop="type">
                    <Cascader :data="data" v-model="formValidate.type" filterable trigger="hover"></Cascader>
                </FormItem>
                <FormItem label="管理对象：" prop="manObject">
                    <Select v-model="formValidate.manObject"  multiple  filterable class="fixed">
                        <OptionGroup v-for="(item, key) in manObjectGroup" :key=item.key :label=item.name >
                            <Option v-for="(val,key) in item.objects" :value="val.id" :key="val.id">{{ val.name }}</Option>
                        </OptionGroup>
                    </Select>
                </FormItem>
                <FormItem label="服务范围：" prop="servicePlace">
                    <Select v-model="formValidate.servicePlace"  multiple  filterable class="fixed">
                        <OptionGroup v-for="(item, key) in servicePlace" :key=item.key :label=item.name >
                            <Option v-for="(val,key) in item.options" :value="val.value" :key="val.value">{{ val.text }}</Option>
                        </OptionGroup>
                    </Select>
                </FormItem>
                <FormItem label="工单类型：" prop="worktype">
                    <Select v-model="formValidate.worktype"   filterable class="fixed">
                            <Option v-for="(val,key) in worktype" :value="val.id" :key="val.id">{{ val.name }}</Option>
                    </Select>
                </FormItem>
                <FormItem label="正常提供" prop="state">
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
                            <P>正常：指此内部服务正常提供，用户在提起服务请求时可选择到</p>
                            <P>暂停：指此内部服务暂停提供，用户在提起服务请求时看不到暂停的服务</p>
                        </div>
                        <Icon type="help-circled" size="20" ></Icon>
                    </Poptip>
                </FormItem>
            </Form>
            <div slot="footer">
                <Button type="ghost" @click="cancel()" style="margin-left: 350px">返回</Button>
                <Button type="primary" @click="handleSubmit('formValidate')" style="margin-left: 150px">下一步</Button>
            </div>
        </div>
        <Modal class="chooseIcon"
            v-model="modalImg"
            width="900"
            title="服务形象图标"
            @on-ok="ok"
            @on-cancel="">
            <RadioGroup v-model="myImg">
                <Radio v-for="(item, key) in iconGroup" :key=item.key :label=item.url style="width: 140px;height: 230px;margin-right: 0">
                    <div style="text-align: center"><img v-bind:src="imgUrl + item.url" onerror="this.onerror='';src='static/images/ic_original.png'" style="height: 60px; width: 60px" alt="" /></div>
                    <div style="text-align: center">{{item.name}}</div>
                </Radio>
            </RadioGroup>
        </Modal>
    </div>
</template>
<script>
    //    import $ from 'jquery'
    import { URL } from '@/config/index'
    import ServiceHttp from 'server/http/service'
    require('static/css/modal.css')
    require('static/css/datatable.css')
    import {paramInstring} from '@/util/paramInstring'
    export default {
        components: {
        },
        created () {
            this.getWorktype()
        },
        data () {
            const validatePass = (rule, value, callback) => {
                if (value) {
                    if (!this.editId) {
                        var data = {
                            title: value
                        }
                    } else {
                        data = {
                            title: value,
                            id: this.editId
                        }
                    }
                    ServiceHttp.checkNameInetrnal(data).then((data) => {
                        if (data == 0) {
                            callback()
                        } else if (data == 1) {
                            callback(new Error('服务名已存在'))
                        }
                    })
                }
            }
            return {
                uploadUrl: URL + '/upload',
                imgUrl: URL.replace(/api/, '') + '/uploads',
                modalImg: false,
                myImg: '',
                iconGroup: [],
                data: [],
                manObjectGroup: [],
                object: [],
                inClass: [],
                worktype: '',
                visible: false,
                editId: null,
                servicePlace: [],
                formValidate: {
                    number: '',
                    manObject: [],
                    interClass: [],
                    servicePlace: [],
                    state: '0'
                },
                ruleValidate: {
                    number: [
                        { required: true, message: '编号不能为空', trigger: 'blur' }
                    ],
                    title: [
                        { required: true, message: '名称不能为空', trigger: 'blur' },
                        { validator: validatePass, trigger: 'blur' }
                    ],
                    intro: [
                        { required: true, message: '简介不能为空', trigger: 'blur' }
                    ],
                    type: [
                        { required: true, type: 'array', message: '所属分类不能为空', trigger: 'change' }
                    ],
                    manObject: [
                        { required: true, type: 'array', message: '管理对象不能为空', trigger: 'change' }
                    ],
                    worktype: [
                        { required: true, type: 'number', message: '工单类型不能为空', trigger: 'change' }
                    ],
                    servicePlace: [
                        { required: true, type: 'array', message: '服务范围不能为空', trigger: 'change' }
                    ],
                    state: [
                        { required: true, message: '请选择状态', trigger: 'change' }
                    ]
                }
            }
        },
        mixins: [ ],
        methods: {
            open (id = null) {
                if (id) {
                    this.editId = id
                }
                let number = ''
                for (var i = 0; i <= 3; i++) {
                    number += Math.floor(Math.random() * 10)
                }
                this.formValidate.number = 'ES' + new Date().getTime() + number
//                获得图片
                ServiceHttp.getIcon().then((data) => {
                    this.iconGroup = data
                    this.myImg = data[0].url
                })
//            所属分类控件内容
                ServiceHttp.internalCata().then((data) => {
                    for (var i in data.service) {
                        var temp = {
                            value: data.service[i].id,
                            label: data.service[i].name,
                            children: [
                            ]
                        }
                        this.data.push(temp)
                    }
                })
                // 所属管理对象
                ServiceHttp.object().then((data) => {
                    this.manObjectGroup = data
                })
                // 服务范围
                ServiceHttp.getServicePlace().then((data) => {
                    this.servicePlace = data
                })
            },
            chooseIcon () {
                this.modalImg = true
            },
            handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.submit()
                    } else {
                    }
                })
            },
            cancel () {
                this.$refs['formValidate'].resetFields()
                this.worktype = ''
                this.formValidate = {
                    servicePlace: [],
                    manObject: [],
                    interClass: [],
                    state: '0'
                }
                this.$emit('show', 0, null)
            },
            getWorktype () {
                ServiceHttp.interWorktype().then((data) => {
                    this.worktype = data
                })
            },
            ok () {
//                console.log(this.myImg)
            },
            submit () {
                var objects = ''
                for (var k in this.formValidate.manObject) {
                    objects += this.formValidate.manObject[k] + ','
                }
                objects = objects.substr(0, objects.length - 1)
                var typeid = ''
                for (var l in this.formValidate.type) {
                    typeid += this.formValidate.type[l]
                }
                if (!this.editId) {
                    var data = {
                        no: this.formValidate.number,
                        title: this.formValidate.title,
                        intro: this.formValidate.intro,
                        status: this.formValidate.state,
                        objects: objects,
                        type_id: typeid,
                        wo_status: this.formValidate.worktype,
                        service_area: paramInstring(this.formValidate.servicePlace),
                        images: this.myImg,
                        supplierserviceId: paramInstring(this.formValidate.interClass)
                    }
                    ServiceHttp.submitInternal(data).then((data) => {
                        this.$emit('show', 2, data)
                    })
                } else {
                    data = {
                        no: this.formValidate.number,
                        title: this.formValidate.title,
                        intro: this.formValidate.intro,
                        status: this.formValidate.state,
                        objects: objects,
                        type_id: typeid,
                        wo_status: this.formValidate.worktype,
                        service_area: paramInstring(this.formValidate.servicePlace),
                        images: this.myImg,
                        supplierserviceId: paramInstring(this.formValidate.interClass)
                    }
                    ServiceHttp.interEdit(this.editId, data).then((data) => {
                        this.$emit('show', 2, data)
                    })
                }
            }
        },
        mounted () {
        },
        watch: {
//            stepOne (v) {
//                if (v === false) {
//                    this.$refs['formValidate'].resetFields()
//                    this.worktype = ''
//                    this.formValidate = {
//                        servicePlace: [],
//                        manObject: [],
//                        interClass: [],
//                        state: '0'
//                    }
//                }
//            }
        }
    }
</script>
