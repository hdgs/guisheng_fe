  <template>
    <div id = "xxx">
      <div class="banner">
        <div class="container" v-finger:swipeMove="onSwipe" v-bind:style="styleObject">
           <img src="http://pics.sc.chinaz.com/files/pic/pic9/201508/apic14052.jpg" alt="">
          <img src="http://pics.sc.chinaz.com/files/pic/pic9/201508/apic14052.jpg" alt="">
        </div>
      </div>
      <articleInfo ref = "articleInfo"  ></articleInfo>
      <articleComments ref = "articleComments"></articleComments>
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
        x:0
      }
    },
  	mounted () {
      let promise1 = fetch("/api/v1.0/article").then((res) => {
        return res.json()
      })
      let promise2 = fetch("/api/v1.0/comments").then((res) => {
        return res.json()
      })
      Promise.all([promise1,promise2]).then(values => {
        this.$refs.articleInfo.article = values[0]
        this.$refs.articleComments.articleInfo = {
          id: values[0].id,
          kind: values[0].kind
        }
        this.$refs.articleComments.obj = values[1]
      })
    },
    components:{
      "articleInfo" : info,
      "articleComments" :comments
    },
    methods:{
      onSwipe(e){
        console.log("on swipe", e.direction, e.distanceX)
        this.x = e.distanceX
      }
    }
  }
  </script>

  <style lang='sass'>
  .banner{
    width: 500px;
    height: 200px;
    overflow: hidden;
  }
  .container{
    width: 1000px;
    height: 200px;
    float: left;
  }
  .banner img{
    width: 500px;
    height: 200px;
    float: left;
  }
  html {
    	height: 100%;
  	body {
  		display: flex;
  		justify-content: center;
  		height: 100%;
  		background:pink;
  	}
  }
  #app {
  	color: green;
  	max-width: 600px;
    align-items: flex-start;
  	font-family: Source Sans Pro, Helvetica, sans-serif;
  	text-align: center;
  }
  p{
  	color:green;
  }

  </style>
