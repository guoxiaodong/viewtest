<template>
    <Modal  v-model="show" title="新建用户" :styles="{width: '85%'}" @on-cancel="cancel('formadd')">
        <Form ref="formadd"  v-if= 'aa' :model="formadd" :rules="ruleInline" label-position="left" :label-width="100">
            <Row>
                <Col span="12">
                    <FormItem label="登录账号：" prop="phone">
                        <Input v-model="formadd.phone" placeholder="请输入手机号"></Input>
                    </FormItem>
                </Col>
                <Col span="12">
                    <FormItem label="岗位：" prop="profession_id">
                        <Select v-model="formadd.profession_id" placeholder="请选择" multiple>
                            <Option v-for="(v, k) in professionList" :key="v.id" :value="v.id">{{v.name}}</Option>
                        </Select>
                    </FormItem>
                </Col>
                <Col span="12">
                    <FormItem label="姓名：" prop="name">
                        <Input v-model="formadd.name" placeholder="请输入姓名"></Input>
                    </FormItem>
                </Col>

                <Col span='12'>
                    <FormItem label="密码：" prop="password">
                        <Input v-model="formadd.password" placeholder="请输入密码"></Input>
                    </FormItem>
                </Col>
                <Col span='12'>
                    <FormItem label="性别：" prop="sex">
                        <Select v-model="formadd.sex" placeholder="请选择">
                            <Option value="0">未知</Option>
                            <Option value="1">男</Option>
                            <Option value="2">女</Option>
                        </Select>
                    </FormItem>
                </Col>
                <Col span='12'>
                    <FormItem label="所属站点：" prop="area">
                        <Cascader v-model="addressArray" :data="arraySite" change-on-select ></Cascader>
                    </FormItem>
                </Col>
				<Col span='12'>
                    <FormItem label="解聘时间：" prop="entry_at">
                        <DatePicker type="date" :options="options" placeholder="选择日期" v-model="formadd.entry_at" style="width: 100%;"></DatePicker>
                    </FormItem>
                </Col>
				<Col span='24'>
					<FormItem label="人员属性">
						<RadioGroup v-model="formadd.state"  @on-change="changeOption">
							<Radio label="0">
								<span>内部人员</span>
							</Radio>
							<Radio label="1">
								<span>供应商</span>
							</Radio>
						</RadioGroup>
					</FormItem>
                </Col>
            </Row>
            <Row>
				<Col span='12'>
                    <FormItem label="供应商：" prop="supper"  v-if='showInput'>
                        <Cascader v-model="supperArray" :data="supperSite" change-on-select @on-change="handleChange"></Cascader>
                    </FormItem>
                </Col>
            </Row>
            <Row>
				<Col span='12'>
                    <FormItem label="部门：" prop="group_id">
                        <Select v-model="formadd.group_id" placeholder="请选择" class='fixed' :disabled="groupShow">
                            <Option v-for="(v, k) in groupList" :key="v.id" :value="v.id">{{v.name}}</Option>
                        </Select>
                    </FormItem>
                </Col>
            </Row>
            <Row>
                <Col span='24'>
                    <FormItem label="上传头像：" prop="avatar">
                       <uploadImg v-model="formadd.avatar" @handleUp="handleUpSuccess" @handleRemove="handleUpRemove"></uploadImg>
                    </FormItem>
                </Col>
            </Row>
            <FormItem>
            </FormItem>
            <FormItem class="formbtns">
                <Button type="ghost" @click="cancelSubmit('formadd')">返&emsp;回</Button>
                <Button type="primary" @click="handleSubmit('formadd')">提&emsp;交</Button>
            </FormItem>
        </Form>
        <span slot="footer"></span>
    </Modal>
