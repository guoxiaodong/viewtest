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
        <Form ref="formDynamic" :label-width="120" class="scroll-form">
            <div class="m-r-20 m-l-20">
                <Row>
                    <!-- 加载整行的表单 -->
                    <Col class="m-b-10" span="12" v-for="(v, i) in formData" :key="i">
                    <FormItem :label="v.name">
                        <div>{{v.value}}</div>
                    </FormItem>
                    </Col>
                </Row>
            </div>
        </Form>
        <div class="formbtns ivu-form-item">
            <Button type="primary" @click="confirm()">确&emsp;定</Button>
        </div>
        <span slot="footer"></span>
    </Modal>
</template>
<script>
    export default {
        data () {
            return {
                showModal: false,
                formData: [],
                modalTitle: ''
            }
        },
        methods: {
            open (title, url, params) {
                this.init()
                this.showModal = true
                this.modalTitle = title || '查看'
                for (let i = 0; i < 20; i++) {
                    this.formData.push({name: '标题' + i, value: '时间标题' + i})
                }
                if (url) {
                    this.axios.get(url, params)
                        .then(res => {
                            this.formData = res.data
                        })
                        .catch(error => {
                            this.$Message.error(error.error)
                        })
                }
            },
            confirm () {
                this.showModal = false
            },
            init () {
                this.formData = []
                this.modalTitle = ''
            }
        }
    }
</script>
