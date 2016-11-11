<template>
  	<div id="xxx">
    <div>
      <router-link to="/">首页</router-link>
      <router-link to="/news">新闻</router-link>
      <router-link to="/pics">图片</router-link>
      <router-link to="/article">水墨</router-link>
      <router-link to="/interaction">互动</router-link>
    </div>
    <div v-show ="onShow" >
      <img v-bind:src="pic_value.img_url" alt="每日一图">
    </div>
    <router-view></router-view>
  	</div>
</template>

<script>
import Request from 'superagent'
import 'whatwg-fetch'

export default {
	mounted () {
    fetch('/everydayPic').then((res)=>{
      return res.json()
    }).then(value=>{
      this.pic_value = value
    })
	},
	data (){
		return {
			list:[],
      pic_value:{},
      onShow :true
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

#app {
	color: #000;
	max-width: 600px;
	font-family: Source Sans Pro, Helvetica, sans-serif;
	text-align: center;
}
p{
	color:green;
}

</style>
