<template>
    <div id="xxx" :class="$style.picSecond" v-width="changeWidth">
        <div :class="$style.titleBox">
            <svg viewBox="0 0 200 200" :class="$style.img" v-on:click = "goBack()">
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#back"></use>
            </svg>
            <div :class="$style.title">{{picInfo.title}}</div>
        </div>
        <div :class="$style.numBox">
            <div :class="$style.time">{{picInfo.time}}</div>
            <div :class="$style.picNum">
                <div :class="$style.curNum">{{i+1}}</div>
                <div :class="$style.totalNum">/{{pics.length}}</div>
            </div>
        </div>
        <div :class="$style.banner" v-bind:style="imgHeight">
            <div :class="$style.container" v-finger:swipeMove="onSwipe" v-finger:swipe="afterSwipe" v-finger:tap="showMask" v-bind:style="styleObject" v-transitionEnd="changeState">
                <img alt="picture" v-bind:src="img.pic_url" v-bind:style="imgWidth" v-for="img in pics" v-radio="initImgRadio">
            </div>
            <div :class="$style.lastOneMask" v-show="lastOne" v-bind:style="imgHeight">
                <svg viewBox="0 0 200 200" :class="$style.imgRecommend">
                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#recommend"></use>
                </svg>
                <div :class="$style.recommendWord">没有啦，看看相关推荐↓↓↓</div>
            </div>
        </div>
        <div :class="$style.imgDescription">
            <div>{{tappedImgDescription}}</div>
        </div>
        <div :class="$style.bottom">
            <div :class="$style.author">by {{picInfo.author}}</div>
            <div :class="$style.views">{{picInfo.views}}</div>
            <div :class="$style.views_img">
                <svg viewBox="0 0 200 200" :class="$style.view_img">
                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#view"></use>
                </svg>
            </div>
            <div :class="$style.tag">#图集#</div>
        </div>
        <div :class="$style.sline"></div>
        <div :class="$style.editor">[责任编辑：{{picInfo.editor}}]</div>
        <div v-show="ifTab" :class="$style.mask">
            <p v-finger:tap="hideMask" :class="$style.hideMaskBtn">关闭</p>
            <img v-bind:src="tappedImgSrc" v-finger:pintch="onPintch" v-bind:style="imgTransform" v-finger:doubleTap="imgScale" v-finger:swipeMove="imgSwipe" :class="$style.testbox">
        </div>
        <picComments ref="picComments"></picComments>
        <div :class="$style.recommend">
            <div :class="$style.recommendTitle">相关推荐</div>
            <item :item="item" v-for="item in list"></item>
        </div>
        <div :class="$style.occupy"></div>
</template>
<script>
import CssToMatrix from 'css-to-matrix'
import 'whatwg-fetch'
import comments from '../second/comment'
import transitionEndDirective from '../../directives/transition'
import widthDirective from '../../directives/width'
import radioDirective from '../../directives/getradio'
import Item from '../main/item'

let cssToMatrix = new CssToMatrix

