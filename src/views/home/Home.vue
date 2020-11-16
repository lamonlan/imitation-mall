<template>
<div id="home">
      <nav-bar class="home-nav"><div slot="center">imitation-mall</div></nav-bar>
      <main-control 
          :titles="['流行','新款','精选']" 
          @tabClick="tabClick"
          ref="mainControlOne" 
          v-show="isTabFixed" 
          class="maincontrol" 
        ></main-control>

      <!-- <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll" @pullingUp="loadMore"> -->
      <scroll class="content" ref="scroll" 
              :probe-type="3" 
              @scroll="contentScroll" 
              :pull-up-type="true" 
              @pullingUp="loadMore">
        <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"></home-swiper>
        <home-recommends :recommends="recommends"></home-recommends>
        <home-feature></home-feature>
        <main-control 
          :titles="['流行','新款','精选']" 
          class="tab-control"
          @tabClick="tabClick"
          ref="mainControlTow" 
          
        ></main-control>
        <good-list :goods="showGoods"></good-list>
      </scroll>

      <back-top @click.native="backClick" v-show="isBackTopShow"></back-top>
      
</div>
</template>

<script>
import NavBar from '../../components/common/navbar/NavBar'
import HomeSwiper from './childComponents/HomeSwiper'
import HomeRecommends from './childComponents/HomeRecommends'
import HomeFeature from './childComponents/HomeFeature'

import MainControl from 'components/connect/mainControl/MainControl'

import GoodList from 'components/connect/goods/GoodList'

import Scroll from 'components/common/scroll/Scroll'

import BackTop from 'components/connect/backTop/BackTop'

import {getHomeMultidata,getHomeGoods} from '../../network/home'



export default {
  name: 'Home',
  components: {
    NavBar,
    HomeSwiper,
    HomeRecommends,
    MainControl,
    HomeFeature,
    GoodList,
    Scroll,
    BackTop
  },
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        'pop': {page: 0,list: []},
        'new': {page: 0,list: []},
        'sell': {page: 0,list: []},
      },
      currentType: 'pop',
      isBackTopShow: false,
      tabOffsetTop: 0,
      isTabFixed: false
    }
  },
  //当组件创建之后就请求数据，因此调用生命周期函数
  created() {
    //1:请求多个数据
    this.getHomeMultidata()
    //2:请求商品数据
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')

    
  },
  mounted(){
    // this.$bus.$on('itemImageLoad',()=>{
    //   this.$refs.scroll.refresh()
    //   console.log('...')
    // })

    const refresh = this.debounce(this.$refs.scroll.refresh,50)
    this.$bus.$on('itemImageLoad',()=>{
      refresh()
    })
  },
  methods: {
    debounce(func,delay) {
      let timer = null
      return function(...args){
        if(timer) clearTimeout(timer)
        timer = setTimeout(() => {
          func.apply(this,args)
        }, delay);
      }
    },
    tabClick(index){
      switch(index){
        case 0:
          this.currentType = 'pop'
          break
        case 1:
          this.currentType = 'new'
          break
        case 2:
          this.currentType = 'sell'
          break
      }
      this.$refs.mainControlOne.currentIndex = index
      this.$refs.mainControlTow.currentIndex = index
    },

    backClick(){
      this.$refs.scroll.scrollTo(0,0)
    },

    contentScroll(position){
      this.isBackTopShow = (-position.y) > 1000

      this.isTabFixed = (-position.y) > this.tabOffsetTop
    },

    getHomeMultidata(){
      getHomeMultidata().then(res => {
      // console.log(res)
      //保存请求过来的数据
      this.banners = res.data.data.banner.list
      this.recommends = res.data.data.recommend.list
    })
    },
    getHomeGoods(type){
      const page = this.goods[type].page + 1
      getHomeGoods(type,page).then(res=> {
        console.log(res)
        this.goods[type].list.push(...res.data.data.list)
        this.goods[type].page += 1

        this.$refs.scroll.finishPullUp()
    })
    },
    loadMore(){
      this.getHomeGoods(this.currentType)
    },

    swiperImageLoad(){
      // console.log(this.$refs.mainControlTow.$el.offsetTop)
      this.tabOffsetTop = this.$refs.mainControlTow.$el.offsetTop
    }
    // loadMore(){
    //   this.getHomeGoods(this.currentType)
    //   //消除由于bertter-scroll上拉加载高度固定的问题，每次刷新以免出现无法上拉加载的情况出现
    //   this.$refs.scroll.scroll.refresh()
    // }
  },
  computed: {
    showGoods(){
      return this.goods[this.currentType].list
    }
  }
}
</script>

<style scoped>
#home{
  padding-top: 44px;
  height: 100vh; 
  position: relative;
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

/* .tab-control{ */
  /* 在better-scroll中无效 */
  /* position: sticky; */
  /* top: 44px;  */
  /* z-index: 9; */
/* }  */

.content{
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}

/* .fixed{
  position: fixed;
  left: 0;
  right: 0;
  top: 44px;
} */

.maincontrol{
  position: relative;
  z-index: 9;
}

/* .content{
  height: calc(100% - 93px);
  overflow: hidden;
  margin-top: 44px; 
} */
</style>>
