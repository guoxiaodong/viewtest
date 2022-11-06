<style>
    .modalTop{
        z-index: 1005;
        position: absolute;
    }
    .serviceQuery .ivu-modal-footer{
        padding:12px 18px 12px 18px;
    }
</style>
<template>
    <div class="serviceQuery-stepOne">
        <Modal  class="serviceQuery" v-model="editStep" title='' @on-cancel="" width="1000" :closable="false" :mask-closable="false" :loading="true">
            <Tabs value="name1">
                <TabPane :label="label1" name="name1"><!--基本信息(步骤一)-->
                    <one ref="one" @check="checksubmit"></one>
                </TabPane>
                <TabPane :label="label2" name="name2"><!--服务项(步骤二)-->
                    <two ref="two"></two>
                </TabPane>
                <TabPane :label="label3" name="name3"><!--服务等级(步骤三)-->
                    <three ref="three"></three>
                </TabPane>
                <TabPane :label="label4" name="name4"><!--供应商(步骤四)-->
                    <four ref="four"></four>
                </TabPane>
            </Tabs>
            <div slot="footer">
                <Button type="primary" @click="cancel()">取消</Button>
            </div>
        </Modal>
    </div>
</template>
<script>
    //    import $ from 'jquery'
    import One from './one.vue'
    import Two from './two.vue'
    import Three from './three.vue'
    import Four from './four.vue'
    require('static/css/datatable.css')
    require('static/css/modal.css')
    export default {
        components: {
            One,
            Two,
            Three,
            Four
        },
        data () {
            return {
                editStep: false,
                id: '',
                check: true,
                label1: (h) => {
                    return h('div', [
                        h('span', {
                            style: {
                                'font-size': '16px'
                            }
                        }, '基本信息'),
                        h('span', {
                            style: {
                                'font-size': '12px'
                            }
                        }, '（步骤一）')
                    ])
                },
                label2: (h) => {
                    return h('div', [
                        h('span', {
                            style: {
                                'font-size': '16px'
                            }
                        }, '服务项'),
                        h('span', {
                            style: {
                                'font-size': '12px'
                            }
                        }, '（步骤二）')
                    ])
                },
                label3: (h) => {
                    return h('div', [
                        h('span', {
                            style: {
                                'font-size': '16px'
                            }
                        }, '服务等级'),
                        h('span', {
                            style: {
                                'font-size': '12px'
                            }
                        }, '（步骤三）')
                    ])
                },
                label4: (h) => {
                    return h('div', [
                        h('span', {
                            style: {
                                'font-size': '16px'
                            }
                        }, '供应商'),
                        h('span', {
                            style: {
                                'font-size': '12px'
                            }
                        }, '（步骤四）')
                    ])
                }
            }
        },
        methods: {
            open (id) {
                this.id = id
                this.editStep = true
                this.$refs.one.open(id)
                this.$refs.two.open(id)
                this.$refs.three.open(id)
                this.$refs.four.open(id)
            },
            cancel () {
                this.$refs.one.cancel()
                if (this.check == false) {
                    this.$Modal.warning({
                        title: '',
                        content: '步骤一有未提交的更改，确认返回吗？',
                        onOk: () => {
                            this.$emit('refresh')
                            this.editStep = false
                        }
                    })
                } else {
                    this.editStep = false
                }
            },
            checksubmit (bool) {
                this.check = bool
            }
        },
        mounted () {
        }
    }
</script>
