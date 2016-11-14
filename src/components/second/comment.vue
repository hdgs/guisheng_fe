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
      <button v-on:click = "change(comment.id)">评论</button>
      <br><br>
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
        onShow:false,
        currentCommentId:-1,
        articleInfo:{
          id:0,
          kind:0
        }  
      }
    },
    methods:{
      submit:function(e){
        console.log(this.articleInfo)
      fetch('/api/v1.0/comments', {
      method: 'POST',
      headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
      body: JSON.stringify({
        comment_id:this.currentCommentId,
        article_id:this.articleInfo.id,
        kind:this.articleInfo.kind, 
        message:this.message 
  })
    })
    .then( res => {
      return res.json()
    }).then( value => {
      console.log(value.status)
      console.log(this.currentCommentId,"+",this.message)
    })
      },
      change:function(commentId){
        this.currentCommentId = commentId
        document.querySelector("input").focus()
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