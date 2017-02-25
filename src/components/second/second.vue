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
        var api = window.location.pathname
        var ids = api.split('/')
        var kind,i
        for( i = 1; i <= 4;i++ ){
            if(Map.FETCH_URL_MAP[i] == ids[1])
                kind = i
        }
        console.log("api","/api/v1.0" + api + "/")
        let promise1 = fetch("/api/v1.0" + api + "/").then((res) => {
            return res.json()
        })
        let promise2 = fetch("/api/v1.0/comments/?article_id="+ ids[2]+"&kind=" + kind).then((res) => {
            return res.json()
        })
        Promise.all([promise1, promise2]).then(values => {
            console.log("me",values)
            this.$refs.articleInfo.article = values[0]
            fetch("/api/v1.0/" + ids[1] + "/recommend/",{
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            article_id:ids[2]
                        })
                    }).then(res => {
                        return res.json()
                    }).then(res => {
                        this.list = res
                    })
            console.log("花湖", "/api/v1.0/" + Map.FETCH_URL_MAP[this.$refs.articleInfo.article.kind],this.$refs.articleInfo.article.user_role)
                this.$refs.articleComments.articleInfo = {
                    id: values[0].id,
                    kind: values[0].kind,
                    commentCount: values[0].commentCount,
                    user_role: values[0].user_role
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
