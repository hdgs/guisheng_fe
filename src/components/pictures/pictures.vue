<template>
    <div id="xxx" :class="$style.picSecond" v-width="changeWidth" :style = "stopScroll">
        <div :class="$style.titleBox">
            <svg viewBox="0 0 200 200" :class="$style.img" v-on:click="goBack()">
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#back"></use>
            </svg>
            <div :class="$style.title">{{picInfo.title}}</div>
        </div>
        <div :class="$style.numBox">
            <div :class="$style.time">{{picInfo.time}}</div>
            <div :class="$style.picNum">
                <div :class="$style.curNum">{{i+1}}</div>
                <div :class="$style.totalNum">/{{pics.length}}</div>
            </div>
        </div>
        <banner ref = "bannerPic"></banner>
        <div :class="$style.bottom">
            <div :class="$style.author">by {{picInfo.author}}</div>
            <div :class="$style.views">{{picInfo.views}}</div>
            <div :class="$style.views_img">
                <svg viewBox="0 0 200 200" :class="$style.view_img">
                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#view"></use>
                </svg>
            </div>
            <div :class="$style.tag">#图集#</div>
        </div>
        <div :class="$style.sline"></div>
        <div :class="$style.editor">[责任编辑：{{picInfo.editor}}]</div>
        <picComments ref="picComments"></picComments>
        <div :class="$style.recommend" v-show = list.length>
            <div :class="$style.recommendTitle">相关推荐</div>
            <item :item="item" v-for="item in list"></item>
        </div>
        <div :class="$style.occupy"></div>
    </div>
</template>
<script>
import 'whatwg-fetch'
import comments from '../second/comment'
import widthDirective from '../../directives/width'
import Item from '../main/item'
import FETCH from '../../common/fetch.js'
import Banner from './banner'
import Cookie from '../../common/cookie.js'

export default {
    data() {
        return {
            i:0,
            pics: [],
            picWidth: 500,
            picInfo: {},
            list: [],
            showComment:false
        }
    },
    mounted() {
        var api = window.location.pathname
        var ids = api.split('/')
        let promise1 = FETCH.FetchData("/api/v1.0" + api + "/", "POST",{
            my_id: Cookie.getCookie("uid") ? Cookie.getCookie("uid"): -1
        })
        let promise2 = FETCH.FetchData("/api/v1.0/comments/?article_id=" + ids[2] + "&kind=2", "GET")
        Promise.all([promise1, promise2]).then(values => {
            this.pics = values[0].pics
            this.$refs.bannerPic.pics = values[0].pics
            console.log("this.$refs.bannerPic.pics",values[0])
            this.$refs.bannerPic.descriptionImg = values[0].introduction
            this.picInfo = values[0]
            this.$refs.picComments.obj = values[1]
            this.$refs.picComments.url = "/api/v1.0/comments/?article_id=" + ids[2] + "&kind=2"
            this.$refs.picComments.articleInfo = {
                id: values[0].id,
                kind: values[0].kind,
                commentCount: values[0].commentCount,
                likes: values[0].likes,
                collected:values[0].collected
            }
            FETCH.FetchData("/api/v1.0/" + ids[1] + "/recommend/", "POST", {
                article_id: this.picInfo.id
            }).then((res) => {
                this.list = res
            })
        })
    },
    computed: {
        stopScroll: function () {
            return{
                overflow: this.showComment ? 'hidden':'auto',
                height:this.showComment?'90%':''
            }
        }
    },
    components: {
        "picComments": comments,
        "item": Item,
        "banner": Banner
    },
    directives: {
        width: widthDirective
    },
    methods: {
        goBack() {
            window.history.back()
        },
        changeWidth(e, l) {
            this.picWidth = e
            this.$refs.bannerPic.picWidth = e
            this.screenHeight = l
            this.$refs.bannerPic.screenHeight = l
        }
    }
}
</script>
<style lang ='sass' module>
@import '../../scss/color.scss';
.picSecond {
    background-color: $white;
    min-height: 90%;
}

.occupy {
    height: 50px;
    width: 100%;
}

.recommendTitle {
    padding: 15px;
    font-size: 18px;
    color: $orange;
}

.recommend {
    background-color: $grey;
}

.titleBox {
    height: 40px;
    line-height: 40px;
    background-color: $black;
    color: $white;
    composes: space from 'sass-loader!../../scss/utility.scss';
}

.img {
    composes: horizon from 'sass-loader!../../scss/utility.scss';
    width: 19px;
    padding-left: 18px;
    fill: $orange;
}

.picNum {
    composes: horizon from 'sass-loader!../../scss/utility.scss';
    composes: space from 'sass-loader!../../scss/utility.scss';
    float: right;
}

.curNum {
    composes: horizon from 'sass-loader!../../scss/utility.scss';
    font-size: 20px;
    color: $orange;
}

.totalNum {
    composes: horizon from 'sass-loader!../../scss/utility.scss';
    font-size: 15px;
    color: #999;
}

.numBox {
    margin: 40px 10% 15px;
    composes: space from 'sass-loader!../../scss/utility.scss';
}

.title {
    text-align: center;
    width: 80%;
    font-size: 17px;
    composes: horizon from 'sass-loader!../../scss/utility.scss';
}

.time {
    composes: horizon from 'sass-loader!../../scss/utility.scss';
    color: #999;
    font-size: 14px;
}

.sline {
    height: 1px;
    margin: 15px 10%;
    background-color: $grey_l;
}

.bottom {
    overflow: hidden;
    padding: 0 10% 5px;
    composes: space from 'sass-loader!../../scss/utility.scss';
}

.common {
    color: #999999;
    font-size: 14px;
    composes: horizon from 'sass-loader!../../scss/utility.scss';
}

.author {
    width: 30%;
    float: left;
    composes: common;
}

.tag {
    float: right;
    margin-right: 17px;
    composes: common;
}

.views_img {
    float: right;
    margin-right: 4.5px;
    composes: common;
    fill: #999;
}

.view_img {
    width: 13px;
}

.views {
    float: right;
    margin-right: 15px;
    composes: common;
}

.editor {
    margin: 20px 10%;
    font-size: 14px;
    color: #999;
    text-align: right;
}
</style>
