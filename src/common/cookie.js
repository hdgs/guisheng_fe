//设置cookie
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}
//获取cookie
function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
    }
    return "";
}
//清除cookie  
function clearCookie(name) {  
    setCookie(name, "", -1);  
}  
function checkCookie(val) {
    var key = getCookie(val);
    if(key){
        return key;
    }else{
        return false;
    }
}
function getToken(){
        var auth = {};
        if (cookie.getCookie("token")){
            var token = btoa(cookie.getCookie("token")+":");
            //var token = cookie.getCookie("token");
            var auth = {"Authorization":"Basic "+ token};
        }
        return auth;
}

var cookie = {
    setCookie:setCookie,
    getCookie:getCookie,
    clearCookie:clearCookie,
    checkCookie:checkCookie,
    getToken:getToken
}
module.exports = cookie;