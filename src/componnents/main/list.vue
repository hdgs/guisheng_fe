<template>
    <div class="list">
        <p>目前渲染的路由是：{{ this.$route.path }},这个路由的kind是 {{ kind }}</p>
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
import 'whatwg-fetch'
import consts from "../../common/consts"

export default {
	mounted () {
        this.kind = consts.MAIN_ROUTER_KIND_MAP[this.$route.path]
        fetch('/feed').then((res)=>{
            return res.json()
        }).then((value)=>{
            this.list = value
        })
	},
	data (){
		return {
            kind: 0,
			list:[]
        }
	}
}
</script>

<style lang='sass'>


</style>