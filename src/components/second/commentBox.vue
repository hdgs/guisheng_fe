<template>
    <div :class="$style.comment">
        <img v-bind:src="comment.img_url" alt="头像" :class="$style.authorImg"
        v-on:click = "getToTheAutherProfile(comment)">
        <svg viewBox="0 0 200 200" :class="$style.sign" v-show="comment.user_role">
            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#sign"></use>
        </svg>
        <div :class="$style.info">
            <div :class="$style.nameBox">
                <div :class="$style.name">{{comment.name}}</div>
                <div :class="$style.commentLike">
                    <div :class="$style.likeComments" v-bind:style="changeWordColor">{{comment.likes}}</div>
                    <svg viewBox="0 0 200 200" :class="$style.imgLikes" v-bind:style="changeLikeColor" v-on:click="addCommentLike(comment,index)">
                        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#likes"></use>
                    </svg>
                </div>
            </div>
            <div :class="$style.content" v-html = "comment.message"></div>
            <div :class="$style.time">{{comment.time}}</div>
        </div>
    </div>
</template>
<script>
import FETCH from '../../common/fetch.js'

export default {
    data() {
            return {
                flag: 0,
                greatComment:false
            }
        },
        computed: {
            changeWordColor: function () {
                return {
                    color: this.greatComment ? 'orange' : '',
                }
            },
            changeLikeColor: function () {
                return {
                    fill: this.greatComment ? 'orange' : ''
                }
            }
        },
        mounted(){
            console.log(this.comment)
        },
        methods: {
            addCommentLike: function (comment, index) {
                if (this.greatComment) return
                FETCH.FetchData("/api/v1.0/like/comment/","POST",{
                        comment_id: this.comment.comment_id
                    })
                this.comment.likes++
                this.greatComment = true
            },
            getToTheAutherProfile:function(comment){
            	if(!comment.user_role) return
            		window.location = "/profile/" + comment.user_id
            }
        },
        props: ['comment'],
}
</script>
<style lang ="sass" module>
@import '../../scss/color.scss';
.comment {
    border-top: solid 1px $grey_l;
    padding: 15px;
    box-sizing: border-box;
    width: 100%;
    composes: space from 'sass-loader!../../scss/utility.scss';
    position: relative;
}

.authorImg {
    width: 40px;
    height: 40px;
    border-radius: 20px;
    overflow: hidden;
    position: relative;
    display: inline-block;
    vertical-align: top;
}

.sign {
    fill: $orange;
    width: 13px;
    margin-left: -10px;
    position: absolute;
    top: 42px;
}

.info {
    display: inline-block;
    vertical-align: top;
    font-size: 13px;
    width: 75%;
    margin-left: 10px;
}

.nameBox {
    composes: space from 'sass-loader!../../scss/utility.scss';
}

.name {
    color: $orange;
    composes: horizon from 'sass-loader!../../scss/utility.scss';
    composes: space from 'sass-loader!../../scss/utility.scss';
    font-size: 13px;
}

.commentLike {
    float: right;
    composes: horizon from 'sass-loader!../../scss/utility.scss';
}

.imgLikes {
    fill: $black_t;
    width: 15px;
    height: 14px;
    composes: horizon from 'sass-loader!../../scss/utility.scss';
}

.likeComments {
    composes: horizon from 'sass-loader!../../scss/utility.scss';
    color: $black_t;
    font-size: 13px;
    margin-right: 10px;
}

.content {
    padding: 15px 0;
    font-size: 13px;
    line-height: 1.5;
    color: $black;
    word-break: break-word;
}

.time {
    margin-top: 15px;
    color: $black_t;
    font-size: 13px;
}
</style>
