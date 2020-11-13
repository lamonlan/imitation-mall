<template>
    <div class="recommend">
        <div v-for="item in recommends" :key="item.value" class="recommend-item">
            <a :href="item.link">
                <img :src="item.image">
                <div>{{item.title}}</div>
            </a>
        </div>
    </div>
</template>

<script>
export default {
    name: "HomeRecommends",
    props: {
        recommends: {
            type: Array,
            default() {
                return []
            }
        }
    }
}
</script>

<style scoped>
.recommend{
    display: flex;
    width: 100%;
    text-align: center;

    font-size: 12px;

    padding: 10px 0 20px;
    border-bottom: 9px solid #eee;
}

.recommend-item{
    flex: 1;  
}

.recommend-item img{
    width: 80%;
}
</style>