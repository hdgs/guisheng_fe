<template>
    <div>
        <div :class="$style.banner" v-bind:style="imgHeight">
            <div :class="$style.container" v-finger:swipeMove="onSwipe" v-finger:swipe="afterSwipe" v-finger:tap="showMask" v-bind:style="styleObject" v-transitionEnd="changeState">
                <img alt="picture" v-bind:src="img" v-bind:style="imgWidth" v-for="img in pics" v-radio="initImgRadio">
            </div>
            <div :class="$style.lastOneMask" v-show="lastOne" v-bind:style="imgHeight" v-finger:swipeMove="formerPic">
                <svg viewBox="0 0 200 200" :class="$style.imgRecommend">
                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#recommend"></use>
                </svg>
                <div :class="$style.recommendWord">没有啦，看看相关推荐↓↓↓</div>
            </div>
        </div>
        <div :class="$style.imgDescription">
            <div>{{tappedImgDescription}}</div>
        </div>
        <div v-show="ifTab" :class="$style.mask">
            <p v-finger:tap="hideMask" :class="$style.hideMaskBtn">关闭</p>
            <img v-bind:src="tappedImgSrc" v-finger:pintch="onPintch" v-bind:style="imgTransform" v-finger:doubleTap="imgScale" v-finger:swipeMove="imgSwipe" :class="$style.testbox">
        </div>
    </div>
</template>
<script>
import CssToMatrix from 'css-to-matrix'
import transitionEndDirective from '../../directives/transition'
import radioDirective from '../../directives/getradio'

let cssToMatrix = new CssToMatrix

export default {
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
                lastOne: false,
                descriptionImg:[]
            }
        },
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
        directives: {
            transitionEnd: transitionEndDirective,
            radio: radioDirective
        },
        methods: {
            formerPic(d){
                if(d.direction == 'Right' && this.i == this.pics.length-1)
                    this.lastOne = false
            },
            switchAble(direction) {
                if (direction == 'Right') {
                    this.lastOne = false
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
                        this.$parent.i++
                            this.x = -this.picWidth * this.i
                    } else {
                        this.i--
                        this.$parent.i--
                            this.x = -this.picWidth * this.i
                    }
                } else {
                    this.x = -this.picWidth * this.i
                }
                this.isSwitching = true
                this.tappedImgDescription = this.descriptionImg[this.i]
            },
            changeState() {
                this.isSwitching = false
            },
            showMask(e, index) {
                this.ifTab = true
                this.tappedImgSrc = this.pics[index]
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
                this.tappedImgDescription = this.descriptionImg[this.i]
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
<style lang ="sass" module>
@import '../../scss/color.scss';
.banner {
    width: 100%;
    overflow: hidden;
}

.container {
    -webkit-perspective: 1000;
    -webkit-backface-visibility: hidden;
    float: left;
}

.lastOneMask {
    position: absolute;
    width: 100%;
    background: rgba(53, 53, 53, 0.55);
    text-align: center;
}

.recommendWord {
    color: white;
    font-size: 15px;
    text-align: center;
    margin-top: 20px;
}

.mask {
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    position: fixed;
    top: 0px;
    overflow: hidden;
}

.hideMaskBtn {
    position: absolute;
    right: 10px;
    top: 54px;
    color: #fff;
    z-index: $Zindex6;
}

.mask:after {
    content: " ";
    height: 100%;
    width: 0;
    display: inline-block;
    vertical-align: middle;
}

.testbox {
    width: 100%;
    display: inline-block;
    vertical-align: middle;
}

.imgRecommend {
    fill: white;
    width: 80px;
    margin-top: 67.5px;
}

.imgDescription {
    margin: 30px 10%;
    color: $black;
    font-size: 15px;
}

</style>
