<template>
  	<div id="xxx" :class = "$style.app">
    <div :class = "$style.top">
      <div :class = "$style.tab">
        <router-link to="/">首页</router-link>
      </div>
      <div :class = "$style.tab">
        <router-link to="/news">新闻</router-link>
      </div>
      <div :class = "$style.tab">
        <router-link to="/pics">图片</router-link>
      </div>
      <div :class = "$style.tab">
        <router-link to="/article">水墨</router-link>
      </div>
      <div :class = "$style.tab">
        <router-link to="/interaction">互动</router-link>
      </div>    
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
    fetch('/api/v1.0/everyDayPic').then((res) => {
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

<style lang='sass' module>
@import '../../scss/color.scss';
.app {
	max-width: 600px;
	font-family: Source Sans Pro, Helvetica, sans-serif;
	text-align: center;
}
.top{
  composes: space from 'sass-loader!../../scss/utility.scss';
  height: 94px;
  line-height: 94px;
}
.tab{
  composes: horizon from 'sass-loader!../../scss/utility.scss';
  a{
    font-size: 18px;
    color: $black;
    margin:4.7% 14px;
  }
  a:hover{
    color: $green;
  }
}

</style>
