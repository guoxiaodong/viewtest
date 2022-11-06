<template>
    <Transfer
        :data="data"
        :target-keys="targetKeys"
        :render-format="render"
        :list-style="listStyle"
        :titles="['未授权角色：', '已授权角色：']"
        @on-change="handleChange"></Transfer>
</template>
<script>
    export default {
        data () {
            return {
                data: [
                    { 'key': '1', 'label': '用户', 'disabled': false },
                    { 'key': '2', 'label': '修改个人信息', 'disabled': false },
                    { 'key': '3', 'label': '用户管理', 'disabled': false },
                    { 'key': '4', 'label': '个人详情', 'disabled': false },
                    { 'key': '5', 'label': '一层', 'disabled': false },
                    { 'key': '6', 'label': '二层', 'disabled': false },
                    { 'key': '7', 'label': '事件', 'disabled': false },
                    { 'key': '8', 'label': '问题', 'disabled': false },
                    { 'key': '9', 'label': '工单', 'disabled': false },
                    { 'key': '10', 'label': '占位', 'disabled': false }
                ],
                targetKeys: ['1', '2', '3'],
                listStyle: {
                    width: '47%',
                    height: '400px'
                }
            }
        },
        methods: {
            render (item) {
                return item.label
            },
            handleChange (newTargetKeys, direction, moveKeys) {
                // console.log(newTargetKeys)
                // console.log(direction)
                // console.log(moveKeys)
                this.targetKeys = newTargetKeys
            }
        }
    }
</script>
