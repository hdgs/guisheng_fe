<template>
    <div :class="$style.go">
        登录中......
    </div>
</template>
<script>
import 'whatwg-fetch'
import Cookie from '../common/cookie.js'
import FETCH from '../common/fetch.js'

export default {
    mounted() {
        var email = window.location.href.split('?')[1].split('=')[1]
        fetch("/api/v1.0/login/", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: "muxistudio304"
            })
        }).then(res => {
            if (res.ok) {
                return res.json()
            } else {
                FETCH.FetchData("https://user.muxixyz.com/api/user/?email=" + email, "GET").then(value => {
                    FETCH.FetchData("/api/v1.0/register/", "POST", {
                        email: email,
                        password: "muxistudio304",
                        username: value.username
                    }).then(value => {
                        FETCH.FetchData("/api/v1.0/login/", "POST", {
                            email: email,
                            password: "muxistudio304",
                        }).then(value => {
                            Cookie.setCookie("token", value.token)
                            Cookie.setCookie("uid", value.uid)
                        })
                    })
                })
            }
        }).then(value => {
            Cookie.setCookie("token", value.token)
            Cookie.setCookie("uid", value.uid)
        })
        setTimeout(() => {
            window.history.go(-2);
        }, 2000)
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
