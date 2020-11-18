<template>
    <div class="centerbar">
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: 'CenterBar'
}
</script>

<style scoped>
.centerbar{
    flex: 1;
    text-align: center;
}
</style>