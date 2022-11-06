 // scroll.js
 export default {
     props: {
         scroller: {
             type: [HTMLDocument, Element, Window],
             default () {
                 return window
             }
         }
     },
     methods: {
         $bindScroll () {
             this._handleScroll = (e) => {
                 if (this.onScroll) this.onScroll()
             }
             this.scroller.addEventListener('scroll', this._handleScroll)
         },
         $unbindScroll () {
             if (this._handleScroll) this.scroller.removeEventListener('scroll', this._handleScroll)
         }
     },
     beforeDestroy () {
         this.$unbindScroll()
     }
 }
