<template>
    <div id="xxx" :class="$style.container">
        <div :class="$style.linea"></div>
        <div :class="$style.film" v-show="article.film.film_url.length">
            <img v-bind:src="article.film.film_img_url" alt="电影海报" :class="$style.film_pic">
            <a :href="article.film.film_url">
                <div :class="$style.scoreMask">
                    <div :class="$style.score">豆瓣评分：{{article.film.scores}} > </div>
                </div>
            </a>
        </div>
        <div v-show="article.music.music_url.length" :class="$style.musicBox">
            <img v-bind:src="article.music.music_img_url" alt="" :class="$style.music_pis">
            <div :class="$style.music_mask"></div>
            <!-- https://cdn.gomix.com/6f5b042d-533c-4dc6-9069-85376ee73137%2FElvis%20Costello%20-%20She.mp3 -->
            <audio :src="article.music.music_url" controls="controls" id="audio" :class="$style.audio"></audio>
            <svg viewBox="0 0 200 200" :class="$style.stop" v-show="musicPlay" v-on:click="play">
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#stop"></use>
            </svg>
            <svg viewBox="0 0 200 200" :class="$style.stop" v-on:click="play" v-show="!musicPlay">
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
            <div :class="$style.imgBox" v-on:click="toAutherProfile"><img v-bind:src="article.img_url" :class="$style.img" alt="头像"></div>
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
    </div>
</template>
<script>
import radioDirective from '../../directives/getradio'
import FETCH from '../../common/fetch.js'

export default {
    data() {
            return {
                likes: 0,
                musicPlay: false,
                change: -1,
                article: {
                    "id": 0,
                    "author_id": 0,
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
            play() {
                var audio = document.getElementById("audio")
                if (!this.musicPlay) {
                    audio.play()
                    this.musicPlay = true
                } else {
                    audio.pause()
                    this.musicPlay = false
                }

            },
            toAutherProfile() {
                window.location = "/profile/" + this.article.author_id
            }
        }
}
</script>
<style lang ="sass" module>
@import '../../scss/color.scss';
.music_mask {
    background-color: rgba(51, 51, 51, 0.35);
    composes: horizon from 'sass-loader!../../scss/utility.scss';
    width: 50%;
    height: 100px;
    left: 0;
    position: absolute;
}

.stop {
    fill: orange;
    position: absolute;
    width: 50px;
    left: 20%;
    top: 20%;
}

.audio {
    display: none;
}

.container {
    background-color: $white;
}

.film_pic {
    width: 100%;
    height: 240px;
    display: block;
}

.film {
    position: relative;
}

.musicBox {
    position: relative;
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
    height: 100%;
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

.linea {
    width: 100%;
    height: 1px;
    background-color: $grey_l;
}


</style>
