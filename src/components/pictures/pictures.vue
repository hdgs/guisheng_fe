  <template>
    <div id = "xxx" v-width = "changeWidth">
    <div v-finger:pintch = "onPintch" v-bind:style = "onScale"><img src="http://img05.tooopen.com/images/20160121/tooopen_sy_155168162826.jpg" :class = "$style.testImg"></div>
      <div :class="$style.banner" >
        <div :class="$style.container"  v-finger:swipeMove = "onSwipe" v-finger:swipe = "afterSwipe" v-bind:style = "styleObject" v-transitionEnd = "changeState">
          <img v-bind:src="img.pic_url"  v-bind:style = "imgWidth" alt="picture" v-for = "img in pics">
        </div>
      </div>
      <picComments ref = "picComments"></picComments>
    </div>
  </template> 

  <script>
  import 'whatwg-fetch'
  import comments from '../second/comment'
  import transitionEndDirective from '../../directives/transition'
  import widthDirective from '../../directives/width'

  export default {
    computed: {
    // a computed getter
   styleObject: function () {
      // `this` points to the vm instance
      return {
        transition: this.isSwitching?'1s':'none',
        transform: 'translateX(' + this.x + 'px)',
        width :this.picWidth * this.pics.length + 'px'
      }
    },
    imgWidth:function(){
      return{
        width: this.picWidth + 'px'
      }
    },
    onScale:function(){
      return{
        transform: 'scale(' + this.customscale + ')'
      }
    }
    },
    data() {
      return {
        x:0,
        foo:0,
        pics:[],
        picWidth: 500,
        i:0,
        isSwitching:false,
        customscale:1.0,

      }
    },
    mounted () {
      let promise1 = fetch("/api/v1.0/banner/").then((res) => {
        return res.json()
      })
      let promise2 = fetch("/api/v1.0/comments").then((res) => {
        return res.json()
      })
      Promise.all([promise1,promise2]).then(values => {
        this.pics = values[0]
        console.log(this.pics)
        this.$refs.picComments.obj = values[1]
      })
    },
    components:{
      "picComments" :comments
    },
    directives: {
      transitionEnd: transitionEndDirective,
      width : widthDirective
    },
    methods:{
      switchAble(direction){
        if((direction == 'Right'&&this.i == 0)||(this.i == (this.pics.length-1)&&direction == 'Left')) {
          return false
        }
        return true
      },
      onSwipe(e){
        if(!this.switchAble(e.direction))
          return
        this.x += e.deltaX
      },
      onPintch(e){
            console.log(e.customscale)
        this.customscale = e.customscale
      },
      afterSwipe(e){
        if(!this.switchAble(e.direction))
          return
        if(Math.abs(e.distanceX) > this.picWidth/5){
          if(e.direction == 'Left'){
            this.i++
            this.x = -this.picWidth * this.i
          }
          else {
            this.i--
            this.x = -this.picWidth * this.i
          }
        }else{
          this.x = -this.picWidth * this.i
        }
        this.isSwitching = true
      },
      changeState(){
        this.isSwitching = false
      },
      changeWidth(e){
        this.picWidth = e
      }
    }
  }
  </script>

  <style lang = 'sass' module>
  html {
    width: 100%;
  }
  body{
    margin:0;
  }
  .banner{
    width: 100%;
    height: 200px;
    overflow: hidden;
  }
  .container{
    -webkit-perspective: 1000;
    -webkit-backface-visibility: hidden;
    height: 200px;
    float: left;
  }
  .banner img{
    height: 200px;
    /*float: left;*/
  }
  .testImg{
    width: 100%;
    height: 500px;
    position: fixed;
  }
  </style>
