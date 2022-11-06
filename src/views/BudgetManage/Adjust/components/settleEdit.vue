<style>
    .me-def .ivu-modal-footer
    {
        padding:0 30px 12px 18px;
    }
/*    .me-def .ivu-modal-body{
        padding: 16px;
    }*/
</style>
<template>
    <Modal v-model="show" title="结算时间调整" @on-ok="ok" @on-cancel="cancel" class="me-def" width="341px">
        <div>
            <Form ref="formData" :model="wo"><!--:rules="ruleValidate"-->
                <FormItem label="工单编号：" :label-width="90">
                    <span>{{wo.workorderid}}</span>
                </FormItem>
                <FormItem label="金额：" :label-width="90">
                    <span>{{wo.money}}</span>
                </FormItem>
                <FormItem label="结算时间：" :label-width="90">
                    <DatePicker type="datetime" v-model="wo.settle_account_time" placeholder="请选择结算时间" format="yyyy-MM-dd HH:mm"></DatePicker>
                </FormItem>
            </Form>
            <!--<div>{{wo.title}}</div>-->
            <!--<div>工单编号：{{wo.workorderid}}</div>-->
            <!--<div>金额：{{wo.money}}</div>-->
            <!--<div>结算时间：<DatePicker type="datetime" v-model="wo.settle_account_time" placeholder="请选择结算时间" format="yyyy-MM-dd HH:mm"></DatePicker></div>-->
        </div>
    </Modal>
</template>
<script>
    import _ from 'lodash'
    export default {
        components: {
        },
        data () {
            return {
                show: false,
                wo: Object.create(null)
            }
        },
        methods: {
            open (data) {
                this.show = true
                if (data) {
                    this.wo = data
                }
            },
            ok () {
                var result = _.pick(this.wo, ['id', 'settle_account_time'])
                this.$emit('settleCallback', result)
                this.show = false
            },
            cancel () {
                this.show = false
            }
        }
    }
</script>
