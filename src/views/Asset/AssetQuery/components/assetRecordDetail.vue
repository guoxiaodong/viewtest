<style>
    .formModal .ivu-modal .ivu-select-dropdown { position: fixed!important; }
</style>
<template>
    <Modal class="formModal"  v-model="showModal" :styles="{width: '90%'}" title="资产基本信息" @on-cancel="cancel('formDynamic')">
        <span slot="footer"></span>
    </Modal>
</template>
<script>
    import assetManageRoute from 'server/route/assetManage'
    export default {
        data () {
            return {
                showModal: false
            }
        },
        methods: {
            open (typeid) {
                this.showModal = true
                this.formDynamic.typeid = typeid
                this.submitCount = 0
            },
            handleSubmit (name) {
                this.confirmDis = true
                this.submitCount ++
                this.$refs[name].validate((valid) => {
                    if (valid && this.submitCount == 1) {
                        console.log(assetManageRoute)
                    } else {
                        this.submitCount = 0
                        this.confirmDis = false
                    }
                })
            },
            handleReset (name) {
                this.cancel(name)
                this.confirmDis = false
                this.submitCount = 0
            },
            addGroup () {
                // if (this.groupNumber >= this.groupMaxNumber) {
                //     this.$Message.error('标准项组已全选')
                //     return
                // }
                this.groupNumber ++
                //     this.createGroupStatus = false
                // }
                this.formDynamic.items.push({
                    groupid: 0,
                    standards: [
                        {
                            value: ''
                        }
                    ]
                })
            },
            addOption (index) {
                // ManageObjectHttp.getGroupInfo(this.pid).then((data) => {
                //     this.groupInfo = data.data
                // })
                this.formDynamic.items[index].standards.push({
                    value: ''
                })
            },
            groupChange (v) {
            },
            searchStandard (v, index) {
                this.search = v
                setTimeout(() => {
                    if (this.search != v) {
                        return
                    }
                    this.standars = []
                }, 1000)
            },
            standardRemove (index, k) {
                if (this.formDynamic.items[index].standards.length == 1) {
                    this.$Message.error('每个标准组下请至少添加一个标准项!')
                } else {
                    this.formDynamic.items[index].standards.splice(k, 1)
                    this.formDynamic.items[index].standards.forEach((v, key) => {
                        let refName = 'standard_' + index + '_' + key
                        this.$refs[refName][0].setQuery(v.value)
                    })
                }
            },
            groupRemove (index) {
                if (!this.createGroupStatus) {
                    this.createGroupStatus = true
                }
                this.groupNumber --
                this.formDynamic.items.splice(index, 1)
            },
            // 模态框关闭
            cancel (formDynamic) {
                this.$refs[formDynamic].resetFields()
                this.formDynamic = {
                    objectname: '',
                    typeid: 0,
                    group: [],
                    items: []
                }
                this.showModal = false
            }
        }
    }
</script>
