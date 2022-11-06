<style>
.serviceQuery .demo-upload-list{
        display: inline-block;
        width: 60px;
        height: 60px;
        text-align: center;
        line-height: 60px;
        border: 1px solid transparent;
        border-radius: 4px;
        overflow: hidden;
        background: #fff;
        position: relative;
        box-shadow: 0 1px 1px rgba(0,0,0,.2);
        margin-right: 4px;
    }
.serviceQuery .demo-upload-list img{
        width: 100%;
        height: 100%;
    }
.serviceQuery .demo-upload-list-cover{
        display: none;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(0,0,0,.6);
    }
.serviceQuery .demo-upload-list:hover .demo-upload-list-cover{
        display: block;
    }
.serviceQuery .demo-upload-list-cover i{
        color: #fff;
        font-size: 20px;
        cursor: pointer;
        margin: 0 2px;
    }
.serviceQuery .uploadPic{
    width: 300px;
    height: 100px;
}
.serviceQuery .ivu-form-item{
 width: 500px;
}
.ivu-modal .fixed div.ivu-select-dropdown{
    position: fixed!important;
}

</style>
<template>
    <div class="serviceQuery-stepOne">
        <div  class="serviceQuery"  >
        <Steps :current="0">
            <Step title="步骤一" content="填写基本信息"></Step>
            <Step title="步骤二" content="添加服务项"></Step>
            <Step title="步骤三" content="定义服务等级"></Step>
            <Step title="步骤四" content="添加供应商"></Step>
        </Steps>
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="150" style="margin:25px 0 0 15px;padding-left: 16%;width: 650px" >
                <FormItem label="编号：" prop="number" style="width: 500px">
                <Input v-model="formValidate.number" disabled  placeholder="请输入编号"></Input>
                </FormItem>
                <FormItem prop="images" label="上传图片" style="width: 100%">
                    <div class="demo-upload-list" v-for="item in uploadList">
                        <template v-if="item.status === 'finished'">
                            <img :src="item.url">
                            <div class="demo-upload-list-cover">
                                <Icon type="ios-eye-outline" @click.native="handleView(item.name)"></Icon>
                                <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
                            </div>
                        </template>
                        <template v-else>
                            <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
                        </template>
                    </div>
                    <Upload
                        ref="upload"
                        :show-upload-list="false"
                        :default-file-list="defaultList"
                        :on-success="handleSuccess"
                        :format="['jpg','jpeg','png']"
                        :max-size="2048"
                        :on-format-error="handleFormatError"
                        :on-exceeded-size="handleMaxSize"
                        :before-upload="handleBeforeUpload"
                        multiple
                        type="drag"
                        :action="uploadUrl"
                        style="display: inline-block;width:58px;">
                        <div style="width: 58px;height:58px;line-height: 58px;">
                            <Icon type="camera" size="20"></Icon>
                        </div>
                    </Upload>
                    <Modal title="View Image" v-model="visible" class="picView">
                        <img :src="imgUrl + imgName " v-if="visible" style="width: 100%">
                    </Modal>
                </FormItem>
                <FormItem label="名称：" prop="title">
                    <Input v-model="formValidate.title" placeholder="请输入名称" :maxlength="30"></Input>
                </FormItem>
                <FormItem label="简介：" prop="intro">
                    <Input v-model="formValidate.intro" :maxlength="400" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入简介"></Input>
                </FormItem>
                <FormItem label="所属分类：" prop="type">
                    <Cascader :data="data" v-model="formValidate.type" trigger="hover"></Cascader>
                </FormItem>
                <FormItem label="所属财务科目：" prop="finClass">
                    <Select v-model="formValidate.finClass" placeholder="请选择所属财务科目" filterable class="fixed">
                        <OptionGroup v-for="(item, key) in fin" :key=item.key :label=item.name >
                            <Option v-for="val in item.object" :value="val.id" :key="val.id">{{ val.name }}</Option>
                        </OptionGroup>
                    </Select>
                </FormItem>
                <FormItem label="管理对象：" prop="manObject">
                    <Select v-model="formValidate.manObject"  multiple  filterable class="fixed">
                        <OptionGroup v-for="(item, key) in manObjectGroup" :key=item.key :label=item.name >
                            <Option v-for="(val,key) in item.objects" :value="val.id" :key="val.id">{{ val.name }}</Option>
                        </OptionGroup>
                    </Select>
                </FormItem>
                <FormItem label="所属行政服务：" prop="interClass">
                    <Select v-model="formValidate.interClass"  multiple  filterable class="fixed">
                        <OptionGroup v-for="(item, key) in inClass" :key=item.key :label=item.name >
                            <Option v-for="(val,key) in item.service" :value="val.id" :key="val.id">{{ val.name }}</Option>
                        </OptionGroup>
                    </Select>
                </FormItem>
                <FormItem label="服务范围描述：" prop="rangeIntro">
                    <Input v-model="formValidate.rangeIntro" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入服务范围描述"></Input>
                </FormItem>
                <FormItem label="包含项描述：" prop="containIntro">
                    <Input v-model="formValidate.containIntro" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入包含项描述"></Input>
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
                </FormItem>
            </Form>
            <div slot="footer">
                <Button type="ghost" @click="cancel()" style="margin-left: 350px">返回</Button>
                <Button type="primary" @click="handleSubmit('formValidate')" style="margin-left: 150px">下一步</Button>
            </div>
        </div>
    </div>
