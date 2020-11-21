<template>
    <div class="detail-page">
        <nav-bar class="detail-nav">
            <div slot="left" class="left" @click="back">
                <img src="~assets/img/return.svg">
            </div>
            <div slot="center" class="center-bar">
                <center-bar v-for="(item,index) in titles" 
                            :key="(item,index)"
                            :class="{active: index === currentIndex}"
                            @click.native="titleClick(index)"
                            >
                            {{item}}</center-bar>
            </div>
        </nav-bar>
        <scroll class="content">
        <detail-swiper :top-images="topImages"></detail-swiper>
        <detail-base-info :goods="goods"></detail-base-info>
        <detail-shop-info :shop="shop"></detail-shop-info>
        </scroll>
    </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import CenterBar from './centerbar/CenterBar'
import DetailSwiper from './centerbar/DetailSwiper'
import DetailBaseInfo from './centerbar/DetailBaseInfo'
import DetailShopInfo from './centerbar/DetailShopInfo'
import Scroll from 'components/common/scroll/Scroll'

import {getTopImages,Goods,Shop} from './detailnetwork/detail'

export default {
    name: 'Detail',
    components: {
        NavBar,
        CenterBar,
        DetailSwiper,
        DetailBaseInfo,
        DetailShopInfo,
        Scroll
    },
    data(){
        return{
            iid: null,
            titles: ['商品','参数','评论','推荐'],
            currentIndex: 0,
            topImages: [],
            goods: {},
            shop: {}
        }
    },
    created(){
        this.iid = this.$route.params.iid
     
        getTopImages(this.iid).then(res => {
            console.log(res)
            const data = res.data.result
            this.topImages = data.itemInfo.topImages
            this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services)
            this.shop = new Shop(data.shopInfo)
        })

        
    },
    methods: {
        titleClick(index){
            this.currentIndex = index
        },
        back(){
            this.$router.back()
        }
    }
}
</script>

<style scoped>
.detail-page{
    position: relative;
    z-index: 9;
    background-color: #fff;
    /* height: 100vh; */
}

.content{
    /* 此方法使得topnav无法一直显示在页面上 */
    /* height: calc(100% - 44px); */
    position: fixed;
    top: 44px;
    left: 0;
    overflow: hidden;
    bottom: 46px;
}

.detail-nav{
    display: relative;
    z-index: 9;
    background-color: #fff;
}
.left{
    padding-top: 5px;
}
img{
    width: 35px;
    height: 35px;
}
.center-bar{
    display: flex;
}
.active{
    color: pink;
}
</style>