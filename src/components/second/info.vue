<template>
    <div id="xxx" :class="$style.box">
        <div :class="$style.film">
            <img v-bind:src="article.film.film_img_url" alt="电影海报" :class="$style.film_pic">
            <a :href="article.film.film_url">
                <div :class="$style.scoreMask">
                    <div :class = "$style.score">豆瓣评分：{{article.film.score}} > </div>
                </div>
            </a>
        </div>
        <h2 :class = "$style.title">{{article.title}}</h2>
        <p>{{article.author}}</p>
        <div>{{article.time}}</div>
        <div v-html="article.body"></div>
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
.box {
    text-align: center;
}
.film_pic {
    width: 100%;
    display: block;
}
.film{
    position: relative;
}
.scoreMask{
    background-color: rgba(228,169,32,0.75);
    width: 100%;
    height: 36px;
    position: absolute;
    line-height: 36px;
    bottom: 0;
}
.score{
    text-align: right;
    color:$white;
    padding-right: 15px;
}
</style>
