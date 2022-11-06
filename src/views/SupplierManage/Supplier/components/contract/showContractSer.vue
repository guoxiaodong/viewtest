<style>
    .itemSer { padding: 35px 50px 50px; }
    .itemSer .selectFormTemp { margin: 0 200px; position: relative; }
    .itemSer .selectFormTemp label { position: absolute; left: -90px; font-size: 14px; top: 5px; color: #464C5B; }
</style>
<template>
    <Modal v-model="addSerModal" title="添加合同内服务" :styles="{width: '90%'}" @on-cancel="cancel('formInline')">
        <div class="itemSer">
            <div class="selectFormTemp">
                <label>供应商服务：</label>
                <Select v-model="selectGroup" filterable @on-change="changeOption">
                    <OptionGroup v-for="(item, key) in group" :label="item.name" :key="item.id">
                        <Option v-for="item1 in item.service" :value="item1.id" :key="item1.id">{{ item1.title }}</Option>
                    </OptionGroup>
                </Select>
                <Poptip style="position: absolute; right: -35px; top: 5px;" trigger="hover" placement="bottom" title="供应商服务" content="选择供应商服务">
                    <span class="helpInfo"></span>
                </Poptip>
            </div>
            <div style="margin-top: 30px;">
                <label style="display: block; font-size: 14px; padding: 10px 0; color: #657180">服务项定价</label>
                <Table :columns="columns" :data="data"></Table>
            </div>
        </div>
        <div class="formbtns">
            <div class="item">
                <!-- <Button type="ghost" @click="cancel()">取&emsp;消</Button> -->
                <Button type="primary" @click="confirm()">关&emsp;闭</Button>
            </div>
        </div>
        <span slot="footer"></span>
    </Modal>
</template>
<script>
    import SupplierManageHttp from 'server/http/supplierManage'
    require('static/css/modal.css')
    export default {
        components: {
        },
        created () {
        },
        data () {
            return {
                addSerModal: false,
                confirmDis: false,
                showTable: false,
                // ifsearch: false,
                selectGroup: '',
                // url: SupplierManageHttp.map.getSerSelectInfo + '/0' + '/0',
                group: [],
                goon: true,
                valueid: '',
                columns: [
                    {
                        title: '成员',
                        key: 'name'
                    },
                    {
                        title: '单位',
                        key: 'price_unit',
                        render: (h, params) => {
                            if (params.row.price_unit == 1) {
                                return h('span', '单独')
                            } else if (params.row.price_unit == 2) {
                                return h('span', '工单间互斥单独')
                            } else {
                                return h('span', '总价折算加')
                            }
                        }
                    },
                    {
                        title: '计价方式',
                        width: 150,
                        key: 'pricing_method'
                    },
                    {
                        title: '原单价',
                        width: 150,
                        key: 'price'
                    },
                    {
                        title: '合同单价',
                        key: 'contract_price'
                    },
                    {
                        title: '原最小计价数',
                        width: 150,
                        key: 'min_count'
                    },
                    {
                        title: '合同最小计价数',
                        key: 'contract_count'
                    }
                ],
                data: []
            }
        },
        methods: {
            open (serviceid) {
                this.addSerModal = true
                SupplierManageHttp.getSerSelect(this.$route.params.id).then((data) => {
                    this.group = data.SupplierServiceList
                })
                this.selectGroup = serviceid
            },
            changeOption (value) {
                this.valueid = value
                let url = SupplierManageHttp.map.getSerSelectInfo + '/' + this.$route.params.sid + '/' + value
                this.axios.get(url).then((response) => {
                    return response.data
                }).then((data) => {
                    this.data = data.data
                }).catch((error) => {
                    this.$Message.error(error.error)
                })
                // this.url = SupplierManageHttp.map.getSerSelectInfo + '/' + this.$route.params.sid + '/' + value
                // this.refresh()
            },
            confirm () {
                this.addSerModal = false
            },
            cancelSubmit (formInline) {
                this.addSerModal = false
            },
            // 模态框关闭
            cancel (formInline) {
                this.addSerModal = false
            }
        }
    }
</script>
