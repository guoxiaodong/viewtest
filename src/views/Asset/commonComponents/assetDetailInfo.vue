<style scoped>
    .ivu-form-item{
        margin-bottom: 0;
    }
    me-def{

    }
</style>
<template>
    <Modal class="formModal" v-model="showModal" :styles="{width: '50%'}" :title="modalTitle" @on-ok="ok" @on-cancel="cancel()"><!--:rules="ruleInline"-->
        <!--<Form ref="formModal" :model="formModal"  label-position="left" :label-width="120">
            <Row>
                <Col span="12">
                <FormItem label="资产目录：" prop="">
                    <Cascader :data="assetDirList" v-model="formModal.assetDir" trigger="hover" change-on-select filterable @on-change="assetDirChange"></Cascader>
                </FormItem>
                </Col>
                <Col span="12">

                </Col>
            </Row>
            <Row>
                <Col span="12">
                <FormItem v-show="!!checkShow(9)" label="数量：" prop="">&lt;!&ndash;v-model=""&ndash;&gt;
                    <Input-number v-model="(testFun(10)).value" type="text" placeholder="请输入" style="width: 100%;"></Input-number>
                </FormItem>
                </Col>
                <Col span='12'>
                <FormItem v-show="!!checkShow(10)" label="规格型号：" prop="">
                    <Input v-model="testFun(10).value" placeholder="请输入"></Input>
                </FormItem>
                </Col>
            </Row>
            <Row>
                <Col span='12'>
                <FormItem v-show="!!checkShow(3)" label="存放地点：" prop="">
                    <Cascader :data="addressList" v-model="formModal.location" trigger="hover" change-on-select filterable></Cascader>
                </FormItem>
                </Col>
                <Col span='12'>
                <FormItem v-show="checkShow(11)" label="购入日期：" prop="">
                    <DatePicker type="date" placeholder="选择日期"  v-model="formModal.entry_at" style="width: 100%;"></DatePicker>
                </FormItem>
                </Col>
            </Row>
            <Row>
                <Col span='12'>
                <FormItem v-show="checkShow(12)" label="供应商：" prop="area" >
                    <Input v-model="formModal.supplier" placeholder="请输入"></Input>
                </FormItem>
                </Col>
                <Col span='12'>
                <FormItem v-show="checkShow(13)" label="开始使用日期：" prop="entry_at">&lt;!&ndash;:options="options"&ndash;&gt;
                    <DatePicker type="date" placeholder="选择日期"  v-model="formModal.startdate" style="width: 100%;"></DatePicker>
                </FormItem>
                </Col>
            </Row>
            <Row>
                <Col span='12'>
                <FormItem v-show="checkShow(14)" label="使用人：">
                    <Input v-model="formModal.name" placeholder="请输入"></Input>
                </FormItem>
                </Col>
                <Col span='12'>
                <FormItem  v-show="checkShow(15)" label="使用部门：" prop="entry_at">
                    <Input v-model="formModal.name" placeholder="请输入"></Input>
                    &lt;!&ndash;<DatePicker type="date" placeholder="选择日期" :options="options" v-model="formModal.entry_at" style="width: 100%;"></DatePicker>&ndash;&gt;
                </FormItem>
                </Col>
            </Row>
            <Row>
                <Col span='12'>
                <FormItem  v-show="checkShow(16)" label="购入价格：">
                    <Input-number type="text" placeholder="请输入" style="width: 80%;"></Input-number>
                    <Select placeholder="请选择" style="width: 20%;float: right">
                        <Option key="1" :value="1">元</Option>
                        <Option key="2" :value="2">万元</Option>
                    </Select>
                </FormItem>
                </Col>
                <Col span='12'>
                <FormItem v-show="checkShow(18)" label="预计使用年限：" prop="entry_at">
                    <Input-number type="text" placeholder="请输入" style="width: 100%;"></Input-number>
                </FormItem>
                </Col>
            </Row>
            <Row>
                <Col span='12'>
                <FormItem v-show="checkShow(19)" label="单价：">
                    <Input-number type="text" placeholder="请输入" style="width: 100%;"></Input-number>
                </FormItem>
                </Col>
                <Col span='12'>
                <FormItem v-show="checkShow(1)" label="使用状况：">
                    <Select v-model="formModal.sex" placeholder="请选择">
                        &lt;!&ndash;<Option v-for="(v, k) in sexList" :key="v.id" :value="v.id">{{v.name}}</Option>&ndash;&gt;
                    </Select>
                </FormItem>
                </Col>
            </Row>
            <Row>
                <Col span='24'>
                <FormItem v-show="checkShow(7)" label="上传图片：">
                    <uploadImg v-model="formModal.avatar" @handleUp="handleUpImgSuccess" @handleRemove="handleUpRemove"></uploadImg>
                </FormItem>
                </Col>
            </Row>
            <Row>
                <Col span='24'>
                <FormItem v-show="checkShow(8)" label="资产描述：">
                    <Input v-model="formModal.des" type="textarea" :rows="2" placeholder="请输入"></Input>
                </FormItem>
                </Col>
            </Row>
            <Row>
                <Col span='24'>
                <FormItem label="备注：">
                    <Input v-model="formModal.note" type="textarea" :rows="2" placeholder="请输入"></Input>
                </FormItem>
                </Col>
            </Row>
            <Row>
                <Col span='24'>
                <FormItem label="上传附件：">
                    <uploadAttachments v-model="formModal.attachments" @handleUp="handleUpFileSuccess"></uploadAttachments>
                </FormItem>
                </Col>
            </Row>
            <Row>
                <Col span='24'>
                <FormItem label="资产标识码：">
                    <img src="static/images/scan.png" style="width: 37px;height: 35px;"/>
                </FormItem>
                </Col>
            </Row>
            <Row>
                <Col span='24'>
                <FormItem>
                    <div class="flex">
                        <div class="flex-1" style="text-align: right">资产编号：</div>
                        <div class="flex-3">
                            <Input v-model="formModal.note" placeholder="请输入"></Input>
                        </div>
                        <div class="flex-1" style="text-align: right">旧编号：</div>
                        <div class="flex-3">
                            <Input v-model="formModal.note" placeholder="请输入"></Input>
                        </div>
                        <div class="flex-1">
                            <a @click="assetCodeDelClick(index)">删除</a>
                        </div>
                    </div>
                    <div style="text-align: center"><Button type="primary">+ 新增标识码</Button></div>
                </FormItem>
                </Col>
            </Row>
        </Form>-->
        <Form ref="formModal" :model="formModal"  label-position="left" :label-width="120">
            <FormItem label="资产目录：" prop="">
                <Cascader :data="assetDirList" v-model="formModal.assetDir" trigger="hover" change-on-select filterable @on-change="assetDirChange"></Cascader>
            </FormItem>
            <FormItem v-for="(v, k) in properties" :key="k" :label="(v.name || v.property.name)+'：'" prop="">
                <Input-number v-if="v.type == 11" v-model="v.value || v.property.value" style="width: 100%"></Input-number>
                <Input v-if="v.type == 1" v-model="v.value || v.property.value" :placeholder="v.pleaseholer"></Input>
                <DatePicker v-if="v.type == 3" type="date" placeholder="选择日期"  v-model="v.value" style="width: 100%;"></DatePicker>
                <Select v-if="v.type == 5" v-model="v.value  || v.property.value" :placeholder="v.pleaseholer">
                    <Option v-for="(obj, key) in (v.object || v.property.value)" :key="obj.id" :value="obj.id">{{obj.name || v.property.name}}</Option>
                </Select>
                <Input v-if="v.type == 10" type="textarea" :rows="2" v-model="v.value" :placeholder="v.pleaseholer"></Input>
                <Cascader v-if="v.type == 7" :data="addressList" v-model="v.value" trigger="hover" change-on-select filterable></Cascader>
                <uploadImg v-if="v.type == 12" v-model="v.value" @handleUp="handleUpImgSuccess" @handleRemove="handleUpRemove"></uploadImg>
                <uploadAttachments v-if="v.type == 13" v-model="attachments" @handleUp="handleUpFileSuccess"></uploadAttachments>
                <div v-if="v.type == 9">
                    <img src="static/images/scan.png" style="width: 37px;height: 35px;"/>
                    <div class="flex" v-for="(codeItem, key) in codeList" :key="key">
                        <div class="flex-1" style="text-align: right">编号：</div>
                        <div class="flex-3">
                            <Input v-model="codeItem['1']" placeholder="请输入"></Input>
                        </div>
                        <div class="flex-1" style="text-align: right">旧编号：</div>
                        <div class="flex-3">
                            <Input v-model="codeItem['2']" placeholder="请输入"></Input>
                        </div>
                        <div class="flex-1">
                            <a @click="assetCodeDelClick(key)">删除</a>
                        </div>
                    </div>
                    <div style="text-align: center"><Button type="primary" @click="newCode">+ 新增标识码</Button></div>
                </div>
            </FormItem>
        </Form>
    </Modal>
