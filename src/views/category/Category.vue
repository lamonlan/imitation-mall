<template>
      <div class="category">
        <nav-bar class="category-nav"><div slot="center">购物车({{length}})</div></nav-bar>
        <scroll class="wrapper" ref="scroll">
          <category-list></category-list>
        </scroll>
        <category-bottom-bar class="bottom"></category-bottom-bar>
      </div>
</template>

<script>
import NavBar from '../../components/common/navbar/NavBar'
import CategoryList from './childComponents/CategoryList'
import Scroll from 'components/common/scroll/Scroll'
import CategoryBottomBar from './childComponents/CategoryBottomBar'
import {mapGetters} from 'vuex'


export default {
  name: 'Category',
  components: {
    NavBar,
    CategoryList,
    Scroll,
    CategoryBottomBar
  },
  computed: {
    // cartLength(){
    //   return this.$store.state.cartList.length
    // }
    // ...mapGetters([])
    ...mapGetters({
      length: 'cartLength'
    })
  },
  activated(){
    this.$refs.scroll.refresh()
  }
}
</script>

<style>
.category-nav{
  background-color: var(--color-tint);
  color: aliceblue;
  text-align: center;
  /* z-index: 10; */
  /* font-weight: 500; */
}

.category{
  position: relative;
  height: 100vh;
}

.wrapper{
  /* height: calc(100% - 44px - 49px); */
  position: fixed;
  top: 44px;
  left: 0;
  right: 0;
  bottom: 89px;
  overflow: hidden;
}


</style>