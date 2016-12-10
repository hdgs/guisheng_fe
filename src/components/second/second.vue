<template>
    <div id="xxx">
        <articleInfo ref="articleInfo"></articleInfo>
        <!-- <articleComments ref="articleComments"></articleComments> -->
    </div>
</template>
<script>
import 'whatwg-fetch'
import info from './info'
import comments from './comment'

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
            x: 0,
            foo: 0
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
            // this.$refs.articleComments.articleInfo = {
            //     id: values[0].id,
            //     kind: values[0].kind
            // }
            // this.$refs.articleComments.obj = values[1]
        })
    },
    components: {
        "articleInfo": info,
        "articleComments": comments
    },
    methods: {

    }
}
</script>
<style lang='sass' module>
#app {
    color: green;
    max-width: 600px;
    align-items: flex-start;
    font-family: Source Sans Pro, Helvetica, sans-serif;
    text-align: center;
}
</style>
