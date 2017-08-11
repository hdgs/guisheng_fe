<template>
    <div class="sharePage">
        <div class="-mob-share-ui" style="display: none">
            <ul class="-mob-share-list">
                <li class="-mob-share-weibo">
                    <p>新浪微博</p>
                </li>
                <li class="-mob-share-weixin">
                    <p>微信</p>
                </li>
                <li class="-mob-share-youdao">
                    <p>有道云笔记</p>
                </li>
                <li class="-mob-share-qzone">
                    <p>QQ空间</p>
                </li>
                <li class="-mob-share-qq">
                    <p>QQ好友</p>
                </li>
                <li class="-mob-share-douban">
                    <p>豆瓣</p>
                </li>
                <li class="-mob-share-facebook">
                    <p>Facebook</p>
                </li>
                <li class="-mob-share-twitter">
                    <p>Twitter</p>
                </li>
            </ul>
        </div>
        <div class="-mob-share-ui-bg"></div>
    </div>
</template>
<style lang ="sass" scoped>
@import '../../scss/color.scss';
@import '../../scss/zindex.scss';

.sharePage {
    top: 54px;
    width: 100%;
    bottom: 0;
    left: 0;
    z-index: $Zindex2;
    position: fixed;
}

</style>
