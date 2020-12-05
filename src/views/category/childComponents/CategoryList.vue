<template>
    <div class="cart-list">
        <category-list-item v-for="(item,index) in cartList" :key="index" :item-info="item"></category-list-item>
    </div>
</template>

<script>
import {mapGetters} from 'vuex'
import CategoryListItem from './CategoryListItem.vue'

export default {
    name: 'CategoryList',
    components: {
        CategoryListItem
    },
    computed: {
        ...mapGetters(['cartList'])
    }
}
</script>

<style  scoped>
.cart-list{
    height: 100%;
}
</style>