export default {
    computed: {
        // a computed getter
        styleObject: function () {
            // `this` points to the vm instance
            return {
                transition: this.isSwitching ? '1s' : 'none',
                transform: 'translateX(' + this.x + 'px)',
                width: this.picWidth * this.pics.length + 'px',
                height: this.picHeight + 'px'
            }
        },
        imgWidth: function () {
            return {
                width: this.picWidth + 'px',
                height: this.picHeight + 'px'
            }
        },
        imgHeight: function () {
            return {
                height: this.picHeight + 'px'
            }
        },
        imgTransform: function () {
            let matrixStr = cssToMatrix
                .scale3d(this.customscale, this.customscale, 1.0)
                .translate3d(this.ix, this.iy, 0)
                .getMatrixCSS()
            return {
                transform: "perspective(500px) " + matrixStr
            }
        }
    },
    data() {
        return {
            x: 0,
            ix: 0,
            iy: 0,
            foo: 0,
            picHeight: 240,
            pics: [],
            picWidth: 500,
            screenHeight: 400,
            i: 0,
            isSwitching: false,
            customscale: 1.0,
            ifTab: false,
            imgRadioArr: [],
            tappedImgSrc: "",
            tappedImgDescription: "",
            picInfo: {},
            list: [],
            lastOne: false
        }
    },
    mounted() {
        var api = window.location.pathname
        var ids = api.split('/')
        let promise1 = fetch("/api/v1.0" + api + "/").then((res) => {
            return res.json()
        })
        let promise2 = fetch("/api/v1.0/comments/?article_id="+ ids[2]+"&kind=2").then((res) => {
            return res.json()
        })
        Promise.all([promise1, promise2]).then(values => {
            this.pics = values[0].pics
            this.descriptionImg = values[0].introduction
            this.picInfo = values[0]
            this.$refs.picComments.obj = values[1]
            this.$refs.picComments.articleInfo = {
                id: values[0].id,
                kind: values[0].kind,
                commentCount: values[0].commentCount,
                likes: values[0].likes
            }
            fetch("/api/v1.0/" + ids[1] + "/recommend/", {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    article_id: this.picInfo.id
                })
            }).then((res) => {
                return res.json()
            }).then((res) => {
                this.list = res
            })
        })
    },
    components: {
        "picComments": comments,
        "item": Item
    },
    directives: {
        transitionEnd: transitionEndDirective,
        width: widthDirective,
        radio: radioDirective
    },
    methods: {
        goBack(){
            window.history.back()
        },
        switchAble(direction) {
            if (direction == 'Right') {
                this.lastOne = false
                console.log(this.lastOne)
            }
            if ((direction == 'Right' && this.i == 0) || (this.i == (this.pics.length - 1) && direction == 'Left')) {
                if (this.i == (this.pics.length - 1) && direction == 'Left') {
                    this.lastOne = true
                }
                return false
            }
            return true
        },
        onSwipe(e) {
            if (!this.switchAble(e.direction)) {
                return
            }
            this.x += e.deltaX
        },
        imgSwipe(e) {
            if (this.picWidth / 2 + Math.abs(this.ix + e.deltaX) < (this.picWidth * this.customscale) / 2) {
                this.ix += e.deltaX
            }
            console.log(document.body.clientHeight, window.screen.height, window.screen.availHeight)
            var picHeight = this.picWidth / this.imgRadioArr[this.i]
            if ((this.screenHeight < this.customscale * picHeight) && (this.screenHeight / 2 + Math.abs(this.iy + e.deltaY) - 40 * this.customscale < picHeight * this.customscale / 2)) {
                this.iy += e.deltaY
            }
        },
        onPintch(e) {
            if (((this.picWidth / 2 + Math.abs(this.ix)) < (this.picWidth * (this.customscale + e.customscale) / 2)) && (this.customscale + e.customscale) > 0) {
                var picHeight = this.picWidth / this.imgRadioArr[this.i]
                if (((this.customscale + e.customscale) * picHeight < this.screenHeight) || Math.abs(this.iy) - picHeight * this.customscale / 2 < this.screenHeight / 2)
                    this.iy = 0
                this.customscale += e.customscale
            }
        },
        afterSwipe(e) {
            if (!this.switchAble(e.direction))
                return
            if (Math.abs(e.distanceX) > this.picWidth / 4) {

                if (e.direction == 'Left') {
                    this.i++
                        this.x = -this.picWidth * this.i
                } else {
                    this.i--
                        this.x = -this.picWidth * this.i
                }
            } else {
                this.x = -this.picWidth * this.i
            }
            this.isSwitching = true
            this.tappedImgDescription = this.descriptionImg[this.i].description
        },
        changeState() {
            this.isSwitching = false
        },
        changeWidth(e, l) {
            this.picWidth = e
            this.screenHeight = l
        },
        showMask(e, index) {
            this.ifTab = true
            this.tappedImgSrc = this.pics[index].pic_url
            this.picHight = this.picWidth / this.imgRadioArr[index]
        },
        hideMask() {
            this.customscale = 1.0
            this.ix = 0
            this.iy = 0
            if (this.ifTab)
                this.ifTab = false
        },
        initImgRadio(radio, index) {
            this.imgRadioArr[index] = radio
            this.picHeight = this.picWidth * 0.75
            console.log(this.picHeight)
            this.tappedImgDescription = this.descriptionImg[this.i].description
        },
        imgScale() {
            if (this.customscale > 1.0) {
                this.customscale = 1.0
                this.iy = 0
                this.ix = 0
                return
            } else {
                this.customscale = 2.0
            }
        }
    }
}
</script>
<style lang='sass' module>
@import '../../scss/color.scss';
.picSecond {
    background-color: $white;
    height: 90%;
}

