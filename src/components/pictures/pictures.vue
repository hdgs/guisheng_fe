  <template>
    <div id = "xxx" v-width = "changeWidth" >
      <div :class="$style.banner" >
        <div 
        :class="$style.container"  
        v-finger:swipeMove = "onSwipe" 
        v-finger:swipe = "afterSwipe" 
        v-finger:tap = "showMask"
        v-bind:style = "{transition: isSwitching?'1s':'none',
        transform: 'translateX(' + x + 'px)',
        width:picWidth * pics.length + 'px'}" 
        v-transitionEnd = "changeState" >
          <img 
          alt="picture" 
          v-bind:src="img.pic_url"  
          v-bind:style = "imgWidth" 
          v-for = "img in pics" 
           >
        </div>
      </div>
        <div  
        v-show = "ifTab"  
        :class = "$style.mask" 
        >
        <p v-finger:tap = "hideMask" :class = "$style.hideMaskBtn"></p>
        <img v-bind:src="tappedImgSrc"
         v-finger:pintch = "onPintch" 
        v-bind:style = "imgTransform"  
        :class = "$style.testImg"
        v-finger:swipeMove = "imgSwipe">
      </div>
      <picComments ref = "picComments"></picComments>
    </div>
  </template> 

  <script>
  import CssToMatrix from 'css-to-matrix'
  import 'whatwg-fetch'
  import comments from '../second/comment'
  import transitionEndDirective from '../../directives/transition'
  import widthDirective from '../../directives/width'

  let cssToMatrix = new CssToMatrix
  export default {
    computed:{
        imgWidth: function(){
          return {
            width: this.picWidth + 'px'
          }
        },
        imgTransform: function() {
          let matrixStr = cssToMatrix
            .scale3d(this.customscale, this.customscale, 1.0)
            .translate3d(this.ix, 0, 0)
            .getMatrixCSS()
          return {
            transform: "perspective(500px) " + matrixStr
          }
        }
    },
    data() {
      return {
        x:0,
        ix:0,
        foo:0,
        pics:[],
        picWidth: 500,
        i:0,
        isSwitching: false,
        customscale: 1.0,
        ifTab:false,
        tappedImgSrc:"",
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
      imgSwipe(e){
        console.log("swipeMove!!")
        // if((this.ix < 0||this.ix > this.picWidth))
          this.ix += e.deltaX 
        // if(this.customscale == 1)
        //   this.ix = 0
         
      },
      onPintch(e){
        this.customscale = e.customscale
      },
      afterSwipe(e){
        if(!this.switchAble(e.direction))
          return
        if(Math.abs(e.distanceX) > this.picWidth/4){

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
      },
      showMask(e,index){
        this.ifTab = true
        this.tappedImgSrc = this.pics[index].pic_url
      },
      hideMask(){
        if(this.ifTab)
          this.ifTab = false
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
    overflow:hidden;
  }
  .banner img{
    height: 200px;
  }
  .testImg{
    width: 100%;
    transform-origin: center;
  }
  .hideMaskBtn{
    position: absolute;
    right: 0;
    top: 0;
    color: #fff;
  }
  .mask{
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.5);
    position: fixed;
    top: 0px;
    overflow:hidden
  }
  </style>
