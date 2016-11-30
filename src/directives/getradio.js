export default {
    inserted: function(el, binding, vnode) {
    	binding.value(el.width/el.height, Array.prototype.slice.call(el.parentNode.childNodes).indexOf(el))
    }
}