.imgRecommend {
    fill: white;
    width: 80px;
    margin-top: 67.5px;
}

.recommendWord {
    color: white;
    font-size: 15px;
    text-align: center;
    margin-top: 20px;
}

.lastOneMask {
    position: absolute;
    width: 100%;
    background: rgba(53, 53, 53, 0.55);
    text-align: center;
}

.occupy {
    height: 50px;
    width: 100%;
}

.recommendTitle {
    padding: 15px;
    font-size: 18px;
    color: $orange;
}

.recommend {
    background-color: $grey;
}

.banner {
    width: 100%;
    overflow: hidden;
}

.container {
    -webkit-perspective: 1000;
    -webkit-backface-visibility: hidden;
    float: left;
}

.testbox {
    width: 100%;
    display: inline-block;
    vertical-align: middle;
}

.hideMaskBtn {
    position: absolute;
    right: 10px;
    top: 54px;
    color: #fff;
    z-index: 99;
}

.mask {
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    position: fixed;
    top: 0px;
    overflow: hidden;
}

.imgDescription {
    margin: 30px 10%;
    color: $black;
    font-size: 15px;
}

.mask:after {
    content: " ";
    height: 100%;
    width: 0;
    display: inline-block;
    vertical-align: middle;
}

.titleBox {
    height: 40px;
    line-height: 40px;
    background-color: $black;
    color: $white;
    composes: space from 'sass-loader!../../scss/utility.scss';
}

.img {
    composes: horizon from 'sass-loader!../../scss/utility.scss';
    width: 19px;
    padding-left: 18px;
    fill: $orange;
}

.picNum {
    composes: horizon from 'sass-loader!../../scss/utility.scss';
    composes: space from 'sass-loader!../../scss/utility.scss';
    float: right;
}

.curNum {
    composes: horizon from 'sass-loader!../../scss/utility.scss';
    font-size: 20px;
    color: $orange;
}

.totalNum {
    composes: horizon from 'sass-loader!../../scss/utility.scss';
    font-size: 15px;
    color: #999;
}

.numBox {
    margin: 40px 10% 15px;
    composes: space from 'sass-loader!../../scss/utility.scss';
}

.title {
    text-align: center;
    width: 80%;
    font-size: 17px;
    composes: horizon from 'sass-loader!../../scss/utility.scss';
}

.time {
    composes: horizon from 'sass-loader!../../scss/utility.scss';
    color: #999;
    font-size: 14px;
}

.sline {
    height: 1px;
    margin: 15px 10%;
    background-color: $grey_l;
}

.bottom {
    overflow: hidden;
    padding: 0 10% 5px;
    composes: space from 'sass-loader!../../scss/utility.scss';
}

.common {
    color: #999999;
    font-size: 14px;
    composes: horizon from 'sass-loader!../../scss/utility.scss';
}

.author {
    width: 30%;
    float: left;
    composes: common;
}

.tag {
    float: right;
    margin-right: 17px;
    composes: common;
}

.views_img {
    float: right;
    margin-right: 4.5px;
    composes: common;
    fill: #999;
}

.view_img {
    width: 13px;
}

.views {
    float: right;
    margin-right: 15px;
    composes: common;
}

.editor {
    margin: 20px 10%;
    font-size: 14px;
    color: #999;
    text-align: right;
}
</style>
