export default {
    bind (el, binding, vnode) {
        function documentHandler (e) { //  当前点击元素
            if (el.contains(e.target)) { //  查看当前点击的dom对象是否在el之内
                return false
            }
            if (binding.expression) { // 绑定的方法名
                binding.value(e) // 运行绑定函数，e可以省略，但最好把点击的元素给传出去
                // 所有外面绑定的函数可以有一个参数也可以没有
            }
        }
        el.__vueClickOutside__ = documentHandler //  给el绑定一个方法
        document.addEventListener('mouseover', documentHandler) //  document添加监听事件
    },
    unbind (el, binding) {
        document.removeEventListener('mouseover', el.__vueClickOutside__)
        delete el.__vueClickOutside__
    }
}
