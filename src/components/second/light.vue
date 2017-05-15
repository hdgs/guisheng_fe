<template>
    <div :class="$style.lightBox">
        <div :class="$style.light" v-on:click="like(index)" v-for="(item, index) in article.like_degree">
            <div :class="$style.lightImg">
                <div :class="$style.img0" v-show = "index == 0"></div>
                <div :class="$style.img1" v-show = "index == 1"></div>
                <div :class="$style.img2" v-show = "index == 2"></div>
            </div>
            <div :class="$style.addOne" v-show="change == index">+1</div>
            <div :class="(change == index)? $style.lightWordBox_hover:$style.lightWordBox">
                <div :class="$style.word">{{words[index]}}</div>
                <div :class="$style.count">{{item}}</div>
            </div>
        </div>
    </div>
</template>
<script>
import FETCH from '../../common/fetch.js'

export default {
    data() {
            return {
            	id: 0,
                likes: 0,
                flag: 0,
                change: -1,
                words: ["不错耶", "好喜欢", "什么鬼"],
                Imgs: ["/img/great.png", "http://ol8raxkl5.bkt.clouddn.com/likeit.png", "http://ol8raxkl5.bkt.clouddn.com/what.png"],
                article: {
                	"id":0,
                    "kind": 0,
                    "like_degree": [0,0,0]
                }
            }
        },
        methods: {
            like(index) {
                if (this.flag) return
                FETCH.FetchData('/api/v1.0/light/', 'POST', {
                    article_id: this.article.id,
                    kind: this.article.kind,
                    like_degree: index
                }).then(value => {
                    this.article.like_degree[index]++
                    this.flag = 1
                    this.change = index
                })
            }
        }

}
</script>
<style lang ="sass" module>
@import '../../scss/color.scss';
.lightBox {
	background-color: $white;
    font-size: 0;
    padding: 27.5px 0 20px 0;
}

.light {
    margin: 0 auto;
    vertical-align: middle;
    display: inline-block;
    width: 33.3%;
    text-align: center;
    position: relative;
}

.lightImg {
    width: 50px;
    margin: 0 auto;
    text-align: center;
    margin-bottom: 11.5px;
}

.lightWordBox {
    border-radius: 27.5px;
    height: 55px;
    margin: 0 auto;
    width: 55px;
    border: 1px solid $grey_b;
    font-size: 14px;
}

.lightWordBox_hover {
    border: 1px solid $orange_b;
    color: $orange_b;
    border-radius: 27.5px;
    height: 55px;
    margin: 0 auto;
    width: 55px;
    font-size: 14px;
}

.word {
    margin-top: 10.5px;
}

.addOne {
    font-size: 14px;
    color: $orange;
    position: absolute;
    right: 25%;
    top: 40px;
    opacity: 0;
    animation: loading 1s linear;
}

@keyframes loading {
    0% {
    	opacity: 0;
        transform: translateY(25px);
    }
    25%{
    	opacity: 1;
    	transform: translateY(0px);
    }
    100% {
    	opacity: 0;
        transform: translateY(-50px);
    }
}

.img{
    width: 100%;
    height: 45px;
    background-size: 100%;
}
.img0 { 
    composes: img;
    background-image: url('../../img/great.png');
}

.img1 {
    composes: img;
    background-image: url('../../img/likeit.png');
}

.img2 {
    composes: img;
    background-image: url('../../img/what.png');
}
</style>
