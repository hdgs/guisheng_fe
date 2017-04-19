<template>
    <div :class="$style.go">跳转中......</div>
</template>
<script>
import 'whatwg-fetch'
import Cookie from '../common/cookie.js'
import FETCH from '../common/fetch.js'

export default {
    mounted() {
        // Cookie.setCookie("token", "value.token", 3000)
        // Cookie.setCookie("email", "799414444@qq.com", 3000)
        // Cookie.setCookie("uid", "4", 3000)
        FETCH.FetchData("/api/v1.0/login","POST",{
                email: Cookie.getCookie("email"),
                password:"1234"
            }).then(value => {
            console.log(value)
            Cookie.setCookie("token", value.token, 3000)
            Cookie.setCookie("uid", value.uid, 3000)
            setTimeout(() => {
                window.location = "/"
            }, 2000)
        })
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
