<template>
    <div class="check-button" :class="{check: isChecked}">
        <img src="~assets/img/yes.svg">
    </div>
</template>

<script>
export default {
    name: 'CheckButton',
    props: {
        isChecked :{
            type: Boolean,
            default: false
        }
    }
}
</script>

<style scoped>
.check-button{
    border-radius: 50%;
    border: 2px solid #aaa;
    background-color: cornsilk;
}

.check-button img{
    width: 10px;
}

.check{
    background-color: red;
    border-color: red;
}
</style>