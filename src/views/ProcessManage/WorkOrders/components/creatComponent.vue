<template>
    <div>
        <span class="aaaa" @click="bb">aaaa</span>
        <DatePicker size="small" type="date" :options="options3" @on-change="cc" placeholder="Select date"></DatePicker>
        <DatePicker size="small" type="date" :options="options3" placeholder="Select date"></DatePicker>
    </div>
</template>
<script>
    import $ from 'jquery'
    export default {
        created () {
            // let da = 'EWF' + (new Date()).valueOf().toString() + parseInt(Math.random()*9+10)
            // console.log(da)
            // var d = new Date('Wed Jan 10 2018 00:00:00 GMT+0800 (中国标准时间)')
            // console.log(d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate())
            this.bb()
        },
        data () {
            return {
                options3: {
                    disabledDate (date) {
                        return date && date.valueOf() < Date.now() - 86400000
                    }
                }
            }
        },
        methods: {
            bb () {
                console.log(22222)
                $('.aaaa').css('color', '#f00')
            },
            cc (date) {
                console.log(date)
            }
        }
    }
</script>
