<template>
	<div id="xxx">
		<h2>{{article.title}}</h2>
		<p>{{article.author}}</p>
		<div>{{article.time}}</div>
		<div>{{article.body}}</div>

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

<style>
	
</style>