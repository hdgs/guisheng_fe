<template>
    <div :class="$style.profile">
        <div :class="$style.info">
        	<div :class="$style.top">
                <div :class = "$style.back">
                    <svg viewBox="0 0 200 200" :class="$style.img"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#back"></use></svg>
                </div>
                <span :class="$style.name">我是作者昵称</span>
        	</div>
        	<div :class="$style.avatar">
        		<div :class="$style.avatarbox">
	        		<img :class="$style.avatarimg" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQe-SxAWzpsM_muAMT8ZtFh7bn1aK5-j9f2RlaLhlCKV6L1_uuQBw">
	        		<div :class="$style.sign">
	        			<span>认证作者</span>
	        			<svg viewBox="0 0 200 200" :class="$style.img"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#sign"></use></svg>
	        		</div>
        		</div>
        	</div>
        	<div :class="$style.intro">个人介绍：这是作者的个人介绍。这个人好懒啊，他什么也没写但还是要凑字数。也许两行不够介绍，那就三行……</div>
        </div>
        <div :class="$style.list">
        	<div :class="$style.col">
    			<svg viewBox="0 0 200 200" :class="$style.largeimg"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#weibo"></use></svg>
        		<div :class="$style.text">
        			<a>微博名称</a>
        			<a :class="$style.arrow">></a>
        		</div>
        	</div>
        	<div :class="$style.col">
    			<svg viewBox="0 0 200 200" :class="$style.largeimg"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#work"></use></svg>
        		<div :class="$style.text">
        			<a>我的作品</a>
        			<a :class="$style.arrow">></a>
        		</div>
        	</div>
        	<div :class="$style.col">
    			<svg viewBox="0 0 200 200" :class="$style.largeimg"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#collection"></use></svg>
        		<div :class="$style.text">
        			<a>我的收藏</a>
        			<a :class="$style.arrow">></a>
        		</div>
        	</div>
        	<div :class="$style.col">
    			<svg viewBox="0 0 200 200" :class="$style.largeimg"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#work"></use></svg>
        		<div :class="$style.text">
        			<a>他的作品</a>
        			<a :class="$style.arrow">></a>
        		</div>
        	</div>
        	<div :class="$style.col">
    			<svg viewBox="0 0 200 200" :class="$style.largeimg"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#feedback"></use></svg>
        		<div :class="$style.text">
        			<a>意见反馈</a>
        			<a :class="$style.arrow">></a>
        		</div>
        	</div>
        	<div :class="$style.col">
    			<svg viewBox="0 0 200 200" :class="$style.largeimg"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#modify"></use></svg>
        		<div :class="$style.text">
        			<a>修改信息</a>
        			<a :class="$style.arrow">></a>
        		</div>
        	</div>
        </div>
        <button :class="$style.signout">登出</button>
    </div>
</template>
<script>
import 'whatwg-fetch'
export default {
    data() {
        return {
            foo:1
        }
    }
}
</script>
<style lang='sass' module>
@import '../../scss/color.scss';
$topHeight:50px;
html,body{
	width: 100%;
	height: 100%;
}
.profile{
	width: 100%;
	height: 100%;
	background-color: $white;
}
.info{
	width: 100%;
	background-color: $black;
}
.top{
	width: 100%;
	height: $topHeight;
	font-size: 0;
	color:white;
}
.back{
	display: inline-block;
	width: 60px;
	height:100%;
	padding-left: 18px;
	box-sizing: border-box;
	vertical-align: top;
}
.img{
    width: 20px;
   	fill: $orange;
    height: 100%;
    vertical-align: middle;
}
.name{
	width: calc(100% - 50px);
	line-height: $topHeight;
	color:$orange;
	font-size: 17px;
	box-sizing: border-box;
}
.intro{
	width: 100%;
	padding: 0 24px;
	font-size: 14px;
	line-height: 20px;
	color:$white;
	height: 80px;
	box-sizing: border-box;
}
.avatar{
	width: 100%;
	height: 150px;
	position: relative;
}
.avatarbox{
	width: 200px;
	text-align: center;
	position: absolute;
	top:50%;
	left: 50%;
	transform: translate(-50%,-50%);
}
.avatarimg{
	width: 72px;
	height: 72px;
	border-radius: 50%;
}
.sign{
	margin-top: 18px;
	text-indent: 20px;
	color: $orange;
}
.list{
	width: 100%;
}
.col{
	height: 50px;
	font-size: 0;
}
.largeimg{
	width: 30px;
   	fill: $orange;
    vertical-align: middle;	
    margin: 0 16px;
}
.text{
	display: inline-block;
	height: 50px;
	line-height: 50px;
	font-size: 16px;
	vertical-align: middle;
	color:$black;
	width: calc(100% - 62px);
	box-sizing: border-box;
	border-bottom: 1px solid #e6e6e6;
}
.arrow{
	float: right;
	margin-right: 26px;
	transform: scale(1, 2);
	overflow: hidden;
	font-size: 16px;
	color: #8a8a8a;
}
.signout{
	display: block;
	width: 190px;
	height: 40px;
	box-sizing: border-box;
	border: 1px $orange solid;
	background-color: $white;
	margin:0 auto;
	border-radius: 3%;
	color:#fbb848;
	font-size: 16px;
	margin-top: 26px;
}

</style>