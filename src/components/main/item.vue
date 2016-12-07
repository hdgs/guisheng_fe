<template>
  <div :class="$style.item" >
    <img v-bind:src = "item.img_url" alt="图片" :class="imgStyle" v-show = "item.img_url.length">
    <div :class = "$style.title">{{item.title}}</div> 
      <div :class = "$style.description" v-show ="item.kind != 2" v-bind:style = "styleObject">{{item.description}}</div>
      <div :class="$style.bottom">
        <div :class = "$style.author">by {{item.author}}</div>
        <div :class = "$style.views">{{item.views}}</div>
        <div :class = "$style.views_img"><img src="../../img/view.png" :class="$style.view_img" alt="view"></div>
        <div :class = "$style.tag">{{item.tag}}</div> 
      </div>
    </div>
</template>

<script>
  export default {
    props:['item'],
    computed:{
      styleObject:function(){
          return {
          width :(!this.item.img_url.length||this.item.kind==2)?'94%':'50%',
          marginRight:this.item.img_url.length? '7%':'0'
        }
      },
      imgStyle:function(){
          return (!this.item.img_url.length||this.item.kind==2)?this.$style.imgs:this.$style.img
        }
    }
  }
</script>

<style lang='sass' module>
.item{
  width: 100%;
  background-color: #fff;
  margin-bottom: 10px;
  padding-top: 15px;
  overflow: hidden;
  box-shadow: 0px 3px 1px rgba(7,0,2,0.11);
}
.title{
  margin-left: 15px;
  font-size: 21px;
  font-weight: bold;
  font-family: '黑体-简';
}
.description{
  font-size: 14px;
  margin: 15px;
  font-weight: 100;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
}
.img{
  width: 40%;
  margin-right: 3%;
  float: right;
  max-height: 90px;
}
.imgs{
  width: 100%;
}
.common{
  color: #999999;
  font-size: 12px;
  composes: horizon from 'sass-loader!../../scss/utility.scss';
}
.bottom{
  overflow: hidden;
  padding-bottom: 10px;
  padding-top: 10px;
  composes: space from 'sass-loader!../../scss/utility.scss';
}
.author{
  width: 30%;
  padding-left: 15px;
  float: left;
  composes: common; 
}
.tag{
  float: right;
  margin-right: 15.5px;
  composes: common; 
}
.views_img{
  float: right;
  margin-right: 4.5px;
  composes: common; 
}
.view_img{
  width: 13px;
}
.views{
  float: right;
  margin-right: 15px;
  composes: common; 
}
</style>