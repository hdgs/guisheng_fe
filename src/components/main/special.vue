<template>
  <div>
    <skeleton v-show="showSkeleton"></skeleton>
    <div :class="$style.sidenavPage" v-show="showSide">
      <div :class="$style.sidenav">
        <div :class="$style.greenTitle"></div>
        <div v-on:click = "des = 1">
          <li :class="$style.sideLi">
            <div :class="$style.icon">
              <svg viewBox="0 0 200 200" :class="$style.img">
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#route"></use>
              </svg>
            </div>
            <div :class="$style.sideTitle">路线</div>
          </li>
        </div>
        <div v-on:click = "des = 2">
          <li :class="$style.sideLi">
            <div :class="$style.icon">
              <svg viewBox="0 0 200 200" :class="$style.img">
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#shop_0"></use>
              </svg>
            </div>
            <div :class="$style.sideTitle">超市</div>
          </li>
        </div>
        <div v-on:click = "des = 3">
          <li :class="$style.sideLi">
            <div :class="$style.icon">
              <svg viewBox="0 0 200 200" :class="$style.img">
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#militory"></use>
              </svg>
            </div>
            <div :class="$style.sideTitle">军训</div>
          </li>
        </div>
        <div v-on:click = "des = 4">
          <li :class="$style.sideLi">
            <div :class="$style.icon">
              <svg viewBox="0 0 200 200" :class="$style.img">
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#dormitory"></use>
              </svg>
            </div>
            <div :class="$style.sideTitle">宿舍</div>
          </li>
        </div>
        <div v-on:click = "des = 5">
          <li :class="$style.sideLi">
            <div :class="$style.icon">
              <svg viewBox="0 0 200 200" :class="$style.img">
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#travel"></use>
              </svg>
            </div>
            <div :class="$style.sideTitle">游玩</div>
          </li>
        </div>
        <div v-on:click = "des = 6">
          <li :class="$style.sideLi">
            <div :class="$style.icon">
              <svg viewBox="0 0 200 200" :class="$style.img">
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#eating"></use>
              </svg>
            </div>
            <div :class="$style.sideTitle">吃货</div>
          </li>
        </div>
        <div v-on:click = "des = 7">
          <li :class="$style.sideLi">
            <div :class="$style.icon">
              <svg viewBox="0 0 200 200" :class="$style.img">
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#learning"></use>
              </svg>
            </div>
            <div :class="$style.sideTitle">学霸</div>
          </li>
        </div>
      </div>
      <div :class="$style.sideMask" v-on:click="closeSide">
      </div>
    </div>
    <div :class="$style.main">
      <transition name="bounce" mode="out-in">
        <div v-if = "des === 1" key = "1">
          <div :class="$style.icon_s">
            <svg viewBox="0 0 200 200" :class="$style.img">
              <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#route"></use>
            </svg>
          </div>
          <div :class="$style.line"></div>
          <div :class="$style.title_s">路线</div>
          <item :item="item" v-for="item in arrayList[0]"></item>
        </div>
        <div  v-else-if = "des === 2" key = "2">
          <div :class="$style.icon_s">
            <svg viewBox="0 0 200 200" :class="$style.img">
              <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#shop_0"></use>
            </svg>
          </div>
          <div :class="$style.line"></div>
          <div :class="$style.title_s">超市</div>
          <item :item="item" v-for="item in arrayList[1]"></item>
        </div>
        <div v-else-if = "des === 3" key = "3">
          <div :class="$style.icon_s">
            <svg viewBox="0 0 200 200" :class="$style.img">
              <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#militory"></use>
            </svg>
          </div>
          <div :class="$style.line"></div>
          <div :class="$style.title_s">军训</div>
          <item :item="item" v-for="item in arrayList[2]"></item>
        </div>
        <div v-else-if = "des === 4" key = "4">
          <div :class="$style.icon_s">
            <svg viewBox="0 0 200 200" :class="$style.img">
              <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#dormitory"></use>
            </svg>
          </div>
          <div :class="$style.line"></div>
          <div :class="$style.title_s">宿舍</div>
  
          <item :item="item" v-for="item in arrayList[3]"></item>
        </div>
        <div v-else-if = "des === 5" key = "5">
          <div :class="$style.icon_s">
            <svg viewBox="0 0 200 200" :class="$style.img">
              <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#travel"></use>
            </svg>
          </div>
          <div :class="$style.line"></div>
          <div :class="$style.title_s">游玩</div>
          <item :item="item" v-for="item in arrayList[4]"></item>
        </div>
        <div v-else-if = "des === 6" key = "6">
          <div :class="$style.icon_s">
            <svg viewBox="0 0 200 200" :class="$style.img">
              <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#eating"></use>
            </svg>
          </div>
          <div :class="$style.line"></div>
          <div :class="$style.title_s">吃货</div>
          <item :item="item" v-for="item in arrayList[5]"></item>
        </div>
        <div v-else-if = "des === 7" key = "7">
          <div :class="$style.icon_s">
            <svg viewBox="0 0 200 200" :class="$style.img">
              <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#learning"></use>
            </svg>
          </div>
          <div :class="$style.line"></div>
          <div :class="$style.title_s">学霸</div>
          <item :item="item" v-for="item in arrayList[6]"></item>
        </div>
      </transition>
      <div :class="$style.tip"> Σ( ° △ °|||)已经没有了</div>
    </div>
  
  </div>
