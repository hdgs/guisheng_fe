<template>
  <div :class="$style.item" v-bind:style = "itemHeight">
  <div :class="imgStyle" v-show = "item.img_url.length">
    <img v-bind:src = "item.img_url" alt="图片" :class="$style.imgbox" >
  </div>
    <div :class = "$style.title" v-bind:style = "titleWidth">{{item.title}}</div> 
      <div :class = "$style.description" v-show ="item.description" v-bind:style = "styleObject">{{item.description}}</div>
      <div :class="$style.bottom">
        <div :class = "$style.author">by {{item.author}}</div>
        <div :class = "$style.views" v-show ="item.kind != 1">{{item.views}}</div>
        <div :class = "$style.views_img" v-show ="item.kind != 1"><img src="../../img/view.png" :class="$style.view_img" alt="view" ></div>
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
          marginRight:this.item.img_url.length? '7%':'0',
          margin: (!this.item.description)? '0':'15px 15px 0 15px',
        }
      },
      titleWidth:function(){
        return{
          width :(this.item.kind == 1)? '45%':((this.item.kind == 2)?'100%':'50%'),
          marginBottom :(this.item.kind == 1) ? '24px':'0px' 
        }
      },
      imgStyle:function(){
          return (this.item.kind == 1)?this.$style.img:((this.item.kind == 2)? this.$style.imgs:this.$style.imgs_s)
        },
      itemHeight:function(){
        return{
          height: (this.item.kind == 1)? '135px':''
        }
      }
    }
  }
</script>

<style lang='sass' module>
.item{
  width: 100%;
  background-color: #fff;
  margin-bottom: 10px;
  overflow: hidden;
  box-shadow: 0px 3px 1px rgba(7,0,2,0.11);
}
.title{
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
  margin-top: 14px;
  margin-left: 15px;
  font-size: 21px;
  font-weight: bold;
  font-family: '黑体-简';
}
.description{
  font-size: 14px;
  font-weight: 100;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
}
.img{
  width: 49%;
  height: 100%;
  float: right;
}
.imgs{
  width: 100%;
  height: 240px;
  overflow: hidden;
}
.imgs_s{
  width: 100%;
  height: 180px;
  overflow: hidden;
}
.imgbox{
  height: 100%;
  width: 100%;
  display: block;
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
  margin-right: 17px;
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