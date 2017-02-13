<template>
    <div id="xxx" :class="$style.app">
        <div v-on:click="responseAgain">
            <wrong v-show="this.wrong"></wrong>
        </div>
        <div :class="$style.top">
            <div :class="$style.tab">
                <router-link to="/" :class="$style.link">首页</router-link>
            </div>
            <div :class="$style.tab">
                <router-link to="/news" :class="$style.link">新闻</router-link>
            </div>
            <div :class="$style.tab">
                <router-link to="/pics" :class="$style.link">图片</router-link>
            </div>
            <div :class="$style.tab">
                <router-link to="/article" :class="$style.link">水墨</router-link>
            </div>
            <div :class="$style.tab">
                <router-link to="/interaction" :class="$style.link">互动</router-link>
            </div>
        </div>
        <div v-show="onShow" :class="$style.container">
            <div :class="$style.bg_pic">
                <img v-bind:src="pic.img_url" :class="$style.pic" alt="每日一图">
            </div>
            <div :class="$style.bottom">
                <div :class="$style.tittle">#每日一图#</div>
                <div :class="$style.des">
                    <div :class="$style.climate_img"><img v-bind:src="pic.climate_url" alt="climate icon"></div>
                    <div :class="$style.description">{{pic.climate}} · </div>
                    <div :class="$style.date">{{pic.date}}</div>
                </div>
            </div>
        </div>
        <router-view></router-view>
    </div>
</template>
<script>
import 'whatwg-fetch'
import Wrong from '../wrong'

export default {
    mounted() {
            fetch('/api/v1.0/everyDayPic').then((res) => {
                if (res.ok) {
                    return res.json()
                } else {
                    this.wrong = true
                }
            }).then(value => {
                this.pic = value
            })
        },
        data() {
            return {
                list: [],
                pic: {},
                onShow: true,
                wrong: false
            }
        },
        components: {
            "wrong": Wrong
        },
        methods: {
            responseAgain() {
                this.wrong = false
            }
        }
}
</script>
<style lang='sass' module>
@import '../../scss/color.scss';
.app {
    font-family: Source Sans Pro, Helvetica, sans-serif;
}

.top {
    composes: space from 'sass-loader!../../scss/utility.scss';
    height: 47px;
    line-height: 47px;
}

.tab {
    composes: horizon from 'sass-loader!../../scss/utility.scss';
    width: 20%;
    border-top: 4px $grey solid;
    text-align: center;
}

.link {
    font-size: 18px;
    color: $black;
    display: block;
    margin-top: -4px;
}

.link:hover {
    font-weight: bold;
}

.tab:hover {
    border-top-color: $green;
}

.container {
    position: relative;
    margin-bottom: 20px;
}

.bg_pic {
    width: 100%;
}

.pic {
    width: 100%;
    display: block;
}

.bottom {
    position: absolute;
    bottom: 0;
    background-color: rgba(212, 147, 33, 0.8);
    width: 100%;
    color: $white;
    height: 30px;
    composes: space from 'sass-loader!../../scss/utility.scss';
}

.common {
    line-height: 30px;
    height: 30px;
    font-size: 14px;
    composes: horizon from 'sass-loader!../../scss/utility.scss';
}

.tittle {
    width: 30%;
    padding-left: 15px;
    text-align: left;
    composes: common;
    box-sizing: border-box;
}

.des {
    width: 70%;
    text-align: right;
    padding-right: 15px;
    box-sizing: border-box;
    composes: common;
}

.climate_img {
    composes: common;
    margin-right: 4.5px;
}

.description {
    composes: common;
}

.date {
    composes: common;
}
</style>
