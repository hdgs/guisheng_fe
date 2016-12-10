<template>
    <div id="xxx" :class = "$style.container">
        <div :class="$style.film" v-show="article.film.film_url.length">
            <img v-bind:src="article.film.film_img_url" alt="电影海报" :class="$style.film_pic">
            <a :href="article.film.film_url">
                <div :class="$style.scoreMask">
                    <div :class="$style.score">豆瓣评分：{{article.film.score}} > </div>
                </div>
            </a>
        </div>
        <div :class="$style.title">{{article.title}}</div>
        <div :class = "$style.box">
            <div :class="$style.imgBox"><img v-bind:src="article.img_url" :class="$style.img" alt="头像"></div>
            <div :class="$style.msgBox">
                <div>{{article.author}}</div>
                <div :class="$style.time">{{article.time}}</div>
            </div>
        </div>
        
        <div v-html="article.body" :class = "$style.essay"></div>
        <div :class = "$style.eBox"><div :class = "$style.editor">[责任编辑:{{article.editor}}]</div></div>
        <div :class = "$style.line"></div>
    </div>
</template>
<script>
export default {
    data() {
            return {
                article: {
                    "film": {
                        "film_url": "",
                        "film_img_url": "",
                        "score": ""
                    }
                }
            }
        },
        methods: {
            show() {
                console.log("film", this.article.film.film_url)
            }
        }
}
</script>
<style lang ="sass" module>
@import '../../scss/color.scss';
.container{
    background-color: $white;
    padding-bottom: 20px;
}
.film_pic {
    width: 100%;
    display: block;
}

.film {
    position: relative;
}

.scoreMask {
    background-color: rgba(228, 169, 32, 0.75);
    width: 100%;
    height: 36px;
    position: absolute;
    line-height: 36px;
    bottom: 0;
}

.score {
    text-align: right;
    color: $white;
    padding-right: 15px;
}

.title {
    margin-top: 25px;
    margin-left: 15px;
    font-size: 20px;
    font-weight: bold;
}
.imgBox{
    composes: horizon from 'sass-loader!../../scss/utility.scss';
    width: 45px;
    height: 45px;
    border-radius: 22.5px;
    overflow: hidden;
}
.img{
    width: 100%;
}
.box{
    composes: space from 'sass-loader!../../scss/utility.scss';
    margin-top: 25px;
    margin-left: 15px;
}
.msgBox{
    composes: horizon from 'sass-loader!../../scss/utility.scss';
    font-size: 13px;
    color: $black_t;
    margin-left: 13px;
}
.time{
    margin-top: 10.5px;
}
.essay{
    margin: 25px 15px;
    font-size: 14px;
    line-height: 18px;
}
.eBox{
    overflow: hidden;
}
.editor{
    color: $black_t;
    font-size: 12.5px;
    margin-right: 15px;
    float: right;
}
.line{
    margin-top:20px;
    width: 100%;
    height: 1px;
    background-color: $grey_l;
}
</style>
