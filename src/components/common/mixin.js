import {debounce} from 'components/common/utils'
export const itemListenerMixin = {
    mounted() {
        const refresh = debounce(this.$refs.scroll.refresh,50)
        this.itemImageListener = ()=>{
            refresh()
        }
        this.$bus.$on('itemImageLoad',this.itemImageListener)
    }
    
}