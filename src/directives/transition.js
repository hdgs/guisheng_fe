let changeState = function(){
	Array.prototype.slice.call(arguments)[0]()
}
export default {
    bind: function(el, binding, vnode) {
    	el.addEventListener("transitionend",changeState.bind({},binding.value))
},

    unbind: function() {
        el.removeEventListener("transitionend", changeState)
    }
}
