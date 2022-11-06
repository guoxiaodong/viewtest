<template>
    <div class="log">
        <div class="header">
            HiFM-卓越的设备设施管理平台
        </div>
        <div class="ewm">
            <img :src="qrcodeimage" width="175" height="175" />
            <a :href="url" target="_blank">
               <i class="andr"></i>
               移动端下载<p>Android</p>
            </a>
        </div>
        <div class="form">
            <p class="form-title">请登录</p>
            <div class="form-log">
                <Form ref="formInline" :model="formInline" :rules="ruleInline" >
                    <FormItem prop="phone">
                        <Input type="text" v-model="formInline.phone" placeholder="请输入用户名" autofocus >
                            <Icon slot="prepend" class="form-log-icon form-log-user"></Icon>
                        </Input>
                    </FormItem>
                    <FormItem prop="password">
                        <Input type="password" v-model="formInline.password" placeholder="请输入密码" >
                            <Icon slot="prepend" class="form-log-icon form-log-pwd"></Icon>
                        </Input>
                    </FormItem>
                    <FormItem>
                        <Checkbox v-model="remember"><span class="form-log-check">记住密码</span></Checkbox>
                    </FormItem>
                    <FormItem>
                        <Button type="primary" @click="handleSubmit('formInline')" long class="form-log-btn">登录</Button>
                    </FormItem>
                </Form>
            </div>
        </div>
        <div class="footer">
            EMTD HiFMCloud.com © 2017-2018 京ICP备17009400号-6
        </div>
    </div>
</template>
<script>
    import Vue from 'vue'
    import Androidlink from '@/api/Androidlink'
    import base64 from '@/util/base64'
    import CommonHttp from 'server/http/common'
    require('static/css/login.css')
    export default {
        created () {
            this.list()
            this.remember = localStorage.ifm_remember == 1
            if (this.remember) {
                this.formInline.password = base64.decode(localStorage.ifm_login_password)
                this.formInline.phone = localStorage.ifm_login_phone
            }
            document.onkeydown = () => {
                if (event.keyCode == 13) {
                    this.handleSubmit('formInline')
                }
            }
        },
        destroyed () {
            document.onkeydown = false
        },
        data () {
            const validateName = (rule, value, callback) => {
                if (value.replace(/\s+/g, '') == '') {
                    callback(new Error('请输入用户名'))
                } else {
                    callback()
                }
            }
            const validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'))
                } else {
                    if (value.length < 6) {
                        callback(new Error('密码长度不能小于6位'))
                    }
                    callback()
                }
            }
            return {
                url: '',
                qrcodeimage: '',
                remember: false,
                formInline: {
                    phone: '',
                    password: ''
                },
                ruleInline: {
                    phone: [
                        { required: true, validator: validateName, trigger: 'blur' }
                    ],
                    password: [
                        { required: true, validator: validatePass, trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
            handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.$store.dispatch('login', this.formInline).then(() => {
                            if (this.$store.state.loginUser.loginFlag === 1) {
                                this.$Message.success('登录成功')
                                if (this.remember) {
                                    localStorage.ifm_login_password = base64.encode(this.formInline.password)
                                    localStorage.ifm_login_phone = this.formInline.phone
                                    localStorage.ifm_remember = 1
                                } else {
                                    localStorage.ifm_remember = 0
                                }
//                                获取全局的配置数据
                                CommonHttp.getConfig()
                                    .then(reData => {
                                        Vue.prototype.globalConfig = reData
                                    })
                                    .catch(error => {
                                        this.$Message.warning('请求配置数据出错！' + (error.error || error))
                                    })
                                location.href = '/#/organization/role'
                            } else {
                                this.$Message.error(this.$store.state.loginUser.error.message)
                            }
                        }).catch((error) => {
                            this.$Message.error(error)
                        })
                    } else {
                        // this.$Message.error('用户名或者密码错误!')
                    }
                })
            },
            list () {
                this.axios.get(Androidlink.LINK).then((response) => {
                    this.url = response.data.url
                    this.qrcodeimage = response.data.qrcodeimage
                })
            }
        }
    }
</script>
