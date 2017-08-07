<template>
    <div>
        <div class="lightui1">
            <div class="lightui1-shimmer">
                <div class="_2iwr"></div>
                <div class="_2iws"></div>
                <div class="_2iwt"></div>
                <div class="_2iwu"></div>
                <div class="_2iwv"></div>
                <div class="_2iww"></div>
                <div class="_2iwx"></div>
                <div class="_2iwy"></div>
                <div class="_2iwz"></div>
                <div class="_2iw-"></div>
                <div class="_2iw_"></div>
                <div class="_2ix0"></div>
            </div>
        </div>
    </div>
</template>
<style scoped>
.lightui1 {
    padding: 20px;
    background: #ffffff;
}

.lightui1-shimmer {
    -webkit-animation-duration: 1s;
    -webkit-animation-fill-mode: forwards;
    -webkit-animation-iteration-count: infinite;
    -webkit-animation-name: placeHolderShimmer;
    -webkit-animation-timing-function: linear;
    background: #d8d8d8;
    background-image: linear-gradient(to right, #d8d8d8 0%, #bdbdbd 20%, #d8d8d8 40%, #d8d8d8 100%);
    background-repeat: no-repeat;
    background-size: 800px 104px;
    height: 104px;
    position: relative
}

.lightui1-shimmer div {
    background: #ffffff;
    height: 6px;
    left: 0;
    position: absolute;
    right: 0
}

div._2iwr {
    height: 40px;
    left: 40px;
    right: auto;
    top: 0;
    width: 8px;
}

div._2iws {
    height: 8px;
    left: 48px;
    top: 0
}

div._2iwt {
    left: 136px;
    top: 8px
}

div._2iwu {
    height: 12px;
    left: 48px;
    top: 14px
}

div._2iwv {
    left: 100px;
    top: 26px
}

div._2iww {
    height: 10px;
    left: 48px;
    top: 32px
}

div._2iwx {
    height: 20px;
    top: 40px
}

div._2iwy {
    left: 410px;
    top: 60px
}

div._2iwz {
    height: 13px;
    top: 66px
}

div._2iw- {
    left: 440px;
    top: 79px
}

div._2iw_ {
    height: 13px;
    top: 85px
}

div._2ix0 {
    left: 178px;
    top: 98px
}

@-webkit-keyframes placeHolderShimmer {
    0% {
        background-position: -468px 0
    }
    100% {
        background-position: 468px 0
    }
}

@-webkit-keyframes prideShimmer {
    from {
        background-position: top left
    }
    to {
        background-position: top right
    }
}
</style>
