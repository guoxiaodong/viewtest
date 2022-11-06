// resize.js
export default {
    mounted () {
        this.$bindResize()
    },
    methods: {
        $bindResize () {
            this._handleResize = (e) => {
                if (this.onResize) this.onResize()
            }
            window.addEventListener('resize', this._handleResize)
        },
        $unBindResize () {
            if (this._handleResize) window.removeEventListener('resize', this._handleResize)
        }
    },
    beforeDestroy () {
        this.$unBindResize()
    }
}
