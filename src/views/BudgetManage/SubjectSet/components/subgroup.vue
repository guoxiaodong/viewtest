<style>
    .formdiv #codeLoad,.formdiv #nameLoad
    {
        display: none;
        position:absolute;
    }
    .me-def .ivu-modal-footer
    {
        /* padding:12px 18px 12px 18px; */
    }
</style>
<template>
    <Modal v-model="show" :title="title" @on-cancel="cancel('formadd')" class="me-def">
        <div class="formdiv">
        <Form ref="formadd" :model="formadd" :rules="ruleInline">
            <FormItem prop="no" label="编号：" :label-width="65">
                <Input type="text" v-model="formadd.no" placeholder="请输入编号" :disabled="!!formadd.children_count"></Input>
                <p id="codeLoad">正在校验中...</p>
            </FormItem>

            <FormItem prop="name" label="名称：" :label-width="65">
                <Input type="text" v-model="formadd.name" placeholder="请输入名称"></Input>
                <p id="nameLoad">正在校验中...</p>
            </FormItem>
            <FormItem prop="des" label="简介：" :label-width="65">
                <Input v-model="formadd.intro" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入..."></Input>
            </FormItem>
            <FormItem class="formbtns">
                <Button type="ghost" @click="addcancelSubmit('formadd')">取&emsp;消</Button>
                <Button type="primary" @click="handleSubmit('formadd')" :disabled='confirmDis'>确&emsp;定</Button>
            </FormItem>
        </Form>
        </div>
        <span slot="footer">
        </span>
    </Modal>
</template>
<script>
    // import BudgetHttp from 'server/http/budget'
    import FinanceHttp from 'server/http/finance'
    import $ from 'jquery'
    export default {
        data () {
            const codeValidate = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入编号！'))
                } else {
                    $('#codeLoad').css('display', 'block')
                    var arg = {
                        id: this.formadd.id,
                        no: this.formadd.no,
                        fid: 0
                    }
                    FinanceHttp.checkNo(arg)
                        .then(() => {
                            $('#codeLoad').css('display', 'none')
                            callback()
                        })
                        .catch(() => {
                            $('#codeLoad').css('display', 'none')
                            callback(new Error('编号已存在！'))
                        })
                }
            }
            const nameValidate = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入名称！'))
                } else {
                    $('#nameLoad').css('display', 'block')
                    FinanceHttp.checkName({id: this.formadd.id, name: this.formadd.name})
                        .then(flag => {
                            $('#nameLoad').css('display', 'none')
                            callback()
                        })
                        .catch(() => {
                            $('#nameLoad').css('display', 'none')
                            callback(new Error('名称已存在！'))
                        })
                }
            }
            return {
                show: false,
                title: '',
                confirmDis: false,
                submitCount: 0,
                formadd: {
                    id: '',
                    no: '',
                    name: '',
                    intro: '',
                    pid: '0'
                },
                ruleInline: {
                    no: [
                        { required: true, validator: codeValidate, trigger: 'blur' }
                    ],
                    name: [
                        { required: true, validator: nameValidate, trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
            open (data) {
                this.show = true
                this.submitCount = 0
                if (!data) {
                    this.formadd.id = ''
                    this.formadd.no = ''
                    this.formadd.name = ''
                    this.formadd.intro = ''
                } else {
                    this.formadd = data
                    /* BudgetHttp.getGroupByCode(no).then(data => {
                        this.formadd = data
                    }) */
                }
                this.title = this.formadd.no ? '编辑科目组' : '新增科目组'
            },
            /* delete (id) {
                FinanceHttp.delete(id)
                    .then(() => {
                        this.$emit('refreshtree')
                    })
            }, */
            // 确定按钮
            handleSubmit (name) {
                this.confirmDis = true
                this.submitCount++
                this.$refs[name].validate((valid) => {
                    if (valid && this.submitCount == 1) {
                        FinanceHttp.save(this.formadd)
                            .then(() => {
                                this.$Message.success('编辑成功')
                                this.$emit('refreshtree')
                                this.confirmDis = false
                                this.show = false
                            })
                            .catch(error => {
                                this.$Message.error(error ? (error.error || error) : '发生错误，请检查与服务器的网络连接！')
                                this.confirmDis = false
                                this.submitCount = 0
                            })
                    } else {
                        this.confirmDis = false
                    }
                })
            },
            // 取消按钮
            addcancelSubmit (formadd) {
                this.$refs[formadd].resetFields()
                this.show = false
            },
            // 模态框关闭
            cancel (formadd) {
                this.$refs[formadd].resetFields()
            }
        }
    }
</script>
