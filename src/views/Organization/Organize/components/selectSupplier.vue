<template>
    <Select v-model="supplier_id" filterable @on-change="supplierChange" style="width: 300px">
        <Option v-for="item in supplierList" :value="item.id" :key="item.id">{{ item.name }}</Option>
    </Select>
</template>
<script>
    import GroupHttp from 'server/http/group'
    export default {
        created () {
            GroupHttp.groupSupplierlist().then((data) => {
                this.supplier_id = data[0].id
                this.supplierList = data
            })
        },
        data () {
            return {
                supplier_id: '',
                supplierList: []
            }
        },
        methods: {
            supplierChange (data) {
                this.$emit('supplierChange', data)
            }
        }
    }
</script>
