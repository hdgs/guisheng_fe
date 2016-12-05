<template>
    <div id="header" v-hide="onclick">
        <div :class="$style.top">
            <div :class="$style.logo"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLWp6qP896yw1kaurHnm4adRE_yft9FE2wsBUxgTM6wIXD5Xrr" alt="华大桂声" :class="$style.img"></div>
            <div :class="$style.profile"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLWp6qP896yw1kaurHnm4adRE_yft9FE2wsBUxgTM6wIXD5Xrr" alt="个人中心" :class="$style.img"></div>
            <div :class="$style.search"><img src="https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQNa0liXFy417a3AvGXk01LImjZELR-cIHSpgD-Yo-GvL-GCkd7" alt="搜索" v-on:click="showSearch" :class="$style.img"></div>
        </div>
        <div :class="$style.mask" v-show="onclick"  >
            <div :class="$style.searchBox">
                <input type="text" :class="$style.input" v-model="content">
                <div :class="$style.button" v-on:click="postContent">搜索</div>
            </div>
            <div :class="$style.title_s">热门搜索</div>
            <div :class="$style.tagList">
                <div :class="$style.tag" v-for="tag in tagList" v-on:click="getTag(tag)">{{tag}}</div>
            </div>
        </div>
    </div>
</template>
<script>
import Hidden from '../directives/hidden'

export default {
    data() {
            return {
                onclick: false,
                content: "",
                tagList: []
            }
        },
        directives: {
            hide: Hidden
        },
        methods: {
            getTag(e) {
                this.content = e.slice(1, e.length - 1)
            },
            showSearch() {
                fetch("/api/v1.0/hottag/")
                    .then((res) => {
                        return res.json()
                    }).then(value => {
                        this.tagList = value
                    })
                if (this.onclick) {
                    this.onclick = false
                } else {
                    this.onclick = true
                }
            },
            postContent() {
                fetch('/api/v1.0/feed', {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            content: this.content
                        })
                    })
                    .then(res => {
                        return res.json()
                    })
                    .then(json => {
                        console.log(json.status)
                        this.content = ""
                    })
            }
        }
}
</script>
<style lang ="sass" module>
@import '../scss/color.scss';
.top {
    position: relative;
    background-color: $white;
    height: 54px;
    composes: space from 'sass-loader!../scss/utility.scss';
}

.common {
    line-height: 54px;
    height: 54px;
}

.logo {
    margin-left: 12.5px;
    float: left;
    composes: common;
    composes: horizon from 'sass-loader!../scss/utility.scss';
}

.search {
    float: right;
    margin-right: 26px;
    composes: common;
    composes: horizon from 'sass-loader!../scss/utility.scss';
}

.profile {
    float: right;
    margin-right: 17.5px;
    composes: common;
    composes: horizon from 'sass-loader!../scss/utility.scss';
}

.img {
    vertical-align: middle;
    width: 20px;
}

.mask {
    position: fixed;
    top: 54px;
    z-index: 3;
    height: 100%;
    width: 100%;
    background-color: rgba(229, 233, 233, 0.85);
}

.searchBox {
    margin: 16px 15px;
    composes: space from 'sass-loader!../scss/utility.scss';
    border: $orange 1px solid;
}

.input {
    padding-left: 10px;
    padding-right: 68px;
    height: 31px;
    width: 100%;
    border: none;
    box-sizing: border-box;
    composes: horizon from 'sass-loader!../scss/utility.scss';
}

.button {
    position: absolute;
    width: 32px;
    right: 16px;
    font-size: 16px;
    background-color: $orange_button;
    color: $white;
    padding: 7.5px 16px;
    composes: horizon from 'sass-loader!../scss/utility.scss';
}

.title_s {
    margin: 20px;
}

.tagList {
    margin-left: 20px;
    margin-right: 20px;
    display: justify;
}

.tag {
    font-size: 16px;
    background-color: $orange_button;
    padding: 5.5px 12.5px;
    color: $white;
    margin: 10px;
    display: inline-block;
    vertical-align: middle;
}
</style>
