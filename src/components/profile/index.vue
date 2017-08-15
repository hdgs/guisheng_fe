<template>
    <div :class="$style.profile">
        <div :class="$style.info">
            <div :class="$style.top">
                <div :class="$style.back">
                    <svg viewBox="0 0 200 200" :class="$style.img" v-on:click="returnBack">
                        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#back"></use>
                    </svg>
                </div>
                <span :class="$style.name">{{profile.name}}</span>
            </div>
            <div :class="$style.avatar">
                <div :class="$style.avatarbox">
                    <img :class="$style.avatarimg" v-bind:src="profile.img_url">
                    <div :class="$style.sign" v-show="profile.role">
                        <span>认证作者</span>
                        <svg viewBox="0 0 200 200" :class="$style.img">
                            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#sign"></use>
                        </svg>
                    </div>
                </div>
            </div>
            <div :class="$style.intro">个人介绍：{{profile.introduction ? profile.introduction: '懒宝宝还没有自我介绍呢~'}}</div>
        </div>
        <div :class="$style.list">
            <div :class="$style.col" v-show="profile.role">
                <svg viewBox="0 0 200 200" :class="$style.largeimg">
                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#weibo"></use>
                </svg>
                <div :class="$style.text">
                    <a>{{profile.weibo ? profile.weibo:'未填写'}}</a>
                    <a :class="$style.arrow">></a>
                </div>
            </div>
            <div :class="$style.col" v-show="profile.user_role && my_id == profile.user_id">
                <svg viewBox="0 0 200 200" :class="$style.largeimg">
                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#work"></use>
                </svg>
                <div :class="$style.text" v-on:click="showMyWorks">
                    <a>我的作品</a>
                    <a :class="$style.arrow">></a>
                </div>
            </div>
            <div :class="$style.col" v-show="my_id == profile.user_id">
                <svg viewBox="0 0 200 200" :class="$style.largeimg">
                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#collection"></use>
                </svg>
                <div :class="$style.text" v-on:click="showCollection">
                    <a>我的收藏</a>
                    <a :class="$style.arrow">></a>
                </div>
            </div>
            <div :class="$style.col" v-on:click="showMyWorks" v-show="my_id != profile.user_id && profile.role">
                <svg viewBox="0 0 200 200" :class="$style.largeimg">
                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#work"></use>
                </svg>
                <div :class="$style.text">
                    <a>他的作品</a>
                    <a :class="$style.arrow">></a>
                </div>
            </div>
            <div :class="$style.col" v-on:click="showMySuggest" v-show="my_id == profile.user_id">
                <svg viewBox="0 0 200 200" :class="$style.largeimg">
                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#feedback"></use>
                </svg>
                <div :class="$style.text">
                    <a>意见反馈</a>
                    <a :class="$style.arrow">></a>
                </div>
            </div>
            <div :class="$style.col" v-on:click="messageChange" v-show="my_id == profile.user_id">
                <svg viewBox="0 0 200 200" :class="$style.largeimg">
                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#modify"></use>
                </svg>
                <div :class="$style.text">
                    <a>修改信息</a>
                    <a :class="$style.arrow">></a>
                </div>
            </div>
        </div>
        <button :class="$style.signout" v-on:click="showReturn" v-show="my_id == profile.user_id">登出</button>
        <exitPage v-show="returnIt" ref = "exitMessage"></exitPage>
        <works ref = "workPage" v-show="showWorks"></works>
        <suggestPage v-show="showSuggest" ref = "suggestPage"></suggestPage>
        <changeMessagePage ref="changeMessage" v-show="changeMessage"></changeMessagePage>
    </div>
</template>
<script>
import Cookie from '../../common/cookie.js'
import ExitPage from './exitPage'
import changeMessagePage from './changeMessage'
import Works from './works'
import SuggestPage from './suggestPage'
import Fetch from '../../common/fetch.js'

