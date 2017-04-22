<template>
    <div v-show="returnIt" :class="$style.suggestMask">
        <div :class="$style.returnCard">
            <div :class="$style.returnContent">退出登录后，将不能发表评论和收藏内容。确认退出？</div>
            <div :class="$style.returnButton" v-on:click="exit">退出</div>
            <div :class="$style.returnButton" v-on:click="quit">取消</div>
        </div>
    </div>
</template>
<script>
import Cookie from '../../common/cookie.js'

export default {
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
<style lang="sass" module>
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
</style>
