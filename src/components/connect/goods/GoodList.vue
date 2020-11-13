<template>
<div class="good">
    <good-list-item v-for="item in goods" :good-item="item" :key="item.value"></good-list-item>
</div>
    
</template>

<script>
import GoodListItem from './GoodListItem'
export default {
    name: "GoodList",
    components: {
        GoodListItem
    },
    props: {
        goods: {
            type: Array,
            default(){
                return []
            }
        }
    }
}
</script>

<style scoped>
.good{
    display: flex;
    flex-wrap: wrap;
    /* 均等分 */
    justify-content: space-around;
}

</style>