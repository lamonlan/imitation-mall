<template>
    <div class="bottom-bar">
        <div class="bar-item bar-left">
            <div>
                <img class="icon service" src="~assets/img/detail/service.svg">
                <span class="text">客服</span>
            </div>
            <div>
                <img class="icon shop" src="~assets/img/detail/shop.svg">
                <span class="text">店铺</span>
            </div>
            <div>
                <img class="icon select" src="~assets/img/detail/select.svg">
                <span class="text">收藏</span>
            </div>
        </div>
        <div class="bar-item bar-right">
            <div class="cart" @click="addToCart">加入购物车</div>
            <div class="buy">购买</div>
        </div>
        
    </div>
</template>

<script>
export default {
    name: 'DetailBottom',
    methods: {
        addToCart(){
            this.$emit('addToCart')
        }
    }
}
</script>

<style scoped>
.bottom-bar {
    height: 49px;
    background-color: #fff;
    /* position: relative;
    bottom: 49px; */
    display: flex;
    text-align: center;
}

.bar-item{
    flex: 1;
    display: flex;
}

.bar-item>div{
    flex: 1;
    bottom: 2px;
}

.bar-left .text{
    font-size: 13px;
}

.bar-left .icon{
    display: block;
    width: 22px;
    height: 22px;
    margin: 5px auto 3px;
}

.bar-left .service{
    background-position: 0 -54px;
    
}

.bar-left .shop{
    background-position: 0 -98px;
    
}

.bar-right{
    font-size: 15px;
    color: #fff;
    line-height: 49px;
}

.bar-right .cart{
    background-color: #ffe817;
    color: #333;
}

.bar-right .buy{
    background-color: #f69;
}
</style>