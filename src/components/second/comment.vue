<template>
    <div id="xxx" :class="$style.container">
        <div :class="$style.commentbox" v-bind:style="commentBox">
            <svg viewBox="0 0 200 200" :class="$style.last" v-show="!showComment" v-on:click = "backToLast">
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#backToLast"></use>
            </svg>
            <input type="text" v-bind:placeholder="commentHolder" v-model="message" v-blur="changeHolder" :class="$style.input" v-bind:style="Comment" v-show="!showComment" v-on:click="activeComment">
            <div v-iHtml="changeMessage" tabIndex="-1" v-clear="clear" :class="$style.input" v-bind:style="Comment" v-show="showComment" contenteditable Focusable ref = "doc">{{preMessage}}</div>
            <div :class="$style.commitBox" v-show="showComment">
                <svg viewBox="0 0 200 200" :class="$style.commit" v-bind:style="commit" v-on:click="submit">
                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#commit"></use>
                </svg>
            </div>
            <div :class="$style.imgsBox" v-show="!showComment">
                <div :class="$style.imgBox1" v-bind:style="BoxWidth">
                    <div :class="$style.commentCount">{{articleInfo.commentCount}}</div>
                    <svg viewBox="0 0 200 200" :class="$style.img" v-on:click="activeComment">
                        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#comment"></use>
                    </svg>
                </div>
                <div :class="$style.imgBox1" v-show="articleInfo.kind == 2" v-bind:style="BoxWidth">
                    <div :class="$style.likesCount">{{articleInfo.likes}}</div>
                    <svg viewBox="0 0 200 200" :class="$style.img" v-on:click="likePicture">
                        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#likes"></use>
                    </svg>
                </div>
                <div :class="$style.imgBox" v-bind:style="BoxWidth">
                    <svg viewBox="0 0 200 200" :class="$style.img" v-on:click="ClickChangeColor" v-bind:style="changeColor">
                        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#collection_o" :class="$style.svg"></use>
                    </svg>
                </div>
                <div :class="$style.imgBox" v-bind:style="BoxWidth">
                      <div class="-mob-share-open">  
                        <svg viewBox="0 0 200 200" :class="$style.img" v-on:click="shShare">
                            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#share"></use>
                        </svg>
                      </div>   
                </div>
            </div>
        </div>
        <modal v-show="showTips"></modal>
        <div :class="$style.commentPage" v-show="showComment">
            <div :class="$style.titleBox">
                <svg viewBox="0 0 200 200" :class="$style.imgBack" v-on:click="closeComment">
                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#back"></use>
                </svg>
                <div :class="$style.commentTitle">评论区</div>
            </div>
            <div v-for="comment in obj" v-on:click="commentOthers(comment)">
                <comment :comment="comment"></comment>
            </div>
            <div :class="$style.sline"></div>
            <div :class = "$style.occupy" v-show = "!showComment"></div>
        </div>
        <sharePage v-show="showShare"></sharePage>
    </div>
</template>
<script>
import Blur from '../../directives/blur'
import Focus from '../../directives/focus'
import IHtml from '../../directives/innerHtml'
import Clear from '../../directives/clearHtml'
import CommentBox from './commentBox'
import Cookie from '../../common/cookie.js'
import FETCH from '../../common/fetch.js'
import SharePage from './sharePage'
import Modal from './modal'

