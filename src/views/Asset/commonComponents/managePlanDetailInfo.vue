<style scoped>
    .ivu-form-item{
        margin-bottom: 0;
    }
    .scroll-form{
        max-height: 600px;
        overflow-y: auto;
    }
</style>
<template>
    <Modal class="formModal" v-model="showModal" :styles="{width: '90%'}" :title="modalTitle"
           @on-cancel="cancel()">
        <Form ref="formDynamic" :model="formDataObj" :label-width="120" class="scroll-form">
            <div class="m-r-20 m-l-20">
                <Row>
                    <!-- 加载整行的表单 -->
                    <Col class="m-b-10" span="24">
                    <FormItem label="标题">
                        <Input v-model="formDataObj.title" placeholder="请输入"></Input>
                    </FormItem>
                    </Col>

                    <!-- 店铺-->
                    <Col class="m-b-10" span="12">
                    <FormItem label="店铺">
                        <Select v-model="formDataObj.store" style="width:200px">
                            <Option v-if="selectData['store']" v-for="item in selectData['store']" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                    </FormItem>
                    </Col>

                    <!-- 管理对象 -->
                    <Col class="m-b-10" span="12">
                    <FormItem label="管理对象">
                        <Select v-model="formDataObj.object" style="width:200px">
                            <Option v-if="selectData['object']" v-for="item in selectData['object']" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                    </FormItem>
                    </Col>

                    <!-- 工作类别 -->
                    <Col class="m-b-10" span="12">
                    <FormItem label="工作类别">
                        <Select v-model="formDataObj.workType" style="width:200px">
                            <Option v-if="selectData['workType']" v-for="item in selectData['workType']" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                    </FormItem>
                    </Col>

                    <!-- 优先级 -->
                    <Col class="m-b-10" span="12">
                    <FormItem label="店铺">
                        <Select v-model="formDataObj.store" style="width:200px">
                            <Option v-if="selectData['store']" v-for="item in selectData['store']" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                    </FormItem>
                    </Col>

                    <!-- 供应商 -->
                    <Col class="m-b-10" span="12">
                    <FormItem label="供应商">
                        <Select v-model="formDataObj.supplier" style="width:200px">
                            <Option v-if="selectData['supplier']" v-for="item in selectData['supplier']" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                    </FormItem>
                    </Col>

                    <!-- 服务 -->
                    <Col class="m-b-10" span="12">
                    <FormItem label="服务">
                        <Select v-model="formDataObj.service" style="width:200px">
                            <Option v-if="selectData['service']" v-for="item in selectData['service']" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                    </FormItem>
                    </Col>
                </Row>

                <!-- 切换按钮 -->
                <Row class="m-b-10">
                    <Col span="8">
                    <FormItem label="要求打点">
                        <iSwitch v-model="formDataObj.dot">
                            <span slot="open">开</span>
                            <span slot="close">关</span>
                        </iSwitch>
                    </FormItem>
                    </Col>
                    <Col span="8">
                    <FormItem label="要求计时">
                        <iSwitch v-model="formDataObj.clock">
                            <span slot="open">开</span>
                            <span slot="close">关</span>
                        </iSwitch>
                    </FormItem>
                    </Col>
                    <Col span="8">
                    <FormItem label="时效性">
                        <iSwitch v-model="formDataObj.time_effect">
                            <span slot="open">开</span>
                            <span slot="close">关</span>
                        </iSwitch>
                    </FormItem>
                    </Col>
                </Row>

                <Row class="m-b-10">
                    <Col span="24">
                    <FormItem label="描述">
                        <Input v-model="formDataObj.note" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入备注"></Input>
                    </FormItem>
                    </Col>
                </Row>

                <Row class="m-b-10">
                    <Col span="12">
                    <FormItem label="计划周期">
                        <Select v-model="formDataObj.period" style="width:200px">
                            <Option v-if="selectData['period']" v-for="item in selectData['period']" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                    </FormItem>
                    </Col>
                </Row>

                <Row class="m-b-10">
                    <Col span="12">
                    <FormItem v-for="(plan, index) in formDataObj.planTask" :key="index" :label="'任务'+(index + 1)+'：'">
                        <Row  class="m-b-10">
                            <Col span="18">
                                <DatePicker type="datetimerange" :value="plan.dateValue" @on-change="changeTime($event, plan)" format="yyyy-MM-dd HH:mm" placeholder="请选择" style="width: 100%;"></DatePicker>
                            </Col>
                            <Col span="4" offset="1">
                            <Button type="ghost" @click="remove(index)">删除</Button>
                            </Col>
                        </Row>
                    </FormItem>
                    <Button class="pull-right" type="dashed" @click="addTask()" icon="plus-roud">添加任务</Button>
                    </Col>
                </Row>

            </div>
        </Form>
        <div class="formbtns ivu-form-item">
            <Button type="ghost" @click="cancel()">取&emsp;消</Button>
            <Button type="primary" @click="confirm()">确&emsp;定</Button>
        </div>
        <span slot="footer"></span>
    </Modal>
</template>
<script>
    //  1新增，2查看，3修改

    export default {
        data () {
            return {
                showModal: false,
                formDataObj: {
                    planTask: []
                },
                selectData: {},
                modalTitle: ''
            }
        },
        methods: {
            open (type, title, url) {
                this.showModal = true
                this.modalTitle = title || ''
                let tempTitle = ''
                if (type === 1) {
                    // 新增记录，获取需要的model值和类型
                    tempTitle = '新增'
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
                }
                this.modalTitle = tempTitle + this.modalTitle
                this.axios.get(url)
                    .then(res => {
                        let result = res.data
                        this.printObj = result.specs
                    })
                    .catch(error => {
                        this.$Message.error(error.error)
                    })
            },
            addTask () {
                this.formDataObj.planTask.push({
                    value: '',
                    id: ''
                })
            },
            remove (index) {
                console.log(index)
                this.formDataObj.planTask.splice(index, 1)
            },
            changeTime (e, plan) {
                if (e.length) {
                    plan.startTime = e[0]
                    plan.endTime = e[1]
                    plan.dateValue = [e[0], e[1]]
                }
            },
            confirm () {
            },
            // 模态框关闭
            cancel () {
                this.showModal = false
            }
        }
    }
</script>
