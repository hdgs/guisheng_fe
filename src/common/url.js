export default {
    getUrlComponent (params) {
    	// my attempt
    	// var str = ""
    	// for(key in params){
    	// 	str += key + "="+params[key] + "&"
    	// }
    	// return str.slice(0,str.length-1)

   		// a more elegent way
    	var esc = encodeURIComponent
    	return Object.keys(params)
    			.map(k => esc(k) + "=" + esc(params[k]))
    			.join("&")
    }
}