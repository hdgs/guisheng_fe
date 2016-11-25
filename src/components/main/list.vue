<template>
  <div v-scroll = "onScroll" :class="$style.app" >
    <div  v-for = "item in list">
      <item :item = "item"></item>
    </div>
  </div>
</template>

<script>
  import consts from '../../common/consts' 
  import url from '../../common/url' 
  import 'whatwg-fetch'
  import Item from './item'
  import scrollDirective from '../../directives/scroll'

  export default {
    data() {
      return {
        currentPage:0,
        list:[],
        isScroll:false
      }
    },
    directives: {
      scroll: scrollDirective
    },
  	mounted () {
      this.request()
    },
    components:{
      "item":Item,
    },
    methods:{
      onScroll(){
        if(this.isScroll){
          return
        }
        
          this.isScroll = true
          this.currentPage += 1
          this.request()
        
      },
      request(){
        let params = {
          page: this.currentPage,
          kind: consts. MAIN_ROUTER_KIND_MAP[this.$route.fullPath],
          count: 5
        }
        // expected ?page=0&kind=0&count=5
        fetch("/api/v1.0/feed/?" + url.getUrlComponent(params))
        .then( (res) => {
          return res.json()
        }).then( value => {
          this.list = this.list.concat(value)
          if(this.isScroll)
            this.isScroll = false
        })
      }
    }
  }
</script>

<style lang='sass' module>
  .app {
  	color: green;
    align-items: flex-start;
  	font-family: Source Sans Pro, Helvetica, sans-serif;
  	text-align: center;
  }
</style>