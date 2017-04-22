<template>
    <div v-show="showWorks" :class="$style.commentPage">
        <div :class="$style.titleBox">
            <svg viewBox="0 0 200 200" :class="$style.imgBack" v-on:click="closeComment">
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#back"></use>
            </svg>
            <div :class="$style.commentTitle">{{this.title}}</div>
        </div>
        <div :class="$style.line"></div>
        <item :item="item" v-for="item in list"></item>
        <div :class="$style.tip"> Σ( ° △ °|||)已经没有了</div>
    </div>
</template>
<script>
import Item from '../main/item'
export default {
    data() {
            return {
                list: [],
                title: ""
            }
        },
        components: {
            "item": Item,
        },
        methods: {
            closeComment() {
                if (this.$parent.showWorks)
                    this.$parent.showWorks = false
            },
        }
}
</script>
<style lang ="sass" module>
@import '../../scss/color.scss';
.commentPage {
    position: absolute;
    width: 100%;
    top: 0;
    bottom: 0;
    background-color: $grey;
    z-index: $Zindex4;
}

.titleBox {
    height: 54px;
    width: 100%;
    line-height: 54px;
    color: $black;
    background-color: $white;
    composes: space from 'sass-loader!../../scss/utility.scss';
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

.line {
    width: 100%;
    height: 0.5px;
    background-color: $grey;
}

.tip {
    text-align: center;
    font-size: 17px;
    color: $black_t;
    padding: 15px;
}
</style>
