<template>
    <div id="xxx" :class="$style.container">
        <div :class="$style.commentbox" v-bind:style="commentBox">
            <input type="text" v-bind:placeholder="commentHolder" v-model="message" v-blur="changeHolder" v-focus="focusFlag" :class="$style.input" v-bind:style="Comment" v-show="!showComment" v-on:click="activeComment">
            <div v-iHtml="changeMessage" tabIndex="-1" v-clear="clear" :class="$style.input" v-bind:style="Comment" v-show="showComment" contenteditable="true">{{preMessage}}</div>
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
                    <svg viewBox="0 0 200 200" :class="$style.img" v-on:click="shShare">
                        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#share"></use>
                    </svg>
                </div>
            </div>
        </div>
        <div v-show="showTips" :class="$style.suggestMask">
            <div :class="$style.returnCard">
                <div :class="$style.returnContent">登录以后才能评论和收藏哦~</div>
                <div :class="$style.returnButton">我要登录</div>
                <div :class="$style.returnButton" v-on:click="quit">取消</div>
            </div>
        </div>
        <div :class="$style.commentPage" v-show="showComment">
            <div :class="$style.titleBox">
                <svg viewBox="0 0 200 200" :class="$style.imgBack" v-on:click="closeComment">
                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#back"></use>
                </svg>
                <div :class="$style.commentTitle">评论区</div>
            </div>
            <comment :comment="comment" v-for="comment in obj" v-on:click="commentOthers(comment)"></comment>
            <div :class="$style.sline"></div>
        </div>
        <div v-show="showShare" :class="$style.sharePage">
            <div :class = "$style.maskShare"></div>
            <div :class = "$style.shareBox">
                <div class="bdsharebuttonbox" data-tag="share_1">
                    <a class="bds_mshare" data-cmd="mshare" style="margin:12%;"></a>
                    <a class="bds_evernotecn" data-cmd="evernotecn" style="margin:12%;"></a>
                    <a class="bds_qzone" data-cmd="qzone" href="#" style="margin:12%;"></a>
                    <a class="bds_tsina" data-cmd="tsina" style="margin:12%;"></a>
                    <a class="bds_baidu" data-cmd="baidu" style="margin:12%;"></a>
                    <a class="bds_sqq" data-cmd="sqq" style="margin:12%;"></a>
                    <a class="bds_tqq" data-cmd="tqq" style="margin:12%;"></a>
                    <a class="bds_weixin" data-cmd="weixin" style="margin:12%;"></a>
                    <a class="bds_fbook" data-cmd="fbook" style="margin:12%;"></a>
                    <a class="bds_twi" data-cmd="twi" style="margin:12%;"></a>
                </div>
                <div :class = "$style.occupy"></div>
            </div>
        </div>
    </div>
