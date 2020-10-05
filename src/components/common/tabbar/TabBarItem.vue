<template>
      <div class="tab-bar-item" @click="itemClick">
          <!-- <img src="../../assets/img/tabbar/首页.svg"/>
          <div>首页</div> -->
          <div v-if="!isActive"><slot name="item-icon"></slot></div>
          <div v-else><slot name="item-icon-active"></slot></div>
          <!-- <div :class="{active:isActive}"><slot name="item-text"></slot></div> -->
          <div :style="activeStyle"><slot name="item-text"></slot></div>
      </div>
</template>

<script scoped>
export default {
  name: 'TabBarItem',
  props: {
      path: String,
      activeColor: {
          type: String,
          default: 'pink'
      }
  },
  data () {
      return {
        //   isActive:true
      }
  },
  computed: {
      isActive(){
          // indexOf判断当前路径是否和我点击的路径相同，不相同的话=-1，所以判断不等于-1即为相同
          // 用$route是因为此处取的是路由的path
          return this.$route.path.indexOf(this.path) !== -1
      },
      activeStyle () {
          return this.isActive?{color:this.activeColor}:{}
      }
  },
  methods: {
      itemClick(){
          this.$router.push(this.path)
      }
  }
}
</script>

<style>
.tab-bar-item {
  flex: 1;
  text-align: center;
  height: 49px;
}

.tab-bar-item img {
    width: 24px;
    height: 24px;
    margin-top: 3px;
    vertical-align: middle;
    margin-bottom: 2px;
}

</style>
