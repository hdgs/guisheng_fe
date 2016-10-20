<!-- Vue.component('my-component',{ -->
  <template>
    <ul id="app1">
      <li v-for = "item in items" >
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
  		Request
     .get('/api/v1.0/courses')
    //  .then( (res) => {
    //    console.log(res)
    //  })
     .end((err, res) => {
       console.log(res.text);
        this.items = JSON.parse(res.text);
     	}
    )
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