</template>
<script>
import Item from './item'
import FETCH from '../../common/fetch.js'
import {
  bus
} from '../../bus.js'
import Skeleton from './skeleton'

export default {
  data() {
    return {
      list: [],
      arrayList: [],
      showSide: true,
      showSkeleton: true,
      des:1
    }
  },
  components: {
    "item": Item,
    "skeleton": Skeleton
  },
  mounted() {
    FETCH.FetchData("/api/v1.0/special/feed/", "POST", {
      id: 4
    }).then(res => {
      console.log("res",res)
      this.list = res
      var ay = [30,34,35,36,37,38,39]
      for (let i = 0; i < 7; i++) {
        console.log(ay[i])
        this.arrayList.push(this.jsonFilter(res, ay[i]))
      }
      console.log(this.arrayList, this.list)
    })
    bus.$on('showSpecialPage', this.sideFunc)
    this.showSkeleton = false
  },
  methods: {
    jsonFilter(item, e) {
      return item.filter(function (item) {
        return item.child_topic_id == e
      })
    },
    closeSide() {
      // setTimeout(() => {
      this.showSide = false
      // },500)
      bus.$emit('headerFix')

    },
    sideFunc() {
      if (this.showSide)
        this.showSide = false
      else {
        this.showSide = true
      }
    }
  }
}
</script>
<style lang ="sass" module>
@import '../../scss/color.scss';

.icon_s{
  margin:0 auto;
  width: 30px;
}

.line{
  background-image: url('../../img/line.png');
  background-size: 100%;
  width:55%;
  height:4px;
  background-repeat:no-repeat;
  margin:0 auto;
}

.title_s{
  text-align:center;
  color:$black_t;
  font-size: 15px;
}
.tip {
    text-align: center;
    font-size: 17px;
    color: $black_t;
    padding-bottom: 15px;
}

.greenTitle{
  width:100%;
  height:54px;
  margin-bottom:20px;
  background:$green_title_s;
}

.sidenavPage{
  position: fixed;
  top: 0;
  bottom: 0;
  padding-bottom:30px;
  width:100%;
  composes: space from 'sass-loader!../../scss/utility.scss';
}

.sideLi{
  composes: space from 'sass-loader!../../scss/utility.scss';
  padding:16.5px;
}

.icon{
  composes: horizon from 'sass-loader!../../scss/utility.scss';
  width: 35px;
}

.sideTitle{
  composes: horizon from 'sass-loader!../../scss/utility.scss';
  font-size:22px;
  color:$black_t;
  margin-left:20px;
}

.sideTitle:hover{
  color:$green_button_hover;
}
.sideLi:hover{
  background-color: $white;
  box-shadow: 0 0  10px 1px $green_special;
}

.sidenav{
  z-index:2;
  width:40%;
  min-height:100%; 
  bottom:0;
  background:#eff5f3;
  background:$grey;
  position: fixed;
  composes: horizon from 'sass-loader!../../scss/utility.scss';
}

.sideMask{
  background-color: rgba(51, 51, 51, 0.3);
  width:60%;
  top:0;
  right:0;
  left:40%;
  bottom:0;
  z-index:2;
  position:fixed;
  composes: horizon from 'sass-loader!../../scss/utility.scss';
}

.main{
  width:100%;
  padding-top:54px;
  margin-top: -54px;
  /* position:relative; */
}

.bounce-enter-active {
    animation: bounce-in 2s;
}

.bounce-leave-active {
    animation: bounce-out 2s;
}

@keyframes bounce-in {
    0% {
        transform: translateY(200px);
        opacity: 0;
    }
    50% {
        transform: translateY(100px);
        opacity: 0.5;
    }
    100% {
        transform: translateY(0);
        opacity: 1;
    }
}

@keyframes bounce-out {
    0% {
        transform: translateY(0);
        opacity: 1;
    }
    50% {
        transform: translateY(-100px);
        opacity: 0.5;
    }
    100% {
        transform: translateY(-200px);
        opacity: 0;
    }
}

</style>
