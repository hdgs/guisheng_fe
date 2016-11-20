<template>
  	<div id="xxx">
    <div>
      <router-link to="/">首页</router-link>
      <router-link to="/news">新闻</router-link>
      <router-link to="/pics">图片</router-link>
      <router-link to="/article">水墨</router-link>
      <router-link to="/interaction">互动</router-link>
    </div>
    <router-view></router-view>

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
import Request from 'superagent'
import 'whatwg-fetch'

export default {
	mounted () {
    // const getUserId = new Proimse( (resolve, reject) => {
    //     Request
    //     .get('/userId')
    //     .end((err, res) => {
    //       resolve(res.body.userId)
    //     }
    //   }
    // )
    //
    // getUserId.then( (value) => {
    //     Request
    //     .get('/userInfo/' + value)
    //     .end((err, res) => {
    //       resolve(res.body.userInfo)
    //     }
    // }).then( (value) => {
    //     vm.data = value
    // })
    fetch('/feed').then((res)=>{
      return res.json()
    }).then((value)=>{
      this.list = value
    })
	},
	data (){
		return {
			list:[]
}
	}
}
</script>

<style lang='sass'>
html {
  	height: 100%;
	body {
		display: flex;
    /*align-items:center;
		justify-content: center;*/
		height: 100%;
		background:grey;
	}
}

#app2 {
	color: #000;
	max-width: 600px;
	font-family: Source Sans Pro, Helvetica, sans-serif;
	text-align: center;
}
p{
	color:green;
}

</style>
