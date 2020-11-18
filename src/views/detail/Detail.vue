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
    </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import CenterBar from './centerbar/CenterBar'

export default {
    name: 'Detail',
    components: {
        NavBar,
        CenterBar
    },
    data(){
        return{
            iid: null,
            titles: ['商品','参数','评论','推荐'],
            currentIndex: 0
        }
    },
    created(){
        this.iid = this.$route.params.iid
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
.detail-nav{
    text-align: center;
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