<template>
    <div id="xxx" :class="$style.picSecond" v-width="changeWidth">
        <div :class="$style.numBox">
            <svg viewBox="0 0 200 200" :class="$style.img">
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#back"></use>
            </svg>
            <div :class="$style.num">{{(i+1) + "/" + pics.length}}</div>
        </div>
        <div :class="$style.banner" v-bind:style="imgHeight">
            <div :class="$style.container" v-finger:swipeMove="onSwipe" v-finger:swipe="afterSwipe" v-finger:tap="showMask" v-bind:style="styleObject" v-transitionEnd="changeState">
                <img alt="picture" v-bind:src="img.pic_url" v-bind:style="imgWidth" v-for="img in pics" v-radio="initImgRadio">
            </div>
        </div>
        <div :class="$style.titleBox">
            <div :class="$style.title">{{picInfo.title}}</div>
            <div :class="$style.time">{{picInfo.time}}</div>
        </div>
        <div :class="$style.sline"></div>
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
        <div v-show="ifTab" :class="$style.mask">
            <p v-finger:tap="hideMask" :class="$style.hideMaskBtn">关闭</p>
            <img v-bind:src="tappedImgSrc" v-finger:pintch="onPintch" v-bind:style="imgTransform" v-finger:doubleTap="imgScale" v-finger:swipeMove="imgSwipe" :class="$style.testbox">
        </div>
        <picComments ref="picComments"></picComments>
</template>
<script>
import CssToMatrix from 'css-to-matrix'
import 'whatwg-fetch'
import comments from '../second/comment'
import transitionEndDirective from '../../directives/transition'
import widthDirective from '../../directives/width'
import radioDirective from '../../directives/getradio'

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
                height:this.picHeight + 'px'
            }
        },
        imgWidth: function () {
            return {
                width: this.picWidth + 'px',
                height:this.picHeight + 'px'
            }
        },
        imgHeight:function(){
            return{
                height:this.picHeight + 'px'
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
            picHeight:240,
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
            picInfo: {}
        }
    },
    mounted() {
        let promise1 = fetch("/api/v1.0/pics").then((res) => {
            return res.json()
        })
        let promise2 = fetch("/api/v1.0/comments").then((res) => {
            return res.json()
        })
        Promise.all([promise1, promise2]).then(values => {
            this.pics = values[0].imgUrl
            this.descriptionImg = values[0].imgDescription
            this.picInfo = values[0]
            this.$refs.picComments.obj = values[1]
            this.$refs.picComments.articleInfo = {
                    id: values[0].id,
                    kind: values[0].kind,
                    commentCount: values[0].commentCount,
                    likes:values[0].likes
                }
        })
    },
    components: {
        "picComments": comments
    },
    directives: {
        transitionEnd: transitionEndDirective,
        width: widthDirective,
        radio: radioDirective
    },
    methods: {
        switchAble(direction) {
            if ((direction == 'Right' && this.i == 0) || (this.i == (this.pics.length - 1) && direction == 'Left')) {
                return false
            }
            return true
        },
        onSwipe(e) {
            if (!this.switchAble(e.direction))
                return
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
            this.picHeight = this.picWidth *0.75
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
    margin: 15px 10%;
    font-size: 12.5px;
}

.mask:after {
    content: " ";
    height: 100%;
    width: 0;
    display: inline-block;
    vertical-align: middle;
}

.numBox {
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

.num {
    composes: horizon from 'sass-loader!../../scss/utility.scss';
    text-align: center;
    width: 85%;
    font-size: 15px;
}

.titleBox {
    margin: 15px 10%;
    composes: space from 'sass-loader!../../scss/utility.scss';
}

.title {
    font-size: 15px;
    composes: horizon from 'sass-loader!../../scss/utility.scss';
}

.time {
    float: right;
    composes: horizon from 'sass-loader!../../scss/utility.scss';
    color: #999;
    font-size: 12px;
}

.sline {
    height: 1px;
    margin: 15px 10%;
    background-color: $grey_l;
}
.bottom{
  overflow: hidden;
  padding: 0 10% 15px;
  composes: space from 'sass-loader!../../scss/utility.scss';
}
.common{
  color: #999999;
  font-size: 12px;
  composes: horizon from 'sass-loader!../../scss/utility.scss';
}
.author{
  width: 30%;
  float: left;
  composes: common; 
}
.tag{
  float: right;
  margin-right: 17px;
  composes: common; 
}
.views_img{
  float: right;
  margin-right: 4.5px;
  composes: common; 
  fill: #999;
}
.view_img{
  width: 13px;
}
.views{
  float: right;
  margin-right: 15px;
  composes: common; 
}

</style>
