<template>
    <div :class="$style.suggestMask">
        <div :class="$style.returnCard">
            <div>登录以后才能评论和收藏哦~</div>
            <div :class="$style.returnButton" v-on:click="login">我要登录</div>
            <div :class="$style.returnButton" v-on:click="quit">取消</div>
        </div>
    </div>
</template>
<script>
export default {
    methods: {
        quit() {
            this.$parent.showTips = false
        },
        login(){
            quit()
            window.location = "https://user.muxixyz.com?landing=120.24.4.254:8777/landing"
            // window.location = "https://user.muxixyz.com?landing=localhost:3000/landing"
        }
    }
}
</script>
<style lang ="sass" module>
@import '../../scss/color.scss';
@import '../../scss/zindex.scss';

.suggestMask {
    position: fixed;
    top: 0;
    bottom: 0;
    width: 100%;
    z-index: $Zindex3;
    background-color: rgba(51, 51, 51, 0.85);
}

.returnCard {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 217px;
    height: 87.5px;
    background-color: $white;
    color: $black;
    padding: 25px 17.5px 15px;
    border-radius: 2px;
    transform: translate(-50%, -50%);
    box-sizing: border-box;
    font-size: 14px;
}

.returnButton {
    float: right;
    margin-left: 25px;
    color: $orange;
    cursor: pointer;
    margin-top: 16px;
}
</style>
