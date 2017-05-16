<template>
    <div :class="$style.suggestPage">
        <div :class="$style.titleBox">
            <svg viewBox="0 0 200 200" :class="$style.imgBack" v-on:click="closeComment">
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#back"></use>
            </svg>
            <div :class="$style.commentTitle">意见反馈</div>
        </div>
        <div :class="$style.line"></div>
        <div :class="$style.title_s">您的意见：</div>
        <textarea type="text" :class="$style.input" placeholder="输入您的反馈详情" v-model="suggestion"></textarea>
        <div :class="$style.title_s">联系方式：</div>
        <textarea type="text" :class="$style.inputInfo" placeholder="手机号码/QQ/邮箱" v-model="suggestInfo"></textarea>
        <button :class="$style.signout" v-on:click="submitSuggest">提交</button>
        <div v-show="showSuccess" :class="$style.suggestMask">
            <div :class="$style.successCard">提交成功啦 ~</div>
        </div>
    </div>
</template>
<script>
import Fetch from '../../common/fetch.js'
export default {
    data() {
            return {
                suggestion: "",
                suggestInfo: "",
                showSuccess:false
            }
        },
        methods: {
            closeComment() {
                if (this.$parent.showSuggest) {
                    this.$parent.showSuggest = false
                    this.suggestion = ""
                    this.suggestInfo = ""
                }
            },
            submitSuggest() {
                if (!this.suggestion || !this.suggestInfo) return
                    Fetch.FetchData('/api/v1.0/profile/' + this.profile.user_id + '/suggestions/','POST',{
                    	suggestion: this.suggestion,
                        contact_information: this.suggestInfo
                    }).then(value => {
                        this.showSuccess = true
                        setTimeout(() => {
                            this.$parent.showSuggest = false
                            this.showSuccess = false
                            this.suggestion = ""
                            this.suggestInfo = ""
                        }, 2000)

                    })
            }
        }
}
</script>
<style lang ="sass" module>
@import '../../scss/color.scss';
@import '../../scss/zindex.scss';

.suggestPage {
    position: absolute;
    width: 100%;
    top: 0;
    bottom: 0;
    right: 0;
    background-color: $white;
    z-index: $Zindex2;
    font-family: '黑体-简';
}

.titleBox {
    height: 54px;
    width: 100%;
    line-height: 54px;
    color: $black;
    background-color: $white;
    composes: space from 'sass-loader!../../scss/utility.scss';
}

.imgBack {
    composes: horizon from 'sass-loader!../../scss/utility.scss';
    width: 19px;
    padding-left: 18px;
    fill: $orange;
}

.commentTitle {
    composes: horizon from 'sass-loader!../../scss/utility.scss';
    text-align: center;
    width: 80%;
    font-size: 17px;
}

.line {
    width: 100%;
    height: 0.5px;
    background-color: $grey;
}

.title_s {
    font-size: 15px;
    margin-left: 15px;
    margin-top: 15px;
    color: $orange;
}

.input {
    width: 90%;
    height: 110px;
    font-size: 15px;
    padding: 15px;
    border-bottom: 0.50px solid $grey;
}

.inputInfo {
    width: 90%;
    font-size: 15px;
    padding: 15px;
    border-bottom: 0.50px solid $grey;
}

.signout {
    display: block;
    width: 190px;
    height: 40px;
    box-sizing: border-box;
    border: 1px $orange solid;
    background-color: $white;
    margin: 0 auto;
    border-radius: 3%;
    color: #fbb848;
    font-size: 16px;
    margin-top: 26px;
    outline: none;
}

.signout:hover {
    background-color: $orange;
}

.suggestMask {
    position: fixed;
    top: 0;
    bottom: 0;
    width: 100%;
    background-color: rgba(51, 51, 51, 0.85);
}

.successCard {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 173px;
    height: 63px;
    background-color: $white;
    line-height: 63px;
    text-align: center;
    color: $orange;
    border-radius: 2px;
    transform: translate(-50%, -50%);
}
</style>
