<template>
    <div :class="$style.go">登录中......</div>
</template>
<script>
import 'whatwg-fetch'
import Cookie from '../common/cookie.js'
import FETCH from '../common/fetch.js'

export default {
    mounted() {
        Cookie.setCookie("email", "1234@qq.com", 3000)
        FETCH.FetchData("/api/v1.0/login/","POST",{
                email: Cookie.getCookie("email"),
                password:"1234"
            }).then(value => {
            console.log(value)
            Cookie.setCookie("token", value.token)
            Cookie.setCookie("uid", value.uid)
        // Cookie.setCookie("uid", 2)
            setTimeout(() => {
                window.history.back(-1);
            }, 2000)
        })
        Cookie.setCookie("uid", 2)
    }
}
</script>
<style lang='sass' module>
.go {
    width: 100%;
    text-align: center;
    margin-top: 40px;
}
</style>
