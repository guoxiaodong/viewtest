<style>
    .formModal .ivu-modal .ivu-select-dropdown {
        position: fixed !important;
    }
</style>
<template>
    <Modal class="formModal" v-model="showModal" :styles="{width: '90%'}" :title="printTitle"
           @on-cancel="cancel()">
        <div id="print-area" class="m-r-20 m-l-20">
            <Row>
                <Col class="m-b-10" v-for="(v, k) in printObj" span="12" :key="k" v-if="!isImage(v.text)">
                    <Col class="m-b-10 text-right" span="8">
                        {{v.property.name}} :
                    </Col>
                    <Col class="m-b-10" span="16">
                        {{v.text || '暂无'}}
                    </Col>
                </Col>
            </Row>
        </div>
        <div class="formbtns ivu-form-item">
            <Button type="ghost" @click="cancel()">取&emsp;消</Button>
            <Button type="primary" :disabled="!printObj.length" @click="printCard()">确&emsp;定</Button>
        </div>
    </Modal>
</template>
<script>
    import $ from 'jquery'
    import AssetHttp from '@/server/http/assetManage'
    import pattern from '@/util/pattern.js'
    require('static/plugin/print/jqprint.js')

    export default {
        data () {
            return {
                showModal: false,
                printObj: [],
                printTitle: ''
            }
        },
        methods: {
            open (printTitle, id, params = {}) {
                this.showModal = true
                this.printTitle = printTitle
                AssetHttp.getAssetDetail(id)
                    .then(data => {
                        this.printObj = data.specs
                    })
                    .catch(error => {
                        this.$Message.error(error)
                    })
//                this.axios.get(AssetManageRoute.assetDetail, {params: params})
//                    .then(res => {
//                        let result = res.data
//                        this.printObj = result.specs
//                    })
//                    .catch(error => {
//                        this.$Message.error(error.error)
//                    })
            },
            printCard () {
                $('#print-area', this.$el).jqprint({
                    debug: false,
                    importCSS: true,
                    printContainer: true,
                    operaSupport: false
                })
            },
            isImage (value) {
                return pattern.imagePattern.test(value)
            },
            // 模态框关闭
            cancel () {
                this.showModal = false
            }
        }
    }
</script>
