<style>
    .modalTop{
        z-index: 1005;
        position: absolute;
    }
</style>
<template>
    <div class="internalService-stepOne">
    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="150" style="margin:25px 0 0 15px;padding-left: 16%;width: 650px" >
        <FormItem label="编号：" prop="number" style="width: 500px">
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
            <Select v-model="formValidate.manObject"  multiple  filterable class="fixed" @on-change="getWorktype">
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
        <FormItem label="状态控制" prop="state">
            <RadioGroup v-model="formValidate.state">
                <Radio label=0>
                    <span>是</span>
                </Radio>
                <Radio label=1>
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
            <Button type="primary" @click="handleSubmit('formValidate')" style="margin-left: 442px;width: 100px;">提&nbsp;交</Button>
            <!--<Button type="ghost" @click="openEdit()">还原</Button>-->
    </div>
        <Modal class="chooseIcon modalTop"
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
        },
        data () {
            const validatePass = (rule, value, callback) => {
                if (value) {
                    var data = {
                        title: value,
                        id: this.detailId
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
                imgUrl: URL.replace(/api/, '') + '/uploads',
                modalImg: false,
                myImg: '',
                iconGroup: [],
                checkdata: {},
                detailId: '',
                data: [],
                manObjectGroup: [],
                object: [],
                inClass: [],
                defaultList: [],
                worktype: '',
                imgName: '',
                visible: false,
                servicePlace: [],
                formValidate: {
                    number: '',
                    manObject: [],
                    interClass: [],
                    servicePlace: [],
                    state: 0
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
                        { required: true, type: 'array', message: '工单类型不能为空', trigger: 'change' }
                    ],
                    state: [
                        { required: true, type: 'number', message: '请选择状态', trigger: 'change' }
                    ]
                }
            }
        },
        mixins: [ ],
        methods: {
            open (id) {
                this.detailId = id
                this.openEdit(id)
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
            handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.submit()
                    } else {
                    }
                })
            },
            ok () {
                console.log(this.myImg)
            },
            chooseIcon () {
                this.modalImg = true
            },
            getWorktype (value) {
                var data = {
                    object_id: paramInstring(value)
                }
                ServiceHttp.interWorktype(data).then((data) => {
                    this.worktype = data
                })
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
                ServiceHttp.interEdit(this.detailId, data).then((data) => {
                    this.checkdata = this.formValidate
                    this.$Message.success('修改成功')
                    this.$emit('check', true)
                })
            },
            cancel () {
                this.$refs['formValidate'].resetFields()
                this.worktype = ''
                this.formValidate = {
                    servicePlace: [],
                    manObject: [],
                    interClass: [],
                    state: 0
                }
            },
            openEdit () {
                var data = {
                    id: this.detailId
                }
                ServiceHttp.interDetail(data).then((data) => {
                    this.checkdata = data
                    if (data[0].objects) {
                        data[0].objects = data[0].objects.split(',')
                        for (var i in data[0].objects) {
                            data[0].objects[i] = parseInt(data[0].objects[i])
                        }
                    }
                    if (data[0].serviceArea) {
                        data[0].serviceArea = data[0].serviceArea.split(',')
                        console.log(data[0].serviceArea)
                        for (var l in data[0].serviceArea) {
                            data[0].serviceArea[l] = parseInt(data[0].serviceArea[l])
                        }
                    }
                    this.formValidate.number = data[0].no
                    this.formValidate.title = data[0].title
                    this.formValidate.intro = data[0].intro
                    this.formValidate.state = data[0].status
                    this.formValidate.type = [data[0].type_id]
                    this.formValidate.manObject = data[0].objects
                    this.formValidate.servicePlace = data[0].serviceArea
                    this.formValidate.worktype = data[0].wo_status
                    if (data[0].images && data[0].images.length != 0) {
                        if (data[0].images[0].url.indexOf('/uploads') != -1) {
                            var temp = data[0].images[0].url.split('/uploads')
                            this.myImg = temp[1]
                        } else {
                            this.myImg = data[0].images[0].url
                        }
                    }
                })
            }
        },
        mounted () {
        },
        watch: {
            formValidate (v) {
                if (v !== this.checkdata) {
                    this.$emit('check', false)
                } else {
                    this.$emit('check', true)
                }
            }
        }
    }
</script>
