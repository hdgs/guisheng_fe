<template>
    <div id="xxx" :class="$style.container">
        <div :class="$style.commentbox">
            <input type="text" v-bind:placeholder="commentHolder" v-model="message" v-blur="changeHolder" v-focus="focusFlag">
            <button v-on:click="submit" :class="$style.button">提交</button>
        </div>
        <div v-for="comment in obj" class="comment">
            <p>{{comment.id}}</p>
            <br>
            <img v-bind:src="comment.img_url" alt="图片">
            <br>
            <br>
            <button v-on:click="change(comment.id)" :class="$style.button">评论</button>
            <br>
            <br>
            <p>{{comment.message}}</p>
            <div>点赞数：{{comment.like_count}}</div>
        </div>
    </div>
</template>
<script>
import Blur from '../../directives/blur'
import Focus from '../../directives/focus'
export default {
    data() {
            return {
                show:false,
                focusFlag: false,
                obj: [],
                message: "",
                onShow: false,
                currentCommentId: -1,
                commentHolder: "写评论",
                articleInfo: {
                    id: 0,
                    kind: 0
                }
            }
        },
        directives: {
            focus: Focus,
            blur: Blur
        },
        methods: {
            submit: function (e) {
                console.log(this.articleInfo)
                fetch('/api/v1.0/comments', {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            comment_id: this.currentCommentId,
                            article_id: this.articleInfo.id,
                            kind: this.articleInfo.kind,
                            message: this.message
                        })
                    })
                    .then(res => {
                        return res.json()
                    }).then(value => {
                        console.log(value.status)
                        console.log(this.currentCommentId, "+", this.message)
                        this.message = ""
                        this.commentHolder = "写评论"
                    })
            },
            change: function (commentId) {
                this.currentCommentId = commentId
                this.focusFlag = true
                this.commentHolder = "回复" + commentId
            },
            changeHolder: function () {
                this.commentHolder = "写评论"
                this.focusFlag = false
            }
        }
}
</script>

<style lang = "sass" module>
.comment {
    border: solid 1px yellow;
    margin-top: 20px;
    padding: 30px;
    width: 100%;
}

.container {
    width: 100%;
    overflow: hidden;
    text-align: center;
    img {
        width: 100%;
    }
}

.button {
    background-color: yellow;
    border: 0;
    outline: none;
}

.commentbox {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    background-color: grey;
    padding: 5px;
}
</style>
