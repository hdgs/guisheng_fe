<template>
    <div id="xxx" :class="$style.box">
        <div :class="$style.film">
            <a :href="article.film.film_url"><img v-bind:src="article.film.film_img_url" alt="电影海报" :class="$style.film_pic"></a>
            <div :class="$style.scoreMask">
                <div :class = "$style.score">{{article.film.score}}</div>
            </div>
        </div>
        <h2>{{article.title}}</h2>
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
.box {
    text-align: center;
}
.film_pic {
    width: 100%;
    display: block;
}
.scoreMask{
    background-color: rgba(58,64,47,0.75);
    width: 100%;
    height: 35px;
    margin-top: -35px;
}
</style>
