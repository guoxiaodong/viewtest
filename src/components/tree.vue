<template>
        <div class="item">
               <Tree :data="baseData" show-checkbox></Tree>
        </div>
</template>
<script>
    export default {
        data () {
            return {
                baseData: [{
                    expand: true,
                    title: '用户',
                    children: [{
                        title: 'parent 1-0',
                        expand: true,
                        checked: false,
                        children: [{
                            title: 'leaf'
                            // disableCheckbox: true
                        }, {
                            title: 'leaf'
                        }]
                    }, {
                        title: 'parent 1-1',
                        expand: true,
                        checked: false,
                        children: [{
                            title: '<span style="color: red">leaf</span>'
                        }, {
                            title: '11'
                        }, {
                            title: '22'
                        }, {
                            title: '33'
                        }, {
                            title: '44'
                        }, {
                            title: '55'
                        }, {
                            title: '66'
                        }, {
                            title: '77'
                        }, {
                            title: '88'
                        }, {
                            title: '99'
                        }, {
                            title: '111'
                        }]
                    }]
                }]
            }
        }
    }
</script>
