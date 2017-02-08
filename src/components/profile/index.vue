<template>
    <div :class="$style.profile">
        <div :class="$style.info">
            <div :class="$style.top">
                <div :class="$style.back">
                    <svg viewBox="0 0 200 200" :class="$style.img">
                        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#back"></use>
                    </svg>
                </div>
                <span :class="$style.name">{{profile.name}}</span>
            </div>
            <div :class="$style.avatar">
                <div :class="$style.avatarbox">
                    <img :class="$style.avatarimg" v-bind:src="profile.img_url">
                    <div :class="$style.sign" v-show="!profile.user_role">
                        <span>认证作者</span>
                        <svg viewBox="0 0 200 200" :class="$style.img">
                            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#sign"></use>
                        </svg>
                    </div>
                </div>
            </div>
            <div :class="$style.intro">{{profile.introduction}}</div>
        </div>
        <div :class="$style.list">
            <div :class="$style.col" v-show="!profile.user_role">
                <svg viewBox="0 0 200 200" :class="$style.largeimg">
                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#weibo"></use>
                </svg>
                <div :class="$style.text">
                    <a>{{profile.weibo}}</a>
                    <a :class="$style.arrow">></a>
                </div>
            </div>
            <div :class="$style.col" v-show="!profile.user_role">
                <svg viewBox="0 0 200 200" :class="$style.largeimg">
                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#work"></use>
                </svg>
                <div :class="$style.text" v-on:click="showMyWorks">
                    <a>我的作品</a>
                    <a :class="$style.arrow">></a>
                </div>
            </div>
            <div :class="$style.col">
                <svg viewBox="0 0 200 200" :class="$style.largeimg">
                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#collection"></use>
                </svg>
                <div :class="$style.text" v-on:click="showCollection">
                    <a>我的收藏</a>
                    <a :class="$style.arrow">></a>
                </div>
            </div>
            <div :class="$style.col" v-on:click="showMyWorks">
                <svg viewBox="0 0 200 200" :class="$style.largeimg">
                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#work"></use>
                </svg>
                <div :class="$style.text" >
                    <a>他的作品</a>
                    <a :class="$style.arrow">></a>
                </div>
            </div>
            <div :class="$style.col" v-on:click = "showMySuggest">
                <svg viewBox="0 0 200 200" :class="$style.largeimg">
                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#feedback"></use>
                </svg>
                <div :class="$style.text">
                    <a>意见反馈</a>
                    <a :class="$style.arrow">></a>
                </div>
            </div>
            <div :class="$style.col">
                <svg viewBox="0 0 200 200" :class="$style.largeimg">
                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#modify"></use>
                </svg>
                <div :class="$style.text">
                    <a>修改信息</a>
                    <a :class="$style.arrow">></a>
                </div>
            </div>
        </div>
        <button :class="$style.signout" v-on:click = "showReturn">登出</button>
        <div v-show = "returnIt" :class = "$style.suggestMask">
                <div :class = "$style.returnCard">
                    <div :class= "$style.returnContent">退出登录后，将不能发表评论和收藏内容。确认退出？</div>
                    <div :class= "$style.returnButton">退出</div>
                    <div :class= "$style.returnButton" v-on:click = "quit">取消</div>
                </div>
            </div>
        <div v-show="showWorks" :class="$style.commentPage">
            <div :class="$style.titleBox">
                <svg viewBox="0 0 200 200" :class="$style.imgBack" v-on:click="closeComment">
                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#back"></use>
                </svg>
                <div :class="$style.commentTitle">{{this.title}}</div>
            </div>
            <item :item="item" v-for="item in list"></item>
            <div :class = "$style.tip">  Σ( ° △ °|||)已经没有了</div>
        </div>
        <div v-show="showSuggest" :class="$style.suggestPage">
            <div :class="$style.titleBox">
                <svg viewBox="0 0 200 200" :class="$style.imgBack" v-on:click="closeComment">
                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#back"></use>
                </svg>
                <div :class="$style.commentTitle">意见反馈</div>
            </div>
            <div :class = "$style.line"></div>
            <div :class = "$style.title_s">您的意见：</div>
            <textarea type="text" :class = "$style.input" placeholder="输入您的反馈详情" v-model = "suggest"></textarea>
            <div :class = "$style.title_s">联系方式：</div>
            <textarea type="text" :class = "$style.inputInfo" placeholder="手机号码/QQ/邮箱" v-model = "suggestInfo"></textarea>
            <button :class="$style.signout" v-on:click = "submitSuggest">提交</button>
            <div v-show = "showSuccess" :class = "$style.suggestMask">
                <div :class = "$style.successCard">提交成功啦 ~</div>
            </div>
        </div>

        <!-- <div v-show = "changeMessage" :class="$style.suggestPage">
            <div :class="$style.titleBox">
                <svg viewBox="0 0 200 200" :class="$style.imgBack" v-on:click="closeComment">
                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#back"></use>
                </svg>
                <div :class="$style.commentTitle">个人信息</div>
            </div>
        </div> -->

    </div>