export default {
    data() {
            return {
                profile: {},
                showWorks: false,
                showSuggest: false,
                showSuccess: false,
                returnIt: false,
                changeMessage: false,
                changedImg: "",
                pic_url: "",
                my_id: 0
            }
        },
        components: {
            "exitPage": ExitPage,
            "changeMessagePage": changeMessagePage,
            "works":Works,
            "suggestPage":SuggestPage
        },
        mounted() {
            var api = window.location.pathname
            this.my_id = Cookie.getCookie("uid")
            Fetch.FetchData('/api/v1.0' + api + '/','POST',{
                my_id: this.my_id
            },function(){
                this.returnIt = true
                    this.$refs.exitMessage.flag = false
                    setTimeout(()=>{
                        window.history.back(-1)
                    },3000)
            }).then(value => {
                this.profile = value
                this.$refs.changeMessage.profile = value
                this.$refs.suggestPage.profile = value
                this.$refs.changeMessage.changedImg = this.profile.img_url
            })
        },
        methods: {
            messageChange() {
                this.changeMessage = true
            },
            returnBack() {
                window.history.back()
            },
            showReturn() {
                this.returnIt = true
                this.$refs.exitMessage.flag = true
            },
            showMyWorks() {
                this.showWorks = true
                var api = "/api/v1.0/profile/" + this.profile.user_id + "/works/"
                fetch(api).then(res => {
                    return res.json()
                }).then(value => {
                    this.$refs.workPage.list = value
                    this.$refs.workPage.title = "我的作品"
                })
            },
            showCollection() {
                this.showWorks = true
                Fetch.FetchData('/api/v1.0/profile/' + this.profile.user_id + '/collections/','GET').then(value => {
                    this.$refs.workPage.list = value
                    this.$refs.workPage.title = "我的收藏"
                })
            },
            showMySuggest() {
                this.showSuggest = true
            }
        }
}
</script>
<style lang='sass' module>
@import '../../scss/color.scss';
$topHeight:50px;
html,
body {
    width: 100%;
    min-height: 100%;
}

.profile {
    width: 100%;
    min-height: 100%;
    background-color: $white;
    padding-bottom: 15px;
}

.info {
    width: 100%;
    background-color: $black;
    padding-bottom: 20px;
}

.top {
    width: 100%;
    height: $topHeight;
    font-size: 0;
    color: white;
}

.back {
    display: inline-block;
    width: 60px;
    height: 100%;
    padding-left: 18px;
    box-sizing: border-box;
    vertical-align: top;
}

.img {
    width: 20px;
    fill: $orange;
    height: 100%;
    vertical-align: middle;
}

.name {
    width: calc(100% - 50px);
    line-height: $topHeight;
    color: $orange;
    font-size: 17px;
    box-sizing: border-box;
}

.intro {
    width: 100%;
    padding: 0 24px;
    font-size: 14px;
    height: 2.8em;
    line-height:1.4em;
    color: $white;
    box-sizing: border-box;
    text-align: center;
    position:relative;
    overflow:hidden;
}
.intro:after{
    content:"...";
    position:absolute;
    bottom:0;
    right:0;
    padding:0 15px 1px 45px;
}

.avatar {
    width: 100%;
    height: 110px;
    position: relative;
}

.avatarbox {
    width: 200px;
    text-align: center;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.avatarimg {
    width: 72px;
    height: 72px;
    border-radius: 50%;
}

.sign {
    margin-top: 8px;
    text-indent: 20px;
    color: $orange;
}

.list {
    width: 100%;
}

.col {
    height: 50px;
    font-size: 0;
}

.largeimg {
    width: 30px;
    fill: $orange;
    vertical-align: middle;
    margin: 0 16px;
}

.text {
    display: inline-block;
    height: 50px;
    line-height: 50px;
    font-size: 16px;
    vertical-align: middle;
    color: $black;
    width: calc(100% - 62px);
    box-sizing: border-box;
    border-bottom: 1px solid #e6e6e6;
}

.arrow {
    float: right;
    margin-right: 26px;
    transform: scale(1, 2);
    overflow: hidden;
    font-size: 16px;
    color: #8a8a8a;
}

.signout {
    display: block;
    width: 190px;
    height: 40px;
    box-sizing: border-box;
    border: 1px $orange solid;
    background-color: $white;
    margin: 0px auto;
    border-radius: 3%;
    color: #fbb848;
    font-size: 16px;
    margin-top:26px;
    outline: none;
}

.signout:hover{
    background-color: $orange;
}

.imgBack {
    composes: horizon from 'sass-loader!../../scss/utility.scss';
    width: 19px;
    padding-left: 18px;
    fill: $orange;
}
</style>
