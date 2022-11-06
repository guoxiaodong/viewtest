export default {
    bind (el, binding, vnode) {
        let num = 0
        let timer = ''
        function clickHandler (e) {
            timer = setTimeout(function () {
                if (e.which == 1) {
                    num++
                    if (num == 2) {
                        num = 0
                        if (binding.expression) {
                            binding.value(e)
                        }
                    }
                    clickHandler(e)
                }
            }, 100)
        }
        function removeHandler (e) {
            clearTimeout(timer)
        }
        el.__vueMousedown__ = clickHandler
        el.__vueMouseout__ = removeHandler
        el.addEventListener('mousedown', el.__vueMousedown__)
        el.addEventListener('mouseup', el.__vueMouseout__)
        el.addEventListener('mouseout', el.__vueMouseout__)
    },
    unbind (el, binding) {
        el.removeEventListener('mousedown', el.__vueMousedown__)
        el.removeEventListener('mouseup', el.__vueMouseout__)
        el.removeEventListener('mouseout', el.__vueMouseout__)
    }
}