</template>
<script>
import 'whatwg-fetch'
import Item from '../main/item'
export default {
    data() {
            return {
                foo: 1,
                profile: {},
                showWorks: false,
                list: [],
                title:"",
                showSuggest:false,
                showSuccess:false,
                suggest:"",
                suggestInfo:"",
                returnIt:false
            }
        },
        components: {
            "item": Item,
        },
        mounted() {
            fetch('/profileInfo').then((res) => {
                return res.json()
            }).then(value => {
                console.log(value)
                this.profile = value
            })
        },
        methods: {
            showReturn(){
                this.returnIt = true
            },
            showMyWorks() {
                this.showWorks = true
                fetch('/api/v1.0/profile/works').then( res => {
                    return res.json()
                }).then( value => {
                    this.list = value
                    console.log(value)
                    this.title = "我的作品"
                })
            },
            quit(){
                this.returnIt = false
            },
            showCollection(){
                this.showWorks = true
                fetch('/api/v1.0/profile/collection').then( res => {
                    return res.json()
                }).then( value => {
                    this.list = value
                    console.log(value)
                    this.title = "我的收藏"
                })
            },
            closeComment() {
                if(this.showWorks)
                    this.showWorks = false
                if(this.showSuggest){
                    this.showSuggest = false
                    this.suggestion = ""
                    this.suggestInfo = ""
                }
            },
            showMySuggest(){
                this.showSuggest = true
            },
            closeIt(){
                this.showSuggest = false
                this.showSuccess = false
                console.log(this.showSuccess)
            },
            submitSuggest(){
                console.log(this.suggestInfo,this.suggest)
                if(!this.suggest|| !this.suggestInfo) return
                fetch('/api/v1.0/profile/suggestion/', {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            suggestion: this.suggestion,
                            contact_information: this.suggestInfo
                        })
                    })
                    .then(res => {
                        return res.json()
                    }).then(value => {
                        console.log(value,this.showSuccess)
                        this.showSuccess = true
                        this.suggestion = ""
                        console.log(this.showSuccess)
                        this.suggestInfo = ""
                        setTimeout( () => {
                            this.showSuggest = false
                            this.showSuccess = false
                            console.log(this.showSuccess)
                        },2000)

                    })
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
    height: 100%;
}
textarea{
    outline: none;
    border: none;
}
.returnCard{
    position: absolute;
    top: 50%;
    left: 50%;
    width: 250px;
    height: 90px;
    background-color: $white;
    color:$black;
    padding: 15px;
    border-radius: 2px;
    transform: translate(-50%,-50%);
}
.returnButton{
    float: right;
    margin-left: 25px;
    color: $orange;
    cursor: pointer;
    margin-top: 16px;
}
.line{
    width: 100%;
    height: 0.5px;
    background-color: $grey;
}
.suggestMask{
    position: fixed;
    top: 0;
    bottom: 0;
    width: 100%;
    background-color: rgba(51,51,51,0.85);
}
.successCard{
    position: absolute;
    top: 50%;
    left: 50%;
    width: 173px;
    height: 63px;
    background-color: $white;
    line-height: 63px;
    text-align: center;
    color:$orange;
    border-radius: 2px;
    transform: translate(-50%,-50%);
}
.title_s{
    font-size: 15px;
    margin-left: 15px;
    margin-top: 15px;
    color: $orange;
}
.input{
    width: 100%;
    height: 110px;
    font-size: 15px;
    padding: 15px;
    border-bottom: 0.50px solid $grey;
}
.inputInfo{
    width: 100%;
    font-size: 15px;
    padding: 15px;
    border-bottom: 0.50px solid $grey;
}
.profile {
    width: 100%;
    height: 100%;
    background-color: $white;
}

.info {
    width: 100%;
    background-color: $black;
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
    line-height: 20px;
    color: $white;
    height: 80px;
    box-sizing: border-box;
}

.avatar {
    width: 100%;
    height: 150px;
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
    margin-top: 18px;
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
    margin: 0 auto;
    border-radius: 3%;
    color: #fbb848;
    font-size: 16px;
    margin-top: 26px;
    outline: none;
}

.commentPage {
    position: absolute;
    width: 100%;
    top: 0;
    bottom: 0;
    background-color: $grey;
    z-index: 4;
}

.suggestPage {
    position: absolute;
    width: 100%;
    top: 0;
    bottom: 0;
    right: 0;
    background-color: $white;
    z-index: 4;
    font-family: '黑体-简';
}

.imgBack {
    composes: horizon from 'sass-loader!../../scss/utility.scss';
    width: 19px;
    padding-left: 18px;
    fill: $orange;
}

.commentTitle {
    composes: horizon from 'sass-loader!../../scss/utility.scss';
    text-align: center;
    width: 80%;
    font-size: 17px;
}

.titleBox {
    height: 54px;
    width: 100%;
    line-height: 54px;
    color: $black;
    background-color: $white;
    composes: space from 'sass-loader!../../scss/utility.scss';
}
.tip{
    text-align: center;
    font-size: 17px;
    color: $black_t;
    padding: 15px;
}
</style>
