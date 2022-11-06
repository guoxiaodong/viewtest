<template>
    <Modal v-model="show" title="用户编辑" :styles="{width: '85%'}" @on-cancel="editcancelbtn('formedit')">
        <Form ref="formedit" :model="formedit" :rules="ruleInline" label-position="left" :label-width="100">
            <Row>
                <Col span="12">
                    <FormItem label="登录账号：" prop="phone">
                        <Input type="text" v-model="formedit.phone" placeholder="请输入手机号"></Input>
                    </FormItem>
                </Col>
                <Col span="12">
                    <FormItem label="岗位：" prop="profession_id">
                        <Select v-model="formedit.profession_id" placeholder="请选择" multiple>
                            <Option v-for="(v, k) in professionList" :key="v.id" :value="v.id">{{v.name}}</Option>
                        </Select>
                    </FormItem>
                </Col>
                <Col span="12">
                    <FormItem label="姓名：" prop="name">
                        <Input v-model="formedit.name" placeholder="请输入姓名"></Input>
                    </FormItem>
                </Col>
                <Col span='12'>
                    <FormItem label="重置密码：" prop="password">
                        <Input v-model="formedit.password" placeholder="请输入密码"></Input>
                    </FormItem>
                </Col>
                <Col span='12'>
                    <FormItem label="性别：" prop="sex">
                        <Select v-model="formedit.sex" placeholder="请选择">
                            <Option v-for="(v, k) in sexList" :key="v.id" :value="v.id">{{v.name}}</Option>
                        </Select>
                    </FormItem>
                </Col>
                <Col span='12'>
                    <FormItem label="所属站点：" prop="area" >
                        <Cascader v-model="addressArray" :data="arraySite" change-on-select ></Cascader>
                    </FormItem>
                </Col>
                <Col span='12'>
                    <FormItem label="解聘时间：" prop="entry_at">
                        <DatePicker type="date" placeholder="选择日期" :options="options" v-model="formedit.entry_at" style="width: 100%;"></DatePicker>
                    </FormItem>
                </Col>
				<Col span='24'>
					<FormItem label="人员属性">
						<RadioGroup v-model="formedit.state"  @on-change="changeOption">
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
				<Col span='12' style="position: relative">
                    <FormItem label="部门：" prop="group_id">
                        <Select v-model="formedit.group_id" placeholder="请选择" :disabled="groupShow">
                            <Option v-for="(v, k) in groupList" :key="v.id" :value="v.id">{{v.name}}</Option>
                        </Select>
                    </FormItem>
                    <span v-if="groupSpan" style="position: absolute; top: 37px; left: 117px; color: #f00;" >此用户为部门主要负责人，不可更改部门</span>
                </Col>
            </Row>
            <Row>
                <Col span='24'>
                    <FormItem label="上传头像：" prop="avatar">
                        <uploadImg v-if='showImg' v-model="formedit.avatar" @handleUp="handleUpSuccess"></uploadImg>
                        <div class="upload-default"><img :src="formedit.avatar" /></div>
                    </FormItem>
                </Col>
            </Row>
            <FormItem>
            </FormItem>
            <FormItem class="formbtns">
                <Button type="ghost" @click="editcancelbtn('formedit')">放弃修改</Button>
                <Button type="primary" @click="handleSubmit('formedit')">提&emsp;交</Button>
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
                if (this.supperArray.length - 1 === 0 || this.supperArray.length === 0) {
                    return callback(new Error('请选择供应商'))
                } else {
                    callback()
                }
            }
            const validatePhone = (rule, value, callback) => {
                var data = {}
                data.phone = value
                data.id = this.formedit.id
                UserHttp.checkPhone(data).then((data) => {
                    if (data) {
                        return callback(new Error('手机号重复'))
                    } else {
                        callback()
                    }
                })
            }
            return {
                groupSpan: false,
                groupShow: false,
                options: {
                    disabledDate (date) {
                        return date && date.valueOf() < Date.now()
                    }
                },
                showInput: true,
                show: false,
                groupList: '',
                professionList: '',
                showImg: false,
                fileurl: '',
                arraySite: [],
                supperSite: [],
                supperArray: [],
                addressArray: [],
                sexList: [
                    {
                        id: 0,
                        name: '未知'
                    },
                    {
                        id: 1,
                        name: '男'
                    },
                    {
                        id: 2,
                        name: '女'
                    }
                ],
                formedit: {
                    id: '',
                    phone: '',
                    profession_id: [],
                    name: '',
                    group_id: '',
                    state: 0,
                    password: '',
                    sex: '',
                    entry_at: '',
                    area: '',
                    supper: '',
                    supplier_id: '',
                    supplierbranch_id: '',
                    avatar: ''
                },
                ruleInline: {
                    phone: [
                        { required: true, message: '请输入登录账号', trigger: 'blur' },
                        { type: 'string', pattern: /^1\d{10}$/, message: '手机号码格式错误', trigger: 'blur' },
                        { required: true, validator: validatePhone, trigger: 'blur' }
                    ],
                    profession_id: [
                        { required: true, type: 'array', min: 1, message: '请选择岗位', trigger: 'change' },
                        { type: 'array', trigger: 'change' }
                    ],
                    name: [
                        { required: true, message: '请输入姓名', trigger: 'blur' },
                        { type: 'string', max: 20, message: '最多只能输入20个字符', trigger: 'blur' }
                    ],
                    password: [
                       { required: false, message: '请输入密码', trigger: 'change' },
                       { type: 'string', max: 20, message: '最多只能输入20个字符', trigger: 'change' }
                    ],
                    sex: [
                        { required: true, type: 'number', message: '请选择性别', trigger: 'change' }
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
            init (id) {
                CommonHttp.profession().then((data) => {
                    this.professionList = data
                })
                // CommonHttp.group().then((data) => {
                    // this.groupList = data
                // })
                UserHttp.groupItems(id).then((data) => {
                    this.groupList = data
                })
                CommonHttp.site().then((data) => {
                    this.arraySite = data
                })
                CommonHttp.supper().then((data) => {
                    this.supperSite = data
                })
                UserHttp.get(id).then((data) => {
                    this.formedit.id = data.id
                    this.formedit.phone = data.phone
                    this.formedit.profession_id = []
                    for (var profession of data.professions) {
                        this.formedit.profession_id.push(profession.id)
                    }
                    this.formedit.name = data.name
                    this.formedit.group_id = data.group_id
                    this.formedit.state = 1
                    this.formedit.password = data.password
                    this.formedit.sex = data.sex
//                    this.formedit.entry_at = data.entry_at
                    this.formedit.entry_at = new Date((data.entry_at + '.000Z').replace(' ', 'T'))
                    this.formedit.avatar = data.avatar
                    this.addressArray = data.stationvalue
                    this.supperArray = data.suppervalue
                    this.$parent.loadingclose()
                    this.show = true
                    this.showImg = true
                    if (data.supplier_id == 0) {
                        this.showInput = false
                        this.formedit.state = 0
                        var param = {
                            supplier_id: 0
                        }
                        CommonHttp.groupItem(param).then((param) => {
                            this.groupList = param
                        })
                    } else {
                        this.showInput = true
                    }
                    if (data.priority == 99) {
                        this.groupSpan = true
                        this.groupShow = true
                    } else {
                        this.groupSpan = false
                        this.groupShow = false
                    }
                })
            },
            changeOption (value) {
                if (value == 0) {
                    this.showInput = 0
                    this.supperArray = []
                    // 当供应商ID是0时为内部部门
                    this.formedit.supplier_id = 0
                    this.formedit.supplierbranch_id = ''
                    var data = {
                        supplier_id: 0
                    }
                    CommonHttp.groupItem(data).then((data) => {
                        this.groupList = data
                    })
                } else {
                    this.showInput = 1
                }
            },
            handleChange (value, selectedData) {
                console.log(value)
                this.formedit.supplier_id = value[0]
                this.formedit.supplierbranch_id = value[1]
                var data = {
                    supplier_id: value[0],
                    supplierbranch_id: value[1]
                }
                CommonHttp.groupItem(data).then((data) => {
                    this.groupList = data
                })
                console.log(value, selectedData)
            },
            // 确定按钮
            handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.formedit.area = this.addressArray[this.addressArray.length - 1]
                        this.formedit.supper = this.supperArray[this.supperArray.length - 1]
                        this.formedit.professions = this.formedit.profession_id.join(',')
                        UserHttp.edit(this.formedit).then(() => {
                            this.$Message.success('修改成功')
                            this.$parent.refresh()
                            this.showImg = false
                            this.show = false
                        }).catch((error) => {
                            this.$Message.error(error)
                            this.showImg = false
                            this.show = false
                        })
                    }
                })
            },
            handleUpSuccess (url) {
                this.fileurl = url
                this.formedit.avatar = URL.replace(/api/, '') + 'uploads' + this.fileurl
            },
            // 取消按钮
            editcancelbtn (name) {
                this.$refs[name].resetFields()
                this.showImg = false
                this.show = false
            }
        }
    }
</script>
