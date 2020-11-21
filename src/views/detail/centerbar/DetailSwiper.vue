<template>
    <swiper class="detailswiper">
        <swiper-item v-for="item in topImages" :key="item">
            <img :src="item">
        </swiper-item>
    </swiper>
</template>

<script>
import {Swiper,SwiperItem} from 'components/common/swiper/index'

export default {
    name: 'DetailSwiper',
    components: {
        Swiper,
        SwiperItem
    },
    props: {
        topImages: {
            type: Array,
            default(){
                return []
            }
        }
    }
}
</script>

<style scoped>
.detailswiper{
    height: 300px;
}
</style>