export default {
    data() {
            return {
                showComment: false,
                show: false,
                clear: false,
                submitted: false,
                focusFlag: false,
                curi: 0,
                showTips: false,
                obj: [],
                url: "",
                liked: false,
                showShare: false,
                message: "",
                preMessage: "",
                onShow: false,
                currentCommentId: -1,
                commentHolder: "写评论...",
                articleInfo: {
                    id: 0,
                    kind: 0,
                    commentCount: 0,
                    user_role: -1,
                    user_id: 1,
                    collected: 0
                }
            }
        },
        components: {
            "comment": CommentBox,
            "sharePage":SharePage,
            "modal":Modal
        },
        computed: {
            BoxWidth: function () {
                return {
                    width: this.articleInfo.kind == 2 ? '25%' : '33.3%'
                }
            },
            changeColor: function () {
                return {
                    fill: this.articleInfo.collected ? 'orange' : '#fff'
                }
            },
            Comment: function () {
                return {
                    width: this.showComment ? '78.1%' : '30%',
                    height: this.showComment ? '' : '30px',
                    lineHeight: this.showComment ? '25px' : '',
                    float: this.showComment ? 'left' : ''
                }
            },
            commentBox: function () {
                return {
                    height: this.showComment ? '' : '50px',
                    lineHeight: this.showComment ? '' : '50px',
                    padding: this.showComment ? '12.5px 0' : ''
                }
            },
            commit: function () {
                return {
                    fill: (this.message == "") ? 'white' : 'orange'
                }
            }
        },
        directives: {
            focus: Focus,
            blur: Blur,
            iHtml: IHtml,
            clear: Clear
        },
        methods: {
            shShare() {
                if (this.showShare)
                    this.showShare = false
                else
                    this.showShare = true
            },
            focusScroll(){
                console.log()
                this.$refs.doc.scrollIntoView(false)
                this.$refs.doc.focus()
            },
            likePicture() {
                if (this.liked) return
                FETCH.FetchData("/api/v1.0/like/picture/", "POST", {
                    picture_id: this.articleInfo.id
                }).then(res => {
                    this.articleInfo.likes++
                        this.liked = true
                })
            },
            backToLast(){
                window.history.back()
            },
            commentOthers: function (comment) {
                this.currentCommentId = comment.comment_id
                this.preMessage = "@" + comment.name + ":"
                this.focusFlag = true

            },
            changeMessage: function (e) {
                this.clear = false
                this.message = e
            },
            closeComment: function () {
                if (this.showComment) {
                    this.showComment = false
                    this.$parent.showComment = false
                    this.message = ""
                }
            },
            activeComment: function (e) {
                if (!this.showComment) {
                    FETCH.FetchData(this.url, "GET")
                        .then(res => {
                            this.obj = res
                        })
                    this.showComment = true
                    this.$parent.showComment = true
                    this.focusScroll()
                }
            },
            ClickChangeColor: function () {
                if (!Cookie.getCookie("token")) {
                    this.showTips = true
                    return
                }
                if (this.articleInfo.collected == 1) {
                    this.articleInfo.collected = 0

                } else {
                    this.articleInfo.collected = 1
                }
                var apiName = this.articleInfo.collected ? "/api/v1.0/collect/" : "/api/v1.0/collect_delete/"
                FETCH.FetchData(apiName, "POST", {
                    kind: this.articleInfo.kind,
                    article_id: this.articleInfo.id,
                    my_id: Cookie.getCookie("uid")
                },{})
            },
            submit: function (e) {
                e.stopPropagation();
                if (!this.message) return
                if (!Cookie.getCookie("token")) {
                    this.showTips = true
                    return
                }
                FETCH.FetchData('/api/v1.0/comments/', 'POST', {
                        comment_id: this.currentCommentId,
                        article_id: this.articleInfo.id,
                        kind: this.articleInfo.kind,
                        message: this.message,
                        user_id: Cookie.getCookie("uid")
                    })
                    .then(value => {
                        this.message = ""
                        this.commentHolder = "写评论..."
                        this.showComment = false
                        this.clear = true
                        this.articleInfo.commentCount++
                    })
            },
            changeHolder: function () {
                this.commentHolder = "写评论..."
                this.focusFlag = false
            }
        }
}
</script>
<style lang ="sass" module>
@import '../../scss/color.scss';
@import '../../scss/zindex.scss';

.occupy {
    height: 50px;
    width: 100%;
}

.comment {
    border-top: solid 1px $grey_l;
    padding: 15px;
    width: 100%;
    composes: space from 'sass-loader!../../scss/utility.scss';
    position: relative;
}

.sline {
    height: 1px;
    width: 100%;
    background-color: $grey_l;
}

.container {
    width: 100%;
    overflow: hidden;
}

.commentbox {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    z-index: $Zindex3;
    background-color: #333;
}

.input {
    background-color: #333;
    outline: none;
    vertical-align: middle;
    border-radius: 4px;
    border: $white 1px solid;
    padding: 2px 7px;
    margin-left: 10px;
    color: $white;
    box-sizing: border-box;
}

.imgsBox {
    float: right;
    width: 57%;
    composes: space from 'sass-loader!../../scss/utility.scss';
}

.imgBox {
    text-align: center;
    composes: horizon from 'sass-loader!../../scss/utility.scss';
}

.imgBox1 {
    position: relative;
    text-align: center;
    composes: horizon from 'sass-loader!../../scss/utility.scss';
}

.img {
    width: 18px;
    fill: white;
    line-height: 50px;
    height: 50px;
}
 
.last{
    composes: img;
    margin-left: 2%;
    composes: horizon from 'sass-loader!../../scss/utility.scss'; 
} 

.commentCount {
    line-height: 16px;
    position: absolute;
    padding: 0 3px;
    top: 6px;
    min-width: 12px;
    vertical-align: middle;
    right: 20%;
    border-radius: 30%;
    text-align: center;
    color: $white;
    background-color: $orange_count;
    font-size: 10px;
}

.likesCount {
    line-height: 16px;
    position: absolute;
    min-width: 12px;
    padding: 1px 3px;
    top: 6px;
    vertical-align: middle;
    right: 10%;
    border-radius: 4px;
    text-align: center;
    color: $white;
    background-color: $orange_count;
    font-size: 10px;
}

.commit {
    width: 22px;
}

.commitBox {
    position: absolute;
    right: 19px;
    line-height: 1;
    bottom: 16.5px;
}

.commentPage {
    position: absolute;
    overflow: auto;
    top: 0;
    min-height:100%;
    background-color: $white;
    z-index: $Zindex2;
    width: 100%;
}

.imgBack {
    composes: horizon from 'sass-loader!../../scss/utility.scss';
    width: 19px;
    padding-left: 18px;
    fill: $orange;
}

.commentTitle {
    composes: horizon from 'sass-loader!../../scss/utility.scss';
    text-align: center;
    width: 80%;
    font-size: 17px;
}

.titleBox {
    height: 52px;
    width: 100%;
    line-height: 52px;
    color: $black;
    composes: space from 'sass-loader!../../scss/utility.scss';
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
}

.time {
    margin-top: 15px;
    color: $black_t;
    font-size: 13px;
}
</style>
