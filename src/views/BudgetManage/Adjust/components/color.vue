<style>
    .me-def .ivu-modal-footer
    {
        padding:12px 18px 12px 18px;
    }
    .me-def .ivu-modal-body{
        padding: 16px;
    }
    .wo-status-title{
        font-size: 14px;
        color: #657180;
        line-height: 21px;
    }
    .color-item{
        font-size: 12px;
        color: #657180;
    }
</style>
<template>
    <!-- <Modal v-model="show" title="图表配置" @on-ok="ok" @on-cancel="cancel" class="me-def" width="350px"> -->
    <Modal v-model="show" title="图表配置" class="me-def">
        <div>
            <div class="wo-status-title">
                <Row>
                    <Col span='12' style="text-align: center; height: 30px; line-height: 30px; background-color: #F5F7F9">工单状态</Col>
                    <Col span='12' style="text-align: center; height: 30px; line-height: 30px; background-color: #F5F7F9">颜色</Col>
                    <div class="clear" style="height: 10px;"></div>
                    <Row v-for="(item,index) in colorData.user" :key="index" style="text-align: center; margin: 10px 0;" class="color-item">
                        <Col span='12'>{{item.name}}：</Col><Col span='12'><input type="color" v-model="item.budget_chart_color" style="margin-left: 10px"/></Col>
                    </Row>
                </Row>
            <!-- <span>工单状态&nbsp;&nbsp;&nbsp;&nbsp;颜色</span>&nbsp;&nbsp;&nbsp;&nbsp;<a @click="reset" style="float:right">恢复默认配置</a> -->
            </div>

            <div id="test">
            </div>
            <div class="formbtns">
                <Button type="ghost" @click="cancel()">取&emsp;消</Button>
                <Button type="primary" @click="ok()">确&emsp;定</Button>
            </div>
        </div>
        <span slot="footer"></span>
    </Modal>
</template>
<script>
    import _ from 'lodash'
    export default {
        components: {},
        data () {
            return {
                show: false,
                colorData: Object.create(null)
            }
        },
        created () {
        },
        mounted () {
        },
        methods: {
            open (data) { // 获取科目（组）数据
                this.show = true
                this.colorData = data
            },
            ok () {
                var temp = []
                this.colorData.user.forEach(item => {
                    temp.push(_.pick(item, ['id', 'budget_chart_color']))
                })
                this.$emit('colorCallback', {colors: temp})
                this.show = false
            },
            cancel () {
                this.show = false
            },
            reset () {
                this.colorData.user = this.colorData.default
            }
        },
        watch: {
            search (v) {
                this.ztreeSearch(this.ztreeObj, this.treeData, v)
            }
        }
    }
</script>
