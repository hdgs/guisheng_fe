<template>
    <div id="xxx" :class="$style.app" :style = "enableScroll">
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
            <a href = "/special">
                <div :class="$style.bg_pic">
                    <img v-bind:src="pic.img_url" :class="$style.pic" alt="每日一图">
                </div>
                <div :class="$style.bottom">
                    <div :class="$style.tittle">#新生专题#</div>
                    <div :class="$style.des">
                        <div :class="$style.climate_img">
                            <svg viewBox="0 0 200 200" :class="$style.climate_icon">
                                <use xmlns:xlink="http://www.w3.org/1999/xlink" :xlink:href="climate_pic"></use>
                            </svg>
                        </div>
                        <div :class="$style.climate_img">{{word}} · </div>
                        <div :class="$style.date">{{date}}</div>
                    </div>
                </div>
            </a>
        </div>
        <a :class="$style.container" v-show="showTopic" :href="topicUrl">
            <img :src="topic.img_url" alt="喝茶吧" :class="$style.topicImg">
            <div :class="$style.topicBox">
                <div :class="$style.topicTitle">喝茶吧</div>
                <div :class="$style.rline"></div>
                <div :class="$style.topic">{{topic.title}}</div>
            </div>
        </a>
        <router-view></router-view>
        <smodal v-show="showModal"></smodal>
    </div>
</template>
<script>
import FETCH from '../../common/fetch.js'
import Smodal from './smodal'

export default {
    mounted() {
        if(window.screen.availWidth > 500){
            this.phone = false
            console.log("this.phone = ",this.phone)
        }
        FETCH.FetchData('/api/v1.0/everydaypic/', 'GET').then(value => {
            this.pic = value
            this.climate_pic = value.climate == 1 ? "#sunny" : value.climate == 2 ? "#cloudy" : "#rain"
            this.word = value.climate == 1 ? "晴" : value.climate == 2 ? "阴" : "雨"
            this.date = value.date
        })
        FETCH.FetchData('/api/v1.0/tea/', 'GET').then(value => {
            this.topic = value
            this.topicUrl = '/interaction/' + value.article_id
        })
        if (window.location.pathname !== '/')
            this.onShow = false
    },
    components:{
        "smodal":Smodal,
    },
    computed:{
        enableScroll:function(){
            return{
                position:this.showModal?'fixed':'',
                width:this.phone?'':'400px'
            }
        }
    },
    data() {
        return {
            list: [],
            pic: {},
            onShow: true,
            showTopic: false,
            topic: {},
            topicUrl: "",
            word: "晴",
            date: "",
            climate_pic: "#cloudy",
            showModal:true,
            phone:true
        }
    }
}
</script>
<style lang ='sass' module>
@import '../../scss/color.scss';

.topicImg{
    width:100%;
    height: 180px;
    display: block;
}
.topicBox{
    background-color: $white;
    composes: space from 'sass-loader!../../scss/utility.scss';
    padding: 17px 25px;
}
.rline{
    height: 40px;
    width: 1px;
    margin: 0 5%;
    background-color: $grey;
    composes: horizon from 'sass-loader!../../scss/utility.scss';
}
.topicTitle{
    composes: horizon from 'sass-loader!../../scss/utility.scss';
    font-size: 20px;
    color: $orange;
}
.topic{
    composes: horizon from 'sass-loader!../../scss/utility.scss';
    font-size: 14px;
    color: $black;
    width: 70%;
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
    color: $green;
}

.tab:hover {
    border-top-color: $green;
}

.container {
    position: relative;
    margin-bottom: 20px;
    display: block;
}

.bg_pic {
    width: 100%;
    height: 180px;
}

.pic {
    width: 100%;
    height: 180px;
    display: block;
}

.bottom {
    position: absolute;
    bottom: 0;
    background-color: rgba(212, 147, 33, 0.8);
    width: 100%;
    color: $white;
    height: 30px;
    display: flex;
    align-items:center;
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
}

.des {
    margin-left: 20%;
    width: 40%;
    padding-right: 15px;
    box-sizing: border-box;
    display:flex;
    align-items:center;
    justify-content:center;
}

.climate_img {
    margin-right: 5px;
}

.climate_icon{   
    width: 15px;
    display: block;
    fill: $white;
}

.climate_img {
    margin-right: 6px;
}
</style>
