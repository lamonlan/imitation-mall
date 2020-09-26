<template>

    <tab-bar>
      <tab-bar-item path="/home" activeColor="deeppink">
        <img slot="item-icon" src="../../assets/img/tabbar/首页.svg">
        <img slot="item-icon-active" src="../../assets/img/tabbar/首页 (1).svg">
        <div slot="item-text">首页</div>
      </tab-bar-item>
      <tab-bar-item path="/cart" activeColor="deeppink">
        <img slot="item-icon" src="../../assets/img/tabbar/类目 品类 分类 类别.svg">
        <img slot="item-icon-active" src="../../assets/img/tabbar/类目 品类 分类 类别 (1).svg">
        <div slot="item-text">分类</div>
      </tab-bar-item>
      <tab-bar-item path="category" activeColor="deeppink">
        <img slot="item-icon" src="../../assets/img/tabbar/购物车.svg">
        <img slot="item-icon-active" src="../../assets/img/tabbar/购物车 (1).svg">
        <div slot="item-text">购物车</div>
      </tab-bar-item>
      <tab-bar-item path="profile" activeColor="deeppink">
        <img slot="item-icon" src="../../assets/img/tabbar/我的.svg">
        <img slot="item-icon-active" src="../../assets/img/tabbar/我的 (1).svg">
        <div slot="item-text">我的</div>
      </tab-bar-item>
    </tab-bar>

</template>

<script>
import TabBar from '../common/TabBar'
import TabBarItem from '../common/TabBarItem'
export default {
  name: 'MainTabBar',
  components: {
    TabBar,
    TabBarItem
  }
}
</script>

<style>

</style>
