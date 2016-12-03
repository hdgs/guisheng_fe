export default {
    bind: function(el, binding, vnode) {
    	//el.addEventListener("blur",binding.value)
    },
    unbind:function(el, binding){
    	//el.removeEventListener("blur",binding.value)
    },
    update:function(el, binding){
    	console.log(binding.value, binding.oldValue)
    	if (binding.value !== binding.oldValue && binding.value == true)
    		el.focus()
    }
}