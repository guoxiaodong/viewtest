<template>
    <div>
        <div class="innerheader">
            权限管理
        </div>
        <div class="innerbtns">
            <Button type="ghost" @click="delbatch()">批量删除</Button>
        </div>
        <div class="innercontent">
            <Row class="inneritem">
                <Col span="12">
                    <div class="inneritem-head">权限列表：</div>
                    <div id='permissions' class='ztree' style="overflow: auto;"></div>
                </Col>
                <Col span="12">
                    <div class="inneritem-head">权限详情：</div>
                    <rightForm ref='rightFrom' :form-inline='formInline'></rightForm>
                    <Form>
                        <FormItem class="fixbtn">
                            <Button type="primary" @click="submit()">提交</Button>
                        </FormItem>
                    </Form>
                </Col>
            </Row>
        </div>
        <!--新增-->
        <addrights  ref="modal"></addrights>

        <!--批量删除-->
        <deleteFunc ref="deleteMany" ></deleteFunc>
    </div>
</template>
<script>
    import $ from 'jquery'
    import PermissionHttp from 'server/http/permission'
    import ztree from '@/mixins/ztree'
    require('static/plugin/ztree/css/metroStyle/metroStyle.css')
    require('static/plugin/ztree/js/jquery.ztree.all.min.js')
    require('static/plugin/ztree/js/jquery.ztree.exhide.min.js')

    import resize from '@/mixins/resize'
    import addrights from './components/addrights'
    import deleteFunc from './components/delete'
    require('static/css/tree.css')
    require('static/css/modal.css')

    import rightForm from './components/rightForm'

    export default {
        components: {
            addrights, rightForm, deleteFunc
        },
        mixins: [ resize, ztree ],
        created () {
            this.$emit('updateActive', '1-3')
        },
        data () {
            return {
                addrights: false,
                formInline: {},
                ztreeObj: '',
                checkedData: [],
                setting: {
                    treeId: 'func',
                    data: {
                        simpleData: {
                            enable: true,
                            pIdKey: 'pid'
                        }
                    },
                    check: {
                        enable: true,
                        chkboxType: { 'Y': 's', 'N': 'ps' },
                        chkboxwType: 'checkbox'
                    },
                    edit: {
                        drag: {
                            isCopy: false,
                            isMove: true,
                            prev: false,
                            next: false
                        },
                        enable: true,
                        showRenameBtn: false,
                        showRemoveBtn: false
                    },
                    callback: {
                        onCheck: this.onCheck,
                        onClick: this.zTreeOnClick,
                        onCollapse: (event, treeId, treeNode) => {
                            this.zTreeOnCollapse(this.ztreeObj, treeNode)
                        },
                        beforeDrop: this.zTreeOnDrop
                    },
                    view: {
                        selectedMulti: false,
                        addHoverDom: this.addHoverDom,
                        removeHoverDom: this.removeHoverDom
                    }
                }
            }
        },
        mounted () {
            PermissionHttp.getAll().then((data) => {
                data = [{id: 0, name: '全部'}, ...data]
                this.ztreeObj = $.fn.zTree.init($('#permissions'), this.setting, data)

                this.ztreeObj.expandNode(this.ztreeObj.getNodeByParam('id', 0))

                // 默认的权限详情
                let node = this.ztreeObj.getNodeByParam('id', data[1].id)
                $('a#' + node.tId + '_a').click()
            })
            document.getElementById('permissions').style.height = (document.body.clientHeight - 320) + 'px'
        },
        methods: {
            /**
             * 新增
             * @param object node 父节点
             */
            add (node) {
                this.$refs.modal.open(node)
            },
            submit () {
                this.$refs.rightFrom.submit().then((res) => {
                    let node = this.ztreeObj.getNodeByParam('id', res.id)
                    node.name = res.name
                    node.identify = res.identify
                    this.ztreeObj.updateNode(node)
                })
            },
            delbatch () {
                let ids = this.checkedData.join(',')
                if (this.checkedData.length != 0) {
                    this.$refs.deleteMany.init(ids)
                } else {
                    this.$Message.error('请选择需要删除的权限')
                }
            },
            delCheckedNodes () {
                for (let id of this.checkedData) {
                    let node = this.ztreeObj.getNodeByParam('id', id)
                    this.ztreeObj.removeNode(node)
                }
                this.checkedData = []
            },
            zTreeOnClick (event, treeId, treeNode) {
                if (treeNode.id == 0) {
                    return
                }
                this.formInline = {
                    id: treeNode.id,
                    name: treeNode.name,
                    identify: treeNode.identify,
                    pid: treeNode.pid,
                    pname: this.getFullParentNodeName(treeNode)
                }
            },
            zTreeOnDrop (treeId, treeNodes, targetNode, moveType) {
                if (moveType == 'inner' && targetNode != null) {
                    PermissionHttp.put({id: treeNodes[0].id, pid: targetNode.id})
                } else {
                    return false
                }
            },
            addNode (res) {
                let pNode = this.ztreeObj.getNodeByParam('id', res.pid)
                let newNode = {
                    id: res.id,
                    name: res.name,
                    pid: res.pid,
                    identify: res.identify
                }
                this.ztreeObj.addNodes(pNode, newNode)

                let node = this.ztreeObj.getNodeByParam('id', res.id)
                $('a#' + node.tId + '_a').click()
            },
            addHoverDom (treeId, treeNode) {
                let aObj = $('#' + treeNode.tId + '_a')
                if ($('#diyBtn_' + treeNode.id).length > 0) {
                    return
                }
                let editStr = '<a class="diyBtnAdd" id="diyBtn_' + treeNode.id + '" data-id="' + treeNode.id + '">新增</a>'
                aObj.append(editStr)
                let btn = $('#diyBtn_' + treeNode.id)
                if (btn) {
                    btn.bind('click', () => {
                        this.add(treeNode)
                    })
                }
            },
            onCheck (event, treeId, treeNode) {
                let checkedNodes = this.ztreeObj.getCheckedNodes(true)
                this.checkedData = []
                for (let node of checkedNodes) {
                    // 当前节点是否半选
                    let halfchecked = this.isHalfChecked(node)

                    if (!halfchecked) {
                        this.checkedData.push(node.id)
                    }
                }
                // console.log(this.checkedData)
            },
            removeHoverDom (treeId, treeNode) {
                $('#diyBtn_' + treeNode.id).unbind().remove()
            },
            onResize () {
                document.getElementById('permissions').style.height = (document.body.clientHeight - 320) + 'px'
            }
        }
    }
</script>
