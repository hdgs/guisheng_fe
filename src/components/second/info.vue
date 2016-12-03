<template>
	<div id="xxx" :class = "$style.box">
		<h2>{{article.title}}</h2>
		<p>{{article.author}}</p>
		<div>{{article.time}}</div>
		<div v-html="article.body"></div>

	</div>
</template>

<script>
	export default {
    data() {
      return {
        article:{}
      }
    }
  } 
</script>

<style style = "sass" module>
.box{
	text-align: center;
}
</style>