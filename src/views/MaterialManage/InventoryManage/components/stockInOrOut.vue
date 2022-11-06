<style>
.stockInOrOut img.detailImg{
    height: 100px;
}
.stockInOrOut .img-room,.img-room img{
    display: inline-block;
}
.stockInOrOut img{
    margin-right:16px;
    width:70px;
    height:70px;
}
.stockInOrOut .ivu-form-item{
    width: 44%;
    margin-right: 40px;
}
.stockInOrOut .remark{
    width: 92%;
}
.stockInOrOut .remark textarea{
    width: 100%;
}
.stockInOrOut .ivu-date-picker{
    width: 100%!important;
}
#preview,
.stockInOrOut .img,
.stockInOrOut img {
    width: 100px;
    height: 100px;
}
#preview {
    border: 1px solid #000;
}
.stockInOrOut div.ivu-select-dropdown{
    position: fixed!important;
}
.stockInOrOut .barcode-title{
    font-size: 13px;
    display: inline-block;
    margin-left: 10px;
}
.stockInOrOut .barcode-table{
    display: inline-block;
    vertical-align: top;
    width: 904px;
    overflow: auto;
    max-height: 900px;
}
.stockInOrOut .needRequired.ivu-form-item .ivu-form-item-label:before {
    content: '*';
    display: inline-block;
    margin-right: 4px;
    line-height: 1;
    font-family: SimSun;
    font-size: 12px;
    color: #ed3f14;
}
.picView div.ivu-modal-mask{
    z-index: 1001!important;
}
.picView div.ivu-modal-wrap{
    z-index: 1010!important;
}
.demo-upload-list{
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
.demo-upload-list img{
    width: 100%;
    height: 100%;
}
.demo-upload-list-cover{
    display: none;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0,0,0,.6);
}
.demo-upload-list:hover .demo-upload-list-cover{
    display: block;
}
.demo-upload-list-cover i{
    color: #fff;
    font-size: 20px;
    cursor: pointer;
    margin: 0 2px;
}
</style>
<template>
    <div>
    <Modal width="1100" v-model="stockInOrOut" title='' @on-cancel="cancel()" :styles="{top: '15px'}">
        <Spin size="large" fix v-if="spinShow"></Spin>
        <p slot="header" style="text-align:left;">
            <span>{{type}}登记</span>
        </p>
        <div class="stockInOrOut">
            <!--入库记录-->
            <Form ref="formInline" label-position="right" :model="formInline" :rules="ruleInline" :label-width="80" inline v-if="type == '入库' ">
                <FormItem prop="name"  label="物料目录">
                    <Select v-model="formInline.name" style="width:100%">
                        <Option v-for="item in namelog" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                </FormItem>
                <FormItem prop="created_at"  label="入库时间">
                    <DatePicker class="timeCreate" v-model="formInline.created_at" :editable="false" type="datetime" placeholder="请选择时间" ></DatePicker>
                </FormItem>
                <FormItem prop="barcode" label="条形码">
                    <Input type="text" v-model="formInline.barcode" placeholder="请输入">
                    </Input>
                </FormItem>
                <FormItem prop="manager_name" label="库管员">
                    <Input type="text" v-model="formInline.manager_name" placeholder="请输入" disabled>
                    </Input>
                </FormItem>
                <FormItem prop="change_stock" label="数量">
                    <Input type="text" v-model="formInline.change_stock" placeholder="请输入" style="width: 91%" >
                    </Input><span style="margin-left: 10px">{{formInline.change_unit}}</span>
                </FormItem>
                <FormItem prop="price" label="单价" class="needRequired">
                    <div style="">
                        <InputNumber style="width: 157px" :precision="2"  :min="0" v-model="formInline.price"></InputNumber>
                    <!--<Input type="text"  placeholder="请输入" v-model="formInline.price">-->
                        <Select v-model="formInline.price_unit" slot="append" style="width: 70px;">
                            <Option value="0">元</Option>
                            <Option value="1">美元</Option>
                        </Select>

                    </div>
                </FormItem>
                <FormItem prop="handler_name" label="入库人" class="needRequired">
                    <AutoComplete
                        v-model="formInline.handler_name"
                        :data="handler_name"
                        :filter-method="filterMethod"
                        placeholder="请输入"
                        style="width:100%">
                    </AutoComplete>
                </FormItem>
                <FormItem prop="provider" label="供应商">
                    <AutoComplete
                    v-model="formInline.provider"
                    :data="handler_name"
                    :filter-method="filterMethod"
                    placeholder="请输入"
                    style="width:100%">
                </AutoComplete>
                </FormItem>
                <FormItem prop="remark" label="备注" class="remark">
                    <Input v-model="formInline.remark" type="textarea" :autosize="{minRows: 4,maxRows: 5}" placeholder="请输入少于200字" :maxlength="200" ></Input>
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
                <div v-if="formInline.change_stock && order == 1">
                <FormItem prop="numBar" label="物料序列号">
                    <RadioGroup v-model="barcode">
                        <Radio label="批量录入"></Radio>
                        <Radio label="单个录入（适用于已有条码）"></Radio>
                    </RadioGroup>
                </FormItem>
                <div v-if="barcode == '批量录入'"><a @click="printBarcode()">生成条码</a> <span>（已打印次数：{{printedNum}}次  重复打印条码： {{printRepeat}}个   <a @click="barcodeRepeat()">点击查看条码明细</a>）</span></div>
                <div v-if="barcode == '单个录入（适用于已有条码）'">
                    <div style="width: 80%;margin-left: 10%">
                        <div class="ivu-icon ivu-icon-qr-scanner" style="font-size: 50px;display: inline-block" @click="madeBarcode"></div>
                        <Alert type="warning" show-icon style="
                        display: inline-block;
                        margin-left: 15px;
                        position: relative;
                        top: -15px;">请使用扫描仪器扫描物料上的码</Alert>
                    </div>
                    <div >
                        <div class="barcode-title">扫码结果：</div>
                        <div class="barcode-table"><Table :columns="columns1" :data="data2" ></Table></div>
                    </div>
                </div>
                </div>
            </Form>
            <!--出库记录-->
            <Form ref="formInline" label-position="right" :model="formInline" :rules="ruleInline" :label-width="80" inline v-if="type == '出库'">
                <FormItem prop="name"  label="物料目录" style="width: 100%">
                    <Select v-model="formInline.name" style="width: 39.5%" >
                        <Option v-for="item in namelog" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                </FormItem>
                <FormItem prop="change_stock" label="数量">
                    <Input type="text" v-model="formInline.change_stock" placeholder="请输入" style="width: 91%" >
                    </Input><span style="margin-left: 10px">{{formInline.change_unit}}</span>
                </FormItem>
                <FormItem prop="manager_name" label="库管员" >
                    <Input type="text" v-model="formInline.manager_name" placeholder="请输入" disabled>
                    </Input>
                </FormItem>
                <FormItem prop="handler_name" label="领取人"  class="needRequired">
                    <AutoComplete
                        v-model="formInline.handler_name"
                        :data="handler_name"
                        :filter-method="filterMethod"
                        placeholder="请输入"
                        style="width:100%">
                    </AutoComplete>
                </FormItem>
                <FormItem prop="created_at"  label="出库时间">
                    <DatePicker class="timeCreate" v-model="formInline.created_at" :editable="false" type="datetime" placeholder="请选择时间" ></DatePicker>
                </FormItem>
                <FormItem prop="remark" label="备注" class="remark">
                    <Input v-model="formInline.remark" type="textarea" :autosize="{minRows: 4,maxRows: 5}" placeholder="请输入少于200字" :maxlength="200" ></Input>
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
                <div v-if="formInline.change_stock && order == 1">
                    <label>物料序列号：</label>
                    <div style="display: inline-block;vertical-align: top;margin-top: -7px; margin-left: 6px;">
                    <div class="ivu-icon ivu-icon-qr-scanner" style="font-size: 50px;display: inline-block" @click="madeBarcode"></div>
                    <Alert type="warning" show-icon style="
                        display: inline-block;
                        margin-left: 15px;
                        position: relative;
                        top: -15px;">请使用扫描仪器扫描物料上的码</Alert>
                    </div>
                <div >
                    <div class="barcode-title">扫码结果：</div>
                    <div class="barcode-table"><Table :columns="columns1" :data="data2" ></Table></div>
                </div>
                </div>

            </Form>
        </div>
        <span slot="footer">
             <Button type="ghost" @click="close()">取消</Button>
             <Button type="primary" @click="submit('formInline')" :disabled="confirmDis">确定</Button>
        </span>
    </Modal>
    <!--生成条码-->
    <printBarcode  ref="printBarcode" @print="print"></printBarcode>
    <!--重复条码明细-->
    <barcodeRepeat  ref="barcodeRepeat" ></barcodeRepeat>
    </div>