</template>
<script>
import Blur from '../../directives/blur'
import Focus from '../../directives/focus'
import IHtml from '../../directives/innerHtml'
import Clear from '../../directives/clearHtml'
import CommentBox from './commentBox'
export default {
    data() {
            return {
                showComment: false,
                closeComment: true,
                show: false,
                clear: false,
                submitted: false,
                colorChange: false,
                focusFlag: false,
                curi: 0,
                showTips: false,
                obj: [],
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
                    user_role: -1
                }
            }
        },
        components: {
            "comment": CommentBox,
        },
        computed: {
            changeWordColor: function () {
                return {
                    color: this.obj[this.curi].greatComment ? 'orange' : '',
                }
            },
            changeLikeColor: function () {
                return {
                    fill: this.greatComment ? 'orange' : ''
                }
            },
            BoxWidth: function () {
                return {
                    width: this.articleInfo.kind == 2 ? '25%' : '33.3%'
                }
            },
            changeColor: function () {
                return {
                    fill: this.colorChange ? 'orange' : '#fff'
                }
            },
            Comment: function () {
                return {
                    width: this.showComment ? '78.1%' : '40%',
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
            likePicture() {
                if (this.liked) return
                fetch("/api/v1.0/like/picture", {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        picture_id: this.articleInfo.id
                    })
                })
                this.articleInfo.likes++
                    this.liked = true
            },
            commentOthers: function (comment) {
                console.log(comment, this.message)
                this.preMessage = "@" + comment.name + ":"
                console.log(this.preMessage)

            },
            changeMessage: function (e) {
                this.clear = false
                console.log(e)
                this.message = e
            },
            closeComment: function () {
                if (this.showComment) {
                    this.showComment = false
                    this.message = ""
                }
            },
            activeComment: function (e) {
                if (!this.showComment) this.showComment = true
            },
            quit() {
                this.showTips = false
            },
            ClickChangeColor: function () {
                console.log(this.articleInfo)
                if (this.articleInfo.user_role == -1) {
                    this.showTips = true
                    return
                }
                if (this.colorChange) {
                    this.colorChange = false

                } else this.colorChange = true
                console.log
                var apiName = this.colorChange ? "/api/v1.0/collect_delete/" : "/api/v1.0/collect/"
                fetch(apiName, {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        kind: this.articleInfo.kind,
                        article_id: this.articleInfo.id
                    })
                })
            },
            submit: function (e) {
                e.stopPropagation();
                if (!this.message) return
                if (this.articleInfo.user_role == -1) {
                    this.showTips = true
                    return
                }
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
                        this.showComment = false
                        this.clear = true
                        this.articleInfo.commentCount++
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
window._bd_share_config = {
    common: {
        bdText: '自定义分享内容',
        bdDesc: '自定义分享摘要',
        bdUrl: '自定义分享url地址',
        bdPic: '自定义分享图片'
    },
    share: [{
        "bdSize": 32,
        // "bdCustomStyle" : ".bds_mshare{margin:10px;}"
    }],
    image: [{
        viewType: 'collection',
        viewPos: 'bottom',
        viewColor: 'white',
        viewSize: '32',
        viewList: ['qzone', 'tsina', 'huaban', 'tqq', 'renren', 'evernotecn']
    }]
}
</script>
<style lang ="sass" module>
@import '../../scss/color.scss';
.maskShare{
    background: rgba(53,53,53,0.55);
    z-index: 2;
    position: fixed;
    width: 100%;
    height: 246px;
}
.sharePage {
    top: 54px;
    width: 100%;
    bottom: 0;
    left: 0;
    position: fixed;
}

.shareBox{
    top:300px;
    width: 100%;
    bottom: 0;
    left: 0;
    position: fixed;
    background: white;
}
.occupy{
    height: 50px;
    width: 100%;
}
.mask {
    position: fixed;
    width: 100%;
    background-color: rgba(229, 233, 233, 0.85);
    z-index: 2;
    bottom: 50px;
    top: 0;
}

.suggestMask {
    position: fixed;
    top: 0;
    bottom: 0;
    width: 100%;
    z-index: 6;
    background-color: rgba(51, 51, 51, 0.85);
}

.returnCard {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 217px;
    height: 87.5px;
    background-color: $white;
    color: $black;
    padding: 25px 17.5px 15px;
    border-radius: 2px;
    transform: translate(-50%, -50%);
    box-sizing: border-box;
    font-size: 14px;
}

.returnButton {
    float: right;
    margin-left: 25px;
    color: $orange;
    cursor: pointer;
    margin-top: 16px;
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
    z-index: 5;
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

.commentCount {
    line-height: 16px;
    position: absolute;
    padding: 1px 3px;
    top: 6px;
    vertical-align: middle;
    right: 20%;
    border-radius: 4px;
    text-align: center;
    color: $white;
    background-color: $orange_count;
    font-size: 10px;
}

.likesCount {
    line-height: 16px;
    position: absolute;
    padding: 1px 3px;
    top: 6px;
    vertical-align: middle;
    right: -1%;
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
    position: fixed;
    top: 0;
    bottom: 0;
    background-color: $white;
    z-index: 4;
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
