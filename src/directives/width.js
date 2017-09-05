export default {
    bind: function(el, binding, vnode) {
        binding.value(document.body.clientWidth, window.screen.height)
    }
}