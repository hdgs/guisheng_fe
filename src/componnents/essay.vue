c<!-- Vue.component('my-component',{ -->
  <template>
    <div>
      <div v-show="isLoading">
        加载中
      </div>
      <courseInfo ref="courseInfo"></courseInfo>
      <courseComment ref="comment"></courseComment>
    </div>
  </template>

  <script>
  import part1 from './part1'
  import part2 from './part2'
  import 'whatwg-fetch';

  export default {
    data() {
      return {
        isLoading:true
      }
    },
  	mounted () {
  		let promise1 = fetch("/api/v1.0/courses/313/").then( (res) => {
        return res.json()
      })
      let promise2 = fetch("/api/v1.0/courses/313/comments/?page=1&per_page=10")
      .then( (res) => {
        return res.json()
      })
      Promise.all([promise1, promise2]).then( values => {
        console.log(this.$refs.courseInfo.obj)
        this.$refs.courseInfo.list= values[1]
        this.$refs.comment.obj = values[0]
        this.isLoading = false
      })
    },
    components:{
      "courseInfo":part1,
      "courseComment":part2
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
  #app1 {
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
<!-- }) -->
