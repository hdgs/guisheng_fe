<template>
    <div v-scroll="onScroll" :class="$style.app">
        <item :item="item" v-for="item in list"></item>
        <skeleton v-show="showSkeleton">        
        </skeleton>    
        <div :class="$style.tip"> Σ( ° △ °|||)已经没有了</div>
    </div>
</template>
<script>
import consts from '../../common/consts'
import url from '../../common/url'
import 'whatwg-fetch'
import Item from './item'
import scrollDirective from '../../directives/scroll'
import FETCH from '../../common/fetch.js'
import Skeleton from './skeleton'

export default {
    data() {
        return {
            currentPage: 0,
            list: [],
            isScroll: false,
            showSkeleton: true
        }
    },
    directives: {
        scroll: scrollDirective
    },
    mounted() {
        this.request()
    },
    components: {
        "item": Item,
        "skeleton":Skeleton
    },
    methods: {
        onScroll() {
            if (this.isScroll) {
                return
            }
            this.isScroll = true
            this.currentPage += 1
            this.showSkeleton = true
            this.request()
            console.log("hshshs",this.showSkeleton)
        },
        request() {
            let params = {
                page: this.currentPage,
                kind: consts.MAIN_ROUTER_KIND_MAP[this.$route.fullPath],
                count: 5
            }
            FETCH.FetchData("/api/v1.0/feed/?" + url.getUrlComponent(params), "GET").then(value => {
                this.showSkeleton = false
                if(value.length == 0)
                    return
                this.list = this.list.concat(value)
                console.log(value)
                if (this.isScroll)
                    this.isScroll = false
            })
        }
    }
}
</script>
<style lang ='sass' module>
@import '../../scss/color.scss';
.app {
    align-items: flex-start;
    font-family: "黑体-简", Helvetica, sans-serif;
}

.tip {
    text-align: center;
    font-size: 17px;
    color: $black_t;
    padding-bottom: 15px;
}

.icon{
    width:100%;
    background:$white;
}
</style>
