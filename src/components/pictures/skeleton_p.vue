<template>
  <div class="skeleton"></div>
</template>
<style>
.skeleton:empty {
  min-height: 450px;
  background-image: linear-gradient( 100deg, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.5) 50%, rgba(255, 255, 255, 0) 80% ),linear-gradient( #F4F3F2 50px, transparent 0 ),linear-gradient( #F4F3F2 50px, transparent 0 ),linear-gradient( #F4F3F2 190px, transparent 0 ),linear-gradient( #F4F3F2 190px, transparent 0 ),linear-gradient( #F4F3F2 190px, transparent 0 ),linear-gradient( #F4F3F2 190px, transparent 0 ),linear-gradient( #F4F3F2 190px, transparent 0 );
  background-size: 30px 543px, 45%, 96%, 96%, 96%, 96%, 96%, 96%;
  background-repeat: no-repeat;
  background-position: 5% 30px, 4% 20px, 55% 85px, 55% 150px, 55% 360px, 55% 570px, 55% 780px, 55% 990px;
}
.skeleton:empty {
  margin: auto;
  background-color: #fff;
  border: 1px solid #F4F3F2;
  padding: 0 5px;
}
</style>

