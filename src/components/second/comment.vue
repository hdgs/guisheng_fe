<template>
  <div id="xxx">
    <div v-for = "comment in obj" class="comment">
      <p>{{comment.id}}</p>
      <input type="text" placeholder="请输入评论" v-model = "message">
      <button v-on:click = "submit">提交</button>
      <br> 
      <img v-bind:src = "comment.img_url" alt="图片">
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
        message:""
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
     message:this.message 
  })
    })
    .then( res => {
      return res.json()
    }).then( value => {
      console.log("value.status")
    })
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