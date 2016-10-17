<template>
  	<div id="xxx">
  		<p>{{ message}}</p>
  	</div>
</template>

<script>
import Request from 'superagent'

export default {
	mounted () {
		Request
   .get('/foo')
   .end((err, res) => {
    console.log(this)
   	 setTimeout( () => {this.message = res.body.content}, 2000)
   	}
   );

	},
	data (){
		return {
			message: "hahahha"
		}
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
		background:blue;
	}
}

#app1 {
	color: #000;
	margin-top: -100px;
	max-width: 600px;
	font-family: Source Sans Pro, Helvetica, sans-serif;
	text-align: center;
}
p{
	color:green;
}

</style>
