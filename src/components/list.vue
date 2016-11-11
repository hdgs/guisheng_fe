  <template>
    <div>
      <div  v-for = "item in list">
        <img v-bind:src = "item.img_url" alt="图片">
        <div>题目：{{item.title}}</div> 
        <div>作者：{{item.author}}</div> 
        <div>浏览量：{{item.view_count}}</div>
        <div>描述：{{item.description}}</div>
        <br><br>
      </div>

    </div>
  </template>

  <script>
  import consts from '../common/consts' 
  import url from '../common/url' 
  import 'whatwg-fetch'

  export default {
    data() {
      return {
        list:[],
      }
    },
  	mounted () {
      let params = {
        page: 0,
        kind: consts. MAIN_ROUTER_KIND_MAP[this.$route.fullPath],
        count: 5
      }
      // expected ?page=0&kind=0&count=5
      fetch("/feed/?" + url.getUrlComponent(params))
      .then( (res) => {
        return res.json()
      }).then( value => {
        this.list= value
      })
    }
  }
  </script>

  <style lang='sass'>
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
