<template>
    <div id="xxx">
        <articleInfo ref="articleInfo" ></articleInfo>
        <articleComments ref="articleComments"></articleComments>
        <div :class = "$style.recommend">
            <div :class = "$style.title"  v-on:click = "closeComment">相关推荐</div>
            <item :item="item" v-for="item in list"></item>
        </div>
        <div :class = "$style.occupy"></div>
    </div>
</template>
<script>
import 'whatwg-fetch'
import info from './info'
import comments from './comment'
import Item from '../main/item'
import Map from '../../common/keymap.js'

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
            closeCom:false,
            x: 0,
            foo: 0,
            list: []
        }
    },
    mounted() {
        let promise1 = fetch("/api/v1.0/article").then((res) => {
            return res.json()
        })
        let promise2 = fetch("/api/v1.0/comments").then((res) => {
            return res.json()
        })

        Promise.all([promise1, promise2]).then(values => {
            this.$refs.articleInfo.article = values[0]
            console.log("花湖", "/api/v1.0/" + Map.FETCH_URL_MAP[this.$refs.articleInfo.article.kind])
            fetch("/api/v1.0/" + Map.FETCH_URL_MAP[this.$refs.articleInfo.article.kind]).then((res) => {
                    return res.json()
                }).then((res) => {
                    this.list = res
                })
                this.$refs.articleComments.articleInfo = {
                    id: values[0].id,
                    kind: values[0].kind,
                    commentCount: values[0].commentCount
                }
                this.$refs.articleComments.obj = values[1]
        })
    },
    components: {
        "articleInfo": info,
        "articleComments": comments,
        "item": Item
    },
    methods: {
        closeComment:function(){
            console.log("this.closeCom",this.closeCom)
            if(!this.closeCom) this.closeCom = true
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
.title{
    font-size: 18px;
    color: $orange;
    margin: 15px;
}
.recommend{
    background-color: $grey;
}
.occupy{
    height: 50px;
    width: 100%;
}
</style>
