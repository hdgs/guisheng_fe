<template>
    <div :class="$style.sharePage">
        <div :class="$style.maskShare"></div>
        <div :class="$style.shareBox">
            <div class="bdsharebuttonbox" data-tag="share_1">
                <a class="bds_mshare" data-cmd="mshare" style="margin:12%;"></a>
                <a class="bds_evernotecn" data-cmd="evernotecn" style="margin:12%;"></a>
                <a class="bds_qzone" data-cmd="qzone" href="#" style="margin:12%;"></a>
                <a class="bds_tsina" data-cmd="tsina" style="margin:12%;"></a>
                <a class="bds_baidu" data-cmd="baidu" style="margin:12%;"></a>
                <a class="bds_sqq" data-cmd="sqq" style="margin:12%;"></a>
                <a class="bds_tqq" data-cmd="tqq" style="margin:12%;"></a>
                <a class="bds_weixin" data-cmd="weixin" style="margin:12%;"></a>
                <a class="bds_fbook" data-cmd="fbook" style="margin:12%;"></a>
                <a class="bds_twi" data-cmd="twi" style="margin:12%;"></a>
            </div>
            <div :class="$style.occupy"></div>
        </div>
    </div>
</template>
<script>
window._bd_share_config = {
    common: {
        bdText: '自定义分享内容',
        bdDesc: '自定义分享摘要',
        bdUrl: '自定义分享url地址',
        bdPic: '自定义分享图片'
    },
    share: [{
        "bdSize": 32,
    }],
    image: [{
        viewType: 'collection',
        viewPos: 'bottom',
        viewColor: 'white',
        viewSize: '32',
        viewList: ['qzone', 'tsina', 'huaban', 'tqq', 'renren', 'evernotecn']
    }]
}
</script>
<style lang ="sass" module>
@import '../../scss/color.scss';
.maskShare {
    background: rgba(53, 53, 53, 0.55);
    z-index: $Zindex2;
    position: fixed;
    width: 100%;
    height: 246px;
}

.sharePage {
    top: 54px;
    width: 100%;
    bottom: 0;
    left: 0;
    position: fixed;
}

.shareBox {
    top: 300px;
    width: 100%;
    bottom: 0;
    left: 0;
    position: fixed;
    background: white;
}

.occupy {
    height: 50px;
    width: 100%;
}
</style>
