<template>
    <div>
        <div class="lines">
            <div class="thumb pulse"></div>
            <div class="line pulse"></div>
            <div class="line pulse"></div>
        </div>
        <div class="lines">
            <div class="thumb pulse"></div>
            <div class="line pulse"></div>
            <div class="line pulse"></div>
        </div>
        <div class="lines">
            <div class="thumb pulse"></div>
            <div class="line pulse"></div>
            <div class="line pulse"></div>
        </div>
    </div>
</template>
<style>
.pulse {
    height: 100%;
    width: 100%;
    background-size: 400% 400%;
}

.content {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
}

.lines {
    width: 95%;
    margin: 0 auto;
    height: 300px;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
}

.lines .line,
.lines .thumb {
    background-color: #ddd;
    width: 100%;
    height: 15px;
    margin: 8px;
}

.lines .thumb {
    height: 200px;
}
</style>
