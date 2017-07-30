<template>
  <div>
    <item :item="item" v-for="item in list"></item>
    <div :class="$style.tip"> Σ( ° △ °|||)已经没有了</div>
  </div>
</template>
<script>
import Item from './item'
import FETCH from '../../common/fetch.js'

export default {
  data() {
    return {
      list: []
    }
  },
  components: {
    "item": Item,
  },
  mounted() {
    FETCH.FetchData("/api/v1.0/special/feed/", "POST", {
      id: 1
    }).then(res => {
      this.list = res
    })
  }
}
</script>
<style lang="sass" module>
@import '../../scss/color.scss';

.tip {
    text-align: center;
    font-size: 17px;
    color: $black_t;
    padding-bottom: 15px;
}
</style>
