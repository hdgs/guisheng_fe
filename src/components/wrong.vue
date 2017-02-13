<template>
    <div :class="$style.wrongPage">
        <div :class="$style.wrongPicture">
            <img src="https://cdn.gomix.com/6f5b042d-533c-4dc6-9069-85376ee73137%2F%E6%8F%92%E5%9B%BE.png" alt="出错啦" :class="$style.wrongImg">
        </div>
        <div :class="$style.wrongWord">出错啦，戳我再试试</div>
    </div>
</template>
<script>
export default {
	
}
</script>
<style lang ="sass" module>
@import '../scss/color.scss';
.wrongPage {
    height: 100%;
    width: 100%;
    z-index: 2;
    position: fixed;
    /*top: 54px;*/
    background: $grey;
}

.wrongPicture {
    margin-top: 50px;
    text-align: center;
}

.wrongImg {
    height: 160px;
}

.wrongWord {
    text-align: center;
    color: $black_t;
    font-size: 14px;
    margin-top: 30px;
}
</style>
