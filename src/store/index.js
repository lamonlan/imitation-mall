import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cartList: []
  },
  mutations: {
    addCount(state,payload){
      payload.count ++
    },
    addToCart(state,payload){
      payload.checked = false
      state.cartList.push(payload)
    }
  },
  actions: {
    addCart(context,payload){
      return new Promise((resolve,reject) => {
        let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)

        if(oldProduct){
          // oldProduct.count += 1
          context.commit('addCount',oldProduct)
          resolve('当前商品数量+1')
        }else{
          payload.count = 1
          // state.cartList.push(payload)
          context.commit('addToCart',payload)
          resolve('添加商品成功')
        }
      })
      
    }
  },
  modules: {
  },
  getters
})
