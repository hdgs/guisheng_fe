<template>
  	<div class="main">
        <div>
            <router-link to="/">首页</router-link>
            <router-link to="/news">新闻</router-link>
            <router-link to="/article">水墨</router-link>
        </div>
        <router-view></router-view>
  	</div>
</template>

<script>

export default {
    name: "Main",
	data (){
		return {
			kind: "/"
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
