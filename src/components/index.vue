<template>
  	<div id="xxx">
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
		let promise1 = fetch('/everypic').then((res)=>{
				return res.json()
			})
   		let promise2 = fetch('/feed').then((res)=>{
      	return res.json()
    	})
    	Promise.all([promise1,promise2]).then
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
