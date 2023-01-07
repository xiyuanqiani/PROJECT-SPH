<template>
  <div class="swiper-container" ref="cur">
    <div class="swiper-wrapper">
      <div
        class="swiper-slide"
        v-for="(carousel, index) in list"
        :key="carousel.id"
      >
        <img :src="carousel.imgUrl" />
      </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>

    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
</template>

<script>
import Swiper from 'swiper/swiper-bundle.min.js'
export default {
// 轮播图组件复用
  name: "Carousel",
  props:['list'],
  watch:{
    list:{
      // 
        immediate:true,
      handler(newValue,oldValue){
                /* 
        如果执行handler后，代表实例身上已经有了属性【数组】
        当前这个函数执行，只能保证数据有了，但是结构还没完全，无法保证v-for执行完毕
        利用nextTick
        */
       this.$nextTick(()=>{
        // 当执行这个回调，服务器数据已得到，v-for已完毕
        var mySwiper = new Swiper(this.$refs.cur, {
        autoplay:true,//自动循环播放
        loop: true, // 循环模式选项

        // 如果需要分页器
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },

        // 如果需要前进后退按钮
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
      });
       })
      }
    }
  }
};
</script>

<style></style>
