<template>
  <div :class="$style.item" >
    <img v-bind:src = "item.img_url" alt="图片" :class="$style.img">
    <div>题目：{{item.title}}</div> 
    <div>作者：{{item.author}}</div> 
    <div>浏览量：{{item.view_count}}</div>
    <div>描述：{{item.description}}</div>
    <br><br>
  </div>
</template>

<script>
  export default {
    props:['item']
  }
</script>

<style lang='sass' module>
.item{
  width: 100%;
  background-color: #fff;
  margin-bottom: 10px;
}
.img{
  width: 100%;
}
</style>