</template>
<script>
    //  1新增，2查看，3修改

    // import Row from '../../../../node_modules/iview/src/components/grid/row.vue'
    import uploadImg from '@/components/uploadImg.vue'
    import { URL } from '@/config/index'
    import AssetHttp from 'server/http/assetManage'
    import uploadAttachments from '@/components/uploadAttachments.vue'
    require('static/css/uploadimg.css')
    export default {
        components: {uploadImg, uploadAttachments},
        data () {
            return {
                showModal: false,
                assetDir0: [{
                    value: 'beijing',
                    label: '北京',
                    children: [
                        {
                            value: 'gugong',
                            label: '故宫'
                        },
                        {
                            value: 'tiantan',
                            label: '天坛'
                        },
                        {
                            value: 'wangfujing',
                            label: '王府井'
                        }
                    ]
                }, {
                    value: 'jiangsu',
                    label: '江苏',
                    children: [
                        {
                            value: 'nanjing',
                            label: '南京',
                            children: [
                                {
                                    value: 'fuzimiao',
                                    label: '夫子庙'
                                }
                            ]
                        },
                        {
                            value: 'suzhou',
                            label: '苏州',
                            children: [
                                {
                                    value: 'zhuozhengyuan',
                                    label: '拙政园'
                                },
                                {
                                    value: 'shizilin',
                                    label: '狮子林'
                                }
                            ]
                        }
                    ]
                }],
                assetDirList: [],
                assetsClassData: [],
                addressData: [], // 存放地址数据，数组格式，用于后续保存时，追踪根节点，生成text值
                addressList: [], // 用于绑定存放地点级联控件
                properties: [],
                codeList: [],
                attachments: '',
                imgUrl: '',
                formModal: {
//                    number: 0,
//                    productspec: '',
//                    location: '',
//                    supplier: '',
//                    startdate: '',
                    assetDir: [],
                    addressDir: []
                },
                formData: [],
                showImg: true,
                formDataObj: [
                    {property: {name: 'afsda'}, type: 'textarea'},
                    {property: {name: 'afsda'}, type: 'input'},
                    {property: {name: 'afsda'}, type: 'input'},
                    {property: {name: 'afsda'}, type: 'input'},
                    {property: {name: 'afsda'}, type: 'input'},
                    {property: {name: 'afsda'}, type: 'input'},
                    {property: {name: 'afsda'}, type: 'input'},
                    {property: {name: 'afsda'}, type: 'input'},
                    {property: {name: 'afsda'}, type: 'input'},
                    {property: {name: 'afsda'}, type: 'input'},
                    {property: {name: 'afsda'}, type: 'textarea'}
                ],
                modalTitle: '',
                test: [{id: 9, value: 10}, {id: 10, value: 'stringsss'}]
            }
        },
        methods: {
            open (type, title, specId) {
                this.showModal = true
                this.modalTitle = title
                let tempTitle = ''
                if (type === 1) {
                    // 新增记录，获取需要的model值和类型
                    tempTitle = '新增'
                    // 获取资产三级分类，也即资产目录
                    AssetHttp.getAssetsClass()
                        .then(data => {
                            this.loading = false
                            data.forEach(item => {
                                item.children = item.objects
                                item.value = item.id
                                item.label = item.name
                                item.children.forEach(chItem => {
                                    chItem.value = chItem.id
                                    chItem.label = chItem.name
                                    chItem.children = chItem.specifications
                                    chItem.children.forEach(sItem => {
                                        sItem.value = sItem.id
                                        sItem.label = sItem.name
                                    })
                                })
                            })
                            this.assetDirList = data
                            console.log('this.assetDirList', this.assetDirList)
                        })
                        .catch(error => {
                            this.$Message.error(error.error)
                        })

                    // 存放地点数据
                    AssetHttp.getSpaceAll()
                        .then(data => {
                            this.addressData = data
                            this.addressList = data.filter(item => {
                                return item.level == 1
                            })
                            this.recursiveAddress(this.addressList)
                        })
                        .catch(error => {
                            console.log('AssetHttp.getSpaceAll error:', error)
                        })
                    // todo 此处是想获取自定义的字段吗？
//                    this.axios.get('')
//                        .then(res => {
//                            console.log(res)
//                        })
//                        .catch(error => {
//                            this.$Message.error(error.error)
//                        })
                } else if (type === 2) {
                    // 查看记录，获取当前记录，只为显示
                    tempTitle = '查看'
                } else if (type === 3) {
                    // 编辑记录，获取当前记录，并进行操作和提交
                    tempTitle = '编辑'
                    // 获取资产三级分类，也即资产目录
//                    AssetHttp.getAssetsClass()
//                        .then(data => {
//                            this.loading = false
//                            this.assetsClassData = data
//                            this.assetDirList = data
//                            this.assetDirList.forEach(item => {
//                                item.children = item.objects
//                                item.value = item.id
//                                item.label = item.name
//                                item.children.forEach(chItem => {
//                                    chItem.value = chItem.id
//                                    chItem.label = chItem.name
//                                    chItem.children = chItem.specifications
//                                    chItem.children.forEach(sItem => {
//                                        sItem.value = sItem.id
//                                        sItem.label = sItem.name
//                                    })
//                                })
//                            })
//                            // this.assetDirList = data
//                            console.log('this.assetDirList', this.assetDirList)
//                        })
//                        .catch(error => {
//                            this.$Message.error(error.error)
//                        })

                    // 存放地点数据
                    AssetHttp.getSpaceAll()
                        .then(data => {
                            this.addressData = data
                            this.addressList = data.filter(item => {
                                return item.level == 1
                            })
                            this.recursiveAddress(this.addressList)
                        })
                        .catch(error => {
                            console.log('AssetHttp.getSpaceAll error:', error)
                        })

//                    AssetHttp.getAssetDetail(specId)
//                        .then(data => {
//                            console.log('编辑，', data)
//                        })
//                        .catch(error => {
//                            console.log('AssetHttp.getAssetDetail error:', error)
//                        })

                    Promise.all([AssetHttp.getAssetsClass(), AssetHttp.getAssetDetail(specId)])
                        .then(([classData, detail]) => {
                            this.loading = false
                            // 找到级联控件，设置值
                            // 根据detail渲染界面
                            this.properties = detail.specs
                            this.properties.forEach(pro => {
                                for (var p in pro.property) {
                                    pro[p] = pro.property[p]
                                }
                                if (pro.type == 7) {
                                    pro.object = JSON.parse(pro.object)
                                }
                            })
                            this.assetsClassData = classData
                            this.assetDirList = classData
                            this.assetDirList.forEach(item => {
                                item.children = item.objects
                                item.value = item.id
                                item.label = item.name
                                item.children.forEach(chItem => {
                                    chItem.value = chItem.id
                                    chItem.label = chItem.name
                                    chItem.children = chItem.specifications
                                    chItem.children.forEach(sItem => {
                                        sItem.value = sItem.id
                                        sItem.label = sItem.name
                                        console.log(sItem.id, detail.specification_id)
                                        console.log(sItem.id == detail.specification_id)
                                        if (sItem.id == detail.specification_id) {
                                            console.log('xxxx', item.id, chItem.id, sItem.id, detail.specification_id)
                                            this.formModal.assetDir = [ item.id, chItem.id, sItem.id ]
                                        }
                                    })
                                })
                            })
                            // this.assetDirList = data
                            console.log('this.assetDirList', this.assetDirList)
                            console.log('this.formModal.assetDir', this.formModal.assetDir)
                            // this.assetDirChange(this.formModal.assetDir, null)
                        })
                        .catch(error => {
                            console.log('Promise.all error:', error)
                        })
                }
                this.modalTitle = tempTitle + this.modalTitle
                // todo 此处想干啥？跟打印有关？
//                this.axios.get(url)
//                    .then(res => {
//                        let result = res.data
//                        this.printObj = result.specs
//                    })
//                    .catch(error => {
//                        this.$Message.error(error.error)
//                    })
            },
            assetDirChange (value, selectedData) {
                console.log('value,', value)
                if (value.length == 3) {
                    AssetHttp.getAssetProperties(value[2])
                        .then(data => {
                            this.properties = data
                            console.log(this.properties)
                            // 手动将id为17的 元，万元，删掉
                            this._.remove(this.properties, function (p) {
                                return p.id == 17
                            })
                            this.properties.forEach(item => {
                                // item['property_type'] = item.object_type
                                item['text'] = ''
                                if (item.type == 11) {
                                    item['value'] = 1  // 数字框
                                } else if (item.type == 5) { // 下拉框 单选
                                    console.log(item['object'])
                                    item['object'] = JSON.parse(item['object'])
                                    item['value'] = '' // 下拉框
                                } else if (item.type == 7) { // 带对象的单选，用于地点,级联，需要数据库多加一个type
                                    item['value'] = [] // todo 级联选择器，需要pid级联寻父节点
                                } else if (item.type == 9) { // 自定义
                                    item['value'] = [] // 标识码
                                    this.codeList = item['value']
                                } else if (item.type == 12) { // 图片
                                    item['value'] = ''
                                    this.imgUrl = item['value']
                                } else if (item.type == 13) { // 附件
                                    item['value'] = ''
                                    this.attachments = item['value']
                                } else {
                                    item['value'] = '' // 文本框
                                }

//                                if (item.id == 1) {
//                                    item['object'] = [{'id': 1, 'name': '使用中'}, {'id': 2, 'name': '闲置'}, {'id': 3, 'name': '废弃'}]
//                                }
//                                var temp = Object.create(null)
//                                temp['id'] = item.id
//                                temp['property_type'] = item.object_type
//                                temp['object'] = ''
//                                temp['value'] = ''
//                                temp['text'] = ''
//                                for (var p in item) {
//                                    temp[p] = item[p]
//                                }
//                                this.formData.push(temp)
                                // todo 此处动态渲染界面
                            })
                            // this.formData[0]['value'] = 'this is a test'
                            console.log(this.properties)
                        })
                        .catch(error => {
                            console.log('error:getAssetProperties:', error)
                        })
                }
            },
            // 递归构建存放地点
            recursiveAddress (space) {
                if (space && space.constructor.name == 'Array') {
                    space.forEach(item => {
                        item.label = item.name
                        item.value = item.id
                        if (item.children && item.children.constructor.name == 'Array' && item.children.length > 0) {
                            this.recursiveAddress(item.children)
                        }
                    })
                }
            },
            // todo 临时控制界面元素显示与隐藏，后续会自动生成界面元素
            checkShow (id) {
                var temp = this.properties.filter(p => {
                    return p.id == id
                })
                return temp
            },
            testFun (id) {
                var temp = this.test.filter(t => {
                    return t.id == id
                })
                return temp
            },
            ok () {
                var value = []
                this.properties.forEach(item => {
                    if (item.type == 9) { // 自用组件，标识码
                        var code = '' // this.codeList.length > 0 ? '[{' : ''
                        // item.value = JSON.stringify(this.codeList)
                        this.codeList.forEach(c => {
                            code += '1' + ':' + c['1'] + ',' + '2' + ':' + c['2']
                        })
//                        if (this.codeList.length > 0) {
//                            code += '}]'
//                        }
                        item['value'] = code
                        item['text'] = code
                    } else if (item.type == 12) { // 图片
                        item['value'] = this.imgUrl
                        item['text'] = item['value']
                    } else if (item.type == 13) { // 附件
                        item['value'] = this.attachments
                        item['text'] = item['value']
                    } else if (item.type == 5) { // 单选框
                        var selItem = item.object.filter(t => {
                            return t.id == item.value
                        })
                        item['text'] = selItem.length > 0 ? selItem[0]['name'] : ''
                    } else if (item.type == 7) { //
                        item.text = []
                        item.value.forEach(i => {
                            var itemp = this.addressData.filter(addr => {
                                return addr.id == i
                            })
                            item.text.push(itemp[0].name)
                            // item.text.concat(itemp)
                        })
                        item.text = item.text.length > 0 ? item.text.join('/') : ''
                    } else {
                        item['text'] = item['value']
                    }
                    var temp = Object.create(null)
                    temp['id'] = item.id
                    temp['key'] = item.key
                    temp['name'] = item.name
                    temp['property_type'] = item.property_type
                    temp['object_type'] = item.object_type
                    temp['type'] = item.type // 这个是1-13，控件类型，文本框，下拉框之类
                    temp['value'] = item.value
                    // temp['object'] = item.object ? (JSON.stringify(item.object)) : ''
                    temp['text'] = item.text
                    // 因为微服务json的原因，暂时写成这样
                    if (item.type == 7) { // 存放地点
                        console.log(item.value)
                        console.log('item[value]...................', item['value'])
                        temp['value'] = item['value'].length > 0 ? item['value'][item['value'].length - 1] : ''
                        console.log('temp[value]...................', temp['value'])
                    }
                    value.push(temp)
                })
                var data = {
                    specification_id: this.formModal.assetDir[2],
                    asset_spec: JSON.stringify(value)
                }
                // 调用保存接口
                AssetHttp.newAsset(data)
                    .then(res => {
                        this.$Message.info('新登记资产成功!')
                    })
                    .catch(error => {
                        this.$Message.error('新登记资产失败!错误：', error)
                    })
            },
            divide (type) {
                // 布局确定 true则为沾满一行
                let reg = /(textarea)|(upload)|()/
                return reg.test(type)
            },
            confirm () {
            },
            // 模态框关闭
            cancel () {
                this.showModal = false
            },
//            handleFormatError (file) {
//                this.$Notice.warning({
//                    title: '图片格式不正确',
//                    desc: '图片' + file.name + ' 格式不正确， 请选择 jpg 或 png.'
//                })
//            },
//            handleMaxSize (file) {
//                this.$Notice.warning({
//                    title: '图片大小限制',
//                    desc: '图片大小' + file.name + '太大，不能超过2m'
//                })
//            },
//            handleBeforeUpload () {
//                const check = this.uploadList.length < 1
//                if (!check) {
//                    this.$Notice.warning({
//                        title: '最多上传1张'
//                    })
//                }
//                return check
//            },
//            handleSuccess (res, file) {
//                file.url = this.imgUrl + res.file[0].url
//                file.name = res.file[0].url
//            },
            handleUpImgSuccess (url) {
                // this.uploadpic = false
                this.imgUrl = url
            },
            handleUpRemove () {
                this.imgUrl = ''
            },
            handleUpFileSuccess (url) {
                this.attachments += URL.replace(/api/, '') + 'uploads' + url + ','
            },
            assetCodeDelClick (key) {
                this.codeList.splice(key, 1)
            },
            newCode () {
                this.codeList.push({1: '', 2: ''})
            }
        }
    }
</script>
