<style>
    .me-def .ivu-modal-footer{
        padding:0 18px 12px 18px;
    }
    .me-def .ivu-modal-body{
        padding-bottom: 0;
    }
    .formdiv1 .ivu-form-item { margin-bottom: 14px; }
</style>
<template>
    <Modal v-model="show" title="预算编辑" @on-cancel="cancel('formData')" width="700px" height="550px" class="me-def">
        <div class="formdiv formdiv1">
            <Form ref="formData" :model="formData"><!--:rules="ruleValidate"-->
                <FormItem label="预算主体：" :label-width="100">
                    <span>{{formData.place_name}}</span>
                </FormItem>
                <FormItem label="时间：" :label-width="100">
                    <span>{{!!formData.month?formData.month.substring(0,7):''}}</span>
                </FormItem>
                <FormItem prop="total" label="预算总额：" :label-width="100">
                    <!--<Input type="text" v-model="formData.total" placeholder="请输入"></Input>-->
                    <Input-number v-model="formData.total"></Input-number><span>&nbsp;&nbsp;元</span>
                </FormItem>
                <!--<FormItem v-show="flag" label="分科目设置：" :label-width="100">-->
                    <!--<RadioGroup v-model="flag">-->
                        <!--<Radio label=1><span>是</span></Radio>-->
                        <!--<Radio label=0><span>否</span></Radio>-->
                    <!--</RadioGroup>-->
                <!--</FormItem>-->
                <div v-show="flag" style="margin-bottom: 25px;">
                    <FormItem  v-for="(bfItem, index) in this.formData.budget_finances" :key="index"> <!--v-model="value1" v-model="value2"-->
                        <div class="flex">
                            <div class="" style="text-align: right; width: 87px;">科目：</div>
                            <div class="flex-3">
                                <Select v-model="bfItem.finance_id" @on-change="selectChange" style="margin-left: 13px; width: 90%;">
                                    <Option v-for="item in subjects" :value="item.id" :key="item.id" :disabled="!item.fid">{{ item.fid==0?item.name:'&nbsp;&nbsp;&nbsp;└—'+item.name }}</Option>
                                </Select>
                            </div>
                            <div class="flex-1" style="text-align: right">预算金额：</div>
                            <div class="flex-3">
                                <Input-number v-model="bfItem.total" type="text" placeholder="请输入" style="width:80%; margin-left: 13px;"></Input-number><!--@on-blur="inputLeave()"-->
                            </div>
                            <div class="flex-1">
                                <a @click="delClick(index)">删除</a>
                            </div>
                        </div>
                    </FormItem>
                    <div style="width:100%; text-align: center;">
                        <Button type="primary" @click="newSubject" style="width: 40%;">+&emsp;新增科目</Button>
                    </div>
                </div>
                <!--<FormItem label="简介（可选）：" :label-width="120">
                    <Input v-model="formData.intro" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入..."></Input>
                </FormItem>-->
                <FormItem class="formbtns">
                    <Button type="ghost" @click="addcancelSubmit('formData')">取&emsp;消</Button>
                    <Button type="primary" @click="handleSubmit('formData')" :disabled='confirmDis'>确&emsp;定</Button>
                </FormItem>
            </Form>
        </div>
        <span slot="footer">
        </span>
    </Modal>