</template>
<script>
//    import $ from 'jquery'
    import { URL } from '@/config/index'
    import ServiceHttp from 'server/http/service'
    require('static/css/modal.css')
    export default {
        components: {
        },
        created () {
        },
        data () {
            const validatePass = (rule, value, callback) => {
                if (value) {
                    if (!this.editId) {
                        var data = {
                            title: value,
                            type: 'supplier'
                        }
                    } else {
                        data = {
                            title: value,
                            type: 'supplier',
                            id: this.editId
                        }
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
                uploadUrl: URL + '/upload',
                imgUrl: URL.replace(/api/, '') + '/uploads',
                data: [],
                fin: [],
                editId: '',
                manObjectGroup: [],
                object: [],
                inClass: [],
                defaultList: [
                ],
                imgName: '',
                visible: false,
                uploadList: [],
                formValidate: {
                    manObject: [],
                    interClass: [],
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
                    finClass: [
                        { required: true, type: 'number', message: '所属财务科目不能为空', trigger: 'blur' }
                    ],
                    manObject: [
                        { required: true, type: 'array', message: '管理对象不能为空', trigger: 'change' }
                    ],
                    interClass: [
                        { required: false, type: 'array', message: '所属行政服务不能为空', trigger: 'change' }
                    ],
                    rangeIntro: [
                    ],
                    containIntro: [
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
                setTimeout(() => {
                    this.uploadList = this.$refs.upload.fileList
                }, 500)
//            所属分类控件内容
                ServiceHttp.supplierCata().then((data) => {
                    for (var i in data.service) {
                        var temp = {
                            value: data.service[i].id,
                            label: data.service[i].name,
                            children: [
                            ]
                        }
                        for (var k in data.service[i].service) {
                            var temp2 = {
                                value: data.service[i].service[k].id,
                                label: data.service[i].service[k].name
                            }
                            temp.children.push(temp2)
                        }
                        this.data.push(temp)
                    }
                })
                // 所属财务科目
                ServiceHttp.finances().then((data) => {
                    for (var i in data) {
                        if (data[i].fid == 0) {
                            data[i].object = []
                            this.fin.push(data[i])
                        }
                    }
                    for (var j in data) {
                        for (var k in this.fin) {
                            if (data[j].fid == this.fin[k].id) {
                                this.fin[k].object.push(data[j])
                            }
                        }
                    }
                })
                // 所属管理对象
                ServiceHttp.object().then((data) => {
                    this.manObjectGroup = data
                })
                // 所属行政服务
                ServiceHttp.internalCata().then((data) => {
                    this.inClass = data.service
                })
                let number = ''
                for (var i = 0; i <= 3; i++) {
                    number += Math.floor(Math.random() * 10)
                }
                this.formValidate.number = 'EPS' + new Date().getTime() + number
            },
            handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        console.log(this.formValidate)
                        this.submit()
                    } else {
                    }
                })
            },
            cancel () {
                this.$refs['formValidate'].resetFields()
                this.$refs.upload.fileList = []
                this.uploadList = []
                this.worktype = ''
                this.formValidate = {
                    manObject: [],
                    interClass: [],
                    state: '0'
                }
                this.$emit('show', 0, null)
            },
//            图片上传
            handleView (name) {
                this.imgName = name
                this.visible = true
            },
            handleRemove (file) {
                const fileList = this.$refs.upload.fileList
                this.$refs.upload.fileList.splice(fileList.indexOf(file), 1)
            },
            handleSuccess (res, file) {
                file.url = this.imgUrl + res.file[0].url
                file.name = res.file[0].url
            },
            handleFormatError (file) {
                this.$Notice.warning({
                    title: '图片格式不正确',
                    desc: '图片' + file.name + ' 格式不正确， 请选择 jpg 或 png.'
                })
            },
            handleMaxSize (file) {
                this.$Notice.warning({
                    title: '图片大小限制',
                    desc: '图片大小' + file.name + '太大，不能超过2m'
                })
            },
            handleBeforeUpload () {
                const check = this.uploadList.length < 1
                if (!check) {
                    this.$Notice.warning({
                        title: '最多上传1张'
                    })
                }
                return check
            },
//            图片上传结束
            submit () {
                var pic = ''
                for (var i in this.uploadList) {
                    pic += this.uploadList[i].url + ','
                }
                pic = pic.substr(0, pic.length - 1)
                var indoorserviceid = ''
                for (var j in this.formValidate.interClass) {
                    indoorserviceid += this.formValidate.interClass[j] + ','
                }
                indoorserviceid = indoorserviceid.substr(0, indoorserviceid.length - 1)
                var objects = ''
                for (var k in this.formValidate.manObject) {
                    objects += this.formValidate.manObject[k] + ','
                }
                objects = objects.substr(0, objects.length - 1)
                if (!this.editId) {
                    var data = {
                        no: this.formValidate.number,
                        title: this.formValidate.title,
                        intro: this.formValidate.intro,
                        status: this.formValidate.state,
                        objects: objects,
                        type_id: this.formValidate.type[1],
                        finance_id: this.formValidate.finClass,
                        intro_sites: this.formValidate.rangeIntro,
                        intro_services: this.formValidate.containIntro,
                        images: pic,
                        indoorserviceid: indoorserviceid
                    }
                } else {
                    data = {
                        no: this.formValidate.number,
                        title: this.formValidate.title,
                        intro: this.formValidate.intro,
                        status: this.formValidate.state,
                        objects: objects,
                        type_id: this.formValidate.type[1],
                        finance_id: this.formValidate.finClass,
                        intro_sites: this.formValidate.rangeIntro,
                        intro_services: this.formValidate.containIntro,
                        images: pic,
                        indoorserviceid: indoorserviceid,
                        service_id: this.editId
                    }
                }
                ServiceHttp.supplierStepOne(data).then((data) => {
                    this.$emit('show', 2, data)
                })
            }
        },
        mounted () {
            this.uploadList = this.$refs.upload.fileList
        },
        watch: {
//            stepOne (v) {
//                if (v === false) {
//                    if (!sessionStorage.getItem('serviceId') || sessionStorage.getItem('serviceId') == 0) {
//                        this.$refs['formValidate'].resetFields()
//                        this.formValidate = {
//                            manObject: [],
//                            interClass: [],
//                            state: '0'
//                        }
//                    }
//                }
//            }
        }
    }
</script>
