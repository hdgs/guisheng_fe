export default {
    update: function(el, binding, vnode, oldVnode) {
        if (binding.value == true)
            el.innerHTML = ""
    }
}