</template>
<script>
    import FinanceHttp from 'server/http/finance'
    import _ from 'lodash'
    export default {
        data () {
            return {
                show: false,
                flag: 0,
                confirmDis: false,
                formData: Object.create(null),
                subjects: [],
                config: null
            }
        },
        methods: {
            open (data, name) {
                this.show = true
                this.submitCount = 0
                // todo 测试用，后续要删掉
//                data = {
//                    'id': 2,
//                    'place_id': 20,
//                    'place_name': '这里是地点名称，也叫主体',
//                    'datetime': '2018-02-01',
//                    'total': 200,
//                    'expense': '0.00',
//                    'created_at': '2018-01-31 20:45:21',
//                    'updated_at': '2018-02-02 10:13:25',
//                    'budget_finances': [
//                        {
//                            'id': 2,
//                            'budget_id': 2,
//                            'finance_id': 2,
//                            'total': 200,
//                            'expense': '0.00',
//                            'created_at': '2018-02-02 10:13:25',
//                            'updated_at': '2018-02-02 10:13:25'
//                        }
//                    ]
//                }
                if (!data) {
                    console.error('数据出错')
                } else {
                    this.formData = data
                    this.formData.month = data.datetime
                    this.formData.place_name = name
                    // todo 测试数据，需删除
//                    this.formData.budget_finances.push({
//                        'id': 2,
//                        'budget_id': 2,
//                        'finance_id': 3,
//                        'total': 200,
//                        'expense': '0.00',
//                        'created_at': '2018-02-02 10:13:25',
//                        'updated_at': '2018-02-02 10:13:25'
//                    })
//                    this.formData.budget_finances.push({
//                        'id': 3,
//                        'budget_id': 2,
//                        'finance_id': 5,
//                        'total': 200,
//                        'expense': '0.00',
//                        'created_at': '2018-02-02 10:13:25',
//                        'updated_at': '2018-02-02 10:13:25'
//                    })
//                    this.flag = data.budget_finances ? (data.budget_finances.length == 0 ? 0 : 1) : 0
                    this.flag = this.globalConfig
                    if (this.flag) {
                        FinanceHttp.getAll()
                            .then((data) => {
                                this.subjects = data
                            })
                            .catch(error => {
                                this.$Message.error(error ? (error.error || error) : '发生错误，请检查与服务器的网络连接！')
                            })
                    }
                }
            },
            // 确定按钮
            handleSubmit (name) {
                this.confirmDis = true
                this.submitCount++
                var canSave = false
                if (this.flag) {
                    if (!this.formData.budget_finances) {
                        this.formData.budget_finances = []
                    }
                    _.remove(this.formData.budget_finances, function (item) {
                        return item.finance_id == ''
                    })
                    if (this.isRepeat(this.formData.budget_finances)) {
                        this.$Message.warning('科目不能重复！')
                        this.confirmDis = false
                    } else if (!this.isMoneyValid()) {
                        this.$Message.warning('科目金额之和必须等于预算总额！')
                        this.confirmDis = false
                    } else {
                        canSave = true
                    }
                } else {
                    canSave = true
                }
                if (canSave) {
                    var data = {
                        'place_id': this.formData.place_id,
                        'month': this.formData.month,
                        'total': this.formData.total,
                        'finances': JSON.stringify(this.formData.budget_finances)
                    }
                    FinanceHttp.budgetSave(data)
                        .then(() => {
                            this.$Message.success('创建成功')
                            this.$emit('refresh')
                            this.confirmDis = false
                            this.show = false
                        })
                        .catch(error => {
                            this.$Message.error(error ? (error.error || error) : '发生错误，请检查与服务器的网络连接！')
                            this.confirmDis = false
                            this.submitCount = 0
                            this.$emit('refresh')
                        })
                }
//                if (this.isRepeat(this.formData.budget_finances)) {
//                    this.$Message.warning('科目不能重复！')
//                    this.confirmDis = false
//                    return
//                } else if (!this.isMoneyValid()) {
//                    this.$Message.warning('科目金额之和必须等于预算总额！')
//                    this.confirmDis = false
//                    return
//                } else {
//                    var data = {
//                        'place_id': this.formData.place_id,
//                        'month': this.formData.month,
//                        'total': this.formData.total,
//                        'finances': JSON.stringify(this.formData.budget_finances)
//                    }
//                    FinanceHttp.budgetSave(data)
//                        .then(() => {
//                            this.$Message.success('创建成功')
//                            this.$emit('refresh')
//                            this.confirmDis = false
//                            this.show = false
//                        })
//                        .catch(error => {
//                            this.$Message.error(error ? (error.error || error) : '发生错误，请检查与服务器的网络连接！')
//                            this.confirmDis = false
//                            this.submitCount = 0
//                            this.$emit('refresh')
//                        })
//                }
            },
            // 取消按钮
            addcancelSubmit (formadd) {
                this.$refs[formadd].resetFields()
                this.show = false
            },
            // 模态框关闭
            cancel (formadd) {
                this.$refs[formadd].resetFields()
            },
            newSubject () {
                if (this.formData.total != 0 || this.formData.total != '') {
                    this.formData.budget_finances.push({
                        'id': null,
                        'budget_id': this.formData.id,
                        'finance_id': '',
                        'total': 0,
                        'expense': 0,
                        'created_at': '',
                        'updated_at': ''
                    })
                } else {
                    this.$Message.warning('请先输入预算总额！')
                }
            },
//            inputLeave (data) {
//                var total = 0
//                this.formData.budget_finances.forEach(item => {
//                    total += parseFloat(item.total)
//                })
//                this.formData.total = total
//            },
            selectChange (data) {
            },
            delClick (index) {
                this.formData.budget_finances.splice(index, 1)
            },
            isRepeat (arr) {
                var hash = {}
                for (var i in arr) {
                    if (hash[arr[i].finance_id]) {
                        return true
                    }
                    // 不存在该元素，则赋值为true，可以赋任意值，相应的修改if判断条件即可
                    hash[arr[i].finance_id] = true
                }
                return false
            },
            isMoneyValid () {
                if (this.flag) {
                    var total = 0
                    if (this.formData.budget_finances) {
                        this.formData.budget_finances.forEach(item => {
                            total += item.total
                        })
                    }
                    return total == this.formData.total
                } else {
                    return true
                }
            }
        }
    }
</script>
