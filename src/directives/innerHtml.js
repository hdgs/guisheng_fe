export default {
    bind: function(el, binding) {
    	// console.log(el.innerHTML)
    	// document.addEventListener("onkeyup",console.log("huahuah"))
    	// document.addEventListener("onkeydown",console.log(el.innerHTML))
    	document.onkeyup = function(){
    		binding.value(el.innerHTML)
    	}
    }
}
