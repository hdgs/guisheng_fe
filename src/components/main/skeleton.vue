<template>
    <div class="container">
        <div class="post">
            <div class="avatar"></div>
            <div class="line"></div>
            <div class="line"></div>
        </div>    
        <div class="post">
            <div class="avatar"></div>
            <div class="line"></div>
            <div class="line"></div>
        </div>
        <div class="post">
            <div class="avatar"></div>
            <div class="line"></div>
            <div class="line"></div>
        </div>
         <div class="post">
            <div class="avatar"></div>
            <div class="line"></div>
            <div class="line"></div>
        </div>
         <div class="post">
            <div class="avatar"></div>
            <div class="line"></div>
            <div class="line"></div>
        </div>
         <div class="post">
            <div class="avatar"></div>
            <div class="line"></div>
            <div class="line"></div>
        </div>
    </div>
</template>
<style>
.container {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.post {
    width: 100%;
}

.post .avatar {
    float: right;
    width: 80px;
    height: 80px;
    background-color: #ccc;
    border-radius: 25%;
    margin: 20px;
    background-image: linear-gradient(90deg, #ddd 0px, #e8e8e8 40px, #ddd 80px);
    background-size: 600px;
    animation: shine-avatar 1.6s infinite linear;
}

.post .line {
    float: right;
    width: 40%;
    height: 16px;
    margin-top: 12px;
    border-radius: 7px;
    background-image: linear-gradient(90deg, #ddd 0px, #e8e8e8 40px, #ddd 80px);
    background-size: 600px;
    animation: shine-lines 1.6s infinite linear;
}

.post .avatar+.line {
    margin-top: 30px;
    width: 60%;
}

.post .line~.line {
    background-color: #ddd;
}

@keyframes shine-lines {
    0% {
        background-position: -100px;
    }
    40%,
    100% {
        background-position: 140px;
    }
}

@keyframes shine-avatar {
    0% {
        background-position: -32px;
    }
    40%,
    100% {
        background-position: 208px;
    }
}
</style>
