<template>
    <div :class="$style.suggestMask">
        <div :class="$style.returnCard" >
            <div v-show = "flag">退出登录后，将不能发表评论和收藏内容。确认退出？</div>
            <div :class="$style.returnButton" v-on:click="exit" v-show = "flag">退出</div>
            <div :class="$style.returnButton" v-on:click="quit" v-show = "flag">取消</div>
            <div :class = "$style.returnContent" v-show = "!flag">您只能访问作者个人中心哦~</div>
        </div>
        
    </div>
</template>
<script>
import Cookie from '../../common/cookie.js'

export default {
    data(){
        return{
            flag:false
        }
    },
    methods: {
        quit() {
            this.$parent.returnIt = false
        },
        exit() {
            Cookie.delCookie("token")
            Cookie.delCookie("uid")
            window.location = "/"
        }
    }
}
</script>
<style lang ="sass" module>
@import '../../scss/color.scss';
.suggestMask {
    position: fixed;
    top: 0;
    bottom: 0;
    width: 100%;
    background-color: rgba(51, 51, 51, 0.85);
}

.returnCard {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 250px;
    height: 90px;
    background-color: $white;
    color: $black;
    padding: 15px;
    border-radius: 2px;
    transform: translate(-50%, -50%);
}

.returnButton {
    float: right;
    margin-left: 25px;
    color: $orange;
    cursor: pointer;
    margin-top: 16px;
}

.returnContent{
    text-align: center;
    padding-top: 15%;
    color: $orange;
}
</style>
