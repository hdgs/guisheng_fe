export default {
    update: function(el, binding, vnode, oldVnode) {
        if (binding.value == true) {
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = "scroll"
        }
    }
}