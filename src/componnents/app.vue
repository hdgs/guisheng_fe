<template>
  	<div id="xxx">
  		<p>{{ message}}</p>
  	</div>
</template>

<script>
import Request from 'superagent'

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
    align-items:center;
		justify-content: center;
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
