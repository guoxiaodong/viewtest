// dot.js
import { removeAllClass } from '@/util/assist'
import scroll from '@/mixins/scroll'
export default {
    mixins: [ scroll ],
    data () {
        return {
            dots: [],
            dothigh: []
        }
    },
    methods: {
        $go (index, tag) {
            const content = document.getElementById('content')
            let jump = content.getElementsByTagName(tag)
            let total = jump[index].offsetTop// Chrome
            document.body.scrollTop = total// Firefox
            document.documentElement.scrollTop = total// Safari
            window.pageYOffset = total
        },
        $addnav () {
            this.dots = []
            this.dothigh = []
            this.$unbindScroll()
            const content = document.getElementById('content')
            let h2index = 0
            for (let v of content.children) {
                if (v.tagName == 'H1') {
                    this.dothigh.push(v.offsetTop)
                    this.dots.push({'title': v.innerHTML, 'children': []})
                }
                if (v.tagName == 'H2') {
                    this.dothigh.push(v.offsetTop)
                    this.dots[this.dots.length - 1].children.push({'title': v.innerHTML, 'index': h2index++})
                }
            }
            if (this.dothigh.length) {
                this.$bindScroll()
            }
        },
        onScroll () {
            let nowtop = document.body.scrollTop
            let index = -1
            for (let i = 0; i < this.dothigh.length; i++) {
                if (nowtop <= this.dothigh[i]) {
                    index = i
                    break
                }
            }
            if (index == -1) index = this.dothigh.length - 1
            const content = document.getElementById('nav')
            let lidom = content.getElementsByTagName('li')
            removeAllClass(lidom, 'on')
            lidom[index].classList.add('on')
        }
    }
}
