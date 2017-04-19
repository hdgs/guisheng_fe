<template>
    <div id="xxx">
        <articleInfo ref="articleInfo"></articleInfo>
        <articleComments ref="articleComments"></articleComments>
        <div :class="$style.recommend" v-show="list.length">
            <div :class="$style.title" v-on:click="closeComment">相关推荐</div>
            <item :item="item" v-for="item in list"></item>
        </div>
        <div :class="$style.occupy"></div>
    </div>
</template>
<script>
import 'whatwg-fetch'
import info from './info'
import comments from './comment'
import Item from '../main/item'
import Map from '../../common/keymap.js'
import FETCH from '../../common/fetch.js'

export default {
    computed: {
        // a computed getter
        styleObject: function () {
            // `this` points to the vm instance
            return {
                transform: 'translateX(' + this.x + 'px)'
            }
        }
    },
    data() {
        return {
            closeCom: false,
            x: 0,
            foo: 0,
            list: []
        }
    },
    mounted() {
        var api = window.location.pathname
        var ids = api.split('/')
        var kind, i
        for (i = 1; i <= 4; i++) {
            if (Map.FETCH_URL_MAP[i] == ids[1])
                kind = i
        }
        let promise1 = FETCH.FetchData("/api/v1.0" + api + "/", "GET")
        let promise2 = FETCH.FetchData("/api/v1.0/comments/?article_id=" + ids[2] + "&kind=" + kind, "GET")
        Promise.all([promise1, promise2]).then(values => {
            this.$refs.articleInfo.article = values[0]
            FETCH.FetchData("/api/v1.0/" + ids[1] + "/recommend/", "POST", {
                article_id: ids[2]
            }).then(res => {
                this.list = res
            })
            this.$refs.articleComments.articleInfo = {
                id: ids[2],
                kind: values[0].kind,
                commentCount: values[0].commentCount,
                user_role: values[0].user_role
            }
            this.$refs.articleComments.obj = values[1]
            this.$refs.articleComments.url = "/api/v1.0/comments/?article_id=" + ids[2] + "&kind=" + kind
        })
    },
    components: {
        "articleInfo": info,
        "articleComments": comments,
        "item": Item
    },
    methods: {
        closeComment: function () {
            if (!this.closeCom) this.closeCom = true
        }
    }
}
</script>
<style lang='sass' module>
@import '../../scss/color.scss';
#app {
    color: green;
    max-width: 600px;
    align-items: flex-start;
    font-family: Source Sans Pro, Helvetica, sans-serif;
    text-align: center;
}

.title {
    font-size: 18px;
    color: $orange;
    margin: 15px;
}

.recommend {
    background-color: $grey;
}

.occupy {
    height: 50px;
    width: 100%;
}
</style>
