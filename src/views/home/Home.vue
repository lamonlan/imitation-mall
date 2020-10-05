<template>
<div id="home">
      <nav-bar class="home-nav"><div slot="center">imitation-mall</div></nav-bar>
      <home-swiper :banners="banners"></home-swiper>
      <home-recommends :recommends="recommends"></home-recommends>
      <home-feature></home-feature>
      <main-control :titles="['流行','新款','精选']" class="tab-control"></main-control>
      <ul>
        <li>li</li>
        <li>li</li>
        <li>li</li>
        <li>li</li>
        <li>li</li>
        <li>li</li>
        <li>li</li>
        <li>li</li>
        <li>li</li>
        <li>li</li>
        <li>li</li>
        <li>li</li>
        <li>li</li>
        <li>li</li>
        <li>li</li>
        <li>li</li>
        <li>li</li>
        <li>li</li>
        <li>li</li>
        <li>li</li>
        <li>li</li>
        <li>li</li>
        <li>li</li>
        <li>li</li>
        <li>li</li>
        <li>li</li>
        <li>li</li>
        <li>li</li>
        <li>li</li>
        <li>li</li>
        <li>li</li>
        <li>li</li>
        <li>li</li>
        <li>li</li>
        <li>li</li>
        <li>li</li>
        <li>li</li>
        <li>li</li>
        <li>li</li>
        <li>li</li>
      </ul>
</div>
</template>

<script>
import NavBar from '../../components/common/navbar/NavBar'
import HomeSwiper from './childComponents/HomeSwiper'
import HomeRecommends from './childComponents/HomeRecommends'
import HomeFeature from './childComponents/HomeFeature'

import MainControl from 'components/connect/mainControl/MainControl'

import {getHomeMultidata} from '../../network/home'


export default {
  name: 'Home',
  components: {
    NavBar,
    HomeSwiper,
    HomeRecommends,
    MainControl,
    HomeFeature
  },
  data() {
    return {
      banners: [],
      recommends: []
    }
  },
  //当组件创建之后就请求数据，因此调用生命周期函数
  created() {
    //1:请求多个数据
    getHomeMultidata().then(res => {
      // console.log(res)
      //保存请求过来的数据
      this.banners = res.data.data.banner.list
      this.recommends = res.data.data.recommend.list
    })
  }
}
</script>

<style scoped>
#home{
  padding-top: 44px;
}
.home-nav{
  background-color: var(--color-tint);
  color: aliceblue;
  text-align: center;

  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 9;
}

.tab-control{
  position: sticky;
  top: 44px;
}
</style>>
