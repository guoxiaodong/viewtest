<style>
 .modalcontent .ztree li a:hover {
     text-decoration: none;
 }
.modalcontent .subject{
    margin-left: 25px;
    border-left:2px solid black;
    padding-left: 9px;
}
 .modalcontent p.subtitle span{
     margin-right: 3px;
 }
 .account-set-header{margin: 0; padding: 0 40px;}
 /* .taglist{margin-left: 20px;} */
 #account_title{font-size: 22px; color: #657180;margin-bottom: 10px; }
 .account_subtitle{font-size: 14px; color: #9EA7B4; padding-bottom: 10px; border-bottom: 1px dashed  #D7DDE4; margin-bottom: 10px;}
 .account_subtitle span, .account_subtitle a{margin-right: 5px;}
 .account_detail{ font-size: 14px; color: #657180; margin-top: 20px; }
 .account_detail p{ margin: 4px 0;}
 .search-top{width: 99%; text-align: center}
</style>

<template>
    <div>
        <div class="innerheader account-set-header">
            科目设置
        </div>
        <div class="modalcontent" style="border: none;">
            <Row>
                <Col span="8" style="border-right: 1px solid #CAD3DF;">
                <div class="treesear" style="border-bottom: none;">
                    <Input v-model="search" placeholder="请输入搜索内容"></Input> <!--class="search-top"-->
                </div>
                <div style="overflow: auto;">
                    <div class="item">
                        <div id='subjects' class='ztree' ></div>
                    </div>
                    <div style="text-align: center; margin-bottom: 30px;">
                        <Button @click="addGroup()" type="primary"> + 添加科目组</Button>
                    </div>
                </div>
                </Col>
                <Col span="16">
                <div class="taglist" style="padding-right: 0;">
                    <div v-show="rightShow">
                        <p id="account_title">{{!preview.name?'':preview.name}}<Button type="primary" @click="editClick()" style="float: right">编辑</Button></p>
                        <p class="account_subtitle">
                            <span v-show="this.preview.fid != 0">服务项数：{{preview.services?preview.services.length:''}}</span>
                            <!--<Icon type="clock"></Icon><span>时间：{{preview.udpated_at}}</span>-->
                            <span>时间：{{preview.updated_at?preview.updated_at:'暂无'}}</span>
                            <!--<a style="float: right"><Icon type="compose" @click="editClick()" ></Icon>编辑</a>-->
                        </p>
                        <div class="account_detail">
                            <p>科目{{!this.preview.fid?'组':''}}编号：<span>{{preview.no}}</span></p>
                            <p>科目{{!this.preview.fid?'组':''}}名称：<span>{{preview.name}}</span></p>
                            <p v-show="!!preview.parent">所属分组：<span>{{preview.parent?preview.parent.name:''}}</span></p>
                            <p style="margin: 10px 0 20px;">{{preview.intro?preview.intro:'暂无简介'}}</p>
                        </div>
                        <!--服务项-->
                        <div v-show="this.preview.fid != 0" class="datatable" style="padding: 0;">
                            <span>包含服务列表</span>
                            <!--Table标签设置height后，数据为0条时，会影响表头-->
                            <Table  :columns="serCol" :data="serData.length>0?serData:tempDTData" height="300"></Table>
                        </div>
                    </div>
                </div>
                </Col>
            </Row>
        </div>
        <!--<Button @click="addSubject()"ref="addSubject">  + 添加科目</Button>-->
        <addGroup ref="addGroup" @refreshtree="refreshtree"></addGroup>
        <addSubject ref="addSubject" @refreshtree="refreshtree" @cancleCallback="cancleCallback"></addSubject>
        <delSubject ref="delSubject" @refreshtree="refreshtree"></delSubject>
    </div>
</template>

<script>
    import $ from 'jquery'
    import ztreeSearch from '@/mixins/ztreeSearch'
    import ztree from '@/mixins/ztree'
    import addGroup from './components/subgroup'
    import addSubject from './components/subject'
    import delSubject from './components/del'
    import _ from 'lodash'
    // import BudgetHttp from 'server/http/budget'
    import FinanceHttp from 'server/http/finance'
    import dataTable from '@/components/dataTable.vue'
    require('static/plugin/ztree/css/metroStyle/metroStyle.css')
    require('static/css/tree.css')
    require('static/css/datatable.css')
    require('static/plugin/ztree/js/jquery.ztree.all.min.js')
    require('static/plugin/ztree/js/jquery.ztree.exhide.min.js')
    export default {
        mixins: [ztreeSearch, ztree],
        components: {
            addGroup, addSubject, dataTable, delSubject
        },
        created () {
            this.$emit('updateActive', '5-2')
        },
        data () {
            return {
                tempDTData: [
                    {
                        id: '暂无',
                        name: '暂无',
                        status: '暂无'
                    }
                ],
                search: '',
                rightShow: false,
                treeData: [],
                ztreeObj: '',
                selTreeNode: null,
                preview: {
                    id: '',
                    no: '',
                    name: '',
                    number: '',
                    fid: '',
                    intro: '',
                    updated_at: ''
                },
                setting: {
                    treeId: 'fun',
                    data: {
                        simpleData: {
                            enable: true,
                            pIdKey: 'fid',
                            idKey: 'id',
                            rootPId: null
                        }
                    },
                    check: {
                        chkboxwType: 'checkbox'
                    },
                    callback: {
                        onClick: this.nodeClick
                    },
                    view: {
                        selectedMulti: false,
                        addHoverDom: this.addHoverDom,
                        removeHoverDom: this.removeHoverDom
                    }
                },
                serCol: [
                    {
                        title: '服务名称',
                        key: 'name'
                    },
                    {
                        title: '状态',
                        key: 'status'
                    }
                ],
                serData: []
            }
        },
        mounted () {
            this.getList()
        },
        methods: {
            getList () { // 获取科目（组）数据
                FinanceHttp.getAll().then((data) => {
                    this.treeData = data
                    this.ztreeObj = $.fn.zTree.init($('#subjects'), this.setting, data)
                    var firstNode = this.ztreeObj.getNodes()[0]
                    if (firstNode) {
                        this.ztreeObj.selectNode(firstNode)
                        this.nodeClick(null, 'fun', firstNode)
                    }
                })
                    .catch(error => {
                        this.$Message.error(error ? (error.error || error) : '发生错误，请检查与服务器的网络连接！')
                    })
            },
            // 添加科目组
            addGroup () {
                this.$refs.addGroup.open()
            },
            nodeClick (event, treeId, treeNode) {
                this.rightShow = true
                this.serData = []
                this.selTreeNode = treeNode
                FinanceHttp.getFinanceDetail(treeNode.id).then((data) => {
                    this.preview = data
                    if (data.fid) {
                        this.makeServiceList(this.preview.services)
                    }
                })
                    .catch(error => {
                        this.$Message.error(error ? (error.error || error) : '发生错误，请检查与服务器的网络连接！')
                    })
                // todo url的值，显示服务项表格，带页码
                // var url = ''
                // this.$refs.datatable.refresh(url)
            },
            makeServiceList (data) {
                if (!data || data.constructor.name != 'Array') {
                    return
                }
//                this.serCol = [
//                    {
//                        title: '服务名称',
//                        key: 'name'
//                    },
//                    {
//                        title: '状态',
//                        key: 'status'
//                    }/* ,
//                    {
//                        title: '操作',
//                        key: 'op',
//                        render: (h, params) => {
//                            return h('div', [
//                                h('a', {
//                                    on: {
//                                        click: () => {
//                                            this.$Message.info(params.row.name)
//                                        }
//                                    }
//                                }, '查看')
//                            ])
//                        }
//                    } */
//                ]
                data.forEach(item => {
                    this.serData.push({
                        id: item.id,
                        name: item.title,
                        status: item.status_name
                    })
                })
            },
            editClick () {
                if (!this.preview.fid) {
                    this.$refs.addGroup.open(_.cloneDeep(this.preview))
                } else {
                    var pList = this.treeData.filter(item => {
                        return item.fid == 0
                    })
                    this.$refs.addSubject.open(_.cloneDeep(this.preview), pList)
                }
            },
            refreshtree () {
                FinanceHttp.getAll().then((data) => {
                    this.treeData = data
                    this.ztreeObj = $.fn.zTree.init($('#subjects'), this.setting, data)
                    if (this.selTreeNode) {
                        console.log('refreshtree:')
                        this.ztreeObj.selectNode(this.selTreeNode)
                        this.nodeClick(null, 'fun', this.selTreeNode)
                    }
                })
            },
            addHoverDom (treeId, treeNode) {
                let obj = $('#' + treeNode.tId + '_a')
                if ($('#editBtn_' + treeNode.id).length > 0) {
                    return
                }
                let editStr = '<a class="diyBtnEdit" id="editBtn_' + treeNode.id + '" data-id="' + treeNode.id + '" title="编辑">编辑</a>'
                obj.append(editStr)
                let btn = $('#editBtn_' + treeNode.id)
                if (btn) {
                    btn.bind('click', (event) => {
                        FinanceHttp.getFinanceDetail(treeNode.id).then((data) => {
                            if (!treeNode.fid) {
                                this.$refs.addGroup.open(data)
                            } else {
                                var pList = this.treeData.filter(item => {
                                    return item.fid == 0
                                })
                                this.$refs.addSubject.open(data, pList)
                            }
                        })
                            .catch(error => {
                                this.$Message.error(error ? (error.error || error) : '发生错误，请检查与服务器的网络连接！')
                            })

                        this.stopBubble(event)
                    })
                }
                // 科目组
                if (!treeNode.fid) {
                    if ($('#diyBtn_' + treeNode.id).length > 0) {
                        return
                    }
                    let addStr = '<a class="diyBtnAdd" id="diyBtn_' + treeNode.id + '" data-id="' + treeNode.id + '"  title="新增">新增</a>'
                    obj.append(addStr)
                    let btn = $('#diyBtn_' + treeNode.id) // diyBtnEdit
                    if (btn) {
                        btn.bind('click', (event) => {
                            var pList = this.treeData.filter(item => {
                                return item.fid == 0
                            })
                            this.$refs.addSubject.open({fid: treeNode.id}, pList)
                            this.stopBubble(event)
                        })
                    }
                }

                // 删除
                if (!treeNode.children || treeNode.children.length == 0) {
                    if ($('#delBtn_' + treeNode.id).length > 0) {
                        return
                    }
                    let delStr = '<a class="diyBtnDel" id="delBtn_' + treeNode.id + '" data-id="' + treeNode.id + '" title="删除">删除</a>'
                    obj.append(delStr)
                    let btn = $('#delBtn_' + treeNode.id)
                    if (btn) {
                        btn.bind('click', (event) => {
                            this.$refs.delSubject.open(treeNode.id)
                            this.stopBubble(event)
                        })
                    }
                }
            },
            removeHoverDom (treeId, treeNode) {
                $('#diyBtn_' + treeNode.id).unbind().remove()
                $('#editBtn_' + treeNode.id).unbind().remove()
                $('#delBtn_' + treeNode.id).unbind().remove()
            },
            // 阻止时间冒泡，不一定用
            stopBubble (e) {
                if (e && e.stopPropagation) { // 非IE
                    e.stopPropagation()
                } else { // IE
                    window.event.cancelBubble = true
                }
            },
            cancleCallback () {
            }
        },
        watch: {
            search (v) {
                this.ztreeSearch(this.ztreeObj, this.treeData, v)
            }
        }
    }
</script>
