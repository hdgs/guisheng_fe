<template>
    <div id="xxx" :class="$style.container">
       <!--  <div :class="$style.film" v-show="article.film.film_url.length">
            <img v-bind:src="article.film.film_img_url" alt="电影海报" :class="$style.film_pic">
            <a :href="article.film.film_url">
                <div :class="$style.scoreMask">
                    <div :class="$style.score">豆瓣评分：{{article.film.score}} > </div>
                </div>
            </a>
        </div> -->
        <div v-show="article.music.music_url.length" :class="$style.musicBox">
            <img v-bind:src="article.music.img_url" alt="" :class="$style.music_pis">
            <div :class = "$style.music_mask"></div>
            <!-- <embed src="http://music.163.com/#/m/song?id=5054921"> -->
            <a href="http://music.163.com/#/m/song?id=5054921" >
                <!-- <svg viewBox="0 0 200 200" :class="$style.stop">
                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#stop"></use>
                </svg> -->
                <svg viewBox="0 0 200 200" :class="$style.stop">
                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#play"></use>
                </svg>
            </a>
            <div :class="$style.music_info">
                <div :class="$style.Mtitle">{{article.music.title}}</div>
                <div :class="$style.singer">{{article.music.singer}}</div>
            </div>
        </div>
        <div :class="$style.title">{{article.title}}</div>
        <div :class="$style.box">
            <div :class="$style.imgBox"><img v-bind:src="article.img_url" :class="$style.img" alt="头像"></div>
            <div :class="$style.msgBox">
                <div>{{article.author}}</div>
                <div :class="$style.time">{{article.time}}</div>
            </div>
        </div>
        <div v-html="article.body" :class="$style.essay"></div>
        <div :class="$style.eBox">
            <div :class="$style.editor">[责任编辑:{{article.editor}}]</div>
        </div>
        <div :class="$style.line"></div>
        <div :class="$style.lightBox">
            <div :class="$style.light" v-on:click="like(index)" v-for="(item, index) in article.like_degree">
                <div :class="$style.lightImg"><img v-bind:src="Imgs[index]" :class="$style.img"></div>
                <div :class="(change == index)? $style.lightWordBox_hover:$style.lightWordBox">
                    <div :class="$style.word">{{words[index]}}</div>
                    <div :class="$style.count">{{item}}</div>
                </div>
            </div>
        </div>
        <div :class="$style.ad">
            <a href="https://www.zhihu.com/question/20790576"><img src="http://img02.tooopen.com/images/20151225/tooopen_sy_152706581529.jpg" alt="广告位" :class="$style.ad_img"></a>
        </div>
    </div>
</template>
<script>
import radioDirective from '../../directives/getradio'
export default {
    data() {
            return {
                likes: 0,
                flag: 0,
                change: -1,
                words: ["不错耶", "好喜欢", "什么鬼"],
                Imgs: ["../../img/great.png", "../../img/likeit.png", "../../img/what.png"],
                article: {
                    "id": 0,
                    "kind": 0,
                    "film": {
                        "film_url": "",
                        "film_img_url": "",
                        "score": ""
                    },
                    "music": {
                        "title": "",
                        "img_url": "",
                        "music_url": "",
                        "singer": ""
                    }
                }
            }
        },
        methods: {
            like(index) {
                if (this.flag) return
                fetch('/api/v1.0/light/', {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            article_id: this.article.id,
                            kind: this.article.kind,
                            like_degree: index
                        })
                    })
                    .then(res => {
                        return res.json()
                    }).then(value => {
                        this.article.like_degree[index]++
                            this.flag = 1
                        this.change = index
                    })
            }
        }
}
</script>
<style lang ="sass" module>
@import '../../scss/color.scss';
.music_mask{
    background-color:rgba(51,51,51,0.35);
    composes: horizon from 'sass-loader!../../scss/utility.scss';
    width: 50%;
    height: 100px;
    left:0;
    position:absolute;
}
.stop {
    fill: orange;
    position: absolute;
    width: 50px;
    left: 20%;
    top: 75px;
}

.container {
    background-color: $white;
}

.film_pic {
    width: 100%;
    display: block;
}

.film {
    position: relative;
}

.musicBox {
    composes: space from 'sass-loader!../../scss/utility.scss';
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

.imgBox {
    composes: horizon from 'sass-loader!../../scss/utility.scss';
    width: 45px;
    height: 45px;
    border-radius: 22.5px;
    overflow: hidden;
}

.img {
    width: 100%;
}

.music_pis {
    composes: horizon from 'sass-loader!../../scss/utility.scss';
    width: 50%;
    height: 100px;
    position: relative;
}

.music_info {
    composes: horizon from 'sass-loader!../../scss/utility.scss';
    height: 100px;
    border-bottom: $grey_l 1px solid;
    border-top: $grey_l 1px solid;
    width: 50%;
    font-size: 14px;
    font-family: '华文黑体';
}

.Mtitle {
    color: black;
    margin-left: 11px;
}

.singer {
    margin-left: 11px;
    margin-top: 57.5px;
    color: $black_t;
}

.box {
    composes: space from 'sass-loader!../../scss/utility.scss';
    margin-top: 25px;
    margin-left: 15px;
}

.msgBox {
    composes: horizon from 'sass-loader!../../scss/utility.scss';
    font-size: 13px;
    color: $black_t;
    margin-left: 13px;
}

.time {
    margin-top: 10.5px;
}

.essay {
    margin: 25px 15px;
    font-size: 14px;
    line-height: 18px;
}

.eBox {
    overflow: hidden;
}

.editor {
    color: $black_t;
    font-size: 12.5px;
    margin-right: 15px;
    float: right;
}

.line {
    margin-top: 20px;
    width: 100%;
    height: 1px;
    background-color: $grey_l;
}

.lightBox {
    font-size: 0;
    padding: 27.5px 0 20px 0;
}

.light {
    margin: 0 auto;
    vertical-align: middle;
    display: inline-block;
    width: 33.3%;
    text-align: center;
}

.lightImg {
    width: 50px;
    margin: 0 auto;
    text-align: center;
    margin-bottom: 11.5px;
}

.lightWordBox {
    border-radius: 27.5px;
    height: 55px;
    margin: 0 auto;
    width: 55px;
    border: 1px solid $grey_b;
    font-size: 14px;
}

.lightWordBox_hover {
    border: 1px solid $orange_b;
    color: $orange_b;
    border-radius: 27.5px;
    height: 55px;
    margin: 0 auto;
    width: 55px;
    font-size: 14px;
}

.word {
    margin-top: 10.5px;
}


/*.count {
    margin-top: 7.5px;
}*/

.ad {
    width: 100%;
    height: 100px;
    overflow: hidden;
}

.ad_img {
    height: 100%;
    width: 100%;
}
</style>
