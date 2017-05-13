<template>
  <div :class="$style.item" v-bind:style = "itemHeight" v-on:click = "toSecond">
    <div :class="imgStyle" v-show = "item.img_url">
    <img v-bind:src = "item.img_url" alt="图片" :class="$style.imgbox" >
  </div>
    <div :class = "$style.title" v-bind:style = "titleWidth">{{item.title}}</div> 
      <div :class = "$style.description" v-show ="item.description" v-bind:style = "styleObject">{{item.description}}</div>
      <div :class="$style.bottom">
        <div :class = "$style.author">by {{item.author}}</div>
        <div :class = "$style.views" v-show ="item.kind != 1">{{item.views}}</div>
        <div :class = "$style.views_img" v-show ="item.kind != 1">
          <svg viewBox="0 0 200 200" :class="$style.view_img"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#view"></use></svg>
        </div>
        <div :class = "$style.tag" v-show = "item.tag">#{{item.tag}}#</div> 
      </div>
    </div>
</template>

<script>
import Map from '../../common/keymap.js'
  export default {
    data(){
      return{
        url:""
      }
    },
     mounted() {

      this.url = Map.FETCH_URL_MAP[this.item.kind] + "/" + this.item.article_id
     },
    props:['item'],
    computed:{
      styleObject:function(){
          return {
          marginRight:this.item.img_url? '7%':'0',
          margin: (!this.item.description)? '0':'15px 15px 0 15px',
        }
      },
      titleWidth:function(){
        return{
          width :(this.item.kind == 1)? '45%':'100%',
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
    },
    methods:{
      toSecond(){
        window.location.pathname = this.url
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
  /*display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;*/
  margin-top: 14px;
  margin-left: 15px;
  font-size: 21px;
  font-weight: bold;
  font-family: '黑体-简';
}
.description{
  font-size: 14px;
 /* display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;*/
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
  width: 50%;
  padding-left: 15px;
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
  fill:#999;
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