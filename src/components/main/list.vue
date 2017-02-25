<template>
  <div v-scroll = "onScroll" :class="$style.app" >
    <item :item = "item" v-for = "item in list"></item>
  </div>
</template>

<script>
  import consts from '../../common/consts' 
  import url from '../../common/url' 
  import 'whatwg-fetch'
  import Item from './item'
  import scrollDirective from '../../directives/scroll'
  import Cookie from '../../common/cookie.js'

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
      console.log(this.isScroll)
      this.request()
    },
    components:{
      "item":Item,
    },
    methods:{
      onScroll(){
      console.log(this.isScroll)
        if(this.isScroll){
          return
        }
        
      console.log(this.isScroll)
          this.isScroll = true
          this.currentPage += 1
          this.request()
        
      },
      // addTodo(content){
      //   this.list = content
      //   console.log("list",content)
      // },
      request(){
        let params = {
          page: this.currentPage,
          kind: consts. MAIN_ROUTER_KIND_MAP[this.$route.fullPath],
          count: 5
        }
        // expected ?page=0&kind=0&count=5
        fetch("/api/v1.0/feed/?" + url.getUrlComponent(params))
        .then( (res) => {
          if (res.ok) {
                    return res.json()
                } else {
                    this.wrong = true
                }
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
  align-items: flex-start;
	font-family: "黑体-简", Helvetica, sans-serif;
}
</style>