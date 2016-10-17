<!-- Vue.component('my-component',{ -->
  <template>
    <ul>
      <li v-for = "item in items">
       {{"属性"}}:{{ item.sub_category }}
       {{ item.main_category }}
       <br>
       {{"点赞人数"}}:{{item.likes}}
       <br>
       {{"课程名称"}}:{{item.title}}
       <br>
       {{"类别"}}:{{item.credit_category}}
       <br>
       {{"任课教师"}}:{{item.teacher}}
       <br><br><br><br>

      </li>
    </ul>
  </template>

  <script>
  import Request from 'superagent'

  export default {
  	mounted () {
  		var p =Request
     .get('/api/v1.0/courses')
     .then( (res) => {
       console.log(res)
     })
     console.log(p)
    //  .end((err, res) => {
    //    console.log(err);
    //     this.items = JSON.parse(res.text);
    //  	}
    // )
   },
   data (){
     return {
       items:[]  }
 		}
  }
  </script>

  <style lang='sass'>
  html {
    	height: 100%;
  	body {
  		display: flex;
  		align-items: center;
  		justify-content: center;
  		height: 100%;
  		background:pink;
  	}
  }

  #app2 {
  	color: blue;
  	margin-top: -100px;
  	max-width: 600px;
  	font-family: Source Sans Pro, Helvetica, sans-serif;
  	text-align: center;
  }
  p{
  	color:green;
  }

  </style>
<!-- }) -->
