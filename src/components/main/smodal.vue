<template>
    <div :class="$style.suggestMask">
        <div :class="$style.returnCard">
            <div :class = "$style.entry"></div>
            <div :class = "$style.bottom">
                <div :class="$style.returnButton" v-on:click="login">进入新生特刊</div>
            </div>            
            <div :class="$style.return" v-on:click="quit">X</div>
        </div>
    </div>
</template>
<script>
export default {
    methods: {
        quit() {
            this.$parent.showModal = false
        },
        login(){
             window.location = "/special"
        }
    }
}
</script>
<style lang ="sass" module>
@import '../../scss/color.scss';
@import '../../scss/zindex.scss';

.entry{
    background-image: url('../../img/entry.png');
    background-size:90%;
    background-repeat: no-repeat;  
    background-position:left;
    width:100%;
    height:268px;
    margin-top: 54px;
}
.suggestMask {
    position: fixed;
    top: 54px;
    bottom: 0;
    width: 100%;
    z-index: $Zindex3;
    background-color: rgba(51, 51, 51, 0.85);
}

.returnCard {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 80%;
    height: 420px; 
    background-color: #eeeeee;
    color: $black;
    border-radius: 20px;
    transform: translate(-50%, -50%);
    box-sizing: border-box;
    font-size: 14px;
    overflow:hidden;
}

.returnButton {
    color: $white;
    background-color: $green_button;
    cursor: pointer;
    padding:7px 30px;
    font-weight: 900;
    font-size:20px;
    width:47%;
    margin:0 auto;
    border-radius:4px;
    text-align:center;
}
.returnButton:hover{
    background-color:$green_button_hover;
}

.return{
    color: white;
    font-size: 15px;
    text-align:center;
    line-height:28px; 
    width: 28px;
    height: 28px;
    display:inline-block; 
    border-radius: 14px;
    background: $green_special;
    position:absolute;
    right:10px;
    top:20px;
}

.return:hover{
    background:$green_special_hover;
}

.bottom{
    bottom:0;
    background:$white;
    padding:21px 0 40px;
    width:100%;
}
</style>
