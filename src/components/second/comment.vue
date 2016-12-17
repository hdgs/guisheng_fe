<template>
    <div id="xxx" :class="$style.container">
        <div :class="$style.commentbox">
            <input type="text" v-bind:placeholder="commentHolder" v-model="message" v-blur="changeHolder" v-focus="focusFlag" :class = "$style.input">
            <div :class = "$style.imgsBox">
                <div :class = "$style.imgBox1">
                    <div :class = "$style.commentCount">{{articleInfo.likes}}</div>
                    <svg viewBox="0 0 200 200" :class="$style.img"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#comment"></use></svg>
                    
                </div>
                <div :class = "$style.imgBox">
                    <svg viewBox="0 0 200 200" :class="$style.img" v-on:click = "ClickChangeColor" v-bind:style="changeColor" ><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#collection_o" :class = "$style.svg"></use></svg>
                </div>
                <div :class = "$style.imgBox">
                    <svg viewBox="0 0 200 200" :class="$style.img"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#share"></use></svg>
                </div>

            </div>
            <!-- <button v-on:click="submit" :class="$style.button">提交</button> -->
        </div>
        <!-- <div v-for="comment in obj" class="comment">
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
        </div> -->
    </div>
</template>
<script>
import Blur from '../../directives/blur'
import Focus from '../../directives/focus'
export default {
    data() {
            return {
                show:false,
                colorChange: false,
                focusFlag: false,
                obj: [],
                message: "",
                onShow: false,
                currentCommentId: -1,
                commentHolder: "写评论...",
                articleInfo: {
                    id: 0,
                    kind: 0,
                    likes:0
                }
            }
        },
        computed:{
            changeColor:function(){
                return{
                    fill: this.colorChange? 'orange':'#fff'
                }
            }
        },
        directives: {
            focus: Focus,
            blur: Blur
        },
        methods: {
            ClickChangeColor:function(){
                console.log(this.colorChange)
                if(this.colorChange) this.colorChange = false
                    else this.colorChange = true
            },
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
                        this.commentHolder = "写评论..."
                    })
            },
            change: function (commentId) {
                this.currentCommentId = commentId
                this.focusFlag = true
                this.commentHolder = "回复" + commentId
            },
            changeHolder: function () {
                this.commentHolder = "写评论..."
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
    /*img {
        width: 100%;
    }*/
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
    height: 50px;
    line-height: 50px;
    background-color: #333;
}
.input{
    height: 30px;
    background-color: #333;
    outline: none;
    width: 40%;
    border-radius: 4px;
    border: #fff 1px solid;
    padding: 0 7px;
    margin-left: 10px;
    color: #fff;
}
.imgsBox{
    float: right;
    width: 50%;
    composes: space from 'sass-loader!../../scss/utility.scss';
}
.imgBox{
    width: 33.3%;
    text-align: center;
    composes: horizon from 'sass-loader!../../scss/utility.scss';
}
.imgBox1{
    position: relative;
    width: 33.3%;
    text-align: center;
    composes: horizon from 'sass-loader!../../scss/utility.scss';
}
.img{
    width: 18px;
    fill: white;
    line-height: 50px;
    height: 50px;
}
.commentCount{
    line-height: 13px;
    position: absolute;
    width: 20px;
    height: 13px;
    top:8px;
    vertical-align: middle;
    right: 13px;
    border-radius: 3px;
    text-align: center;
    color: #fff;
    background-color: #ec6941;
    font-size: 10px;
}
</style>
