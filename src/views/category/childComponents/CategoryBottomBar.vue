<template>
    <div class="bottom-bar">
        <div class="select-bottom">
            <check-button class="select" :is-checked="isSelected" @click.native="selectClick"></check-button>
            <span class="text">全选</span>
        </div>

        <div class="price">
            合计：{{totalPrice}}
        </div>

        <div class="calculate" @click="clcClick">
            结算({{checkCount}})
        </div>
    </div>
</template>

<script>
import CheckButton from 'components/common/check/CheckButton'

export default {
    name: 'CategoryBottomBar',
    components: {
        CheckButton
    },
    computed: {
        totalPrice(){
            // return 1
            return this.$store.state.cartList.filter(item => {
                return item.checked
            }).reduce((preValue,item) => {
                return preValue + item.price * item.count
            },0).toFixed(2)
        },
        checkCount(){
            return this.$store.state.cartList.filter(item => item.checked).length
        },
        isSelected(){
            //当被选择item.checked为true，当存在非true即未被选择元素的时候返回，则这个数组有长度
            // return !this.$store.state.cartList.filter(item => !item.checked).length
            let all = this.$store.state.cartList.filter(item => !item.checked).length
            //isSelected全选时等于0,全选时item.checked=true则!item.checked为false
            if(all === 0){
                return true
            }else{
                return false
            }
        }
    },
    methods: {
        selectClick(){
            if(this.isSelected){
                this.$store.state.cartList.forEach(item => {
                    item.checked = false
                });
            }else{
                this.$store.state.cartList.forEach(item => item.checked = true)
            }
        },
        clcClick(){
            // console.log(this.isSelected);
            if(this.checkCount == 0){
                this.$toast.show('未选择购买商品',1000)
            }
        }
    }
}

</script>

<style scoped>
.bottom-bar{
    position: relative;
    display: flex;
    height: 40px;
    top: 435px;
    background-color: #eee;
    font-size: 14px;
}

.select-bottom{
    display: flex;
    height: 40px;
    align-items: center;
    margin-left: 10px;
    width: 60px;
}

.select{
    width: 16px;
    height: 16px;
    line-height: 16px;
}

.price{
    margin-left: 20px;
    flex: 1;
    line-height: 40px;
}

.calculate{
    width: 90px;
    color: #fff;
    background-color: crimson;
    line-height: 40px;
    text-align: center;
}
</style>