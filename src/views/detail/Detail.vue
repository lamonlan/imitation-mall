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
        <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll">
        <detail-swiper :top-images="topImages"></detail-swiper>
        <detail-base-info :goods="goods"></detail-base-info>
        <detail-shop-info :shop="shop"></detail-shop-info>
        <detail-info :detail-info="detailInfo" @detailImgLoad="detailImgLoad"></detail-info>
        <detail-param-info ref="param" :param-info="paramInfo"></detail-param-info>
        <detail-comment-info ref="comment" :comment-info="commentInfo"></detail-comment-info>
        <good-list ref="recommend" :goods="recommends"></good-list>
        </scroll>
        <back-top @click.native="backTop" v-show="isShowBack"></back-top>
        <detail-bottom class="bottom" @addToCart="addCart"></detail-bottom>
    </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import CenterBar from './centerbar/CenterBar'
import DetailSwiper from './centerbar/DetailSwiper'
import DetailBaseInfo from './centerbar/DetailBaseInfo'
import DetailShopInfo from './centerbar/DetailShopInfo'
import DetailInfo from './centerbar/DetailInfo'
import DetailParamInfo from './centerbar/DetailParamInfo'
import DetailCommentInfo from './centerbar/DetailCommentInfo'
import GoodList from 'components/connect/goods/GoodList'

import DetailBottom from './centerbar/DetailBottom'

import BackTop from 'components/connect/backTop/BackTop'



import Scroll from 'components/common/scroll/Scroll'

import {getTopImages,Goods,Shop,GoodsParam,getRecommends} from './detailnetwork/detail'

import {debounce} from 'components/common/utils'
import {itemListenerMixin} from 'components/common/mixin'



export default {
    name: 'Detail',
    components: {
        NavBar,
        CenterBar,
        DetailSwiper,
        DetailBaseInfo,
        DetailShopInfo,
        Scroll,
        DetailInfo,
        DetailParamInfo,
        DetailCommentInfo,
        GoodList,
        DetailBottom,
        BackTop
    },
    mixins: [itemListenerMixin],
    data(){
        return{
            iid: null,
            titles: ['商品','参数','评论','推荐'],
            currentIndex: 0,
            topImages: [],
            goods: {},
            shop: {},
            detailInfo: {},
            paramInfo: {},
            commentInfo: {},
            recommends: [],
            itemImageListener: null,
            themeTopY: [],
            getThemeTopY: null,
            isShowBack: false
        }
    },
    created(){
        this.iid = this.$route.params.iid
     
        getTopImages(this.iid).then(res => {
            // console.log(res)
            const data = res.data.result
            this.topImages = data.itemInfo.topImages
            this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services)
            this.shop = new Shop(data.shopInfo)
            this.detailInfo = data.detailInfo
            this.paramInfo = new GoodsParam(data.itemParams.info,data.itemParams.rule)
            if(data.rate.cRate !== 0){
                this.commentInfo = data.rate.list[0]
            }
        })

        getRecommends().then(res => {
            // console.log(res)
            this.recommends = res.data.data.list
        })

        this.getThemeTopY = debounce(() => {
            this.themeTopY = []
            this.themeTopY.push(0)
            //直接refs拿到的是组件因此要用$el
            this.themeTopY.push(this.$refs.param.$el.offsetTop)
            this.themeTopY.push(this.$refs.comment.$el.offsetTop)
            this.themeTopY.push(this.$refs.recommend.$el.offsetTop)
            // this.themeTopY.push(Number.MAX_VALUE)
            // console.log(this.themeTopY)
        },100)
    },
    mounted() {
        
    },
    destroyed() {
        this.$bus.$off('itemImageLoad',this.itemImageListener)
    },
    methods: {
        titleClick(index){
            this.currentIndex = index
            this.$refs.scroll.scrollTo(0,-this.themeTopY[index],100)
        },
        back(){
            this.$router.back()
        },
        detailImgLoad() {
            this.$refs.scroll.refresh()
            this.getThemeTopY()
        },
        contentScroll(position){
            const positionY = -position.y

            let length = this.themeTopY.length
            for(let i = 0;i<length;i++){
                if(this.currentIndex !== i && ((i < length-1 && positionY >= this.themeTopY[i] && positionY < this.themeTopY[i+1]) || (i === length - 1 && positionY >= this.themeTopY[i]))){
                    this.currentIndex = i
                }
            }

            // for(let i = 0;i<length-1;i++){
            //     if(this.currentIndex !== i && (i < length-1 && positionY >= this.themeTopY[i] && positionY < this.themeTopY[i+1])){
            //         this.currentIndex = i
            //     }
            // }

            this.isShowBack = (-position.y) > 1000
        },
        backTop() {
            this.$refs.scroll.scrollTo(0,0,100)
        },
        addCart(){
            const cartGoods = {}
            cartGoods.image = this.topImages[0]
            cartGoods.title = this.goods.titlt
            cartGoods.desc = this.goods.desc
            cartGoods.price = this.goods.realPrice
            cartGoods.iid = this.iid

            // this.$store.commit('addCart',cartGoods)
            this.$store.dispatch('addCart',cartGoods).then(res => {
                this.$toast.show(res,1000)
            })
        }
    }
}
</script>

<style scoped>
.detail-page{
    position: relative;
    z-index: 9;
    background-color: #fff;
    height: 100vh;
}

.content{
    /* 此方法使得topnav无法一直显示在页面上 */
    /* height: calc(100% - 44px -49px); */
    position: fixed;
    top: 44px;
    left: 0;
    overflow: hidden;
    bottom: 46px;
}

.detail-nav{
    display: relative;
    z-index: 10;
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
.bottom{
    /* display: flex;
    bottom: 0; */
    position: fixed;
    bottom: 0px;
    width: 100%;
}
</style>