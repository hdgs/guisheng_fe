<template>
  <div id="xxx">
  <br><br><br>
    <input type="text" placeholder="请输入评论" v-model = "message">
    <button v-on:click = "submit">提交</button>
    <div v-for = "comment in obj" class="comment">
      <p>{{comment.id}}</p>
      <br> 
      <img v-bind:src = "comment.img_url" alt="图片">
      <br><br>
      <button v-on:click = "change">评论</button>
      <br><br>
      <input type="text" v-show = "onShow" v-model = "msg">
      <button v-show = "onShow" v-on:click = "submit">提交</button>
      <p>{{comment.message}}</p>
      <div>点赞数：{{comment.like_count}}</div>
      <br><br><br>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        obj:[],
        message:"",
        onShow:false
      }
    },
    methods:{
      submit:function(e){
      fetch('/api/v1.0/comments/return', {
      method: 'POST',
      headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
      body: JSON.stringify({
    article_id:this.comment_id, 
     message:this.message,
     msg:this.msg  
  })
    })
    .then( res => {
      return res.json()
    }).then( value => {
      console.log(value.status)
    })
      },
      change:function(e){
        if(this.onShow)
          this.onShow = false
        else
          this.onShow = true
      }
      
    }
  } 
</script>

<style lang = "sass">
    .comment{
      border:solid 1px yellow;
      margin-top: 20px;
      padding: 30px;
    }

</style>