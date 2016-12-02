export default {
    bind: function(el, binding, vnode) {
    	binding.value(window.screen.width,window.screen.height)
    }
}