</template>
<script>
    import $ from 'jquery'
    import { URL } from '@/config/index'
    import materialHttp from 'server/http/materialBasic'
    require('static/plugin/viewer/css/viewer.min.css')
    require('static/plugin/viewer/css/viewer.min.css')
    import printBarcode from './printBarcode.vue'
    import barcodeRepeat from './barcodeRepeat.vue'
    export default {
        components: {
            printBarcode,
            barcodeRepeat
        },
        data () {
            const validatePassCheck = (rule, value, callback) => {
                var reg = /^\d{0,8}\.{0,1}(\d{1,2})?$/
                if (value && !reg.test(value)) {
                    callback(new Error('请输入数字，最大为十位数'))
                } else {
                    callback()
                }
            }
            const validateHandlername = (rule, value, callback) => {
                if (!value && this.type == '出库') {
                    callback(new Error('请输入领取人姓名'))
                } else if (!value && this.type == '入库') {
                    callback(new Error('请输入入库人姓名'))
                } else {
                    callback()
                }
            }
            const validateBarcode = (rule, value, callback) => {
                if (!/^[A-Za-z0-9]+$/.test(value) && value) {
                    callback(new Error('请输入数字或英文字母'))
                } else {
                    callback()
                }
            }
            return {
                uploadUrl: URL + '/upload',
                imgUrl: URL.replace(/api/, '') + '/uploads',
                spinShow: false, // 暂时loading
                namelog: [], // 物料分类名称
                type: '',
                formInline: {
                    name: '',
                    barcode: '',
                    manager_id: '',
                    change_stock: '',
                    price: 0,
                    price_unit: '0',
                    change_unit: '',
                    handler_name: '',
                    provider: '',
                    remark: '',
                    images: [],
                    created_at: '',
                    manager_name: this.$store.state.loginUser.username
                },
                ruleInline: {
                    name: [
                        { required: true, message: '请选择物料目录', trigger: 'change' }
                    ],
                    created_at: [
                        { required: true, type: 'date', message: '请选择时间', trigger: 'change' }
                    ],
                    change_stock: [
                        { required: true, message: '请输入数量', trigger: 'blur' },
                        { validator: validatePassCheck, trigger: 'blur' }
                    ],
                    handler_name: [
                        { validator: validateHandlername, trigger: 'change' }
                    ],
                    price: [
                        { required: true, type: 'number', message: '请输入单价', trigger: 'blur' }
                    ],
                    barcode: [
                        { type: 'string', min: 17, max: 17, message: '请输入17位条形码', trigger: 'blur' },
                        { validator: validateBarcode, trigger: 'blur' }
                    ]
                },
                data: {},
                stockInOrOut: false,
                id: '',
                confirmDis: false,
                viewer1: 1,
                barcode: '批量录入',
                codeForPrint: [],
                columns1: [
                    {
                        title: '序号',
                        key: 'id',
                        align: 'center'
                    }, {
                        title: '序列号',
                        key: 'numStr',
                        width: 500,
                        align: 'left'
                    },
                    {
                        title: '操作',
                        width: 90,
                        key: 'actions',
                        render: (h, params) => {
                            return h('div', [
                                h('a', {
                                    style: {
                                        marginRight: '20px',
                                        color: '#d80000'
                                    },
                                    on: {
                                        click: () => {
                                            this.data2.splice(params.index, 1)
                                            for (var v in this.data2) {
                                                this.data2[v].id = parseInt(v) + 1
                                            }
                                        }
                                    }
                                }, '删除')])
                        }
                    }],
                data2: [], // 单个生成序列号
                order: '', // 有序1无序0
                printedNum: 0, // 已打印次数
                printRepeat: 0, // 重复打印次数
                thisTime: [],
                handler_name: [], // 历史入库人
                defaultList: [],
                imgName: '',
                visible: false,
                uploadList: []
            }
        },
        methods: {
            open (type, materialInfo) {
                if (!sessionStorage.getItem('userId')) {
                    this.$router.push({ path: '/' })
                }
                this.spinShow = true
                this.order = materialInfo.order
                this.type = type
                // 物料名称
                this.formInline.created_at = new Date()
                materialHttp.materialName().then((data) => {
                    var temp = []
                    var theObject = {}
                    for (var v in data[1]) {
                        data[0][v] = data[0][v].join(',')
                        theObject.label = data[1][v]
                        theObject.value = data[0][v]
                        temp.push(theObject)
                        theObject = {}
                    }
                    this.namelog = temp
                    this.formInline.name = materialInfo.Id
                    this.formInline.change_unit = materialInfo.unit
                    this.spinShow = false
                })
                // 获取历史入库人
                materialHttp.historyHandler().then((data) => {
                    this.handler_name = data
                })
                this.stockInOrOut = true
                setTimeout(() => {
                    this.uploadList = this.$refs.upload.fileList
                }, 500)
            },
            // 上传图片预览
            //
            handleView (name) {
                this.imgName = name
                this.visible = true
            },
            handleRemove (file) {
                const fileList = this.$refs.upload.fileList
                this.$refs.upload.fileList.splice(fileList.indexOf(file), 1)
            },
            handleSuccess (res, file) {
                file.url = URL.replace(/api/, '') + '/uploads' + res.file[0].url
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
                const check = this.uploadList.length < 10
                if (!check) {
                    this.$Notice.warning({
                        title: '最多上传10张'
                    })
                }
                return check
            },
            // 模拟单个录入条码
            madeBarcode () {
                if (this.data2.length < this.formInline.change_stock) {
                    if (this.data2.length != 0) {
                        var tempData2 = {
                            id: parseInt(this.data2[this.data2.length - 1].id) + 1,
                            numStr: new Date().getTime() + '0001'
                        }
                    } else {
                        tempData2 = {
                            id: 1,
                            numStr: new Date().getTime() + '0001'
                        }
                    }
                } else {
                    this.$Message.error('扫描条码数量超出已选' + this.type + '数量')
                    return
                }
                this.data2.push(tempData2)
            },
            // 打开打印条码窗口
            printBarcode (id, num) {
                this.printedNum = 0
                this.$refs.printBarcode.open(this.formInline.name.split(',')[3], this.formInline.change_stock)
            },
            // 回传本次打印记录
            print (thisTime, codeForPrint) {
                this.printedNum = 1
                this.codeForPrint = ''
                this.thisTime = thisTime
                for (var i in codeForPrint) {
                    this.codeForPrint += codeForPrint[i] + ','
                }
            },
            // 打开条码查重窗口
            barcodeRepeat () {
                this.$refs.barcodeRepeat.open(this.formInline.name.split(',')[3])
            },
            close () {
                this.$refs.formInline.resetFields()
                this.stockInOrOut = false
                if (this.viewer1 !== 1) {
                    this.viewer1.destroy()
                }
            },
            // 模态框关闭
            cancel () {
                this.$refs.formInline.resetFields()
                this.stockInOrOut = false
                if (this.viewer1 !== 1) {
                    this.viewer1.destroy()
                }
            },
            filterMethod (value, option) {
                return option.toUpperCase().indexOf(value.toUpperCase()) !== -1
            },
            submit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.submitForm()
                        this.viewer1.destroy()
                        if (this.viewer1 !== 1) {
                        }
                    }
                })
            },
            submitForm () {
                var pic = ''
                for (var i in this.uploadList) {
                    pic += this.uploadList[i].url + ','
                }
                this.spinShow = true
                if (this.order == 0 && this.type == '入库') {
                    var data = {
                        warehouse_id: parseInt(this.formInline.name.split(',')[0]),
                        objecttype: parseInt(this.formInline.name.split(',')[1]),
                        object_id: parseInt(this.formInline.name.split(',')[2]),
                        specification_id: parseInt(this.formInline.name.split(',')[3]),
                        barcode: this.formInline.barcode,
                        manager_id: parseInt(sessionStorage.getItem('userId')),
                        change_stock: parseInt(this.formInline.change_stock),
                        price: this.formInline.price,
                        price_unit: parseInt(this.formInline.price_unit),
                        handler_name: this.formInline.handler_name,
                        provider: this.formInline.provider,
                        remark: this.formInline.remark,
                        created_at: $('.timeCreate input').val(),
                        images: pic
                    }
                    materialHttp.InstorageMaterialN(data).then((data) => {
                        this.spinShow = false
                        this.$Message.success('提交成功!')
                        this.$emit('refresh')
                        this.stockInOrOut = false
                    }).catch((error) => {
                        this.$Message.error(error)
                        this.stockInOrOut = false
                    })
                } else if (this.order == 0 && this.type == '出库') {
                    data = {
                        warehouse_id: parseInt(this.formInline.name.split(',')[0]),
                        objecttype: parseInt(this.formInline.name.split(',')[1]),
                        object_id: parseInt(this.formInline.name.split(',')[2]),
                        specification_id: parseInt(this.formInline.name.split(',')[3]),
                        manager_id: parseInt(sessionStorage.getItem('userId')),
                        change_stock: parseInt(this.formInline.change_stock),
                        handler_name: this.formInline.handler_name,
                        remark: this.formInline.remark,
                        created_at: $('.timeCreate input').val(),
                        images: pic
                    }
                    materialHttp.OutstorageMaterialN(data).then((data) => {
                        this.spinShow = false
                        if (data == -1) {
                            this.$Message.error('出库数量超出现有库存量，出库失败!')
                            return
                        }
                        this.$Message.success('提交成功!')
                        this.$emit('refresh')
                        this.stockInOrOut = false
                    }).catch((error) => {
                        this.$Message.error(error)
                        this.stockInOrOut = false
                    })
                } else if (this.order == 1 && this.type == '出库') {
                    var rfid = ''
                    for (var j in this.data2) {
                        rfid += this.data2[j].numStr + ','
                    }
                    if (this.data2.length != parseInt(this.formInline.change_stock)) {
                        this.$Message.error('扫描条码数与出库数量不符，请核对')
                        this.spinShow = false
                        return
                    }
                    this.data2
                    data = {
                        warehouse_id: parseInt(this.formInline.name.split(',')[0]),
                        objecttype: parseInt(this.formInline.name.split(',')[1]),
                        object_id: parseInt(this.formInline.name.split(',')[2]),
                        specification_id: parseInt(this.formInline.name.split(',')[3]),
                        manager_id: parseInt(sessionStorage.getItem('userId')),
                        change_stock: parseInt(this.formInline.change_stock),
                        handler_name: this.formInline.handler_name,
                        remark: this.formInline.remark,
                        created_at: $('.timeCreate input').val(),
                        images: pic,
                        rfid: rfid
                    }
                    materialHttp.OutstorageMaterialY(data).then((data) => {
                        this.spinShow = false
                        if (data == -1) {
                            this.$Message.error('出库数量超出现有库存量，出库失败!')
                            return
                        }
                        this.$emit('refresh')
                        this.stockInOrOut = false
                    }).catch((error) => {
                        this.$Message.error(error)
                        this.stockInOrOut = false
                    })
                } else if (this.order == 1 && this.type == '入库') {
                    if ($('.ivu-radio-wrapper.ivu-radio-group-item').eq(1).hasClass('ivu-radio-wrapper-checked')) {
                        rfid = ''
                        for (var k in this.data2) {
                            rfid += this.data2[k].numStr + ','
                        }
                        if (this.data2.length != parseInt(this.formInline.change_stock)) {
                            this.$Message.error('扫描条码数与入库数量不符，请核对')
                            this.spinShow = false
                            return
                        }
                    } else {
                        if (this.codeForPrint.length == 0) {
                            this.spinShow = false
                            this.$Message.error('请先打印条码再进行提交')
                            return
                        }
                        rfid = this.codeForPrint
                        this.$Message.success('提交成功!')
                    }
                    data = {
                        warehouse_id: parseInt(this.formInline.name.split(',')[0]),
                        objecttype: parseInt(this.formInline.name.split(',')[1]),
                        object_id: parseInt(this.formInline.name.split(',')[2]),
                        specification_id: parseInt(this.formInline.name.split(',')[3]),
                        barcode: this.formInline.barcode,
                        manager_id: parseInt(sessionStorage.getItem('userId')),
                        change_stock: parseInt(this.formInline.change_stock),
                        price: this.formInline.price,
                        price_unit: parseInt(this.formInline.price_unit),
                        handler_name: this.formInline.handler_name,
                        provider: this.formInline.provider,
                        remark: this.formInline.remark,
                        created_at: $('.timeCreate input').val(),
                        images: pic,
                        rfid: rfid,
                        print_time: this.thisTime,
                        link_number: this.printedNum
                    }
                    materialHttp.InstorageMaterialY(data).then((data) => {
                        this.spinShow = false
                        this.$emit('refresh')
                        this.stockInOrOut = false
                    }).catch((error) => {
                        this.$Message.error(error)
                        this.stockInOrOut = false
                    })
                }
            }
        },
        mounted () {

        },
        watch: {
            stockInOrOut (v) {
                if (v === false) {
                    this.formInline = {}
                    this.formInline.created_at = new Date()
                    this.formInline.manager_name = this.$store.state.loginUser.username
                    this.formInline.price_unit = '0'
                    this.formInline.price = 0
                    this.data2 = []
                    this.codeForPrint = []
                    this.spinShow = false
                    this.uploadList = []
                    this.type = ''
                    this.printRepeat = 0
                    this.printedNum = 0
                }
            }
        }
    }
</script>
