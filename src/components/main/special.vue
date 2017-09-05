<template>
  <div>
    <skeleton v-show="showSkeleton"></skeleton>
    <transition name="slide-fade">
      <div class="sidenavPage" v-show="showSide">
        <div class="sidenav" v-on:click="closeSide">
          <div class="greenTitle"></div>
          <div v-on:click="des = 1">
            <li class="sideLi">
              <div class="icon">
                <svg viewBox="0 0 200 200" class="img">
                  <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#route"></use>
                </svg>
              </div>
              <div class="sideTitle">路线</div>
            </li>
          </div>
          <div v-on:click="des = 2">
            <li class="sideLi">
              <div class="icon">
                <svg viewBox="0 0 200 200" class="img">
                  <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#shop_0"></use>
                </svg>
              </div>
              <div class="sideTitle">超市</div>
            </li>
          </div>
          <div v-on:click="des = 3">
            <li class="sideLi">
              <div class="icon">
                <svg viewBox="0 0 200 200" class="img">
                  <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#militory"></use>
                </svg>
              </div>
              <div class="sideTitle">军训</div>
            </li>
          </div>
          <div v-on:click="des = 4">
            <li class="sideLi">
              <div class="icon">
                <svg viewBox="0 0 200 200" class="img">
                  <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#dormitory"></use>
                </svg>
              </div>
              <div class="sideTitle">宿舍</div>
            </li>
          </div>
          <div v-on:click="des = 5">
            <li class="sideLi">
              <div class="icon">
                <svg viewBox="0 0 200 200" class="img">
                  <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#travel"></use>
                </svg>
              </div>
              <div class="sideTitle">游玩</div>
            </li>
          </div>
          <div v-on:click="des = 6">
            <li class="sideLi">
              <div class="icon">
                <svg viewBox="0 0 200 200" class="img">
                  <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#eating"></use>
                </svg>
              </div>
              <div class="sideTitle">吃货</div>
            </li>
          </div>
          <div v-on:click="des = 7">
            <li class="sideLi">
              <div class="icon">
                <svg viewBox="0 0 200 200" class="img">
                  <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#learning"></use>
                </svg>
              </div>
              <div class="sideTitle">学霸</div>
            </li>
          </div>
          <div v-on:click="des = 8">
            <li class="sideLi">
              <div class="icon">
                <svg viewBox="0 0 200 200" class="img">
                  <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#shop_0"></use>
                </svg>
              </div>
              <div class="sideTitle">校园生活</div>
            </li>
          </div>
        </div>
        <div class="sideMask" v-on:click="closeSide">
        </div>
      </div>
    </transition>
    <div class="main">
      <transition-group name="riseUp" v-on:enter="enter" v-on:leave="leave">
        <div v-if="(des === 1 || des === 0)" key="1">
          <div class="icon_s">
            <svg viewBox="0 0 200 200" class="img">
              <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#route"></use>
            </svg>
          </div>
          <div class="line"></div>
          <div class="title_s">路线</div>
          <item :item="item" v-for="item in arrayList[0]"></item>
        </div>
        <div v-if="(des === 2 || des === 0)" key="2">
          <div class="icon_s">
            <svg viewBox="0 0 200 200" class="img">
              <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#shop_0"></use>
            </svg>
          </div>
          <div class="line"></div>
          <div class="title_s">超市</div>
          <item :item="item" v-for="item in arrayList[1]"></item>
        </div>
        <div v-if="(des === 3 || des === 0)" key="3">
          <div class="icon_s">
            <svg viewBox="0 0 200 200" class="img">
              <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#militory"></use>
            </svg>
          </div>
          <div class="line"></div>
          <div class="title_s">军训</div>
          <item :item="item" v-for="item in arrayList[2]"></item>
        </div>
        <div v-if="(des === 4 || des === 0)" key="4">
          <div class="icon_s">
            <svg viewBox="0 0 200 200" class="img">
              <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#dormitory"></use>
            </svg>
          </div>
          <div class="line"></div>
          <div class="title_s">宿舍</div>

          <item :item="item" v-for="item in arrayList[3]"></item>
        </div>
        <div v-if="(des === 5 || des === 0)" key="5">
          <div class="icon_s">
            <svg viewBox="0 0 200 200" class="img">
              <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#travel"></use>
            </svg>
          </div>
          <div class="line"></div>
          <div class="title_s">游玩</div>
          <item :item="item" v-for="item in arrayList[4]"></item>
        </div>
        <div v-if="(des === 6 || des === 0)" key="6">
          <div class="icon_s">
            <svg viewBox="0 0 200 200" class="img">
              <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#eating"></use>
            </svg>
          </div>
          <div class="line"></div>
          <div class="title_s">吃货</div>
          <item :item="item" v-for="item in arrayList[5]"></item>
        </div>
        <div v-if="(des === 7 || des === 0)" key="7">
          <div class="icon_s">
            <svg viewBox="0 0 200 200" class="img">
              <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#learning"></use>
            </svg>
          </div>
          <div class="line"></div>
          <div class="title_s">学霸</div>
          <item :item="item" v-for="item in arrayList[6]"></item>
        </div>
        <div v-if="(des === 8 || des === 0)" key="8">
          <div class="icon_s">
            <svg viewBox="0 0 200 200" class="img">
              <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#shop_0"></use>
            </svg>
          </div>
          <div class="line"></div>
          <div class="title_s">校园活动</div>
          <item :item="item" v-for="item in arrayList[7]"></item>
        </div>
      </transition-group>
      <div class="tip"> Σ( ° △ °|||)已经没有了</div>
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
      showSide: false,
      showSkeleton: true,
      des: 0
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
      this.list = res
      var ay = [30, 34, 35, 36, 37, 38, 39, 40]
      for (let i = 0; i < 8; i++) {
        this.arrayList.push(this.jsonFilter(res, ay[i]))
      }
      this.showSkeleton = false
    })
    bus.$on('showSpecialPage', this.sideFunc) 
  },
  methods: {
    jsonFilter(item, e) {
      return item.filter(function (item) {
        return item.child_topic_id == e
      })
    },
    closeSide() {
      setTimeout(() => {
        this.showSide = false
      }, 100)
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
<style lang ="sass" scoped>
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
  position: absolute;
  top: 0;
  bottom: 0;
  padding-bottom:30px;
  width:100%;
  font-size: 0; 
}

.sideLi{
  font-size: 0; 
  padding:16.5px;
}

.icon{
  vertical-align: middle; 	
  display: inline-block;
  width: 30px;
}

.sideTitle{
  vertical-align: middle; 	
  display: inline-block;
  font-size:18px;
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
  width:45%;
  min-height:100%; 
  bottom:0;
  background:#eff5f3;
  background:$grey;
  position: absolute;
  vertical-align: middle; 	
  display: inline-block;
}

.sideMask{
  background-color: rgba(51, 51, 51, 0.3);
  width:55%;
  top:0;
  right:0;
  left:45%;
  bottom:0;
  z-index:2;
  position:absolute;
  vertical-align: middle; 	display: inline-block;
}

.main{
  width:100%;
  padding-top:54px;
  margin-top: -54px;
}

.riseUp-enter-active {
    animation: bounce-in 1s;
}

.riseUp-leave-active {
    animation: bounce-out 0.3s;
}

@keyframes bounce-in {
    0% {
        transform: translateY(100px);
        opacity: 0;
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
    100% {
        transform: translateY(-100px);
        opacity: 0;
    }
}

.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to{
  transform: translateX(10px);
  opacity: 0;
}

</style>
