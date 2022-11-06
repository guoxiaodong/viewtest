<style>
    .zTreeInput { width: 100%; border-radius: 4px; min-height: 32px; border: 1px solid #dddee1; color: #495060; padding-left:7px; }
    #menuContent { width: 100%; max-height: 200px; overflow: auto; margin: 5px 0; padding: 5px 0;
    background-color: #fff; box-sizing: border-box;border-radius: 4px;
    box-shadow: 0 1px 6px rgba(0,0,0,.2); position: absolute; z-index: 9000;}
</style>
<template>
    <Modal v-model="addModal" title="添加分支" :styles="{width: '90%'}" @on-cancel="cancel('formInline')">
        <Form ref="formInline" :model="formInline" :rules="ruleInline" :label-width="130">
            <FormItem prop="no" label="分支编号：">
                <Input type="text" disabled v-model="formInline.no" placeholder="请输入"></Input>
            </FormItem>
            <FormItem label="分支名称：" prop="name">
                <Input type="text" v-model="formInline.name" placeholder="请输入分支名称"></Input>
            </FormItem>
            <FormItem label="地址：" prop="address">
                <Cascader v-model="formInline.address" :data="data" change-on-select ></Cascader>
            </FormItem>
            <Input style="display:none" v-model="address" placeholder="请填写"></Input>
            <FormItem label="详细地址：" prop="addressdetail">
                <Input type="text" v-model="formInline.addressdetail" placeholder="请输入详细地址"></Input>
            </FormItem>
            <Row v-for="(item, index) in formInline.contact" :key="index">
                <Col span="9">
                    <FormItem
                        :label="'联系人 ' + (index + 1) + '：'"
                        :prop="'contact.' + index + '.name'"
                        :rules="{required: true, type: 'string', message: '联系人不能为空', trigger: 'blur'}">
                        <Input type="text" v-model="item.name" placeholder="请输入姓名"></Input>
                    </FormItem>
                </Col>
                <Col span="9">
                    <FormItem
                        :label="'联系人电话 ' + (index + 1) + '：'"
                        :prop="'contact.' + index + '.tel'"
                        :rules="{required: true, type: 'number', pattern: /^1[0-9]{10}$/, message: '手机号码格式错误', trigger: 'blur'}">
                        <Input type="text" number v-model="item.tel" placeholder="请输入手机号码"></Input>
                    </FormItem>
                </Col>
                <Col span="4" offset="1">
                    <Button type="ghost" @click="handleRemove(index)">删除此联系人信息</Button>
                </Col>
            </Row>
            <FormItem>
                <Row>
                    <Col span="9">
                        <Button type="primary" long @click="handleAdd" icon="plus-round">新增联系人信息</Button>
                    </Col>
                </Row>
            </FormItem>
            <FormItem label="提供服务范围：" prop="place_ids">
                <input id="citySel" v-if="siteSel"  value="" placeholder="请选择地点" class="zTreeInput" type="text" readonly @click="showMenu" />
                <div id="menuContent" class="menuContent" style="display:none; position: absolute;">
                	<ul id="treeSpace" class="ztree" style="margin-top:0; width:180px; height: 300px;"></ul>
                </div>
            </FormItem>
            <FormItem label="LOGO：" prop="logo">
                <p style="position: absolute; z-index: 999; top: 80px;left: 1px;height:32px; background-color: #F5F7F9; width: 128px; text-align: center; font-size: 14px; color: #657180;">点此上传LOGO</p>
                <uploadImg v-if="showLogo" v-model="formInline.logo" @handleUp="handleUpSuccess" @handleRemove="handleUpRemove"></uploadImg>
            </FormItem>
            <FormItem label="备注：" prop="intro">
                <Input v-model="formInline.intro" type="textarea" :autosize="{minRows: 2,maxRows: 10}" placeholder="请填写备注"></Input>
            </FormItem>
            <FormItem class="formbtns">
                <Button type="ghost" @click="cancelSubmit('formInline')">取&emsp;消</Button>
                <Button type="primary" @click="handleSubmit('formInline')" :disabled="confirmDis">确&emsp;定</Button>
            </FormItem>
        </Form>
        <span slot="footer"></span>
    </Modal>