</template>
<script>
    import uploadImg from '@/components/uploadImg.vue'
    require('static/css/uploadimg.css')
    import UserHttp from 'server/http/user'
    import CommonHttp from 'server/http/common'
    import { URL } from '@/config/index'

    export default {
        components: {
            uploadImg
        },
        data () {
            const validateArea = (rule, value, callback) => {
                if (this.addressArray.length - 1 == 0 || this.addressArray.length == 0) {
                    return callback(new Error('请选择所属站点'))
                } else {
                    callback()
                }
            }
            const validateSupper = (rule, value, callback) => {
                if (this.supperArray.length - 1 == 0 || this.supperArray.length == 0) {
                    return callback(new Error('请选择供应商'))
                } else {
                    callback()
                }
            }
            const validatePhone = (rule, value, callback) => {
                var data = {}
                data.phone = value
                UserHttp.checkPhone(data).then((data) => {
                    if (data) {
                        return callback(new Error('手机号重复'))
                    } else {
                        callback()
                    }
                })
            }
            return {
                groupShow: true,
                options: {
                    disabledDate (date) {
                        return date && date.valueOf() < Date.now()
                    }
                },
                showInput: true,
                aa: false,
                show: false,
                groupList: '',
                professionList: '',
                fileurl: '',
                arraySite: [],
                supperSite: [],
                supperArray: [],
                addressArray: [],
                formadd: {
                    phone: '',
                    profession_id: '',
                    name: '',
                    group_id: '',
                    state: 0,
                    password: '',
                    sex: '',
                    entry_at: '',
                    supper: [],
                    supplierbranch_id: '',
                    supplier_id: '',
                    avatar: ''
                },
                ruleInline: {
                    phone: [
                        { required: true, message: '请输入登录账号', trigger: 'blur' },
                        { type: 'string', pattern: /^1\d{10}$/, message: '手机号码格式错误', trigger: 'blur' },
                        { required: true, validator: validatePhone, trigger: 'blur' }
                    ],
                    profession_id: [
                        { required: true, type: 'array', message: '请选择岗位', trigger: 'change' }
                    ],
                    name: [
                        { required: true, message: '请输入姓名', trigger: 'blur' },
                        { type: 'string', max: 20, message: '最多只能输入20个字符', trigger: 'blur' }
                    ],
                    password: [
                       { required: true, message: '请输入密码', trigger: 'change' },
                       { type: 'string', max: 20, message: '最多只能输入20个字符', trigger: 'change' }
                    ],
                    sex: [
                       { required: true, message: '请选择性别', trigger: 'change' }
                    ],
                    entry_at: [
                       { required: true, type: 'date', message: '请选择日期', trigger: 'change' }
                    ],
                    supper: [
                        { required: true, validator: validateSupper, trigger: 'change' }
                    ],
                    area: [
                        { required: true, validator: validateArea, trigger: 'change' }
                    ]
                }
            }
        },
        methods: {
            open () {
                CommonHttp.profession().then((data) => {
                    this.professionList = data
                })
                CommonHttp.group().then((data) => {
                    this.groupList = data
                })
                CommonHttp.site().then((data) => {
                    this.arraySite = data
                })
                CommonHttp.supper().then((data) => {
                    this.supperSite = data
                })
                this.formadd.phone = ''
                this.formadd.profession_id = []
                this.formadd.name = ''
                this.formadd.group_id = ''
                this.formadd.state = 1
                this.formadd.password = ''
                this.formadd.sex = ''
                var dd = new Date()
                var y = dd.getFullYear() + 15
                var m = dd.getMonth() + 1 // 获取当前月份的日期
                var d = dd.getDate()
                this.formadd.entry_at = new Date(y + '-' + m + '-' + d)
                this.formadd.avatar = ''
                this.show = true
                this.showInput = true
            },
            changeOption (value) {
                if (value == 0) {
                    this.showInput = false
                    this.groupShow = false
                    this.supperArray = []
                    var data = {
                        supplier_id: 0
                    }
                    CommonHttp.groupItem(data).then((data) => {
                        this.groupList = data
                    })
                } else {
                    this.groupShow = true
                    this.showInput = true
                }
            },
            handleChange (value, selectedData) {
                this.groupShow = false
                this.formadd.supplier_id = value[0]
                this.formadd.supplierbranch_id = value[1]
                var data = {
                    supplier_id: value[0]
                }
                CommonHttp.groupItem(data).then((data) => {
                    this.groupList = data
                })
                console.log(value, selectedData)
            },
            // 确定按钮
            handleSubmit (name) {
//                this.formadd.entry_at = new Date((this.formadd.entry_at + '.000Z').replace(' ', 'T'))
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        if (this.fileurl) {
                            this.formadd.avatar = URL.replace(/api/, '') + 'uploads' + this.fileurl
                        }
                        this.formadd.area = this.addressArray[this.addressArray.length - 1]
                        this.formadd.supper = this.supperArray[this.supperArray.length - 1]
                        this.formadd.professions = this.formadd.profession_id.join(',')
                        this.formadd.supplier_id = this.supperArray[0]
                        this.formadd.supplierbranch_id = this.supperArray[1]
                        this.formadd.group_id = this.formadd.group_id
                        UserHttp.create(this.formadd).then(() => {
                            this.$Message.success('创建成功')
                            this.$parent.refresh()
                        }).catch((error) => {
                            this.$Message.error(error)
                        })
                        this.addressArray = []
                        this.supperArray = []
                        this.aa = false
                        this.show = false
                    }
                })
            },
            handleUpSuccess (url) {
                this.uploadpic = false
                this.fileurl = url
            },
            handleUpRemove () {
                this.fileurl = ''
            },
            // 取消按钮
            cancelSubmit (name, url) {
                this.$refs[name].resetFields()
                this.aa = false
                this.addressArray = []
                this.$parent.refresh()
                this.show = false
            },
            // 显示右侧图片
            showPic () {
                this.aa = true
            },
            // 模态框关闭
            cancel (formadd) {
                this.$refs[formadd].resetFields()
                this.addressArray = []
                this.$parent.refresh()
                this.aa = false
            }
        }
    }
</script>
