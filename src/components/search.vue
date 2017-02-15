<template>
    <div id="xxx">
        <div :class = "$style.line"></div>
        <item :item="item" v-for="item in list"></item>
    </div>
</template>
<script>
import 'whatwg-fetch'
import {
    bus
} from '../bus.js'
import Item from './main/item'
import Cookie from '../common/cookie.js'

export default {
    mounted() {
            bus.$on('search', this.addTodo)
        },
        data() {
            return {
                list: []
            }
        },
        components: {
            "item": Item,
        },
        methods: {
            addTodo(content) {
                this.list = content
                console.log("list", content)
            },
        }
}
</script>
<style lang='sass' module>
@import '../scss/color.scss';
.line{
    width: 100%;
    height: 5px;
    background: $grey;
}
</style>