</template>
<script>
    import $ from 'jquery'
    import SpaceHttp from 'server/http/space'
    import SupplierManageHttp from 'server/http/supplierManage'
    import uploadImg from '@/components/uploadImg.vue'
    require('static/css/uploadimg.css')
    require('static/css/modal.css')
    import { URL } from '@/config/index'
    import area from 'static/js/area'
    require('static/css/modal.css')
    import ztree from '@/mixins/ztree'
    require('static/plugin/ztree/css/metroStyle/metroStyle.css')
    require('static/plugin/ztree/js/jquery.ztree.core.js')
    require('static/plugin/ztree/js/jquery.ztree.excheck.js')
    require('static/css/tree.css')
    export default {
        components: {
            uploadImg
        },
        created () {
            this.getDataTime()
            this.list()
        },
        mixins: [ ztree ],
        computed: {
            address: {
                get: function () {
                    return this.formInline.address.join('/')
                },
                set: function (array) {
                    this.addressArray = array.split('/')
                }
            }
        },
        data () {
            const validateName = (rule, value, callback) => {
                if (value.replace(/\s+/g, '') == '') {
                    callback(new Error('请输入分支名称'))
                } else {
                    SupplierManageHttp.CheckBranchName({name: value}).then((data) => {
                        if (data == 0) {
                            callback()
                        } else {
                            callback(new Error('你输入的分支名称已存在,请重新输入！'))
                        }
                    })
                }
            }
            return {
                siteSel: false,
                addModal: false,
                confirmDis: false,
                showLogo: false,
                fileurl: '',
                arraySite: [],
                coopList: [],
                contractList: [],
                data: area,
                formInline: {
                    supplier_id: '',
                    no: '',
                    name: '',
                    address: [],
                    addressdetail: '',
                    contact: [
                        {
                            name: '',
                            tel: ''
                        }
                    ],
                    place_ids: [],
                    logo: '',
                    intro: ''
                },
                ruleInline: {
                    name: [
                        { required: true, validator: validateName, trigger: 'blur' },
                        { type: 'string', max: 30, message: '分支机构名称不能超过30个字符', trigger: 'blur' }
                    ],
                    address: [
                        { required: true, type: 'array', message: '请选择地点', trigger: 'change' }
                    ],
                    addressdetail: [
                        { required: true, message: '请添加详细地址', trigger: 'change' }
                    ],
                    place_ids: [
                        { required: true, type: 'array', message: '请选择服务范围', trigger: 'change' }
                    ],
                    logo: [
                        { required: true, message: '请上传LOGO', trigger: 'blur' }
                    ],
                    intro: [
                        { required: false, type: 'string', max: 255, message: '最多只能输入255个字符', trigger: 'blur' }
                    ]
                },
                setting: {
                    check: {
                        enable: true,
                        chkboxType: {'Y': 'ps', 'N': 'ps'}
                    },
                    view: {
                        dblClickExpand: false
                    },
                    data: {
                        simpleData: {
                            enable: true
                        }
                    },
                    callback: {
                        beforeClick: this.beforeClick,
                        onCheck: this.onCheck
                    }
                }
            }
        },
        methods: {
            open () {
                this.showLogo = true
                this.addModal = true
                this.fileurl = ''
                this.formInline.logo = ''
                this.siteSel = true
            },
            list () {
                SpaceHttp.allSpace().then((data) => {
                    this.ztreeObj = $.fn.zTree.init($('#treeSpace'), this.setting, data)
                })
            },
            // 自动生成分支编号
            getDataTime () {
                let number = ''
                for (var i = 0; i < 4; i++) {
                    number += Math.floor(Math.random() * 10)
                }
                let dataTime = 'EWFLF' + (new Date()).valueOf().toString().substr(0, 12) + number
                this.formInline.no = dataTime
            },
            // 联系人
            handleAdd () {
                this.index++
                this.formInline.contact.push({
                    name: '',
                    tel: ''
                })
            },
            handleRemove (index) {
                if (this.formInline.contact.length != 1) {
                    this.formInline.contact.splice(index, 1)
                } else {
                    this.$Message.error('最少添加一条联系人信息!')
                }
            },
            // 上传logo
            handleUpRemove () {
                this.fileurl = ''
                this.formInline.logo = ''
            },
            handleUpSuccess (url) {
                this.fileurl = url
                this.formInline.logo = url
            },
            // 提交
            handleSubmit (name) {
                // 地点赋值
                let checkedNodes = this.ztreeObj.getNodesByParam('checked', true)
                this.formInline.place_ids = []
                for (let node of checkedNodes) {
                    // 当前节点是否半选
                    let halfchecked = this.isHalfChecked(node)
                    // 父节点是否半选
                    let pNode = node.getParentNode()
                    let pHalfchecked = pNode ? this.isHalfChecked(pNode) : true

                    if (!halfchecked && pHalfchecked) {
                        this.formInline.place_ids.push(node.id)
                    }
                }
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        if (this.fileurl) {
                            this.formInline.logo = URL.replace(/api/, '') + 'uploads' + this.fileurl
                        }
                        this.confirmDis = true
                        let v = this.formInline
                        SupplierManageHttp.addBranchList({supplier_id: this.$route.params.id, no: v.no, name: v.name, address: v.address.toString(), addressdetail: v.addressdetail, contact: JSON.stringify(v.contact), place_ids: v.place_ids, logo: v.logo, intro: v.intro}).then((res) => {
                            this.confirmDis = false
                            this.addModal = false
                            this.$Message.success('提交成功!')
                            this.$parent.refresh()
                            this.$parent.tableTitle()
                            this.$parent.$parent.getSupplierInfo()
                            this.cancel(name)
                        }).catch((error) => {
                            this.confirmDis = false
                            this.$Message.error(error)
                        })
                    } else {
                        // this.$Message.error('表单验证失败!')
                        this.confirmDis = false
                    }
                })
            },
            cancelSubmit (formInline) {
                this.$refs['formInline'].resetFields()
                this.addModal = false
                this.siteSel = false
                this.showLogo = false
            },
            // 模态框关闭
            cancel (formInline) {
                this.$refs[formInline].resetFields()
                this.showLogo = false
                this.siteSel = false
            },
            // ztree
            beforeClick (treeId, treeNode) {
                var zTree = $.fn.zTree.getZTreeObj('treeSpace')
                zTree.checkNode(treeNode, !treeNode.checked, null, true)
                return false
            },
            onCheck (e, treeId, treeNode) {
                var zTree = $.fn.zTree.getZTreeObj('treeSpace')
                let nodes = zTree.getCheckedNodes(true)
                let v = ''
                for (var i = 0, l = nodes.length; i < l; i++) {
                    v += nodes[i].name + ','
                }
                if (v.length > 0) v = v.substring(0, v.length - 1)
                var cityObj = $('#citySel')
                cityObj.attr('value', v)
            },
            showMenu () {
                $('#menuContent').css({left: 0 + 'px', top: 32 + 'px'}).slideDown('fast')
                $('#citySel').on('click', function (e) {
                    if ($('#menuContent').is(':hidden')) {
                        $('#menuContent').show()
                    } else {
                        $('#menuContent').hide()
                    }
                    $(document).on('click', function () {
                        $('#menuContent').hide()
                    })
                    e.stopPropagation()
                })
                $('#menuContent').on('click', function (e) {
                    e.stopPropagation()
                })
            }
        }
    }
</script>
