<template>
    <Modal v-model="show" title="删除">
        <div class="">
            <div class="item" style="word-break: break-all;">
                <Alert type="warning" show-icon>
                    {{strDesc}}
                </Alert>
            </div>
        </div>
        <div class="formbtns">
            <div class="item">
                <Button type="ghost" @click="cancel()">取&emsp;消</Button>
                <Button type="primary" @click="delbtn()" v-show="flag">确&emsp;定</Button>
            </div>
        </div>
        <span slot="footer"></span>
    </Modal>
</template>
<script>
    import FinanceHttp from 'server/http/finance'
    import _ from 'lodash'
    export default {
        data () {
            return {
                show: false,
                id: '',
                strDesc: '确定要删除吗？',
                flag: false
            }
        },
        methods: {
            open (id) {
                this.id = id
                // 先获取，后删
                FinanceHttp.getFinanceDetail(id).then((data) => {
                    // 科目 科目组 分开区别
                    // 科目
                    if (data.fid) {
                        if (data.services && data.services.length > 0) {
                            this.strDesc = '该项下面存在服务项: ' + _.map(data.services, 'title') + ',不可删除！'
                            this.flag = false
                        } else {
                            this.flag = true
                            this.strDesc = '确定要删除吗？'
                        }
                    } else { // 科目组
                        this.flag = true
                        this.strDesc = '确定要删除吗？'
                    }
                    this.show = true
                })
                    .catch(error => {
                        this.$Message.error(error ? (error.error || error) : '发生错误，请检查与服务器的网络连接！')
                    })
            },
            cancel () {
                this.show = false
                this.flag = false
                this.strDesc = ''
            },
            delbtn () {
                FinanceHttp.delete(this.id)
                    .then(() => {
                        this.$Message.success('删除成功')
                        this.show = false
                        this.$emit('refreshtree')
                    })
                    .catch(error => {
                        this.$Message.error(error ? (error.error || error) : '发生错误，请检查与服务器的网络连接！')
                        this.show = false
                    })
            }
        }
    }
</script>
