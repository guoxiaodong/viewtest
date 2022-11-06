<style>
    .modalTop{
        z-index: 1005;
        position: absolute;
    }
    .internalQuery .ivu-steps-horizontal{
        margin-left: 25%;
        width: 65%;
    }
    .internalQuery .demo-upload-list{
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
    .internalQuery .demo-upload-list img{
        width: 100%;
        height: 100%;
    }
    .internalQuery .demo-upload-list-cover{
        display: none;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(0,0,0,.6);
    }
    .internalQuery .demo-upload-list:hover .demo-upload-list-cover{
        display: block;
    }
    .internalQuery .demo-upload-list-cover i{
        color: #fff;
        font-size: 20px;
        cursor: pointer;
        margin: 0 2px;
    }
    .internalQuery .uploadPic{
        width: 300px;
        height: 100px;
    }
    .internalQuery .ivu-form-item{
        width: 500px;
    }
    .ivu-modal .fixed div.ivu-select-dropdown{
        position: fixed!important;
    }
    .internalQuery .ivu-modal-footer{
        padding:12px 18px 12px 18px;
    }
</style>
<template>
    <div class="internalService-stepOne">
        <Modal  class="internalQuery" v-model="editStep" title='' @on-cancel="" width="1000" :closable="false" :mask-closable="false" :loading="true">
            <Tabs value="name1">
                <TabPane label="步骤一" name="name1">
                <one ref="one" @check="checksubmit"></one>
                </TabPane>
                <TabPane label="步骤二" name="name2">
                    <two ref="two"></two>
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
    require('static/css/datatable.css')
    require('static/css/modal.css')
    export default {
        components: {
            One,
            Two
        },
        data () {
            return {
                editStep: false,
                id: '',
                check: true
            }
        },
        methods: {
            open (id) {
                this.id = id
                this.editStep = true
                this.$refs.one.open(id)
                this.$refs.two.open(id)
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
