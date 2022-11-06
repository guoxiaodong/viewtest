<style>
    .zTreeInput { width: 100%; border-radius: 4px; min-height: 32px; border: 1px solid #dddee1; color: #495060; padding-left:7px; }
    #menuContent { width: 100%; max-height: 200px; overflow: auto; margin: 5px 0; padding: 5px 0;
    background-color: #fff; box-sizing: border-box;border-radius: 4px;
    box-shadow: 0 1px 6px rgba(0,0,0,.2); position: absolute; z-index: 900;}
    .formInfo .ivu-date-picker .ivu-select-dropdown { position: fixed !important; }
</style>
<template>
    <Modal v-model="addModal" title="添加合同" :styles="{width: '90%'}" @on-cancel="cancel('formInline')">
        <Form class="formInfo" ref="formInline" :model="formInline" :rules="ruleInline" :label-width="100">
            <FormItem prop="no" label="合同编号：">
                <Input type="text" disabled v-model="formInline.no" placeholder="请输入"></Input>
            </FormItem>
            <FormItem label="合同名称：" prop="name">
                <Input type="text" v-model="formInline.name" placeholder="请输入合同名称"></Input>
            </FormItem>
            <FormItem prop="signdate" label="签订日期：">
                <DatePicker @on-change="getSignDate" v-model="formInline.signdate" style="width: 100%" type="date" placeholder="请选择签订合同的日期"></DatePicker>
            </FormItem>
            <FormItem prop="effecttime" label="生效日期：">
                <DatePicker @on-change="getStartDate" style="width: 100%" type="date" placeholder="请选择签订合同的生效日期" v-model="formInline.effecttime"></DatePicker>
            </FormItem>
            <FormItem prop="invalidtime" label="失效日期：">
                <DatePicker @on-change="getEndDate" style="width: 100%" type="date" placeholder="请选择签订合同的失效日期" v-model="formInline.invalidtime"></DatePicker>
            </FormItem>
            <FormItem label="适用地点：" prop="sites">
                <input id="citySel" v-if="siteSel"  value="" placeholder="请选择地点" class="zTreeInput" type="text" readonly @click="showMenu" />
                <div id="menuContent" class="menuContent" style="display:none; position: absolute;">
                	<ul id="treeSpace" class="ztree" style="margin-top:0; width:180px; height: 300px;"></ul>
                </div>
            </FormItem>
            <FormItem label="附件上传：">
                <uploadAttachments v-model="formInline.attachments" @handleUp="handleUpSuccess"></uploadAttachments>
            </FormItem>
            <FormItem label="备注：" prop="note">
                <Input v-model="formInline.note" type="textarea" :autosize="{minRows: 2,maxRows: 10}" placeholder="请填写备注"></Input>
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
    import { URL } from '@/config/index'
    import SpaceHttp from 'server/http/space'
    import SupplierManageHttp from 'server/http/supplierManage'
    import uploadAttachments from '@/components/uploadAttachments.vue'
    require('static/css/modal.css')
    import ztree from '@/mixins/ztree'
    require('static/plugin/ztree/css/metroStyle/metroStyle.css')
    require('static/plugin/ztree/js/jquery.ztree.core.js')
    require('static/plugin/ztree/js/jquery.ztree.excheck.js')
    require('static/css/tree.css')
    export default {
        components: {
            uploadAttachments
        },
        created () {
            this.getDataTime()
            this.list()
        },
        mixins: [ ztree ],
        data () {
            const validateName = (rule, value, callback) => {
                if (value.replace(/\s+/g, '') == '') {
                    callback(new Error('请输入合同名称！'))
                } else {
                    SupplierManageHttp.ContractNameExsits({name: value}).then((data) => {
                        if (data == 0) {
                            callback()
                        } else {
                            callback(new Error('你输入的合同名称已存在,请重新输入！'))
                        }
                    })
                }
            }
            return {
                siteSel: false,
                addModal: false,
                confirmDis: false,
                ztreeObj: '',
                fileurl: '',
                signTime: '',
                startTime: '',
                endTime: '',
                formInline: {
                    supplier_id: '',
                    no: '',
                    name: '',
                    signdate: '',
                    effecttime: '',
                    invalidtime: '',
                    sites: [],
                    attachments: '',
                    note: ''
                },
                ruleInline: {
                    name: [
                        { required: true, validator: validateName, trigger: 'blur' }
                    ],
                    signdate: [
                        { required: true, type: 'date', message: '请选择签订日期！', trigger: 'change' }
                    ],
                    effecttime: [
                        { required: true, type: 'date', message: '请选择生效日期', trigger: 'change' }
                    ],
                    invalidtime: [
                        { required: true, type: 'date', message: '请选择失效日期', trigger: 'change' }
                    ],
                    sites: [
                        { required: true, type: 'array', message: '请选择地点', trigger: 'change' }
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
                this.addModal = true
                this.siteSel = true
            },
            list () {
                SpaceHttp.allSpace().then((data) => {
                    this.ztreeObj = $.fn.zTree.init($('#treeSpace'), this.setting, data)
                })
            },
            // 自动生成合同编号
            getDataTime () {
                let number = ''
                for (var i = 0; i < 2; i++) {
                    number += Math.floor(Math.random() * 10)
                }
                let dataTime = 'EPC' + (new Date()).valueOf().toString().substr(0, 12) + number
                this.formInline.no = dataTime
            },
            // 时间格式
            getSignDate (value) {
                this.signTime = value
            },
            getStartDate (value) {
                this.startTime = value
            },
            getEndDate (value) {
                this.endTime = value
            },
            // 附件格式验证
            handleFormatError (file) {
                this.$Notice.warning({
                    title: '你上传附件的格式不正确',
                    desc: '上传的附件 ' + file.name + ' 格式是不正确的, 请上传.pdf,.doc,.docx文件.'
                })
            },
            handleUpSuccess (url) {
                this.formInline.attachments += URL.replace(/api/, '') + 'uploads' + url + ','
            },
            // 提交
            handleSubmit (name) {
                // 供应商id赋值
                this.formInline.supplier_id = this.$route.params.id
                // 地点赋值
                // for (let v of this.ztreeObj.getCheckedNodes(true)) {
                //     this.formInline.sites.push(v.id)
                // }
                let checkedNodes = this.ztreeObj.getNodesByParam('checked', true)
                this.formInline.sites = []
                for (let node of checkedNodes) {
                    // 当前节点是否半选
                    let halfchecked = this.isHalfChecked(node)
                    // 父节点是否半选
                    let pNode = node.getParentNode()
                    let pHalfchecked = pNode ? this.isHalfChecked(pNode) : true

                    if (!halfchecked && pHalfchecked) {
                        this.formInline.sites.push(node.id)
                    }
                }
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        // 时间赋值
                        this.formInline.signdate = new Date(this.signTime)
                        this.formInline.effecttime = new Date(this.startTime)
                        this.formInline.invalidtime = new Date(this.endTime)
                        if (this.formInline.effecttime > this.formInline.invalidtime) {
                            this.$Message.error('生效日期不能大于失效日期！')
                        } else {
                            this.confirmDis = true
                            SupplierManageHttp.addContract(this.formInline).then((res) => {
                                this.confirmDis = false
                                this.addModal = false
                                this.$Message.success('提交成功!')
                                this.$parent.refresh()
                                this.$parent.$parent.contractNum()
                                this.$parent.tableTitle()
                                this.cancel(name)
                            }).catch((error) => {
                                this.confirmDis = false
                                this.$Message.error(error)
                            })
                        }
                    } else {
                        // this.$Message.error('表单验证失败!')
                        this.confirmDis = false
                    }
                })
            },
            cancelSubmit (formInline) {
                this.$refs['formInline'].resetFields()
                this.ztreeObj.checkAllNodes(false)
                this.siteSel = false
                this.addModal = false
            },
            // 模态框关闭
            cancel (formInline) {
                this.$refs[formInline].resetFields()
                this.ztreeObj.checkAllNodes(false)
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
