<template>
    <canvas id='org-canvas' width='width' height='height' :style='style'></canvas>
</template>
<script>
    export default {
        mounted () {
            this.canvas = document.getElementById('org-canvas')
            this.ctx = this.canvas.getContext('2d')
            this.init()
        },
        data () {
            return {
                width: 200,
                height: 200,
                url: 'http://baidu.com',
                style: {
                    border: '1px solid #ccc'
                },
                canvas: {},
                ctx: {},
                everyLeft: [],
                orgData: [
                    {
                        id: 1,
                        name: '北京',
                        pid: 0
                    },
                    {
                        id: 2,
                        name: '大连',
                        pid: 0
                    },
                    {
                        id: 3,
                        name: '环洋',
                        pid: 1
                    }
                ]
            }
        },
        methods: {
            init () {
                this.ctx.font = '20px Arial'

                // this.ctx.fillStyle = '#FF0000'
                // this.ctx.fillRect(0, 0, 70, 40)

                // this.ctx.fillStyle = '#000'
                // this.ctx.fillText('北京', 15, 27)

                this.drawText('北京', 30, 40)

                // this.ctx.fillStyle = '#cccccc'
                // this.ctx.fillRect(-100, 0, 150, 75)
                this.handleData(0)

                console.log(this.orgData)
                this.resize(600, 200)
            },
            handleData (pid, level = 0) {
                if (typeof this.everyLeft[level] == 'undefined') {
                    this.everyLeft[level] = 0
                }
                let data = this.getChildren(pid)

                if (data.length > 0) {
                    for (let v of data) {
                        v.level = level
                        this.handleData(v.id, level + 1)
                    }
                }
            },
            getChildren (pid) {
                let children = []

                for (let v of this.orgData) {
                    if (v.pid == pid) {
                        children.push(v)
                    }
                }

                return children
            },
            drawText (text, x, y) {
                let txtLength = text.length
                let width = 20 * txtLength + 30

                this.ctx.fillStyle = '#FF0000'
                this.ctx.fillRect(x, y, width, 40)

                this.ctx.fillStyle = '#000'

                this.ctx.fillText(text, x + 15, y + 27)
            },
            resize (w, h) {
                let img = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height)
                this.canvas.width = w
                this.canvas.height = h
                this.ctx.putImageData(img, 0, 0)
            }
        }
    }
</script>
