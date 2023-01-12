<template>
  <div>
    <!-- 已经注册为全局组件，所以不用引入 -->
    <TypeNav/>
    <ListContainer/>
    <Recommend/>
    <Rank/>
    <Like/>
    <!-- 父组件获取到mock数据，通过v-for遍历 生成多个floor组件，因此达到复用作用。-->
    <Floor v-for="(floor,index) in floorList" :key="floor.id" :list="floor"/>
    <Brand/>
  </div>
</template>

<script>
import ListContainer from './ListContainer'
import Recommend from './Recommend'
import Rank from './Rank'
import Like from './Like'
import Floor from './Floor'
import Brand from './Brand'
import {mapState} from 'vuex'
export default {
  components:{
    ListContainer,
    Recommend,
    Rank,
    Like,
    Floor,
    Brand,
  },
  mounted() {
    this.$store.dispatch('getFloor')
    // 获取用户信息在home显示
    this.$store.dispatch('userInfo')
  },
  computed:{
    ...mapState({     
      floorList:state=>state.Home.floorList
    })
  }
}
</script>

<style>

</style>