<template>
    <div class="wrapper" ref="wrapper">
        <div class="content">
            <slot></slot>
        </div>
    </div>
</template>

<script>
import BScroll from 'better-scroll'

export default {
    name: "Scroll",
    data(){
        return{
            scroll: null
        }
    },
    props: {
        probeType: {
            type: Number,
            default: 0
        },
        pullUpType: {
            type: Boolean,
            default: false
        }
    },
    mounted() {
        this.scroll = new BScroll(this.$refs.wrapper,{
            click: true,
            probeType: this.probeType,
            pullUpType: this.pullUpType
        })

        this.scroll.on('scroll',(position) => {
            this.$emit('scroll',position)
        })

        // this.scroll.on('pullingUp',()=>{
        //     this.$emit('pullingUp')
        // })

        if(this.pullUpType){
            this.scroll.on('pullingUp',()=>{
                this.$emit('pullingUp')
            })
        }
    },
    methods: {
        scrollTo(x,y,time=500){
            this.scroll.scrollTo(x,y,time)
        },
        finishPullUp(){
            this.scroll && this.scroll.finishPullUp()
        },
        refresh(){
            this.scroll && this.scroll.refresh()
        },
        getLeaveY(){
            return this.scroll ? this.scroll.y : 0
        }
    }
}
</script>

<style scoped>

</style>