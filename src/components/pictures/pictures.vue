  <template>
    <div id = "xxx" v-width = "changeWidth" >
      <div :class="$style.banner" >
        <div 
        :class="$style.container"  
        v-finger:swipeMove = "onSwipe" 
        v-finger:swipe = "afterSwipe" 
        v-finger:tap = "showMask" 
        v-bind:style = "styleObject" 
        v-transitionEnd = "changeState"
        >
          <img 
          alt="picture" 
          v-bind:src="img.pic_url"  
          v-bind:style = "imgWidth" 
          v-for = "img in pics" 
          v-radio = "initImgRadio">
        </div>
      </div>
        <div  
        v-show = "ifTab"  
        :class = "$style.mask" 
        >
        <p v-finger:tap = "hideMask" :class = "$style.hideMaskBtn">关闭</p>
        <img v-bind:src="tappedImgSrc"
         v-finger:pintch = "onPintch" 
        v-bind:style = "imgTransform"
        v-finger:doubleTap = "imgScale"  
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
  import radioDirective from '../../directives/getradio'

  let cssToMatrix = new CssToMatrix

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
    imgTransform: function() {
          let matrixStr = cssToMatrix
            .scale3d(this.customscale, this.customscale, 1.0)
            .translate3d(this.ix,this.iy, 0)
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
        iy:0,
        foo:0,
        pics:[],
        picWidth: 500,
        screenHeight:400,
        i:0,
        isSwitching: false,
        customscale: 1.0,
        ifTab:false,
        imgRadioArr:[],
        tappedImgSrc:""
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
      width : widthDirective,
      radio:radioDirective
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
         if(this.picWidth / 2 + Math.abs(this.ix + e.deltaX) < (this.picWidth * this.customscale) / 2){
          this.ix += e.deltaX
         }
         console.log(document.body.clientHeight,window.screen.height, window.screen.availHeight)
          var picHeight = this.picWidth / this.imgRadioArr[this.i]
         if((this.screenHeight < this.customscale * picHeight) && (this.screenHeight / 2 + Math.abs(this.iy + e.deltaY) - 40 * this.customscale < picHeight * this.customscale/2)){
          this.iy += e.deltaY
         }
          
      },
      onPintch(e){
        if(((this.picWidth / 2 + Math.abs(this.ix)) < (this.picWidth * (this.customscale + e.customscale) / 2)) && (this.customscale+e.customscale) > 0)
          { 
            var picHeight = this.picWidth / this.imgRadioArr[this.i] 
            if(((this.customscale+e.customscale) * picHeight < this.screenHeight) || Math.abs(this.iy)- picHeight * this.customscale / 2 < this.screenHeight / 2 ) 
              this.iy = 0
            this.customscale += e.customscale
        }
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
      changeWidth(e,l){
        this.picWidth = e
        this.screenHeight = l
      },
      showMask(e, index){
        this.ifTab = true
        this.tappedImgSrc = this.pics[index].pic_url
        this.picHight = this.picWidth /this.imgRadioArr[index]
      },
      hideMask(){
        this.customscale = 1.0
        this.ix = 0
        this.iy = 0
        if(this.ifTab)
          this.ifTab = false
      },
      initImgRadio(radio, index){
        this.imgRadioArr[index] = radio
        console.log(radio,index)
      },
      imgScale(){
        if(this.customscale > 1.0){
          this.customscale = 1.0
          this.iy = 0
          this.ix = 0
          return
        }else{
          this.customscale = 2.0
        }
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
  }
  .testImg{
    width: 100%;
    display: inline-block;
    vertical-align: middle;
  }
  .hideMaskBtn{
    position: absolute;
    right: 0;
    top: 0;
    color: #fff;
    z-index: 99;
  }
  .mask{
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.5);
    position: fixed;
    top: 0px;
    overflow: hidden;
  }
  .mask:after{
    content: " ";
    height:100%;
    width:0;
    display:inline-block;
    vertical-align:middle;
  }
  </style>
