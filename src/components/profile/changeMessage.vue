<template>
    <div :class="$style.suggestPage">
        <div :class="$style.titleBox">
            <svg viewBox="0 0 200 200" :class="$style.imgBack" v-on:click="closeComment">
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#wrong"></use>
            </svg>
            <div :class="$style.commentTitle">个人信息</div>
            <svg viewBox="0 0 200 200" :class="$style.imgRight" v-on:click="submitChange">
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#right"></use>
            </svg>
        </div>
        <div :class="$style.changeAvatar">
            <div :class="$style.avatarbox">
                <img :class="$style.avatarimgchange" v-bind:src="changedImg">
                <div :class="$style.camera">
                    <svg viewBox="0 0 200 200" :class="$style.imgCamera">
                        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#camera"></use>
                    </svg>
                </div>
                <div :class="$style.changeButton">修改头像
                    <input type="file" id="file" name="file" :class="$style.uploadFile" v-on:change="getName" v-bind:value="this.inputValue" accept="image/*">
                </div>
            </div>
        </div>
        <div :class="$style.changeInfo" v-on:click="editName">
            <span :class="$style.nameF">昵称：</span>
            <span :class="$style.changeName" v-show="!editChange">{{profile.name}}</span>
            <textarea type="text" v-show="editChange" v-model="newName" :class="$style.newName" autofocus rows="1" v-bind:placeholder="profile.name"></textarea>
        </div>
        <div :class="$style.changeInfo" v-on:click="editName">
            <span :class="$style.nameF">简介：</span>
            <span :class="$style.changeName" v-show="!editChange">{{profile.introduction}}</span>
            <textarea type="text" v-show="editChange" v-model="newIntroduction" :class="$style.newName" autofocus rows="4" v-bind:placeholder="profile.introduction"></textarea>
        </div>
        <div :class="$style.changeInfo" v-show="profile.user_role" v-on:click="editName">
            <span :class="$style.nameF">微博：</span>
            <span :class="$style.changeName" v-show="!editChange">{{profile.weibo}}</span>
            <textarea type="text" v-show="editChange" v-model="newWeibo" :class="$style.newName" autofocus rows="4" v-bind:placeholder="profile.weibo ? profile.weibo:'请输入您的微博名'"></textarea>
        </div>
    </div>
</template>
<script>
import Fetch from '../../common/fetch.js'

export default {
    data() {
            return {
                editChange: false,
                profile: {},
                newName: "",
                newIntroduction: "",
                newWeibo: "",
                changedImg: "",
                inputValue: "",
                avatarData: "",
                pic_url: ""
            }
        },
        methods: {
            closeComment() {
                if (this.$parent.changeMessage) {
                    this.$parent.changeMessage = false
                    this.editChange = false
                }
            },
            submitChange() {
                if (!this.editChange) return
                let promise1 = Fetch.FetchData('/api/v1.0/profile/' + this.profile.user_id + '/edit/', 'PUT', {
                    name: this.newName ? this.newName : this.profile.name,
                    introduction: this.newIntroduction ? this.newIntroduction : this.profile.introduction,
                    weibo: this.newWeibo ? this.newWeibo : this.profile.weibo,
                    img_url: this.pic_url ? this.pic_url : this.profile.weibo.img_url
                }).then(value => {
                    this.profile = value
                    this.$parent.profile = value
                    this.$parent.changeMessage = false
                    this.editChange = false
                    this.newName = ""
                    this.newIntroduction = ""
                    this.newWeibo = ""
                })
            },
            getName(e) {
                this.changedImg = URL.createObjectURL(e.target.files[0])
                this.avatarData = new FormData()
                this.avatarData.append('file', e.target.files[0])
                fetch('http://120.24.4.254:7777/guisheng/upload_pics/', {
                    method: 'POST',
                    body: this.avatarData
                }).then(res => {
                    return res.json()
                }).then(value => {
                    this.pic_url = value.pic_url
                })
                this.editChange = true
            },
            editName() {
                this.editChange = true
            },
        }
}
</script>
<style lang="sass" module>
@import '../../scss/color.scss';
.suggestPage {
    position: absolute;
    width: 100%;
    top: 0;
    bottom: 0;
    right: 0;
    background-color: $white;
    z-index: $Zindex4;
    font-family: '黑体-简';
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

.titleBox {
    height: 54px;
    width: 100%;
    line-height: 54px;
    color: $black;
    background-color: $white;
    composes: space from 'sass-loader!../../scss/utility.scss';
}

.newName {
    font-size: 15px;
}

.uploadFile {
    opacity: 0;
    filter: alpha(opacity=0);
    font-size: 100px;
    position: absolute;
    top: 0;
    right: 0;
}

.changeInfo {
    border-top: 0.5px solid $grey;
    padding: 15px 20px;
    font-size: 15px;
}

.changeButton {
    top: 10px;
    width: 100%;
    text-align: center;
    font-size: 15px;
    color: $black_t;
}

.nameF {
    color: $black_t;
}

.changeAvatar {
    height: 215px;
    width: 100%;
    text-align: center;
    position: relative;
    border-top: 0.5px $grey solid;
}

.imgRight {
    width: 24px;
    composes: horizon from 'sass-loader!../../scss/utility.scss';
    fill: $orange;
}

.avatarbox {
    width: 200px;
    text-align: center;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.avatarimgchange {
    width: 104px;
    height: 94px;
    border-radius: 50%;
    position: relative;
}

.camera {
    position: absolute;
    overflow: hidden;
    top: 68%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.camera {
    position: absolute;
    overflow: hidden;
    top: 68%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.imgCamera {
    width: 100px;
    height: 100%;
    fill: $orange;
    fill-rule: evenodd;
    opacity: 0.8;
}
</style>
